import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import React from "react";


const eventsData = [
  {
    id: 1,
    title: "Park Cleanup",
    time: "9:00 AM to 12:00 PM",
    date: "11/10/2025",
    image: "https://c.animaapp.com/mi8ag1zmhjvnyo/img/image-4.png",
  },
  {
    id: 2,
    title: "Rhys Unior Fundraiser",
    time: "1:00 PM to 4:00 PM",
    date: "11/17/2025",
    image: "https://c.animaapp.com/mi8ag1zmhjvnyo/img/image-5.png",
  },
  {
    id: 3,
    title: "Rhys Unior Kpop Concert",
    time: "7:00 PM to 12:00 AM",
    date: "11/20/2025",
    image: "https://c.animaapp.com/mi8ag1zmhjvnyo/img/image-6.png",
  },
];

export default function MyEventsOrganizer() {
  return (
    <Box bg="white" minH="100vh" data-model-id="16:90">
      <Flex
        as="header"
        justify="space-between"
        align="center"
        p={{ base: 4, md: 6 }}
      >
        <IconButton
          // icon={<IoArrowBack size={32} />} // temporarily removed
          variant="ghost"
          aria-label="Go back"
          size="lg"
          _hover={{ bg: "transparent" }}
          opacity={0}
          transform="translateY(-1rem)"
          animation="fadeIn 1s 0ms ease forwards"
        />

        <Box
          w="69px"
          h="69px"
          borderRadius="full"
          bgImage="url(https://c.animaapp.com/mi8ag1zmhjvnyo/img/shape.png)"
          bgSize="cover"
          bgPosition="center"
          opacity={0}
          transform="translateY(-1rem)"
          animation="fadeIn 1s 100ms ease forwards"
        />
      </Flex>

      <Container
        maxW="1440px"
        px={{ base: 4, md: 6, lg: "175px" }}
        as="main"
      >
        <Box
          mb={12}
          opacity={0}
          transform="translateY(-1rem)"
          animation="fadeIn 1s 200ms ease forwards"
        >
          <Heading
            as="h1"
            fontFamily="Inter, Helvetica"
            fontWeight={700}
            fontSize={{ base: "48px", md: "72px" }}
            letterSpacing="-2.16px"
            lineHeight="120%"
            color="black"
            mb={12}
          >
            My Events
          </Heading>
        </Box>

        <VStack spacing={6} align="stretch">
          {eventsData.map((event, index) => (
            <Card
              key={event.id}
              borderColor="#d9d9d9"
              borderWidth="1px"
              opacity={0}
              transform="translateY(-1rem)"
              animation={`fadeIn 1s ${300 + index * 100}ms ease forwards`}
            >
              <CardBody p={6}>
                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    w={{ base: "100%", md: "171px" }}
                    h="159px"
                    objectFit="cover"
                    borderRadius="md"
                  />

                  <Flex flex={1} direction="column" justify="space-between">
                    <VStack align="stretch" spacing={2} mb={4}>
                      <Heading
                        as="h2"
                        fontFamily="Inter, Helvetica"
                        fontWeight={600}
                        fontSize="24px"
                        letterSpacing="-0.48px"
                        lineHeight="120%"
                        color="#1e1e1e"
                      >
                        {event.title}
                      </Heading>

                      <Text
                        opacity={0.6}
                        fontFamily="Inter, Helvetica"
                        fontWeight={400}
                        fontSize="16px"
                        lineHeight="140%"
                        color="black"
                      >
                        {event.time}
                        <br />
                        {event.date}
                      </Text>
                    </VStack>

                    <HStack spacing={4} flexWrap="wrap">
                      <Button
                        bg="#181c71"
                        color="white"
                        borderRadius="lg"
                        border="1px solid #767676"
                        px={3}
                        py={3}
                        h="auto"
                        _hover={{ bg: "#181c71", opacity: 0.9 }}
                        transition="all 0.2s"
                      >
                        <Text
                          fontFamily="Inter, Helvetica"
                          fontWeight={400}
                          fontSize="16px"
                          lineHeight="100%"
                        >
                          Modify Event
                        </Text>
                      </Button>

                      <Button
                        bg="#181c71"
                        color="white"
                        borderRadius="lg"
                        border="1px solid #767676"
                        px={3}
                        py={3}
                        h="auto"
                        _hover={{ bg: "#181c71", opacity: 0.9 }}
                        transition="all 0.2s"
                      >
                        <Text
                          fontFamily="Inter, Helvetica"
                          fontWeight={400}
                          fontSize="16px"
                          lineHeight="100%"
                        >
                          Send Notification
                        </Text>
                      </Button>

                      <Button
                        bg="#181c71"
                        color="white"
                        borderRadius="lg"
                        border="1px solid #767676"
                        px={3}
                        py={3}
                        h="auto"
                        _hover={{ bg: "#181c71", opacity: 0.9 }}
                        transition="all 0.2s"
                      >
                        <Text
                          fontFamily="Inter, Helvetica"
                          fontWeight={400}
                          fontSize="16px"
                          lineHeight="100%"
                        >
                          Review Applicants
                        </Text>
                      </Button>
                    </HStack>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Container>

      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}
