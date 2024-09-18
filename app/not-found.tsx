import React from "react";
import Image from "next/image";
import SadPot from "./sad-pot.jpeg";
import Link from "next/link";

export default function notFound() {
  return (
    <main className="h-[70vh] relative">
      <h3 className="h-2/3 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 font-dancing-script text-3xl z-10">
        Oops! That dish ain't cooked yet :P
        <Link href={"/"} className="text-blue-900 underline hover:text-blue-600">
          Go back
        </Link>
      </h3>
      <Image
        src={SadPot}
        alt="Sad pot background"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-50"
      />
    </main>
  );
}
