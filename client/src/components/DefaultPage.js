import React from "react";
import { Link } from "react-router-dom";

import { Flex, Box, Heading, Text, Card, Divider } from "@chakra-ui/react";

const DefaultPage = () => {
  return (
    <Card width="80%">
      <Flex justifyContent="center" alignItems="center" flexDir="column" p={5}>
        <Heading>Welcome to our site!</Heading>
        <Text p={3}>
          Zweck Hosting redefines the paradigm of online video hosting by
          offering cutting-edge solutions that empower creators to showcase
          their vision with unparalleled clarity. Our platform not only provides
          seamless video hosting but also preserves the full alpha channel
          properties, unlocking limitless creative possibilities. Whether you're
          a filmmaker, animator, or designer, Zweck Hosting offers a
          comprehensive suite of tools and services tailored to meet your needs.
          With a commitment to innovation, reliability, and user satisfaction,
          Zweck Hosting is your ultimate destination for unleashing the full
          potential of your video content in the digital sphere.
        </Text>
        <Divider borderColor="#dd6b20" borderWidth="2px"></Divider>
        <Text p={3}>Please log in to access the full features.</Text>
        <Link to="/login">
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
          >
            Log in
          </button>
        </Link>
      </Flex>
    </Card>
  );
};

export default DefaultPage;
