import React, { useState, useEffect } from "react";
import "./Toast.css"; // Optional: CSS for styling

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Call the onClose callback when the duration ends
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default Toast;
