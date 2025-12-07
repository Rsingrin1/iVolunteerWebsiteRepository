// src/pages/OrganizerDashboard.jsx
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";

import ProfileMenu from "../assets/profileMenu.jsx";

const dashboardCards = [
  {
    title: "Create Event",
    description: "Organize a volunteer event and invite others to participate.",
    imageSrc: "https://c.animaapp.com/misabfpcBGwY1T/img/image-11.png",
    route: "/modifyEvent",          // 👈 goes to modifyEvent.jsx
  },
  {
    title: "My Events",
    description: "View and manage your upcoming volunteer events.",
    imageSrc: "https://c.animaapp.com/misabfpcBGwY1T/img/image-9.png",
    route: "/MyEventsOrganizer",    // 👈 goes to MyEventsOrganizer.jsx
  },
  {
    title: "Calendar",
    description: "See your upcoming volunteer events and stay organized.",
    imageSrc: "https://c.animaapp.com/misabfpcBGwY1T/img/image-8.png",
    route: "/MyEventsOrganizer",    // 👈 temporarily reuse MyEventsOrganizer
  },
];

const OrganizerDashboard = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg="white" w="100%" minH="100vh">
      {/* NAVBAR */}
      <Flex justify="flex-end" align="center" p={6}>
        <ProfileMenu
          userName="John Doe"
          profilePic="https://c.animaapp.com/misabfpcBGwY1T/img/shape.png"
          onLogout={() => console.log("Logged out")}
        />
      </Flex>

      {/* HEADER */}
      <Flex direction="column" align="center" mt={10}>
        <Heading size="2xl" color="#1e1e1e">
          iVolunteer
        </Heading>

        <Text mt={2} fontSize="lg" color="gray.500">
          Your Gateway to Doing Good.
        </Text>

        <Image
          mt={10}
          w="180px"
          h="160px"
          objectFit="contain"
          src="https://c.animaapp.com/misabfpcBGwY1T/img/image-1.png"
          alt="Volunteer illustration"
        />
      </Flex>

      {/* MAIN CONTENT */}
      <Container maxW="6xl" mt={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
          {dashboardCards.map((card, index) => (
            <Box
              key={index}
              as={RouterLink}
              to={card.route}
              bg={cardBg}
              border="1px solid"
              borderColor={cardBorder}
              borderRadius="lg"
              p={6}
              textAlign="center"
              _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
              transition="0.2s ease"
              textDecoration="none"
            >
              <Flex
                w="100%"
                h="150px"
                align="center"
                justify="center"
                mb={4}
                borderRadius="md"
                bg="gray.50"
              >
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  boxSize="96px"
                  objectFit="contain"
                />
              </Flex>

              <Heading as="h2" size="md" mb={2} color="#1e1e1e">
                {card.title}
              </Heading>

              <Text fontSize="sm" color="gray.600">
                {card.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default OrganizerDashboard;
