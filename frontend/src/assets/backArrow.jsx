// BackArrow.jsx
import { IconButton, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function BackArrow({ size = "70px", color = "white", top = 4, left = 4 }) {
  const navigate = useNavigate();

  return (
    <IconButton
      position="absolute"
      top={top}
      left={left}
      aria-label="Go back"
      icon={
        <Box
          as="span"
          fontSize={size}
          fontWeight="bold"
          lineHeight="1"
        >
          ←
        </Box>
      }
      onClick={() => navigate(-1)}
      variant="ghost"
      borderRadius="full"
      boxShadow="md"
      _hover={{
        bg: "whiteAlpha.200",
        transform: "scale(1.2)",
      }}
      color={color}
      p={4}
      
    />
  );
}
