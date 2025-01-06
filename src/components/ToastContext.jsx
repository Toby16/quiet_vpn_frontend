import React, { createContext, useContext, useState } from "react";
import  "../Toast.css";

// Create Context
const ToastContext = createContext();

// ToastProvider component to wrap the entire app
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to show a toast
  const showToast = (message, type = "info") => {
    const id = Date.now(); // Unique ID for each toast
    setToasts([...toasts, { id, message, type }]);

    // Remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000); // 3 seconds duration
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Render the toast container */}
      <div className="z-100 toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use ToastContext
export const useToast = () => useContext(ToastContext);
