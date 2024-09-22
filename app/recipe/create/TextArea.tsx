"use client";
import React from "react";

export default function TextArea() {
  return (
    <textarea
      name="description"
      id="description"
      className="w-full border-2 rounded-lg px-4 py-2 resize-none overflow-y-hidden"
      placeholder="Enter a short description for your recipe"
      onChange={(e) => {
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
    ></textarea>
  );
}
