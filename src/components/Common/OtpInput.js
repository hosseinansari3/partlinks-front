import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ length, onComplete, setOtpNumber }) => {
  const [otp, setOtp] = useState(Array(length).fill("")); // Array to store OTP digits
  const inputs = useRef([]); // Refs for each input field

  const handleChange = (value, index) => {
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // If value is entered, move to the next input
    if (value && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // If OTP is complete, call onComplete
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }

    if (newOtp.every((digit) => digit !== "")) {
      const otpAsNumber = parseInt(newOtp.join(""), 10);
      setOtpNumber(otpAsNumber); // Store OTP as a number
      onComplete(otpAsNumber); // Pass the number to the callback
    }
  };

  const handleBackspace = (value, index) => {
    // Move to the previous input if the current one is empty
    if (value === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, length);
    const newOtp = [...otp];

    // Fill the inputs with the pasted data
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(data[i])) {
        newOtp[i] = data[i];
      }
    }

    setOtp(newOtp);

    // Focus on the next empty input
    const firstEmptyIndex = newOtp.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1) {
      inputs.current[firstEmptyIndex].focus();
    } else {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div
      onPaste={handlePaste}
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        marginBottom: "25px",
      }}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              handleBackspace(e.target.value, index);
            }
          }}
          ref={(el) => (inputs.current[index] = el)} // Save ref to the input
          style={{
            width: "40px",
            height: "40px",
            fontSize: "18px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
