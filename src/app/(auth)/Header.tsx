import React from "react";

const Header = ({ text }: { text: string }) => {
  return (
    <h2 className="text-gray-600 text-xl font-semibold dark:text-gray-400">
      <span className="underline decoration-4 decoration-green-500">
        {text.slice(0, 2)}
      </span>
      {text.slice(2, text.length)}
    </h2>
  );
};

export default Header;
