import React from "react";
import PropTypes from "prop-types"; // Add PropTypes for type checking

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div
      style={{
        backgroundColor: "#FCF6F5FF",
        color: "black",
        padding: "1rem",
        borderRadius: "0.5rem",
        width: "180px",
        height: "80px",
        display: "flex", // Use flex to align items more easily
        flexDirection: "column",
        justifyContent: "center", // Align content vertically
      }}
    >
      <div style={{ fontSize: "18px", marginBottom: "5px" }}>{title}</div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {Icon && <Icon style={{ fontSize: "30px" }} />} {/* Conditionally render the Icon */}
        <p style={{ fontSize: "30px", margin: 0 }}>{value}</p> {/* Adjusted margin */}
      </div>
    </div>
  );
};

// PropTypes to validate the expected types for props
HighlightBox.propTypes = {
  title: PropTypes.string.isRequired,  // Title must be a string
  value: PropTypes.string.isRequired,  // Value must be a string (e.g., temperature, pressure)
  Icon: PropTypes.elementType.isRequired,  // Icon must be a React component
};

export default HighlightBox;
