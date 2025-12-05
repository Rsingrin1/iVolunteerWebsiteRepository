import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function InputUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // backend expects { username, email, hash }
        body: JSON.stringify({ username, hash: password}),
      });
      //skipped a lot of stuff here when i copied code from VolunteerSignUp
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6} maxW="720px" mx="auto">
        <Heading as="h2" size="lg" mb={6} textAlign="center">
        </Heading>
        <Box p={6} maxW="480px" mx="auto">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
            Login
        </Heading>

        {message && (
            <Alert status="success" mb={4} borderRadius="md">
            <AlertIcon />
            <Text>{message}</Text>
            </Alert>
        )}

        {error && (
            <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            <Text>{error}</Text>
            </Alert>
        )}

        <VStack as="form" spacing={4} onSubmit={handleSubmit}>
            <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                bg="white"
            />
            </FormControl>

            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                bg="white"
            />
            </FormControl>

            <Button type="submit" isLoading={loading} w="full" colorScheme="blue">
            Submit
            </Button>
        </VStack>
        </Box>
    </Box>
    );
}