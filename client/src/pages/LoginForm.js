import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Box,
  Stack,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function LoginForm() {
  const location = useLocation();

  useEffect(() => {
    if (Auth.loggedIn()) {
      // If user is already logged in, redirect to homepage
      window.location.assign("/");
    }
  }, []);

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
  // handles form change for login
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

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
            Log In{" "}
          </Heading>
        </Stack>
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Stack
            spacing={4}
            p={4}
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            {" "}
            onSubmit={handleFormSubmit}
            <FormControl id="email" mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
            </FormControl>
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
              Log in
            </button>
            {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error.message}
            </Alert>
          )}
          <Link
            to="/Signup"
            style={{
              textDecoration: "underline",
              fontSize: "10px",
              textAlign: "center",
              color: "#1e272a",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            isActive={location.pathname === "/Signup"}
          >
            New here? Go to signup
          </Link>
          </Stack>

          
        </Box>
      </Flex>
    </Flex>
  );
}

export default LoginForm;
