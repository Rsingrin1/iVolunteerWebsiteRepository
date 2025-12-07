import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Spinner,
  VStack,
  Card,
  CardBody,
  Badge,
  HStack,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../assets/backArrow";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function formatDateHeader(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventsCalendar() {
  const [eventsByDate, setEventsByDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        let data = await res.json();

        if (!res.ok) {
          setError(data?.message || "Failed to load events.");
          return;
        }

        if (!Array.isArray(data)) {
          setEventsByDate([]);
          return;
        }

        // Group by date (YYYY-MM-DD)
        const map = new Map();
        data.forEach((event) => {
          if (!event.date) return;
          const key = new Date(event.date).toISOString().slice(0, 10);
          if (!map.has(key)) map.set(key, []);
          map.get(key).push(event);
        });

        // Sort days + times
        const grouped = [...map.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([dateKey, evts]) => ({
            dateKey,
            events: evts.sort(
              (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            ),
          }));

        setEventsByDate(grouped);
      } catch (err) {
        setError("Network error while loading events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg="#1f49b6"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="white" />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="#1f49b6" pt={6}>
      <Container maxW="6xl" px={4} pb={16}>
        {/* Back Button */}
        <BackArrow />

        {/* Page Title */}
        <Heading
          as="h1"
          color="white"
          fontSize="60px"
          fontWeight={700}
          textAlign="center"
          mb={8}
          letterSpacing="-1.8px"
        >
          Events Calendar
        </Heading>

        {error && (
          <Text color="red.300" fontSize="lg" mb={4} textAlign="center">
            {error}
          </Text>
        )}

        {eventsByDate.length === 0 && !error && (
          <Text color="white" fontSize="xl" textAlign="center">
            No events have been scheduled yet.
          </Text>
        )}

        <VStack spacing={10} align="stretch">
          {eventsByDate.map(({ dateKey, events }) => (
            <Box key={dateKey}>
              {/* Date header */}
              <Text
                color="white"
                fontSize="32px"
                fontWeight="600"
                mb={4}
                textAlign="left"
              >
                {formatDateHeader(dateKey)}
              </Text>

              {/* Grid of event cards for this day */}
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={6}
                alignItems="stretch"
              >
                {events.map((event) => (
                  <Card
                    key={event._id}
                    borderWidth="1px"
                    borderColor="#d9d9d9"
                    bg="white"
                    h="100%"
                  >
                    <CardBody>
                      <HStack align="flex-start" spacing={4}>
                        {/* Event image thumbnail */}
                        <Image
                          src={
                            event.imageUrl ||
                            "https://via.placeholder.com/96x96.png?text=Event"
                          }
                          alt={event.name}
                          boxSize="72px"
                          objectFit="cover"
                          borderRadius="md"
                          flexShrink={0}
                        />

                        <Box flex="1">
                          <Heading
                            as="h3"
                            size="sm"
                            mb={1}
                            color="#1e1e1e"
                            fontFamily="Inter, Helvetica"
                          >
                            {event.name}
                          </Heading>

                          <Text color="#444" fontSize="14px" noOfLines={3}>
                            {event.description || "No description provided."}
                          </Text>

                          {event.location && (
                            <Text color="#666" fontSize="13px" mt={1}>
                              Location: {event.location}
                            </Text>
                          )}

                          <HStack justify="space-between" mt={3}>
                            <Badge
                              colorScheme="purple"
                              fontSize="0.8rem"
                              borderRadius="full"
                            >
                              {formatTime(event.date)}
                            </Badge>

                            {event.tags?.length > 0 && (
                              <HStack spacing={1} flexWrap="wrap">
                                {event.tags.map((tag, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="subtle"
                                    colorScheme="gray"
                                    fontSize="0.65rem"
                                    borderRadius="full"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </HStack>
                            )}
                          </HStack>
                        </Box>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}
