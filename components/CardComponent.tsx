import React from "react";
import NumberTicker from "./magicui/number-ticker";

type Props = {
  icon: React.ReactNode;
  label: string;
  value: number;
};

const CardComponent = ({ icon, label, value }: Props) => {
  return (
    <div className="border shadow-lg rounded-md p-5 space-y-3">
      <div className="flex items-center w-full justify-between">
        {icon}
        <span className="text-sm md:text-base bg-gradient-to-r from-stone-950 to-stone-500 dark:from-blue-600 dark:to-blue-400 bg-clip-text bg-transparent text-transparent">{label}</span>
      </div>
      <div className="flex items-center justify-end">
        <NumberTicker value={value} className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-red-500 dark:from-yellow-400 dark:to-blue-600 bg-clip-text text-transparent"/>
      </div>{" "}
    </div>
  );
};

export default CardComponent;
