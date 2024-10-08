"use server";

import path from "path";
import { writeFile } from "fs/promises";
import { createRecipe, Recipe } from "../models/recipe";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

function getExtension(filename: string) {
  const splitDots = filename.split(".");
  return splitDots[splitDots.length - 1];
}

async function saveImageFile(file: File, type: "step" | "cover") {
  let imageCount = await prisma.imageCount.findFirst();
  if (!imageCount)
    imageCount = await prisma.imageCount.create({
      data: { coverImageCount: 0, stepImageCount: 0 },
    });

  const i = imageCount[`${type}ImageCount`]++;
  await prisma.imageCount.update({ data: imageCount, where: { id: 1 } });

  const buffer = await file.arrayBuffer();
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    `${type}-image-${i}.${getExtension(file.name).toLowerCase()}`
  );
  await writeFile(filePath, Buffer.from(buffer));
  return `${type}-image-${i}.${getExtension(file.name).toLowerCase()}`;
}

export async function createRecipeAction(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("Login");
  if (!session.user) throw new Error("Login");
  if (!session.user.id) throw new Error("Login");
  const coverImage = formData.get("cover-image") as File;
  const coverImageName =
    coverImage.size === 0 ? null : await saveImageFile(coverImage, "cover");

  const recipeObject: Recipe = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    coverImage: coverImageName,
    ingredients: JSON.parse(formData.get("ingredients") as string),
    steps: JSON.parse(formData.get("steps") as string),
    authorId: parseInt(session.user.id),
    stepImages: [],
  };

  for (let i = 0; i < recipeObject.steps.length; i++) {
    const file = formData.get(`step-image-${i}`) as File;
    if (file.size === 0) {
      recipeObject.stepImages = [...recipeObject.stepImages, null];
    } else {
      recipeObject.stepImages = [
        ...recipeObject.stepImages,
        await saveImageFile(file, "step"),
      ];
    }
  }

  const recipeInstance = await createRecipe(recipeObject);
  redirect(`/recipe/${recipeInstance.id}`);
}

export async function createComment(formData: FormData) {
  const data = {
    authorId: parseInt(formData.get("authorId") as string),
    recipeId: parseInt(formData.get("recipeId") as string),
    content: formData.get("content") as string,
  };
  const commentInstance = await prisma.comment.create({
    data,
    include: { recipe: true },
  });
  revalidatePath(`/recipe/${commentInstance.recipe.id}`);
  redirect(`/recipe/${commentInstance.recipe.id}`);
}
