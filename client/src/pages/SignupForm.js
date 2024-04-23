import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  InputRightElement,
  InputGroup,
  useToast,
  Spinner,
  ChakraProvider,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function Signup() {
  const location = useLocation();

  useEffect(() => {
    if (Auth.loggedIn()) {
      // If user is already logged in, redirect to homepage
      window.location.assign("/");
    }
  }, []);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toast = useToast();

  useEffect(() => {
    if (Auth.loggedIn()) {
      const handleToast = () => {
        toast({
          title: "Already logged in!",
          description: "Already logged in!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "middle",
        });
      };
      setTimeout(() => {}, 3000);

      // If user is already logged in, redirect to homepage
      window.location.assign("/");
    }
  }, []);

  const [loggingIn, setLoggingIn] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);
  // handles form submit for signup
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const handleToast = () => {
      toast({
        title: "Account created.",
        description: "Logging you in...",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    };
    setLoggingIn(true);

    try {
      const { data } = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = data.addUser.token;
      console.log(token)
      Auth.login(token);
      handleToast();
      setTimeout(() => {
        Auth.login(data.addUser.token);
      }, 3000);
    } catch (e) {
      console.error(e);
    }
  };
  // handles form change for signup
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handlePageChange = (event) => {};

  return (
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
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="#F1F7EE" fontSize={["xl", "2xl", "3xl"]}>
            Sign Up
          </Heading>
        </Stack>
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
                    <form onSubmit={handleFormSubmit}>

          <Stack
            spacing={4}
            p={4}
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formState.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
            </FormControl>

            {loggingIn ? (
              <Flex justifyContent="center" alignItems="center ">
                <Spinner color="teal.500" size="xl" />
              </Flex>
            ) : null}
            <button
              style={{
                backgroundColor: "#1e272a",
                color: "#dd6b20",
                padding: "8px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1em",
                letterSpacing: "2px",
                fontWeight: "bold",
                border: "none",
                transition: "background-color 0.2s ease",
              }}
              type="submit"
              onClick={handleFormSubmit}
            >
              Sign up
            </button>
            <Link
              to="/Login"
              style={{
                textDecoration: "underline",
                fontSize: "10px",
                textAlign: "center",
                color: "#1e272a",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              isActive={location.pathname === "/Login"}
            >
              Already signed up? Go to log in
            </Link>
            {error && <Text color="red.500">{error.message}</Text>}
          </Stack>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Signup;
