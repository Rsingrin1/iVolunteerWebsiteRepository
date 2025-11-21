import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import Profile from "../assets/profileMenu"; // adjust path if needed

export default function TestPage() {
  const handleLogout = () => {
    console.log("Logout clicked!");
    // You can add real logout logic here
  };

  return (
    <Box minH="100vh" bg="#f0f0f0" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading size="lg">Test Profile Component</Heading>
        <Profile
          userName="Rhys Singrin"
          profilePic="https://bit.ly/dan-abramov"
          onLogout={handleLogout}
        />
      </Flex>

      <Box>
        <p>
          This is a test page. Click on the avatar in the top right to see the
          dropdown menu.
        </p>
      </Box>
    </Box>
  );
}
