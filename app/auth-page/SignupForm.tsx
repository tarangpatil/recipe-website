import PasswordInput from "./PasswordInput";

type Props = {
  setVisiblePageLogin: (arg0: (prev: boolean) => boolean) => void;
};

export default function SignupForm({ setVisiblePageLogin }: Props) {
  return (
    <div className="bg-[] w-full h-full">
      <form className="flex flex-col justify-center items-center h-full">
        <label htmlFor="name" className="w-1/2 my-2">
          Your Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-1/2 px-4 py-2 rounded"
          placeholder="John Doe"
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
      </form>
    </div>
  );
}
