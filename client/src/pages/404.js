
import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import "@fontsource/nunito-sans"; // Import Nunito Sans font

const NotFound = () => {

    const handleHomePress = function() {
        window.location.assign("/");
    }

  return (
    <Center h="100vh">
      <Container textAlign="center">
        <Heading size="2xl" mb="4">
          404
        </Heading>
        <Heading size="lg" mb="4">
          UH OH! You're lost.
        </Heading>
        <Text mb="4">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </Text>
        <Button colorScheme="blackAlpha" size="lg" onClick={handleHomePress}>
          HOME
        </Button>
      </Container>
    </Center>
  );
};

export default NotFound;