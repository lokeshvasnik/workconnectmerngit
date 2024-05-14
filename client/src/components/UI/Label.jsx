import React from "react";
import { UserRound } from "lucide-react";

const Label = ({ children }) => {
  return (
    <span className="text-white-600 text-1xl flex rounded-md bg-[#CCFF90] px-2 py-1 font-semibold">
      <UserRound size={20} className="mr-2" />
      {children}
    </span>
  );
};

export default Label;
