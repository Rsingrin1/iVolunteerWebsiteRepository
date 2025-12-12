import React, { useEffect, useState, useRef } from "react";
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/profileMenu";
import SiteHeader from "../assets/SiteHeader";


const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function MyEventsOrganizer() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Cancel Event = Delete dialog control
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [deletingEvent, setDeletingEvent] = useState(null);

  // Send Notification dialog control
  const {
    isOpen: notifyIsOpen,
    onOpen: openNotify,
    onClose: closeNotify,
  } = useDisclosure();
  const [notifyEvent, setNotifyEvent] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

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

  const handleReviewApplicants = (id) => {
    navigate(`/event/${id}/applicants`);
  };

  const handleOpenDelete = (event) => {
    setDeletingEvent(event);
    onOpen();
  };

  const closeDelete = () => {
    setDeletingEvent(null);
    onClose();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEvent) return;
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/api/delete/event/${deletingEvent._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch {}
      }

      if (!res.ok) {
        setApiError((data && (data.message || data.errorMessage)) || `Delete failed (status ${res.status})`);
        return;
      }

      setEvents((prev) => prev.filter((e) => e._id !== deletingEvent._id));
      closeDelete();
    } catch (err) {
      setApiError(err.message || "Network error while deleting event.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!organizerId) {
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
            credentials: "include", // cookie-based auth
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
  }, [organizerId]);

  return (
    <Box bg="white" minH="100vh" data-model-id="16:90">
            <SiteHeader />

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

            //  NEW: counts for this event
            const applicantCount = Array.isArray(event.applicants)
              ? event.applicants.length
              : 0;
            const participantCount = Array.isArray(event.participants)
              ? event.participants.length
              : 0;

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

                        {/*  NEW: applicant / participant counts */}
                        <Text
                          fontFamily="Inter, Helvetica"
                          fontWeight={400}
                          fontSize="14px"
                          lineHeight="140%"
                          color="#333"
                        >
                          {applicantCount} pending applicant
                          {applicantCount === 1 ? "" : "s"} ·{" "}
                          {participantCount} approved volunteer
                          {participantCount === 1 ? "" : "s"}
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
                          onClick={() => {
                            setNotifyEvent(event);
                            setNotifyMessage("");
                            openNotify();
                          }}
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
                          onClick={() => handleReviewApplicants(event._id)}
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

                        <Button
                          bg="#ff4d4f"
                          color="white"
                          borderRadius="lg"
                          px={3}
                          py={3}
                          h="auto"
                          _hover={{ bg: "#ff4d4f", opacity: 0.9 }}
                          onClick={() => handleOpenDelete(event)}
                        >
                          <Text
                            fontFamily="Inter, Helvetica"
                            fontWeight={400}
                            fontSize="16px"
                            lineHeight="100%"
                          >
                            Cancel Event
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

      {/* Cancel Event confirmation dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to cancel "{deletingEvent?.name}"? This will notify participants and cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDelete} variant="ghost">
                Keep Event
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Cancel Event
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Send Notification modal */}
      <Modal isOpen={notifyIsOpen} onClose={() => { setNotifyEvent(null); closeNotify(); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={3} color="gray.700">
              Send an email update to all registered participants. Keep in mind that email notifications for change in date, time, location, or cancellation are automatically sent by iVolunteer.
            </Text>
            <Text mb={2} fontWeight={600}>Your message:</Text>
            <Textarea
              value={notifyMessage}
              onChange={(e) => setNotifyMessage(e.target.value)}
              placeholder={`Write a short message to all participants of "${notifyEvent?.name || ''}"...`}
              rows={6}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => { setNotifyEvent(null); closeNotify(); }}>
              Cancel
            </Button>
            <Button
              bg="#181c71"
              color="white"
              onClick={async () => {
                if (!notifyEvent) return;
                setIsSending(true);
                try {
                  const res = await fetch(`${API_BASE}/api/event/${notifyEvent._id}/notify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ message: notifyMessage }),
                  });

                  let data = null;
                  const ct = res.headers.get('content-type') || '';
                  if (ct.includes('application/json')) {
                    try { data = await res.json(); } catch (e) { data = null; }
                  }

                  if (!res.ok) {
                    toast({ title: 'Failed to send notifications', description: (data && (data.message || data.errorMessage)) || `Status ${res.status}`, status: 'error', duration: 6000, isClosable: true });
                  } else {
                    const sent = (data && (data.sent ?? null));
                    const total = (data && (data.total ?? null));
                    const desc = sent != null && total != null ? `${sent} of ${total} notifications sent.` : 'Notifications sent (best-effort).';
                    toast({ title: 'Notifications sent', description: desc, status: 'success', duration: 6000, isClosable: true });
                    setNotifyEvent(null);
                    closeNotify();
                  }
                } catch (err) {
                  toast({ title: 'Network error', description: err.message || 'Failed to send notifications', status: 'error', duration: 6000, isClosable: true });
                } finally {
                  setIsSending(false);
                }
              }}
            >
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
