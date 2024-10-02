"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "../lib/prisma";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

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

export async function createUser(
  prevState: { message: string } | null,
  formData: FormData
) {
  if (
    await prisma.user.findUnique({
      where: { email: formData.get("email") as string },
    })
  )
    return { message: "User already exists" };
  const password = formData.get("password") as string;
  const pwHash = await hash(password, 10);
  const validatedFields = signInSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) return null;
  await prisma.user.create({
    data: { ...validatedFields.data, password: pwHash },
  });
  await signIn("credentials", {
    redirect: false,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  return null;
}

export async function loginUser(
  prevState: { message: string } | null | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError)
      return { message: "Account with this email does not exist" };
  }
}

export async function logout() {
  await signOut();
  revalidatePath("/");
  redirect("/");
}
