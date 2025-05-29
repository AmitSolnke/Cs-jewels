import { Box, Button, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const VideoPlayer = () => {
  const videoUrl =
    "https://csjewelsofficial.s3.ap-south-1.amazonaws.com/Compain+Videos/Sadicha+Padar+Challenge.mp4";

  return (
    <Box sx={{ position: "relative", width: "100%", mx: "auto" }}>
      <video
        controls
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
        }}
      >
        <a href={videoUrl} download>
          <IconButton color="primary" sx={{ backgroundColor: "white" }}>
            <DownloadIcon />
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
