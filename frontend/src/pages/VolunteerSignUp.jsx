import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

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

export default function VolunteerSignUp() {
  return (
    <Box
      minH="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#1f49b6"
      p={6}
    >
      <Container maxW="1550px" position="relative">
        
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
        <IconButton
          position="absolute"
          top={0}
          left={0}
          w="79px"
          h="79px"
          variant="ghost"
          colorScheme="whiteAlpha"
          aria-label="Go back"
          icon={
            <Box as="span" fontSize="32px" color="white">
              ←
            </Box>
          }
          _hover={{ bg: "whiteAlpha.100" }}
        />

        {/* Registration Form */}
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
              <VStack as="form" spacing={6}>
                
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
                      type={field.type}
                      placeholder={field.placeholder}
                      minW="240px"
                      px={4}
                      py={3}
                      bg="white"
                      borderRadius="lg"
                      borderColor="#d9d9d9"
                      fontSize="16px"
                      fontWeight="400"
                      color="#b3b3b3"
                      lineHeight="1"
                      _placeholder={{ color: "#b3b3b3" }}
                    />
                  </FormControl>
                ))}

                {/* Submit Button */}
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
