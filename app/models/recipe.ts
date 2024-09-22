import prisma from "../lib/prisma";

export type Recipe = {
  title: string;
  authorId: number;
  description: string;
  coverImage: string | null;
  ingredients: { item: string; quantity: string }[];
  steps: string[];
  stepImages: (string | null)[];
};

export async function createRecipe(recipe: Recipe) {
  if (recipe.steps.length !== recipe.stepImages.length)
    throw new Error("'steps' and 'stepImages' should be of same length");
  const recipeInstance = await prisma.recipe.create({
    data: {
      title: recipe.title,
      description: recipe.description,
      coverImage: recipe.coverImage,
      authorId: recipe.authorId,
    },
  });

  for (let i = 0; i < recipe.ingredients.length; i++) {
    const ing = recipe.ingredients[i];
    await prisma.ingredient.create({
      data: {
        item: ing.item,
        quantity: ing.quantity,
        recipeId: recipeInstance.id,
      },
    });
  }

  for (let i = 0; i < recipe.steps.length; i++) {
    const step = recipe.steps[i];
    await prisma.step.create({
      data: {
        content: step,
        stepNumber: i + 1,
        imageName: recipe.stepImages[i],
        recipeId: recipeInstance.id,
      },
    });
  }

  return recipeInstance;
}
