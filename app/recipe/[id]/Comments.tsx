import prisma from "@/app/lib/prisma";
import { flipCommentLike } from "@/app/models/likes";
import { auth } from "@/auth";
import React from "react";
import { FaThumbsUp } from "react-icons/fa6";
import Reply from "./Reply";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

type Props = {
  recipeId: number;
};

async function RenderLike({
  cmtId,
  likedComments,
  recipeId,
  session,
}: {
  session: Session | null;
  recipeId: number;
  cmtId: bigint;
  likedComments: bigint[];
}) {
  const cmt = await prisma.comment.findUnique({
    where: { id: cmtId },
    include: { _count: true },
  });
  if (!cmt) return <></>;

  return (
    <form
      className="mt-2 px-2 flex items-center"
      action={async () => {
        "use server";
        if (!session?.user?.id) redirect(`/auth-page`);
        await flipCommentLike(cmt.id, parseInt(session?.user?.id));
        revalidatePath(`/recipe/${recipeId}`);
      }}
    >
      <button type="submit">
        <FaThumbsUp
          className={`mr-2 cursor-pointer h-6 w-6 p-1 hover:p-0 hover:text-blue-500 active:p-1 active:text-green-600 transition-all ${
            likedComments.indexOf(cmt.id) !== -1
              ? "text-blue-500"
              : "text-black"
          }`}
        />
      </button>
      {cmt._count.CommentLikes}
    </form>
  );
}

export default async function Comments({ recipeId }: Props) {
  const comments = await prisma.comment.findMany({
    where: { recipeId },
    include: { author: true, _count: true },
  });
  const session = await auth();
  const likedComments: bigint[] = [];
  if (session?.user?.id)
    for (const i of comments) {
      const like = await prisma.commentLikes.findUnique({
        where: {
          commentId_likerId: {
            commentId: i.id,
            likerId: parseInt(session.user.id),
          },
        },
      });
      if (like) likedComments.push(like.commentId);
    }

  return (
    <section className="my-8">
      {comments.map((cmt) => (
        <div key={cmt.id}>
          <div className="mx-8">
            <p className="text-gray-500">@{cmt.author.name}</p>
            <p>{cmt.content}</p>
            <RenderLike
              {...{
                cmtId: cmt.id,
                likedComments,
                recipeId,
                session,
              }}
              key={cmt.id}
            />
            <Reply {...{ parentCommentId: cmt.id, recipeId, session }} />
          </div>
          <hr className="mt-8" />
        </div>
      ))}
    </section>
  );
}
