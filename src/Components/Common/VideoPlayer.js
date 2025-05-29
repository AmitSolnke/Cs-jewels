import { Box, Button, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { handleDownload } from "../../utilities/handleDownload";
import {
  CSJEWELS_Light,
  RitiCollectionVideo,
} from "../../images/imageConstants";
import { useRef } from "react";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const videoUrl = RitiCollectionVideo;

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
    }
  };
  return (
    <Box sx={{ position: "relative", width: "100%", mx: "auto" }}>
      <video
        ref={videoRef}
        controls
        loop
        style={{
          width: "100%",
          height: "30rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          height: 43,
          width: 45,
          zIndex: 2,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#662a2e",
            color: "#fff",
            transition: "all 0.3s ease",
            height: "100%",
            width: "100%",
            "&:hover": {
              backgroundColor: "#8a3a3f",
              color: "#fff",
              transform: "scale(1.05)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={() => {
            handleDownload(videoUrl, "SadichaPadarChallenge-Hook-Step.mp4");
          }}
        >
          <DownloadIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
