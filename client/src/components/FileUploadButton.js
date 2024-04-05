import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  Progress,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  ButtonGroup,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { UPLOAD_VIDEO, CHECK_VIDEO } from "../utils/mutations";

const FileUploadButton = ({ onUpload, userId, refetch }) => {
  const [uploadVideo] = useMutation(UPLOAD_VIDEO);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [checkVideo] = useMutation(CHECK_VIDEO);

  const toast = useToast();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        try {
          const videoData = await checkVideo({
            variables: { videoName: file.name },
          });

          if (videoData.data.checkVideo) {
            toast({
              title: "Video with the same name already exists.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            return;
          }
        } catch (error) {
          console.error("Error checking video name:", error);
        }
        console.log("Video doesn't exist within database.");

        const formData = new FormData();
        formData.append("video", file);
        formData.append("userID", userId);

        const response = await axios.post(
          "http://localhost:3001/api/uploadVideo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            },
          }
        );


        try {
          const { data } = await uploadVideo({
            variables: {
              videoName: response.data.name,
              videoPath: response.data.path,
              userID: response.data.userID,
            },
          });

        } catch (error) {
          console.error("Error uploading video to database:", error);
        }

        if (onUpload) {
          onUpload(response.data);
        }
        refetch();
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    }
  };

  return (
    <div>
      <Button as="label" htmlFor="file-input">
        Upload File
        <input
          id="file-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>
      {/* {uploadProgress > 0 && <Progress value={uploadProgress} />} */}
    </div>
  );
};

export default FileUploadButton;
