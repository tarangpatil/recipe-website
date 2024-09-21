import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
type Props = {
  setVisiblePageLogin: (arg0: (prev: boolean) => boolean) => void;
};
export default function LoginForm({ setVisiblePageLogin }: Props) {
  const [passVis, setPassVis] = useState(false);
  return (
    <div className="bg-[] w-full h-full">
      <form className="flex flex-col justify-center items-center h-full">
        <label htmlFor="email" className="w-1/2 my-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-1/2 px-4 py-2 rounded"
          placeholder="johndoe@example.com"
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
      </form>
    </div>
  );
}
