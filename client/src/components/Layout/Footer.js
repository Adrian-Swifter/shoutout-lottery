import React from "react";
import { Link } from "react-router-dom";

const footerStyle = {
  backgroundColor: "#fff",
  color: "#56599c",
  padding: "20px 0",
  textAlign: "center",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  borderRadius: "0 0 7px 7px",
};

const linkContainerStyle = {
  display: "flex",
  justifyContent: "center", // Center the links horizontally
};

const linkStyle = {
  color: "#56599c",
  textDecoration: "none",
  margin: "0 20px",
  fontSize: "1rem",
  transition: "color 0.3s",
};

const linkHoverStyle = {
  color: "#ef798a",
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="footer-content">
        <p style={{ color: "#000", fontWeight: "bolder" }}>
          &copy; 2023 Shoutizer. All rights reserved.
        </p>
        <div style={linkContainerStyle}>
          <Link
            to="/terms-of-service"
            style={linkStyle}
            className="footer-link"
          >
            Terms of Service
          </Link>
          <Link to="/privacy-policy" style={linkStyle} className="footer-link">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
