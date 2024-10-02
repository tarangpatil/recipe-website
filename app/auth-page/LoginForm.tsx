"use client";
import React from "react";
import PasswordInput from "./PasswordInput";
import { loginUser } from "../actions/user";
import { useFormState } from "react-dom";
import { IoIosWarning } from "react-icons/io";
import { useRouter } from "next/navigation";

type Props = {
  setVisiblePageLogin: (arg0: (prev: boolean) => boolean) => void;
};

const initialState: {
  message: string;
} | null = { message: "" };

export default function LoginForm({ setVisiblePageLogin }: Props) {
  const router = useRouter();
  const [state, dispatch] = useFormState(loginUser, initialState);
  if (!state) {
    router.push("/");
    router.refresh();
  }
  return (
    <div className="bg-[] w-full h-full">
      <form
        className="flex flex-col justify-start items-center h-full pt-8"
        action={dispatch}
      >
        <label htmlFor="email" className="w-1/2 my-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-1/2 px-4 py-2 rounded"
          placeholder="johndoe@example.com"
          required
        />
        <PasswordInput />
        <button
          type="button"
          className="mt-6 text-custom-peach-dark border border-custom-peach-dark px-2"
          onClick={() => setVisiblePageLogin((prev) => !prev)}
        >
          New here? <br /> Click here to create account
        </button>
        <button
          type="submit"
          className="text-white bg-custom-peach-dark px-4 py-2 rounded-md my-4"
        >
          Login
        </button>
        {state && state.message.length !== 0 ? (
          <div
            className="flex flex-col text-red-700 items-center bg-red-200 px-6 py-2 border-2 border-red-500 rounded-md"
            aria-live="polite"
          >
            <IoIosWarning className="mt-1" />
            {state.message}
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
