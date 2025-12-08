import React from "react";
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./DevMatrix.css";  //  NEW — import animation styles

export default function Home() {
  const routes = [
    { name: "Login", path: "/Login" },
    { name: "Volunteer Sign Up", path: "/VolunteerSignUp" },
    { name: "Organizer Sign Up", path: "/OrganizerSignUp" },
    { name: "Profile Page", path: "/Profile" },
    { name: "Organizer Dashboard", path: "/MyEventsOrganizer" },
    { name: "Volunteer Dashboard", path: "/MyEventsVolunteer" },
    { name: "Modify Event", path: "/modifyEvent" },
    { name: "Events Calendar", path: "/calendar" },
    { name: "Example Mongo Page", path: "/exampleMongoHookup" },
    { name: "Landing Page", path: "/landingPage" },
    { name: "Event Search", path: "/events/search" },
  
    { name: "My Volunteer Events", path: "/MyEventsVolunteer" },


  ];

  return (
    <Box className="matrix-bg" minH="100vh" p={10}>
      <div className="matrix-layer-3"></div>
      <Heading mb={8} textAlign="center" color="green.300">
        🧪 Developer Testing Menu
      </Heading>

      <VStack align="stretch" spacing={4} maxW="600px" mx="auto">
        {routes.map((r) => (
          <Button
            as={Link}
            to={r.path}
            key={r.path}
            colorScheme="green"
            variant="outline"
            size="lg"
            borderColor="green.300"
            color="green.200"
            _hover={{
              bg: "rgba(0, 255, 0, 0.1)",
              borderColor: "green.400",
              color: "green.300",
            }}
          >
            {r.name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}
