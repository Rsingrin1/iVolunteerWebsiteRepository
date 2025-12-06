import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/profileMenu";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function MyEventsOrganizer() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const authToken = localStorage.getItem("authToken") || null;
  const organizerId =
    localStorage.getItem("organizerId") ||
    JSON.parse(localStorage.getItem("currentUser") || "{}").id ||
    null;

  const handleLogout = () => {
    // basic logout: clear auth info
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("organizerId");
    navigate("/Login");
  };

  const handleCreateEvent = () => {
    navigate("/modifyEvent"); // no id -> create mode
  };

  const handleModifyEvent = (id) => {
    navigate(`/modifyEvent?id=${id}`);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!authToken || !organizerId) {
        setApiError("You must be logged in as an organizer to view events.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setApiError(null);

      try {
        const res = await fetch(
          `${API_BASE}/api/events/organizer/${organizerId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

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
              `Failed to load events (status ${res.status})`
          );
          setEvents([]);
          return;
        }

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        setApiError(err.message || "Network error while loading events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [authToken, organizerId]);

  return (
    <Box bg="white" minH="100vh" data-model-id="16:90">
      <Flex
        as="header"
        justify="space-between"
        align="center"
        p={{ base: 4, md: 6 }}
      >
        <IconButton
          variant="ghost"
          aria-label="Go back"
          size="lg"
          _hover={{ bg: "transparent" }}
          opacity={0}
          transform="translateY(-1rem)"
          animation="fadeIn 1s 0ms ease forwards"
        />

        <Profile
          userName={
            JSON.parse(localStorage.getItem("currentUser") || "{}").username ||
            "Organizer"
          }
          profilePic="https://bit.ly/dan-abramov"
          onLogout={handleLogout}
        />
      </Flex>

      <Container
        maxW="1440px"
        px={{ base: 4, md: 6, lg: "175px" }}
        as="main"
      >
        <Box
          mb={6}
          opacity={0}
          transform="translateY(-1rem)"
          animation="fadeIn 1s 200ms ease forwards"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            as="h1"
            fontFamily="Inter, Helvetica"
            fontWeight={700}
            fontSize={{ base: "48px", md: "72px" }}
            letterSpacing="-2.16px"
            lineHeight="120%"
            color="black"
          >
            My Events
          </Heading>

          <Button
            bg="#181c71"
            color="white"
            borderRadius="lg"
            px={4}
            py={3}
            h="auto"
            _hover={{ bg: "#181c71", opacity: 0.9 }}
            onClick={handleCreateEvent}
          >
            <Text
              fontFamily="Inter, Helvetica"
              fontWeight={400}
              fontSize="16px"
              lineHeight="100%"
            >
              + Create Event
            </Text>
          </Button>
        </Box>

        {loading && (
          <Flex justify="center" align="center" mt={8}>
            <Spinner size="lg" />
          </Flex>
        )}

        {apiError && !loading && (
          <Text color="red.500" mb={4}>
            {apiError}
          </Text>
        )}

        {!loading && !apiError && events.length === 0 && (
          <Text color="gray.600">You don&apos;t have any events yet.</Text>
        )}

        <VStack spacing={6} align="stretch">
          {events.map((event, index) => {
            const dateObj = event.date ? new Date(event.date) : null;
            const dateStr = dateObj
              ? dateObj.toLocaleDateString()
              : "No date";
            const timeStr = dateObj
              ? dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return (
              <Card
                key={event._id || index}
                borderColor="#d9d9d9"
                borderWidth="1px"
                opacity={0}
                transform="translateY(-1rem)"
                animation={`fadeIn 1s ${300 + index * 100}ms ease forwards`}
              >
                <CardBody p={6}>
                  <Flex direction={{ base: "column", md: "row" }} gap={6}>
                    <Image
                      src={
                        event.imageUrl ||
                        "https://via.placeholder.com/171x159?text=Event"
                      }
                      alt={event.name}
                      w={{ base: "100%", md: "171px" }}
                      h="159px"
                      objectFit="cover"
                      borderRadius="md"
                    />

                    <Flex flex={1} direction="column" justify="space-between">
                      <VStack align="stretch" spacing={2} mb={4}>
                        <Heading
                          as="h2"
                          fontFamily="Inter, Helvetica"
                          fontWeight={600}
                          fontSize="24px"
                          letterSpacing="-0.48px"
                          lineHeight="120%"
                          color="#1e1e1e"
                        >
                          {event.name}
                        </Heading>

                        <Text
                          opacity={0.6}
                          fontFamily="Inter, Helvetica"
                          fontWeight={400}
                          fontSize="16px"
                          lineHeight="140%"
                          color="black"
                        >
                          {timeStr && `${timeStr}`}
                          <br />
                          {dateStr}
                        </Text>
                      </VStack>

                      <HStack spacing={4} flexWrap="wrap">
                        <Button
                          bg="#181c71"
                          color="white"
                          borderRadius="lg"
                          px={3}
                          py={3}
                          h="auto"
                          _hover={{ bg: "#181c71", opacity: 0.9 }}
                          onClick={() => handleModifyEvent(event._id)}
                        >
                          <Text
                            fontFamily="Inter, Helvetica"
                            fontWeight={400}
                            fontSize="16px"
                            lineHeight="100%"
                          >
                            Modify Event
                          </Text>
                        </Button>

                        <Button
                          bg="#181c71"
                          color="white"
                          borderRadius="lg"
                          px={3}
                          py={3}
                          h="auto"
                          _hover={{ bg: "#181c71", opacity: 0.9 }}
                        >
                          <Text
                            fontFamily="Inter, Helvetica"
                            fontWeight={400}
                            fontSize="16px"
                            lineHeight="100%"
                          >
                            Send Notification
                          </Text>
                        </Button>

                        <Button
                          bg="#181c71"
                          color="white"
                          borderRadius="lg"
                          px={3}
                          py={3}
                          h="auto"
                          _hover={{ bg: "#181c71", opacity: 0.9 }}
                        >
                          <Text
                            fontFamily="Inter, Helvetica"
                            fontWeight={400}
                            fontSize="16px"
                            lineHeight="100%"
                          >
                            Review Applicants
                          </Text>
                        </Button>
                      </HStack>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
            );
          })}
        </VStack>
      </Container>

      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}
