import Image from "next/image";
import React from "react";

export default function LoginExtraDisplay() {
  return (
    <div className="h-full bg-[] flex flex-col pt-20 text-center">
      <h3 className="font-dancing-script text-4xl">Welcome Back Chef!</h3>
      <p className=" mt-6 text-2xl font-dancing-script">
        Just gotta make sure it's you
      </p>
      <div className="mt-8">
        <p>Or login using one of these</p>
        <div className="flex items-center mx-auto bg-google-blue text-white my-6 w-max py-1 rounded pr-1 cursor-pointer">
          <Image
            alt="Google logo"
            src={"/google.png"}
            width={1000}
            height={1000}
            className="w-8 bg-white mx-1 rounded"
          ></Image>
          Sign up using google
        </div>
      </div>
    </div>
  );
}
