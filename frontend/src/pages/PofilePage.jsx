import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <Box bg="white" minH="100vh" w="full">
      <Box as="header" w="full" p={6}>
        <IconButton
          aria-label="Go back"
          icon={<Box as="span" fontSize="40px">←</Box>}
          variant="ghost"
          size="lg"
          w="auto"
          h="auto"
          minW="auto"
          p={0}
        />
      </Box>

      <Container maxW="md" centerContent pb={8}>
        <VStack spacing={8} w="full" px={4}>
          <VStack spacing={4}>
            <Avatar
              size="2xl"
              src="https://c.animaapp.com/mi89fn69ZHusC2/img/shape.png"
              name="Mary Sue"
              w="242.3px"
              h="242.3px"
            />

            <Heading
              as="h1"
              size="xl"
              fontFamily="'Roboto', Helvetica"
              fontWeight={500}
              fontSize="32px"
              lineHeight="40px"
              textAlign="center"
              color="black"
            >
              Mary Sue
            </Heading>
          </VStack>

          <VStack spacing={6} w="full">
            <FormControl>
              <FormLabel
                fontFamily="'Inter', Helvetica"
                fontWeight={400}
                fontSize="16px"
                lineHeight="140%"
                color="#1e1e1e"
              >
                Bio
              </FormLabel>
              <Textarea
                defaultValue="A little bit about my self yada yada yada"
                minH="80px"
                fontFamily="'Inter', Helvetica"
                fontWeight={400}
                fontSize="16px"
                lineHeight="140%"
                color="#1e1e1e"
                resize="none"
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontFamily="'Inter', Helvetica"
                fontWeight={400}
                fontSize="16px"
                lineHeight="140%"
                color="#1e1e1e"
              >
                Phone Number
              </FormLabel>
              <Input
                type="tel"
                defaultValue="000-000-000"
                fontFamily="'Inter', Helvetica"
                fontWeight={400}
                fontSize="16px"
                lineHeight="100%"
                color="#1e1e1e"
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontFamily="'Inter', Helvetica"
                fontWeight={400}
                fontSize="16px"
                lineHeight="140%"
                color="#1e1e1e"
              >
                Email
              </FormLabel>
              <Input
                type="email"
                defaultValue="test@gmail.com"
                fontFamily="'Inter', Helvetica"
                fontWeight={400}
                fontSize="16px"
                lineHeight="100%"
                color="#1e1e1e"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel
                htmlFor="notifications"
                mb={0}
                flex={1}
                fontFamily="'Inter', Helvetica"
                fontWeight={400}
                fontSize="16px"
                lineHeight="140%"
                color="#1e1e1e"
              >
                Receive Notifications
              </FormLabel>
              <Switch id="notifications" />
            </FormControl>
          </VStack>

          <Button
            px="34.87px"
            py="26.15px"
            h="auto"
            bg="#171b70"
            borderRadius="14.53px"
            boxShadow="inset 0px -1.45px 1.45px 1.45px rgba(51, 34, 170, 0.25), inset 0px 1.45px 1.45px 1.45px rgba(255, 255, 255, 0.25), inset 0px 0px 0px 1.45px #4834d4, 0px 1.45px 2.91px rgba(19, 13, 61, 0.25)"
            _hover={{
              bg: "#1f2380",
            }}
            transition="background 0.2s"
          >
            <Box
              as="span"
              fontFamily="'Lato', Helvetica"
              fontWeight="bold"
              color="white"
              fontSize="20.3px"
              lineHeight="20.3px"
            >
              Save Changes
            </Box>
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
