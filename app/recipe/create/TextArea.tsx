"use client";
import React from "react";

export default function TextArea() {
  return (
    <textarea
      name="description"
      id="description"
      defaultValue={
        "Masala chai is a flavorful Indian tea blend made with black tea, milk, and a mix of aromatic spices like cardamom, cinnamon, cloves, ginger, and black pepper. It's known for its warm, spicy kick and is often enjoyed sweetened with sugar or honey. The combination of spices varies by region and personal preference, making each cup of masala chai a unique experience."
      }
      className="w-full border-2 rounded-lg px-4 py-2 resize-none overflow-y-hidden"
      placeholder="Enter a short description for your recipe"
      onChange={(e) => {
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
    ></textarea>
  );
}
