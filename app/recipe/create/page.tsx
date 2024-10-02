import { Dancing_Script } from "next/font/google";
import ImageInput from "./ImageInput";
import Ingredients from "./Ingredients";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import Steps from "./Steps";
import { createRecipeAction } from "@/app/actions/recipe";
import TextArea from "./TextArea";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
});

export default async function CreateNew() {
  if (!(await auth())) return redirect("/auth-page");
  return (
    <main className="flex flex-col justify-start h-screen items-center">
      <div className="w-4/5">
        <Link href={"/"} className="text-lg mt-4 flex items-center ">
          <FaArrowLeft /> &nbsp;Go back
        </Link>
      </div>
      <form
        className="w-1/2 bg-purpe-800 py-8 flex flex-col items-center justify-start"
        action={createRecipeAction}
      >
        <label htmlFor="title" className="block w-full px-4 text-gray-500">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`${dancingScript.className} w-full text-4xl border-2 rounded-lg px-4 py-2`}
          placeholder="Enter recipe name"
        />
        <label
          htmlFor="description"
          className="block w-full px-4 text-gray-500 mt-4"
        >
          Description
        </label>
        <TextArea />
        <ImageInput
          required={false}
          name="cover-image"
          label={["Add cover image", "", "Click to select", "or drag and drop"]}
        />
        <Ingredients />
        <Steps />
        <div className="flex  w-1/2 justify-between">
          <Link
            href={"/"}
            className="bg-red-700 text-white px-4 py-2 rounded-md mt-4 text-xl"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded-md mt-4 text-xl"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </main>
  );
}
