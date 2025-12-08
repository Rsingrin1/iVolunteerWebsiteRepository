import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Textarea,
  VStack,
  HStack,
  Stack,
  SimpleGrid,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/backArrow";
import SiteHeader from "../assets/SiteHeader";


const sectionData = [
  { title: "Time & Location" },
  { title: "Forms" },
  { title: "Notifications" },
];

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// helper to read ?id=... from URL
function getEventIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

export default function ModifyEvent() {
  const navigate = useNavigate();
  const eventId = getEventIdFromQuery();
  const isEdit = Boolean(eventId);

const organizerId = localStorage.getItem("organizerId") || null;
const authToken = localStorage.getItem("authToken") || null;

  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
    notifMessage: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Load event if editing
  useEffect(() => {
    if (!isEdit) return;

    const fetchEvent = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const res = await fetch(`${API_BASE}/api/event/${eventId}`);
        let data = null;
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          try {
            data = await res.json();
          } catch {
            data = null;
          }
        }

        if (!res.ok) {
          setApiError(
            (data && (data.message || data.errorMessage)) ||
              `Failed to load event (status ${res.status})`
          );
          return;
        }

        if (!data) return;

        setForm({
          name: data.name || "",
          description: data.description || "",
          // convert ISO date to "YYYY-MM-DDTHH:mm" for datetime-local input
          date: data.date ? data.date.slice(0, 16) : "",
          location: data.location || "",
          imageUrl: data.imageUrl || "",
          notifMessage: data.notifMessage || "",
        });
      } catch (err) {
        setApiError(err.message || "Network error while loading event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setApiError(null);

  if (!authToken) {
    setApiError("You must be logged in as an organizer to save events.");
    setLoading(false);
    return;
  }

  if (!organizerId) {
    setApiError("Missing organizer ID. Please log in again.");
    setLoading(false);
    return;
  }

  const payload = {
    name: form.name,
    description: form.description,
    date: form.date ? new Date(form.date).toISOString() : null,
    location: form.location,
    imageUrl: form.imageUrl || undefined,
    notifMessage: form.notifMessage || undefined,
    organizerId,   // still send this so backend links event to user
  };

  try {
    const url = isEdit
      ? `${API_BASE}/api/update/event/${eventId}`
      : `${API_BASE}/api/event`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,   // ⬅️ IMPORTANT
      },
      body: JSON.stringify(payload),
    });

    let data = null;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      try {
        data = await res.json();
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      setApiError(
        (data && (data.message || data.errorMessage)) ||
          `Failed to ${isEdit ? "update" : "create"} event`
      );
      return;
    }

    // Success → go back to My Events
    navigate("/MyEventsOrganizer");
  } catch (err) {
    setApiError(err.message || "Network error while saving event");
  } finally {
    setLoading(false);
  }
};

  return (
    <Box bg="#1f49b6" minH="100vh" w="full" pt={6}>
      <SiteHeader />

      <Container maxW="6xl" px={4} pb={10}>
        <BackArrow />

        <VStack
          as="form"
          spacing={12}
          w="full"
          onSubmit={handleSubmit}
          align="stretch"
          mt={4}
        >
          {/* Page Title */}
          <VStack spacing={4}>
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              fontFamily="'Roboto', Helvetica"
              fontWeight={600}
              fontSize="40px"
              lineHeight="48px"
              color="white"
            >
              {isEdit ? "Modify Event" : "Create Event"}
            </Heading>
            {apiError && (
              <Text color="red.300" textAlign="center">
                {apiError}
              </Text>
            )}
          </VStack>

          {/* Description Section (full width) */}
          <Box w="full">
            <Heading
              as="h2"
              size="lg"
              mb={8}
              fontFamily="'Lato', Helvetica"
              fontWeight={700}
              fontSize="32px"
              color="white"
            >
              Description
            </Heading>

            <Box
              w="100%"
              bg="#e6f0ff"
              borderRadius="20px"
              boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
              p={8}
            >
              <VStack spacing={6} align="stretch">
                {/* Title */}
                <FormControl>
                  <FormLabel
                    fontFamily="'Inter', Helvetica"
                    fontWeight={400}
                    fontSize="16px"
                    color="#0d2a73"
                  >
                    Title
                  </FormLabel>
                  <Input
                    name="name"
                    placeholder="Name your event"
                    bg="white"
                    borderColor="#b7c9e6"
                    fontFamily="'Inter', Helvetica"
                    fontSize="16px"
                    value={form.name}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Description */}
                <FormControl>
                  <FormLabel
                    fontFamily="'Inter', Helvetica"
                    fontWeight={400}
                    fontSize="16px"
                    color="#0d2a73"
                  >
                    Description
                  </FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Describe your event"
                    minH="120px"
                    resize="none"
                    bg="white"
                    borderColor="#b7c9e6"
                    fontFamily="'Inter', Helvetica"
                    fontSize="16px"
                    value={form.description}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Image URL */}
                <FormControl>
                  <FormLabel
                    fontFamily="'Inter', Helvetica"
                    fontWeight={400}
                    fontSize="16px"
                    color="#0d2a73"
                  >
                    Event Image URL
                  </FormLabel>
                  <Input
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    bg="white"
                    borderColor="#b7c9e6"
                    fontFamily="'Inter', Helvetica"
                    fontSize="16px"
                    value={form.imageUrl}
                    onChange={handleChange}
                  />
                </FormControl>
              </VStack>
            </Box>
          </Box>

          {/* Other Sections */}
          {sectionData.map((section) => (
            <Box key={section.title} w="full">
              <Box
                as="hr"
                my={8}
                h="5px"
                bg="#d9d9d9"
                borderRadius="999px"
              />

              <Heading
                as="h2"
                size="lg"
                mb={8}
                fontFamily="'Lato', Helvetica"
                fontWeight={700}
                fontSize="32px"
                color="white"
              >
                {section.title}
              </Heading>

              {/* Time & Location */}
              {section.title === "Time & Location" && (
                <Stack spacing={8}>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {/* Date Card */}
                    <Box
                      bg="#e6f0ff"
                      borderRadius="28px"
                      borderWidth="1px"
                      borderColor="#b7c9e6"
                      overflow="hidden"
                    >
                      <Box
                        borderBottomWidth="1px"
                        borderColor="#b7c9e6"
                        p={6}
                      >
                        <VStack align="stretch" spacing={4}>
                          <Text
                            fontSize="14px"
                            fontWeight={500}
                            color="#5b6b82"
                            fontFamily="'Inter', Helvetica"
                          >
                            Select date and time
                          </Text>
                          <HStack justify="space-between">
                            <Text
                              fontSize="20px"
                              fontWeight={500}
                              color="#1c1b1f"
                            >
                              Event date & time
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>

                      <Box p={6}>
                        <FormControl position="relative">
                          <FormLabel
                            position="absolute"
                            top="-12px"
                            left="12px"
                            px={1}
                            bg="#e6f0ff"
                            fontSize="12px"
                            color="#1f49b6"
                          >
                            Date & Time
                          </FormLabel>
                          <Input
                            type="datetime-local"
                            name="date"
                            h="56px"
                            borderWidth="2px"
                            borderColor="#1f49b6"
                            bg="white"
                            fontFamily="'Inter', Helvetica"
                            value={form.date}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Box>

                    {/* Time Card (visual) */}
                    <Box
                      bg="#e6f0ff"
                      borderRadius="28px"
                      borderWidth="1px"
                      borderColor="#b7c9e6"
                      p={6}
                    >
                      <VStack align="stretch" spacing={5}>
                        <Text
                          fontSize="14px"
                          fontWeight={500}
                          color="#5b6b82"
                        >
                          Enter time (visual)
                        </Text>

                        <HStack align="flex-start" spacing={3}>
                          {/* Hour */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              gap={1}
                              px={4}
                              py={2}
                              bg="#d0e2ff"
                              borderRadius="lg"
                              borderWidth="2px"
                              borderColor="#1f49b6"
                            >
                              <Text
                                fontSize="32px"
                                fontWeight="600"
                                color="#0d2a73"
                              >
                                20
                              </Text>
                              <Box w="2px" h="42px" bg="#1f49b6" />
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#5b6b82"
                              textAlign="center"
                            >
                              Hour
                            </Text>
                          </VStack>

                          {/* colon */}
                          <Flex
                            align="center"
                            justify="center"
                            h="72px"
                            w="24px"
                          >
                            <Text fontSize="40px" color="white">
                              :
                            </Text>
                          </Flex>

                          {/* Minutes */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              px={4}
                              py={2}
                              bg="#e6f0ff"
                              borderRadius="lg"
                            >
                              <Text
                                fontSize="32px"
                                fontWeight="600"
                                color="#0d2a73"
                              >
                                00
                              </Text>
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#5b6b82"
                              textAlign="center"
                            >
                              Minute
                            </Text>
                          </VStack>

                          {/* AM / PM */}
                          <Box
                            w="52px"
                            h="72px"
                            borderRadius="lg"
                            overflow="hidden"
                            borderWidth="1px"
                            borderColor="#b7c9e6"
                          >
                            <Flex
                              h="50%"
                              align="center"
                              justify="center"
                              bg="#d0e2ff"
                              borderBottomWidth="1px"
                              borderColor="#b7c9e6"
                            >
                              <Text
                                fontSize="14px"
                                fontWeight="500"
                                color="#0d2a73"
                              >
                                AM
                              </Text>
                            </Flex>
                            <Flex
                              h="50%"
                              align="center"
                              justify="center"
                            >
                              <Text
                                fontSize="14px"
                                fontWeight="500"
                                color="#5b6b82"
                              >
                                PM
                              </Text>
                            </Flex>
                          </Box>
                        </HStack>
                      </VStack>
                    </Box>

                    {/* Duration Card (visual) */}
                    <Box
                      bg="#e6f0ff"
                      borderRadius="28px"
                      borderWidth="1px"
                      borderColor="#b7c9e6"
                      p={6}
                    >
                      <VStack align="stretch" spacing={5}>
                        <Text
                          fontSize="14px"
                          fontWeight={500}
                          color="#5b6b82"
                        >
                          Enter Duration (visual)
                        </Text>

                        <HStack align="flex-start" spacing={3}>
                          {/* Hour */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              gap={1}
                              px={4}
                              py={2}
                              bg="#d0e2ff"
                              borderRadius="lg"
                              borderWidth="2px"
                              borderColor="#1f49b6"
                            >
                              <Text
                                fontSize="32px"
                                fontWeight="600"
                                color="#0d2a73"
                              >
                                01
                              </Text>
                              <Box w="2px" h="42px" bg="#1f49b6" />
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#5b6b82"
                              textAlign="center"
                            >
                              Hour
                            </Text>
                          </VStack>

                          {/* colon */}
                          <Flex
                            align="center"
                            justify="center"
                            h="72px"
                            w="24px"
                          >
                            <Text fontSize="40px" color="white">
                              :
                            </Text>
                          </Flex>

                          {/* Minutes */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              px={4}
                              py={2}
                              bg="#e6f0ff"
                              borderRadius="lg"
                            >
                              <Text
                                fontSize="32px"
                                fontWeight="600"
                                color="#0d2a73"
                              >
                                30
                              </Text>
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#5b6b82"
                              textAlign="center"
                            >
                              Minute
                            </Text>
                          </VStack>
                        </HStack>
                      </VStack>
                    </Box>
                  </SimpleGrid>

                  {/* Location */}
                  <Box maxW="lg" mt={4}>
                    <FormControl>
                      <FormLabel
                        fontFamily="'Inter', Helvetica"
                        fontWeight={400}
                        fontSize="20px"
                        color="white"
                      >
                        Location
                      </FormLabel>
                      <Input
                        name="location"
                        placeholder="Address"
                        bg="#e6f0ff"
                        borderColor="#b7c9e6"
                        borderWidth="1.6px"
                        borderRadius="10px"
                        px="24px"
                        py="18px"
                        fontFamily="'Inter', Helvetica"
                        fontSize="18px"
                        value={form.location}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                </Stack>
              )}

              {/* Forms */}
              {section.title === "Forms" && (
                <Box
                  maxW="331px"
                  bg="#e6f0ff"
                  borderRadius="20px"
                  boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                  p={6}
                >
                  <VStack align="stretch" spacing={6}>
                    <FormControl>
                      <FormLabel
                        fontFamily="'Inter', Helvetica"
                        fontWeight={400}
                        fontSize="18px"
                        color="#0d2a73"
                      >
                        Upload Volunteer Forms
                      </FormLabel>
                      <IconButton
                        aria-label="Upload forms"
                        variant="ghost"
                        size="lg"
                        w="48px"
                        h="48px"
                        p={0}
                        _hover={{ bg: "transparent" }}
                        icon={
                          <Box as="span" fontSize="40px">
                            📄
                          </Box>
                        }
                      />
                    </FormControl>

                    <Image
                      src="https://c.animaapp.com/mifbvir6JSInmQ/img/group-42.png"
                      alt="Forms preview"
                      w="full"
                    />
                  </VStack>
                </Box>
              )}

              {/* Notifications */}
              {section.title === "Notifications" && (
                <Stack spacing={6}>
                  {/* Notification Message */}
                  <Box
                    maxW="323px"
                    bg="#e6f0ff"
                    borderRadius="20px"
                    boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                    p={6}
                  >
                    <FormControl>
                      <FormLabel
                        fontFamily="'Inter', Helvetica"
                        fontWeight={400}
                        fontSize="16px"
                        color="#0d2a73"
                      >
                        Notification Message
                      </FormLabel>
                      <Box position="relative">
                        <Textarea
                          name="notifMessage"
                          placeholder="Describe your event"
                          minH="80px"
                          resize="none"
                          bg="white"
                          borderColor="#b7c9e6"
                          fontFamily="'Inter', Helvetica"
                          fontSize="16px"
                          value={form.notifMessage}
                          onChange={handleChange}
                        />
                        <Image
                          src="https://c.animaapp.com/mifbvir6JSInmQ/img/drag.svg"
                          alt="Drag"
                          w="7px"
                          h="7px"
                          position="absolute"
                          right={2}
                          bottom={2}
                        />
                      </Box>
                    </FormControl>
                  </Box>

                  {/* When to send notification (visual only for now) */}
                  <Box
                    maxW="328px"
                    bg="#e6f0ff"
                    borderRadius="28px"
                    borderWidth="1px"
                    borderColor="#b7c9e6"
                    p={6}
                  >
                    <VStack align="stretch" spacing={5}>
                      <Text
                        fontSize="14px"
                        fontWeight={500}
                        color="#5b6b82"
                      >
                        Send notification how long before event? (visual)
                      </Text>

                      <HStack align="flex-start" spacing={3}>
                        {/* Hour */}
                        <VStack spacing={2} flex="1">
                          <Flex
                            h="72px"
                            w="full"
                            align="center"
                            justify="center"
                            gap={1}
                            px={4}
                            py={2}
                            bg="#d0e2ff"
                            borderRadius="lg"
                            borderWidth="2px"
                            borderColor="#1f49b6"
                          >
                            <Text
                              fontSize="32px"
                              fontWeight="600"
                              color="#0d2a73"
                            >
                              00
                            </Text>
                            <Box w="2px" h="42px" bg="#1f49b6" />
                          </Flex>
                          <Text
                            fontSize="12px"
                            color="#5b6b82"
                            textAlign="center"
                          >
                            Hour
                          </Text>
                        </VStack>

                        {/* colon */}
                        <Flex
                          align="center"
                          justify="center"
                          h="72px"
                          w="24px"
                        >
                          <Text fontSize="40px" color="white">
                            :
                          </Text>
                        </Flex>

                        {/* Minutes */}
                        <VStack spacing={2} flex="1">
                          <Flex
                            h="72px"
                            w="full"
                            align="center"
                            justify="center"
                            px={4}
                            py={2}
                            bg="#e6f0ff"
                            borderRadius="lg"
                          >
                            <Text
                              fontSize="32px"
                              fontWeight="600"
                              color="#0d2a73"
                            >
                              30
                            </Text>
                          </Flex>
                          <Text
                            fontSize="12px"
                            color="#5b6b82"
                            textAlign="center"
                          >
                            Minute
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </Box>
                </Stack>
              )}
            </Box>
          ))}

          {/* Submit Button */}
          <Button
            type="submit"
            px="54px"
            py="40px"
            h="auto"
            bg="#171b70"
            borderRadius="22px"
            boxShadow="inset 0px -2px 2px 2px rgba(51, 34, 170, 0.25), inset 0px 2px 2px 2px rgba(255, 255, 255, 0.25), inset 0px 0px 0px 2px #4834d4, 0px 2px 4px rgba(19, 13, 61, 0.25)"
            _hover={{ bg: "#1a1f7a" }}
            isLoading={loading}
          >
            <Box
              as="span"
              fontFamily="'Lato', Helvetica"
              fontWeight="bold"
              color="white"
              fontSize="32px"
              lineHeight="32px"
            >
              Submit
            </Box>
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
