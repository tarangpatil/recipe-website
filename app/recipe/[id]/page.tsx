import prisma from "@/app/lib/prisma";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";
import TextArea from "../create/TextArea";
import { createComment } from "@/app/actions/recipe";
import Comments from "./Comments";

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
    include: { ingredients: true, steps: true, author: true },
  });

  if (!recipe) return redirect("/not-found");
  const session = await auth();

  return (
    <main className="w-[90vw] mx-auto max-w-[750px] my-10 ">
      <h1 className={dancingScript.className + " font-dancing-script text-5xl"}>
        {recipe.title}
      </h1>
      <p className="text-gray-500 my-2 px-4">Cooked by: {recipe.author.name}</p>
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
              <th className="text-left w-1/2">Item</th>
              <th className="text-left w-1/2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {recipe.ingredients.map((ing, idx) => (
              <tr key={idx}>
                <td className="text-left w-1/2">{ing.item}</td>
                <td className="text-left w-1/2">{ing.quantity}</td>
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
      <section>
        <h5 className="px-4 text-3xl font-dancing-script">Comments</h5>
        {session && (
          <form
            className="bg-[] w-full flex flex-col items-center justify-center"
            action={createComment}
          >
            <input type="hidden" name="recipeId" value={recipe.id} />
            {session?.user?.id ? (
              <input type="hidden" name="authorId" value={session.user.id} />
            ) : (
              ""
            )}
            <label
              className="block w-full px-8 text-gray-500 mt-4 "
              htmlFor="comment"
            >
              Write a comment:
            </label>
            <TextArea
              placeholder="Eg. That's a great dish! I tried it."
              className="w-[93%] border-2 rounded-lg px-4 py-2 resize-none overflow-y-hidden"
              name="content"
              minLength={5}
            />
            <div className="w-full">
              <button className="mx-8 bg-custom-peach-dark text-white px-4 py-2 rounded-md mt-2 mb-8">
                Post
              </button>
            </div>
          </form>
        )}
      </section>
      <hr />
      <Comments recipeId={recipe.id} />
    </main>
  );
}
