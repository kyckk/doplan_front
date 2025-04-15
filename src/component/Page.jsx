import React from "react";

const Page = ({ header, children }) => {
  return (
    <div>
      {header}
      {children}
    </div>
  );
};

export default Page;