import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#1f2937",
        color: "#f3f4f6",
        marginTop: "auto",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} TaskSync. All rights reserved.
      </p>
      <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#9ca3af" }}>
        Built with ❤️ using Django & React
      </p>
    </footer>
  );
};

export default Footer;
