"use client";
import { Dancing_Script } from "next/font/google";
import React, { useState } from "react";

export type Ingredient = {
  item: string;
  quantity: string;
};

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});

export default function Ingredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentInput, setCurrentInput] = useState<[string, string]>(["", ""]);
  return (
    <div className=" bg-[#ffddd5] w-full rounded-md px-8 py-4 flex flex-col items-start">
      <input
        type="hidden"
        name="ingredients"
        value={JSON.stringify(ingredients)}
      />
      <h3 className={"text-3xl mb-4 " + dancingScript.className}>
        Add Ingredients
      </h3>
      <div className="w-full">
        <div className="flex w-full min-h-8">
          <span className="w-1/3 mx-4 px-2 py-1 text-xl font-bold">
            Ingredient
          </span>
          <span className="w-1/3 mx-4 px-2 py-1 text-xl font-bold">
            Quantity
          </span>
        </div>
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex w-full my-2">
            <span className="w-1/3 mx-4 px-2 py-1 italic">{ing.item}</span>
            <span className="w-1/3 mx-4 px-2 py-1">{ing.quantity}</span>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded-md"
              onClick={() =>
                setIngredients((prev) =>
                  prev.filter((_, filterIdx) => filterIdx !== idx)
                )
              }
              type="button"
            >
              Delete ingredient
            </button>
          </div>
        ))}
      </div>
      <div className="w-full mt-4">
        <input
          type="text"
          id="ingredient-item-input"
          className="border rounded mx-2 w-1/3 px-2 py-1"
          placeholder="Enter item"
          value={currentInput[0]}
          onChange={(e) => setCurrentInput((prev) => [e.target.value, prev[1]])}
        />
        <input
          type="text"
          className="border rounded mx-2 w-1/3 px-2 py-1"
          placeholder="Enter quantity"
          value={currentInput[1]}
          onChange={(e) => setCurrentInput((prev) => [prev[0], e.target.value])}
        />
        <button
          type="button"
          className="w-1/4 bg-[#741b07] text-white rounded-md px-2 py-1"
          onClick={(e) => {
            setIngredients((prev) => [
              ...prev,
              { item: currentInput[0], quantity: currentInput[1] },
            ]);
            //@ts-ignore
            document.querySelector("input#ingredient-item-input").focus();
            setCurrentInput(["", ""]);
          }}
        >
          Add ingredient
        </button>
      </div>
    </div>
  );
}
