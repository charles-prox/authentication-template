import React from "react";
import Logout from "./logout";

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <p>Navigation here</p>
        <Logout />
      </div>
      {children}
    </div>
  );
};

export default PagesLayout;
