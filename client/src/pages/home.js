import React, { useRef, useState } from "react";
import "./home.css"
import {
  Flex,
  Image,
  Box,
  Card,
  CardBody,
  Text,
  Heading,
  Icon,
  Container,
  Button,
  VStack,
  HStack,
  Tag,
  useBreakpointValue,
  useMediaQuery,
  useQuery,
  Video,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import skeleBro from "../assets/skelebro.gif"
import babyBro from "../assets/babybro.gif"
import bagSpinMp4 from "../assets/SplitBagTest-hevc-safari.mp4"
import bagSpinWebM from "../assets/SplitBagTest-vp9-chrome.webm"

const Home = () => {
  return (
    <Flex alignItems="center">
  <Text as="h1">yeah get this fuckin in ya</Text>
  <Image src={skeleBro} />

  <Box className="fuckinnice">
    <Box className="fuckyeah">
    <video id="myVideo" controls>
            <source src={bagSpinMp4} type="video/mp4" />

            <source src={bagSpinWebM}type="video/webm" />
            Your browser does not support the video tag.
        </video>
      <Text>
        woweee what a fuckin sick{" "}
        <Text as="span" fontWeight="bold" color="blue" fontSize="50px">
          hosting
        </Text>{" "}
        website
      </Text>
    </Box>
  </Box>

  <Image src={babyBro} />
</Flex>
  );
};

export default Home;
