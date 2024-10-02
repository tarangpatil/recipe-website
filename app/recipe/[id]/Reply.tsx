import prisma from "@/app/lib/prisma";
import React from "react";
import TextArea from "../create/TextArea";
import { revalidatePath } from "next/cache";
import { Session } from "next-auth";
import { flipReplyLike } from "@/app/models/likes";
import { redirect } from "next/navigation";
import { FaThumbsUp } from "react-icons/fa";
type Props = {
  parentCommentId: bigint;
  recipeId: number;
  session: Session | null;
};

async function RenderLike({
  replyId,
  likedReplies,
  recipeId,
  session,
}: {
  session: Session | null;
  recipeId: number;
  replyId: bigint;
  likedReplies: bigint[];
}) {
  const reply = await prisma.reply.findUnique({
    where: { id: replyId },
    include: { _count: true },
  });
  if (!reply) return <></>;

  return (
    <form
      className="mt-2 px-2 flex items-center"
      action={async () => {
        "use server";
        if (!session?.user?.id) redirect(`/auth-page`);
        await flipReplyLike(reply.id, parseInt(session?.user?.id));
        revalidatePath(`/recipe/${recipeId}`);
      }}
    >
      <button type="submit">
        <FaThumbsUp
          className={`mr-2 cursor-pointer h-6 w-6 p-1 hover:p-0 hover:text-blue-500 active:p-1 active:text-green-600 transition-all ${
            likedReplies.indexOf(reply.id) !== -1
              ? "text-blue-500"
              : "text-black"
          }`}
        />
      </button>
      {reply._count.ReplyLikes}
    </form>
  );
}

export default async function Reply({
  parentCommentId,
  recipeId,
  session,
}: Props) {
  const replies = await prisma.reply.findMany({
    where: { parentCommentId },
    include: { author: true, ReplyLikes: true },
  });
  const likedReplies: bigint[] = [];
  if (session?.user?.id)
    for (const i of replies) {
      const like = await prisma.replyLikes.findUnique({
        where: {
          replyId_likerId: {
            replyId: i.id,
            likerId: parseInt(session.user.id),
          },
        },
      });
      if (like) likedReplies.push(like.replyId);
    }
  return (
    <div className=" border-gray-300 mt-4">
      {session?.user?.id ? (
        <form
          className="flex items-center"
          action={async (formData: FormData) => {
            "use server";
            const content = formData.get("reply") as string;
            if (session.user?.id) {
              await prisma.reply.create({
                data: {
                  content,
                  parentCommentId,
                  authorId: parseInt(session.user.id),
                },
              });
            }
            revalidatePath(`/recipe/${recipeId}`);
          }}
        >
          <TextArea
            name="reply"
            placeholder="Add reply"
            className="w-full border-2 rounded-lg px-4 py-2 resize-none overflow-y-hidden h-10"
          />
          <button className="bg-custom-peach-dark text-white rounded-md px-4 py-2 ml-4">
            Reply
          </button>
        </form>
      ) : (
        ""
      )}
      <div className="pl-8 border-l-2 my-4">
        {replies.map((reply) => (
          <div key={reply.id} className="my-4">
            <p className="text-gray-500">@{reply.author.name}</p>
            <p>{reply.content}</p>
            <hr className="mt-4" />
            <RenderLike
              {...{ likedReplies, recipeId, replyId: reply.id, session }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
