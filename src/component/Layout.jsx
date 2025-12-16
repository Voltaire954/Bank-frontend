import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="Layout">
      <div className="header">
        <Header />
      </div>

      <main>{children}</main>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
