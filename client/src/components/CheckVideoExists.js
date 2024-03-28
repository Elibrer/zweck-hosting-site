import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_VIDEO } from "../utils/queries";

const useCheckVideoExists = (videoName) => {
  const [videoExists, setVideoExists] = useState(false);
  const { loading, error, data } = useQuery(GET_VIDEO, {
    variables: { videoName },
  });

  if (!loading && !error) {
    setVideoExists(data.videoExists);
  }

  return { loading, error, videoExists };
};

export default useCheckVideoExists;