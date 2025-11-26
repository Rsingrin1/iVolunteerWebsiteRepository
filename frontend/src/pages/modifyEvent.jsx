import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Textarea,
  VStack,
  HStack,
  Stack,
  SimpleGrid,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";


const sectionData = [
  { title: "Time & Location" },
  { title: "Forms" },
  { title: "Notifications" },
];

export default function ModifyEvent() {
  return (
    <Box bg="white" minH="100vh" w="full">
      {/* Header / Back */}
      <Box as="header" w="full" p={6}>
        <IconButton
          aria-label="Go back"
          icon={
            <Box as="span" fontSize="40px">
              ←
            </Box>
          }
          variant="ghost"
          size="lg"
          w="auto"
          h="auto"
          minW="auto"
          p={0}
        />
      </Box>

      <Container maxW="6xl" pb={10}>
        <VStack spacing={12} w="full">
          {/* Page Title */}
          <Heading
            as="h1"
            size="xl"
            textAlign="center"
            fontFamily="'Roboto', Helvetica"
            fontWeight={600}
            fontSize="40px"
            lineHeight="48px"
            color="black"
          >
            Modify Event
          </Heading>

          {/* Description Section */}
          <Box w="full">
            <Heading
              as="h2"
              size="lg"
              mb={8}
              fontFamily="'Lato', Helvetica"
              fontWeight={700}
              fontSize="32px"
              color="black"
            >
              Description
            </Heading>

            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
              <Box
                bg="#ece6f0"
                borderRadius="20px"
                boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                p={6}
              >
                <VStack spacing={6} align="stretch">
                  {/* Title */}
                  <FormControl>
                    <FormLabel
                      fontFamily="'Inter', Helvetica"
                      fontWeight={400}
                      fontSize="16px"
                      color="#1e1e1e"
                    >
                      Title
                    </FormLabel>
                    <Input
                      placeholder="name your event"
                      bg="#e6e6e6"
                      borderColor="#d9d9d9"
                      fontFamily="'Inter', Helvetica"
                      fontSize="16px"
                    />
                  </FormControl>

                  {/* Description */}
                  <FormControl>
                    <FormLabel
                      fontFamily="'Inter', Helvetica"
                      fontWeight={400}
                      fontSize="16px"
                      color="#1e1e1e"
                    >
                      Description
                    </FormLabel>
                    <Box position="relative">
                      <Textarea
                        placeholder="Describe your event"
                        minH="80px"
                        resize="none"
                        bg="#e6e6e6"
                        borderColor="#d9d9d9"
                        fontFamily="'Inter', Helvetica"
                        fontSize="16px"
                      />
                      <Image
                        src="https://c.animaapp.com/mifbvir6JSInmQ/img/drag.svg"
                        alt="Drag"
                        w="7px"
                        h="7px"
                        position="absolute"
                        right={2}
                        bottom={2}
                      />
                    </Box>
                  </FormControl>

                  {/* Upload Image */}
                  <FormControl>
                    <FormLabel
                      fontFamily="'Inter', Helvetica"
                      fontWeight={400}
                      fontSize="18px"
                      color="#1e1e1e"
                    >
                      Upload Image
                    </FormLabel>
                    <IconButton
                      aria-label="Upload image"
                      variant="ghost"
                      size="lg"
                      w="48px"
                      h="48px"
                      p={0}
                      _hover={{ bg: "transparent" }}
                      icon={
                        <Box as="span" fontSize="40px">
                          +
                        </Box>
                      }
                    />
                  </FormControl>
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Other Sections */}
          {sectionData.map((section) => (
            <Box key={section.title} w="full">
              <Box
                as="hr"
                my={8}
                h="5px"
                bg="#d9d9d9"
                borderRadius="999px"
              />

              <Heading
                as="h2"
                size="lg"
                mb={8}
                fontFamily="'Lato', Helvetica"
                fontWeight={700}
                fontSize="32px"
                color="black"
              >
                {section.title}
              </Heading>

              {/* Time & Location */}
              {section.title === "Time & Location" && (
                <Stack spacing={8}>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {/* Date Card */}
                    <Box
                      bg="#f5f1ff"
                      borderRadius="28px"
                      borderWidth="1px"
                      borderColor="#cac4d0"
                      overflow="hidden"
                    >
                      <Box
                        borderBottomWidth="1px"
                        borderColor="#cac4d0"
                        p={6}
                      >
                        <VStack align="stretch" spacing={4}>
                          <Text
                            fontSize="14px"
                            fontWeight={500}
                            color="#625b71"
                            fontFamily="'Inter', Helvetica"
                          >
                            Select date
                          </Text>
                          <HStack justify="space-between">
                            <Text
                              fontSize="20px"
                              fontWeight={500}
                              color="#1c1b1f"
                            >
                              Enter date
                            </Text>
                            <IconButton
                              aria-label="Open date picker"
                              variant="ghost"
                              size="sm"
                              icon={
                                <Image
                                  src="https://c.animaapp.com/mifbvir6JSInmQ/img/icon-1.svg"
                                  alt="Calendar icon"
                                  w="24px"
                                  h="24px"
                                />
                              }
                            />
                          </HStack>
                        </VStack>
                      </Box>

                      <Box p={6}>
                        <FormControl position="relative">
                          <FormLabel
                            position="absolute"
                            top="-12px"
                            left="12px"
                            px={1}
                            bg="#f5f1ff"
                            fontSize="12px"
                            color="#6750a4"
                          >
                            Date
                          </FormLabel>
                          <Input
                            placeholder="mm/dd/yyyy"
                            h="56px"
                            borderWidth="2px"
                            borderColor="#6750a4"
                            bg="white"
                            fontFamily="'Inter', Helvetica"
                          />
                        </FormControl>
                      </Box>
                    </Box>

                    {/* Time Card */}
                    <Box
                      bg="#f5f1ff"
                      borderRadius="28px"
                      borderWidth="1px"
                      borderColor="#cac4d0"
                      p={6}
                    >
                      <VStack align="stretch" spacing={5}>
                        <Text
                          fontSize="14px"
                          fontWeight={500}
                          color="#625b71"
                        >
                          Enter time
                        </Text>

                        <HStack align="flex-start" spacing={3}>
                          {/* Hour */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              gap={1}
                              px={4}
                              py={2}
                              bg="#eaddff"
                              borderRadius="lg"
                              borderWidth="2px"
                              borderColor="#6750a4"
                            >
                              <Text fontSize="32px" fontWeight="600">
                                20
                              </Text>
                              <Box w="2px" h="42px" bg="#6750a4" />
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#625b71"
                              textAlign="center"
                            >
                              Hour
                            </Text>
                          </VStack>

                          {/* colon */}
                          <Flex
                            align="center"
                            justify="center"
                            h="72px"
                            w="24px"
                          >
                            <Text fontSize="40px">:</Text>
                          </Flex>

                          {/* Minutes */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              px={4}
                              py={2}
                              bg="#f5f1ff"
                              borderRadius="lg"
                            >
                              <Text fontSize="32px" fontWeight="600">
                                00
                              </Text>
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#625b71"
                              textAlign="center"
                            >
                              Minute
                            </Text>
                          </VStack>

                          {/* AM / PM */}
                          <Box
                            w="52px"
                            h="72px"
                            borderRadius="lg"
                            overflow="hidden"
                            borderWidth="1px"
                            borderColor="#79747e"
                          >
                            <Flex
                              h="50%"
                              align="center"
                              justify="center"
                              bg="#e8def8"
                              borderBottomWidth="1px"
                              borderColor="#79747e"
                            >
                              <Text fontSize="14px" fontWeight="500" color="#381e72">
                                AM
                              </Text>
                            </Flex>
                            <Flex
                              h="50%"
                              align="center"
                              justify="center"
                            >
                              <Text
                                fontSize="14px"
                                fontWeight="500"
                                color="#625b71"
                              >
                                PM
                              </Text>
                            </Flex>
                          </Box>
                        </HStack>

                        <Flex justify="flex-start">
                          <IconButton
                            aria-label="More time options"
                            variant="ghost"
                            borderRadius="full"
                            icon={
                              <Image
                                src="https://c.animaapp.com/mifbvir6JSInmQ/img/icon.svg"
                                alt="Clock icon"
                                w="24px"
                                h="24px"
                              />
                            }
                          />
                        </Flex>
                      </VStack>
                    </Box>

                    {/* Duration Card */}
                    <Box
                      bg="#f5f1ff"
                      borderRadius="28px"
                      borderWidth="1px"
                      borderColor="#cac4d0"
                      p={6}
                    >
                      <VStack align="stretch" spacing={5}>
                        <Text
                          fontSize="14px"
                          fontWeight={500}
                          color="#625b71"
                        >
                          Enter Duration
                        </Text>

                        <HStack align="flex-start" spacing={3}>
                          {/* Hour */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              gap={1}
                              px={4}
                              py={2}
                              bg="#eaddff"
                              borderRadius="lg"
                              borderWidth="2px"
                              borderColor="#6750a4"
                            >
                              <Text fontSize="32px" fontWeight="600">
                                20
                              </Text>
                              <Box w="2px" h="42px" bg="#6750a4" />
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#625b71"
                              textAlign="center"
                            >
                              Hour
                            </Text>
                          </VStack>

                          {/* colon */}
                          <Flex
                            align="center"
                            justify="center"
                            h="72px"
                            w="24px"
                          >
                            <Text fontSize="40px">:</Text>
                          </Flex>

                          {/* Minutes */}
                          <VStack spacing={2} flex="1">
                            <Flex
                              h="72px"
                              w="full"
                              align="center"
                              justify="center"
                              px={4}
                              py={2}
                              bg="#f5f1ff"
                              borderRadius="lg"
                            >
                              <Text fontSize="32px" fontWeight="600">
                                00
                              </Text>
                            </Flex>
                            <Text
                              fontSize="12px"
                              color="#625b71"
                              textAlign="center"
                            >
                              Minute
                            </Text>
                          </VStack>
                        </HStack>

                        <Flex justify="flex-start">
                          <IconButton
                            aria-label="More duration options"
                            variant="ghost"
                            borderRadius="full"
                            icon={
                              <Image
                                src="https://c.animaapp.com/mifbvir6JSInmQ/img/icon.svg"
                                alt="Clock icon"
                                w="24px"
                                h="24px"
                              />
                            }
                          />
                        </Flex>
                      </VStack>
                    </Box>
                  </SimpleGrid>

                  {/* Location */}
                  <Box maxW="lg" mt={4}>
                    <FormControl>
                      <FormLabel
                        fontFamily="'Inter', Helvetica"
                        fontWeight={400}
                        fontSize="20px"
                        color="#1e1e1e"
                      >
                        Location
                      </FormLabel>
                      <Input
                        placeholder="Address"
                        bg="#e6e6e6"
                        borderColor="#d9d9d9"
                        borderWidth="1.6px"
                        borderRadius="10px"
                        px="24px"
                        py="18px"
                        fontFamily="'Inter', Helvetica"
                        fontSize="18px"
                      />
                    </FormControl>
                  </Box>
                </Stack>
              )}

              {/* Forms */}
              {section.title === "Forms" && (
                <Box
                  maxW="331px"
                  bg="#ece6f0"
                  borderRadius="20px"
                  boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                  p={6}
                >
                  <VStack align="stretch" spacing={6}>
                    <FormControl>
                      <FormLabel
                        fontFamily="'Inter', Helvetica"
                        fontWeight={400}
                        fontSize="18px"
                        color="#1e1e1e"
                      >
                        Upload Volunteer Forms
                      </FormLabel>
                      <IconButton
                        aria-label="Upload forms"
                        variant="ghost"
                        size="lg"
                        w="48px"
                        h="48px"
                        p={0}
                        _hover={{ bg: "transparent" }}
                        icon={
                          <Box as="span" fontSize="40px">
                            📄
                          </Box>
                        }
                      />
                    </FormControl>

                    <Image
                      src="https://c.animaapp.com/mifbvir6JSInmQ/img/group-42.png"
                      alt="Forms preview"
                      w="full"
                    />
                  </VStack>
                </Box>
              )}

              {/* Notifications */}
              {section.title === "Notifications" && (
                <Stack spacing={6}>
                  {/* Notification Message */}
                  <Box
                    maxW="323px"
                    bg="#ece6f0"
                    borderRadius="20px"
                    boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
                    p={6}
                  >
                    <FormControl>
                      <FormLabel
                        fontFamily="'Inter', Helvetica"
                        fontWeight={400}
                        fontSize="16px"
                        color="#1e1e1e"
                      >
                        Notification Message
                      </FormLabel>
                      <Box position="relative">
                        <Textarea
                          placeholder="Describe your event"
                          minH="80px"
                          resize="none"
                          bg="#e6e6e6"
                          borderColor="#d9d9d9"
                          fontFamily="'Inter', Helvetica"
                          fontSize="16px"
                        />
                        <Image
                          src="https://c.animaapp.com/mifbvir6JSInmQ/img/drag.svg"
                          alt="Drag"
                          w="7px"
                          h="7px"
                          position="absolute"
                          right={2}
                          bottom={2}
                        />
                      </Box>
                    </FormControl>
                  </Box>

                  {/* When to send notification */}
                  <Box
                    maxW="328px"
                    bg="#f5f1ff"
                    borderRadius="28px"
                    borderWidth="1px"
                    borderColor="#cac4d0"
                    p={6}
                  >
                    <VStack align="stretch" spacing={5}>
                      <Text
                        fontSize="14px"
                        fontWeight={500}
                        color="#625b71"
                      >
                        Send notification how long before event?
                      </Text>

                      <HStack align="flex-start" spacing={3}>
                        {/* Hour */}
                        <VStack spacing={2} flex="1">
                          <Flex
                            h="72px"
                            w="full"
                            align="center"
                            justify="center"
                            gap={1}
                            px={4}
                            py={2}
                            bg="#eaddff"
                            borderRadius="lg"
                            borderWidth="2px"
                            borderColor="#6750a4"
                          >
                            <Text fontSize="32px" fontWeight="600">
                              00
                            </Text>
                            <Box w="2px" h="42px" bg="#6750a4" />
                          </Flex>
                          <Text
                            fontSize="12px"
                            color="#625b71"
                            textAlign="center"
                          >
                            Hour
                          </Text>
                        </VStack>

                        {/* colon */}
                        <Flex
                          align="center"
                          justify="center"
                          h="72px"
                          w="24px"
                        >
                          <Text fontSize="40px">:</Text>
                        </Flex>

                        {/* Minutes */}
                        <VStack spacing={2} flex="1">
                          <Flex
                            h="72px"
                            w="full"
                            align="center"
                            justify="center"
                            px={4}
                            py={2}
                            bg="#f5f1ff"
                            borderRadius="lg"
                          >
                            <Text fontSize="32px" fontWeight="600">
                              30
                            </Text>
                          </Flex>
                          <Text
                            fontSize="12px"
                            color="#625b71"
                            textAlign="center"
                          >
                            Minute
                          </Text>
                        </VStack>
                      </HStack>

                      <Flex justify="flex-start">
                        <IconButton
                          aria-label="More notification options"
                          variant="ghost"
                          borderRadius="full"
                          icon={
                            <Image
                              src="https://c.animaapp.com/mifbvir6JSInmQ/img/icon.svg"
                              alt="Bell icon"
                              w="24px"
                              h="24px"
                            />
                          }
                        />
                      </Flex>
                    </VStack>
                  </Box>
                </Stack>
              )}
            </Box>
          ))}

          {/* Submit Button */}
          <Button
            px="54px"
            py="40px"
            h="auto"
            bg="#171b70"
            borderRadius="22px"
            boxShadow="inset 0px -2px 2px 2px rgba(51, 34, 170, 0.25), inset 0px 2px 2px 2px rgba(255, 255, 255, 0.25), inset 0px 0px 0px 2px #4834d4, 0px 2px 4px rgba(19, 13, 61, 0.25)"
            _hover={{ bg: "#1a1f7a" }}
          >
            <Box
              as="span"
              fontFamily="'Lato', Helvetica"
              fontWeight="bold"
              color="white"
              fontSize="32px"
              lineHeight="32px"
            >
              Submit
            </Box>
          </Button>
        </VStack>
      </Container>
    </Box>
    
  );
}
