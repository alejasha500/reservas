import React from "react";

const LoadingSpinner = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minHeight: "200px",
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #ccc",
      borderTop: "4px solid #a27b5c", 
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    keyframes: `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `,
  };

  return (
    <>
      <style>{styles.keyframes}</style>
      <div style={styles.container}>
        <div style={styles.spinner}></div>
      </div>
    </>
  );
};

export default LoadingSpinner;