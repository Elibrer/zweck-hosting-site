import React, { useEffect } from "react";
import "./App.css";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { useLocation, Route, Routes } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header"
import NotFound from "./pages/404"
import Home from "./pages/Home";
import Signup from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm"

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log("location changed to " + location.pathname);
  }, [location]);

  return (
    <ApolloProvider client={client}>
      <div>
        <ChakraProvider>
          <Flex flexDirection="column"       backgroundColor="#1e272a"
          minH="100vh"
>
          <Header />

            <Box flex="1" zIndex="1">

            <Routes>
              <Route path="/*" element={<NotFound />} />
              <Route path ="/" element={<Home />} />
              <Route path ="/Signup" element={<Signup />} />
              <Route path ="/Login" element={<LoginForm />} />
             

              
              </Routes>
            </Box>
          </Flex>
        </ChakraProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
