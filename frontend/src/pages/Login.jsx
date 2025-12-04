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

    //tutorial - persist logged in user
    //https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/

    //setLoading(true);

    /* //leftover from copying from userInput.jsx
    //how to check credentials for login?
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, hash: password }),
      });

      // Safely handle responses that may be empty or not JSON
      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch (err) {
          // ignore parse errors, data stays null
        }
      }

      if (!res.ok) {
        setError((data && (data.message || data.errorMessage)) || `Request failed with status ${res.status}`);
      } else {
        setMessage((data && data.message) || "User created successfully.");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }*/

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