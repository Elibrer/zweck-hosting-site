import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Flex,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { GET_USERS_VIDEOS } from "../utils/queries";
import { DELETE_VIDEO } from "../utils/mutations";
import Auth from "../utils/auth";
import moment from "moment";

import {
  BsPlayCircleFill,
  BsXCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

// this component is to display all posts
const SingleFile = ({ data, refetch }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const [showVideoIndex, setShowVideoIndex] = useState(null);

  const [deleteVideo] = useMutation(DELETE_VIDEO);

  const videos = data?.getUsersVideos || [];

  const videoPaths = videos.map(
    (video) => "http://localhost:3001/" + video.videoPath
  );


  const toast = useToast();

  const deleteToast = () => {
    const deleteToast = toast({
      status: "warning",
      duration: 9000,
      isClosable: true,
      position: "top",
      title: "Video Deleted",
      description: "Video has been deleted successfully",
      color: "red",
    });

    refetch();
  };

  const onButtonPress = () => {
    console.log(videos);
    console.log(videoPaths);
  };
  const toggleVideo = (index) => {
    setShowVideoIndex((prevIndex) => (prevIndex === index ? null : index));
    setButtonPressed((prevIndex) => (prevIndex === index ? null : index)); // Toggle the button state
  };

  const handleDeleteVideo = (video) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    deleteVideo({
      variables: { videoId: video._id },
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    deleteToast();
  };

  const loggedInUsername = Auth.loggedIn()
    ? Auth.getProfile().data.username
    : null;

  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Box>

      {videos.length ? (
        <SimpleGrid columns={1} spacing={1}>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex width="40%">
              <Text color="#dd6b20" fontStyle="bolder" fontSize="1.6em">
                Video Name
              </Text>
            </Flex>
            <Box width="10%"></Box>

            <Flex width="40%">
              <Text color="#dd6b20" fontStyle="bolder" fontSize="1.6em">
                Date Uploaded
              </Text>
            </Flex>
            <Flex width="10%"></Flex>
          </Flex>
          {videos.map((video, index) => (
            <Box
              key={video._id}
              color="orange.500"
              textAlign="left"
              id="posts-card"
            >
              <Divider />

              <Flex alignItems="center" justifyContent="space-between">
                <Box width="40%">
                  {/* Title Heading */}

                  <Text fontSize="1rem">{video.videoName}</Text>
                </Box>
                <Box width="10%"></Box>

                <Box width="40%">
                  {/* Title Heading */}

                  <Text fontSize="1rem">
                    {moment(new Date(parseInt(video.dateUploaded))).format(
                      "DD/MM/YYYY"
                    )}
                  </Text>
                </Box>
                <Button
                  backgroundColor="#364448"
                  width="5%"
                  onClick={() => toggleVideo(index)}
                >
                  {/* Toggle the icon based on the pressed button */}
                  {buttonPressed === index ? (
                    <BsXCircleFill style={{ color: "#dd6b20" }} />
                  ) : (
                    <BsPlayCircleFill style={{ color: "#dd6b20" }} />
                  )}
                </Button>
                <Button
                  backgroundColor="#364448"
                  width="5%"
                  onClick={() => handleDeleteVideo(video)}
                >
                  <BsFillTrashFill style={{ color: "#dd6b20" }} />
                </Button>
              </Flex>
              {showVideoIndex === index && (
                <Flex alignItems="center" justifyContent="center">
                  <video
                    id="myVideo"
                    controls
                    autoPlay
                    muted
                    loop
                    style={{ marginTop: "10px" }} // Adjust margin top as needed
                  >
                    <source src={videoPaths[index]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Flex>
              )}
              <Divider />
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Card>
          <CardBody>
            <Heading>No Videos Yet</Heading>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default SingleFile;
