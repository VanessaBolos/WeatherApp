import React from "react";
import PropTypes from "prop-types";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>{title}</div>
      <div style={styles.content}>
        {Icon && <Icon style={styles.icon} />} 
        <p style={styles.value}>{value}</p>
      </div>
    </div>
  );
};

// Styles for HighlightBox component
const styles = {
  container: {
    backgroundColor: "#FCF6F5FF",
    color: "black",
    padding: "1rem",
    borderRadius: "0.5rem",
    width: "180px",
    minHeight: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
  },
  title: {
    fontSize: "18px",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: "30px",
    marginRight: "10px",
  },
  value: {
    fontSize: "30px",
    margin: 0,
    fontWeight: "500",
  },
};

// Updated PropTypes for type validation
HighlightBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  Icon: PropTypes.elementType, 
};

export default HighlightBox;
