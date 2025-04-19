import React from "react";
import Navbar from "./Navbar";

const Page = ({  children }) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default Page;