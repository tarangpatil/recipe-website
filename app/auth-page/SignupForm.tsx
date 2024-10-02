import { useFormState } from "react-dom";
import { createUser } from "../actions/user";
import PasswordInput from "./PasswordInput";
import { IoIosWarning } from "react-icons/io";

type Props = {
  setVisiblePageLogin: (arg0: (prev: boolean) => boolean) => void;
};

const initState: { message: string } | null = { message: "" };

export default function SignupForm({ setVisiblePageLogin }: Props) {
  const [state, dispatch] = useFormState(createUser, initState);
  return (
    <div className="bg-[] w-full h-full">
      <form
        className="flex flex-col justify-start pt-8 items-center h-full"
        action={dispatch}
      >
        <label htmlFor="name" className="w-1/2 my-2">
          Your Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-1/2 px-4 py-2 rounded"
          placeholder="John Doe"
          required
        />
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
          Already got an account? <br />
          Click here to login
        </button>
        <button
          type="submit"
          className="text-white bg-custom-peach-dark px-4 py-2 rounded-md my-4"
        >
          Sign - Up
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
