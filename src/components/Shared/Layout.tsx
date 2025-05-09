import React from "react";
import Navbar from "./Navbar";
import { poppins } from "@/lib/fonts";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
      <div className={`${poppins.className}`}>
        <Navbar />
        {children}
      </div>

  );
};

export default Layout;
