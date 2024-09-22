"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "../lib/prisma";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

const signInSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid name",
    })
    .min(1, "Please enter your name"),
  email: z
    .string({
      required_error: "E-mail is required",
      invalid_type_error: "Invalid E-mail",
    })
    .email(),
  password: z.string().min(6, "Password should have atleast 6 characters"),
});

export async function createUser(formData: FormData) {
  console.clear();
  if (
    await prisma.user.findUnique({
      where: { email: formData.get("email") as string },
    })
  )
    return redirect("/");
  const password = formData.get("password") as string;
  const pwHash = await hash(password, 10);
  const validatedFields = signInSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) return null;
  const user = await prisma.user.create({
    data: { ...validatedFields.data, password: pwHash },
  });
  await signIn("credentials", {
    redirect: false,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  redirect("/");
}
export async function loginUser(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    redirect("/");
  } catch (error) {
    console.error({ error });
  }
}

export async function logout(formData: FormData) {
  await signOut();
  revalidatePath("/");
  redirect("/");
}
