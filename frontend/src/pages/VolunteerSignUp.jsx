import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import BackArrow from "../assets/backArrow";

const formFields = [
  { id: "email", label: "Email", type: "email", placeholder: "Value" },
  { id: "username", label: "Username", type: "text", placeholder: "Value" },
  { id: "password", label: "Password", type: "password", placeholder: "Value" },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Value",
  },
];

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function VolunteerSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const { email, username, password, confirmPassword } = formData;

    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // backend expects { username, email, hash }
        body: JSON.stringify({ username, email, hash: password, userType: "volunteer"}),
      });

      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch {
          // ignore parse error, keep data = null
        }
      }

      if (!res.ok) {
        setError(
          (data && (data.message || data.errorMessage)) ||
          `Request failed with status ${res.status}`
        );
      } else {
        setMessage((data && data.message) || "User created successfully.");
        setFormData({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#1f49b6"
      boxSizing="border-box"
    >
  <Container maxW="container.md" position="relative" px={4}>
        {/* Page Title */}
        <VStack spacing={8} mb={8}>
          <VStack spacing={2}>
            <Heading
              as="h1"
              color="white"
              fontSize="72px"
              fontWeight="700"
              textAlign="center"
              letterSpacing="-2.16px"
              lineHeight="1.2"
            >
              Volunteer Sign Up
            </Heading>

            <Text
              color="#a09b9b"
              fontSize="32px"
              fontWeight="400"
              textAlign="center"
              lineHeight="1.2"
            >
              Create your volunteer account
            </Text>
          </VStack>
        </VStack>

        {/* Back Button */}
        <BackArrow/>

        {/* Registration Form Card */}
        <Box display="flex" justifyContent="center">
          <Card
            maxW="444px"
            w="full"
            borderWidth="1px"
            borderColor="#d9d9d9"
            bg="white"
            boxShadow="none"
          >
            <CardBody p={6}>
              {/* Alerts */}
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

              <VStack as="form" spacing={6} onSubmit={handleSubmit}>
                {formFields.map((field) => (
                  <FormControl key={field.id}>
                    <FormLabel
                      htmlFor={field.id}
                      fontSize="16px"
                      fontWeight="400"
                      color="#1e1e1e"
                      lineHeight="1.4"
                    >
                      {field.label}
                    </FormLabel>
                    <Input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      minW="0"
                      w="100%"
                      px={4}
                      py={3}
                      bg="white"
                      borderRadius="lg"
                      borderColor="#d9d9d9"
                      fontSize="16px"
                      fontWeight="400"
                      color="#1e1e1e"
                      lineHeight="1"
                      _placeholder={{ color: "#b3b3b3" }}
                      value={formData[field.id]}
                      onChange={handleChange}
                    />
                  </FormControl>
                ))}

                <Button
                  type="submit"
                  w="full"
                  h="auto"
                  p={3}
                  bg="#2c2c2c"
                  color="white"
                  borderRadius="lg"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="1"
                  _hover={{ bg: "#2c2c2c", opacity: 0.9 }}
                  isLoading={loading}
                  transition="all 0.2s"
                >
                  Register
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
