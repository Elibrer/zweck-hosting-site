import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { ChakraProvider, Box, Flex, Heading } from "@chakra-ui/react";

import VideoList from "../components/VideoList";
import Login from "./LoginForm";
import Signup from "./SignupForm";
import DefaultPage from "../components/DefaultPage";

const Home = () => {
  const isLoggedIn = Auth.loggedIn();

  return (
    <>
      <Flex width="100%" justifyContent="center" alignItems="center">
        <Flex
          flexDirection="column"
          width="95%"
          minHeight="100vh"
          backgroundColor="#364448"
          justifyContent="start"
          borderRadius="2xl"
          alignItems="center"
          pt={8}
          pb={8}
        >
          {isLoggedIn ? <VideoList /> : <DefaultPage />}
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
