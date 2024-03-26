import { ChakraProvider, Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/home";

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
  // const location = useLocation();
  // useEffect(() => {
  //   console.log("location changed to " + location.pathname);
  // }, [location]);
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {" "}
          <ChakraProvider>
            <Flex flexDirection="column"></Flex>
            <Box></Box>
            <Heading
              pl="3px"
              fontFamily="'DM Serif Display', sans-serif"
              fontSize="500px"
              fontWeight="400"
              textShadow="2px 2px 2px slategray"
              color="black"
            >
              hello
            </Heading>
            <Routes>
              {" "}
              <Route path="/" element={<Home />} />
            </Routes>
          </ChakraProvider>
        </>{" "}
      </Router>{" "}
    </ApolloProvider>
  );
}

export default App;
