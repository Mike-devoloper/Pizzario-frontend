import React from "react"
import { Box, Stack } from "@mui/material";
export default function Statistics() {
    return (
      <div className="static-frame">
          <Stack className="info">
            <Stack className="static-box">
              <Box className="static-num">Natural Topping</Box>
            </Stack>
            <Stack className="static-box">
              <Box className="static-num">Pizza Time</Box>
            </Stack>
            <Stack className="static-box">
              <Box className="static-num">Italian Food</Box>
            </Stack>
            <Stack className="static-box">
              <Box className="static-num">Best Fast Food</Box>
            </Stack>
          </Stack>
      </div>
    );
  }