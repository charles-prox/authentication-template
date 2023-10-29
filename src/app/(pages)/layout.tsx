import React from "react";

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <p>Navigation here</p>
      </div>
      {children}
    </div>
  );
};

export default PagesLayout;
