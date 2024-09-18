"use client";
import React, { useState } from "react";
import ImageInput from "./ImageInput";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});

export default function Steps() {
  const [steps, setSteps] = useState<string[]>([
    "Heat milk",
    "Add leaves",
    "Eat tea",
  ]);
  return (
    <div className="w-full min-h-14 mt-4 rounded-md">
      <input type="hidden" name="steps" value={JSON.stringify(steps)} />
      <div className="w-full">
        {steps.map((step, idx) => (
          <div
            className="border rounded-md mb-4 flex flex-col w-full"
            key={idx}
          >
            <p
              className={
                " my-4 text-3xl px-6 w-full " + dancingScript.className
              }
            >
              Step {idx + 1}
            </p>
            <ImageInput
              required={false}
              label={[
                "(Optional) Add image for this step",
                "Drag and drop or click to select image",
              ]}
              classes="border-none text-lg"
              name={`step-image-${idx}`}
            />
            <hr className="w-full" />
            <label
              htmlFor={`step-content-${idx}`}
              className="mx-8 mt-4 relative w-full"
            >
              Step:
            </label>
            <textarea
              id={`step-content-${idx}`}
              className="border mx-8 my-4 rounded resize-none px-6 py-4 overflow-hidden"
              value={step}
              onChange={(e) => {
                e.target.style.height = `${e.target.scrollHeight}px`;
                const stepsCopy = [...steps];
                stepsCopy[idx] = e.target.value;
                setSteps(stepsCopy);
              }}
              placeholder="E.g Preheat oven to 180C..."
              minLength={5}
            ></textarea>
            <div>
              <button
                type="button"
                className="mb-4 mx-6 px-4 py-2 rounded-md bg-red-600 text-white w-max float-end"
                onClick={() => {
                  setSteps((prev) =>
                    prev.filter((_, filterIdx) => idx !== filterIdx)
                  );
                }}
              >
                Delete step
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex relative justify-center">
        <button
          type="button"
          className="relative border z-20 bg-white shadow-md rounded-full px-6 py-2 text-lg"
          onClick={(e) => setSteps((prev) => [...prev, ""])}
        >
          Add step
        </button>
        <hr className="w-full absolute top-1/2 z-10" />
      </div>
    </div>
  );
}
