"use client";
import Image from "next/image";
import React, {  useRef, useState } from "react";

type Props = {
  name?: string;
  label: string | string[];
  classes?: string;
  index?: number;
  required: boolean;
};

export default function ImageInput({
  label,
  name,
  classes,
  index,
  required,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <div
      className={
        "w-full flex flex-col items-center justify-center px-4 my-4 border-2 rounded-md relative " +
        classes
      }
    >
      <input
        ref={fileInput}
        type="file"
        name={name || `file-input-${index}`}
        id={name || `file-input-${index}`}
        required={required}
        className="opacity-0 absolute top-1/2"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      {file ? (
        <div className="w-4/5 flex flex-col justify-center items-end ">
          <Image
            src={URL.createObjectURL(file)}
            alt="Cover Image"
            className="py-4"
          />
          <button
            type="button"
            className="mb-4 px-4 py-2 rounded-md bg-red-600 text-white text-base"
            onClick={() => {
              fileInput.current && (fileInput.current.value = "");
              setFile(null);
            }}
          >
            Delete image
          </button>
        </div>
      ) : (
        <label
          htmlFor={name || `file-input-${index}`}
          className={`inline-block my-4 w-full text-4xl text-center py-16 px-8 text-gray-500 border-gray-300 border-8 rounded-xl border-dashed font-mono `}
        >
          {typeof label === "string"
            ? label
            : label.map((i, idx) => <p key={idx}>{i}</p>)}
        </label>
      )}
    </div>
  );
}
