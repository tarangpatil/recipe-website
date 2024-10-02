import React from "react";
import DynamicForm from "./DynamicForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  if (await auth()) redirect("/");
  return (
    <main className="flex items-center justify-center">
      <DynamicForm />
    </main>
  );
}
