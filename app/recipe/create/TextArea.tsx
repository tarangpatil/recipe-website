"use client";
import React from "react";
type Props = {
  placeholder?: string;
  className?: string;
  name?: string;
  minLength?: number;
};
export default function TextArea({
  placeholder,
  className,
  name,
  minLength,
}: Props) {
  return (
    <textarea
      name={name || "description"}
      id="description"
      className={
        className ||
        "w-full border-2 rounded-lg px-4 py-2 resize-none overflow-y-hidden "
      }
      // defaultValue={"That's a nice dish ya' got"}
      placeholder={placeholder || "Enter a short description for your recipe"}
      minLength={minLength || 0}
      onChange={(e) => {
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
    ></textarea>
  );
}
