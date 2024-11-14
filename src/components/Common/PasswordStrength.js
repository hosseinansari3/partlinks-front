import React, { useState } from "react";
import { TextField, Typography, LinearProgress, Box } from "@mui/material";
import TextInput from "./TextInput";

const calculatePasswordStrength = (password) => {
  let score = 0;

  // Score based on length
  if (password.length >= 8) score += 1;

  // Score based on character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&#]/.test(password)) score += 1;

  // Return score as strength level
  return score;
};

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const strength = calculatePasswordStrength(password);

  // Strength meter color and text
  const strengthText = [
    "Very Weak",
    "Weak",
    "Moderate",
    "Strong",
    "Very Strong",
  ];
  const strengthColors = [
    "#f44336",
    "#ff9800",
    "#ffeb3b",
    "#8bc34a",
    "#4caf50",
  ];

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Box sx={{ margin: "auto", textAlign: "center" }}>
      <TextInput
        type="password"
        placeholder="Password"
        fullWidth
        value={password}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
      />

      {/* Strength Meter Display */}
      <LinearProgress
        variant="determinate"
        value={(strength / 5) * 100}
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: strengthColors[strength - 1] || "#e0e0e0",
          },
        }}
      />
      <Typography
        variant="body2"
        sx={{
          marginTop: 1,
          fontWeight: "bold",
          color: strengthColors[strength - 1] || "#757575",
        }}
      >
        {strengthText[strength - 1] || "Enter Password"}
      </Typography>
    </Box>
  );
};

export default PasswordStrength;
