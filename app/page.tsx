import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import prisma from "./lib/prisma";
import { auth } from "@/auth";

const dancingScript = Dancing_Script({ weight: "400", subsets: ["latin"] });

export default async function Home() {
  const session = await auth();

  const rec1 = await prisma.recipe.findMany({
    include: { ingredients: true, steps: true },
  });
  return (
    <main className="flex flex-col justify-start min-h-screen items-start ">
      {session ? (
        <section className="mx-12 my-6 text-4xl font-dancing-script">
          Welcome, {session.user?.name?.split(" ")[0]}
        </section>
      ) : (
        ""
      )}
      <section className="mx-12 my-6">
        <h3 className="text-xl font-dancing-script">Recently added</h3>
        <div className="flex w-full">
          {rec1.map((recipe, idx) => (
            <Link href={`/recipe/${recipe.id}`} key={idx}>
              <div className="m-4 border w-64 rounded-lg overflow-hidden">
                <Image
                  alt="Cover image"
                  src={`/uploads/cover-image-0.jpg`}
                  width={1000}
                  height={1000}
                  className="w-64 h-56"
                ></Image>
                <hr />
                <div>
                  <h4 className="px-2 font-bold text-xl mt-2">Masala Chai</h4>
                  <p className="p-2 pt-0 text-sm">
                    {recipe.description.substring(0, 100).trimEnd()}
                    {recipe.description.length > 100 ? "..." : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
