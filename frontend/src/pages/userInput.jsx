import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import InputUser from "../assets/inputUserComponent.jsx";

export default function inputUserPage() {
  return (
    <Box p={6} maxW="720px" mx="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Test Page
      </Heading>
      <InputUser />
    </Box>
  );
}