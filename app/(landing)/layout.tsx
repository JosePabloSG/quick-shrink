import React from "react";

import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

