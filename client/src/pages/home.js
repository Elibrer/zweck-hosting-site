import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_VIDEOS } from "../utils/queries";

import "./Home.css";
import { Flex, Box, Heading, Button } from "@chakra-ui/react";

import bagSpinMp4 from "../assets/SplitBagTest-hevc-safari.mp4";
import bagSpinWebM from "../assets/SplitBagTest-vp9-chrome.webm";
import Auth from "../utils/auth";

import SingleFile from "../components/SingleFile";
import FileUploadButton from "../components/FileUploadButton";

const Home = () => {

if (!Auth.loggedIn()) {
  window.location.assign("/login");
} 

  const [showVideo, setShowVideo] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_USERS_VIDEOS);

  const user = Auth.getProfile().data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetch(); // Fetch data using refetch
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refetch]);

  const handleGetUsersVideos = async (event) => {
    if (loading) {
      console.log("Loading...");
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    if (error) {
      console.error(error);
      return (
        <div>
          <h1>Error...</h1>
        </div>
      );
    }
    try {
      event.preventDefault();

      if (data) {
        console.log(user);
        console.log(data);
        if (data && data.getUsersVideos.length > 0) {
          const usersArrays = data.getUsersVideos.map((item) => item.user);
          console.log(usersArrays);
        } else {
          console.log("No data available or getUsersVideos is empty.");
        }
      } else {
        console.log("Data is still loading...");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleVideo = () => {
    setShowVideo((prevState) => !prevState);
  };

  const userId = Auth.getProfile().data._id;

  const handleFileUpload = (uploadedFile) => {
    console.log("Uploaded file:", uploadedFile);
  };

  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <Flex
        flexDirection="column"
        width="95%"
        minHeight="auto"
        backgroundColor="#364448"
        justifyContent="start"
        borderRadius="2xl"
        alignItems="center"
        pt={8}
        pb={8}
      >
        <Flex alignItems="center" flexDir="column" width="80%">
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            px={50}
          >
            <Heading alignSelf="start" color="#edf2f7">
              Logged in as: {user.username}
            </Heading>
            <FileUploadButton onUpload={handleFileUpload} userId={userId} />
          </Flex>
          <Flex p={30}></Flex>
          <Flex justifyContent="center" flexDirection="column" width="100%">
            <Box>
              <SingleFile data={data} />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
