import { ArrowLeftIcon } from "lucide-react";
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

export const Volunteer = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#1f49b6"
      p={6}
      data-model-id="16:8"
    >
      <Container maxW="1550px" position="relative">
        <VStack spacing={8} mb={8}>
          <VStack
            spacing={2}
            opacity={0}
            transform="translateY(-1rem)"
            animation="fade-in 1s 0ms ease forwards"
          >
            <Heading
              as="h1"
              color="white"
              fontSize="72px"
              fontWeight="700"
              textAlign="center"
              letterSpacing="-2.16px"
              lineHeight="1.2"
            >
              iVolunteer
            </Heading>

            <Text
              color="#a09b9b"
              fontSize="32px"
              fontWeight="400"
              textAlign="center"
              lineHeight="1.2"
            >
              Register
            </Text>
          </VStack>
        </VStack>

        <IconButton
          position="absolute"
          top={0}
          left={0}
          w="79px"
          h="79px"
          variant="ghost"
          colorScheme="whiteAlpha"
          aria-label="Go back"
          icon={<ArrowLeftIcon size={32} color="white" />}
          opacity={0}
          transform="translateY(-1rem)"
          animation="fade-in 1s 200ms ease forwards"
          _hover={{ bg: "whiteAlpha.100" }}
        />

        <Box
          display="flex"
          justifyContent="center"
          opacity={0}
          transform="translateY(-1rem)"
          animation="fade-in 1s 400ms ease forwards"
        >
          <Card maxW="444px" w="full" borderColor="#d9d9d9">
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

                <Button
                  type="submit"
                  w="full"
                  h="auto"
                  p={3}
                  bg="#2c2c2c"
                  color="neutral.100"
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
};