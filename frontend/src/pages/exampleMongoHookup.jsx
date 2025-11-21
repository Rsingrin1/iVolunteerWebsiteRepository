import React, { useState } from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";

export default function SimpleForm() {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted value:", text);
    // Here you can send 'text' to your backend API to save in MongoDB
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#1f49b6"
      p={6}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
        minW="300px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" colorScheme="blue" w="full">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
