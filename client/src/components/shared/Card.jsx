import { PhoneCall, Briefcase } from "lucide-react";

import Label from "../UI/Label";

const Card = ({ title, description, number, person, location }) => {
  return (
    <>
      {/* <div className="mx-5 my-5 flex flex-col items-center justify-center rounded border-2 border-black bg-opacity-45 p-5 shadow-xl md:w-2/3 md:flex-row md:space-x-5">
        <div className="w-full md:w-[60rem]">
          <div className="flex items-center justify-center space-x-2 md:items-center md:justify-start">
            <Briefcase className="my-1" />
            <h1 className="font-bold uppercase tracking-widest md:text-2xl">
              {title}
            </h1>
            <Label>{person}</Label>
          </div>
          <p className="text-center md:text-left">{description}</p>
          <p className="text-center md:text-left">Location: {location}</p>
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center md:w-1/3">
          <div className="space-y-3 rounded bg-[#B2E5FB] p-3 py-5 text-center">
            <p className="text-xl font-bold">+91 {number}</p>
            <div className="flex items-center justify-center space-x-2">
              <PhoneCall />
              <span className="text-xl uppercase">Call</span>
            </div>
          </div>
        </div>
      </div> */}

      <div className="my-3 space-y-4">
        <div className="space-y-2 rounded-xl border bg-white p-4 text-gray-800">
          <div className="flex justify-between">
            <div className="text-xs text-gray-400">borivali</div>
            {/* <div className="text-xs text-gray-400">4h</div> */}
          </div>
          <p className="font-bold capitalize lg:text-xl">something</p>
        </div>
      </div>
    </>
  );
};

export default Card;
