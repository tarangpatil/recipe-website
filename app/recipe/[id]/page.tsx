import prisma from "@/app/lib/prisma";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const dancingScript = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  params: { id: string; [key: string]: string };
  searchParams: { [key: string]: string };
};

export default async function RecipeFull({ params }: Props) {
  const idStr = params.id;
  const id = parseInt(idStr.split("-")[idStr.length - 1]);
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true, steps: true },
  });

  if (!recipe) return redirect("/not-found");

  return (
    <main className="mx-96 my-10 ">
      <h1 className="font-dancing-script text-5xl">{recipe.title}</h1>
      <p className="text-gray-500 my-2 px-4">
        Updated on: {recipe.updatedAt.toISOString().split("T")[0]}
      </p>
      <hr />
      <article>
        <p className="my-4">{recipe?.description}</p>
        <Image
          src={`/uploads/${recipe.coverImage}`}
          alt={recipe.title + " cover image"}
          width={1000}
          height={1000}
          className="max-w-full rounded-xl"
        />
      </article>
      <article className="my-8 bg-custom-peach px-8 py-4 rounded-md">
        <h5 className="font-dancing-script text-3xl">Ingredients</h5>
        <table className="w-full my-4">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th className="text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map((ing, idx) => (
              <tr key={idx}>
                <td className="">{ing.item}</td>
                <td className="">{ing.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <article className="my-8 px-8 py-4 rounded-md">
        <hr className="w-full" />
        {recipe.steps.map((step, idx) => (
          <div key={idx}>
            <h6 className="font-dancing-script text-3xl my-4">
              Step {step.stepNumber}
            </h6>
            {step.imageName && (
              <Image
                src={`/uploads/${step.imageName}`}
                alt={`step image ${step.stepNumber}`}
                width={1000}
                height={1000}
              />
            )}
            <p className="p-4">{step.content}</p>
            <hr />
          </div>
        ))}
      </article>
    </main>
  );
}
