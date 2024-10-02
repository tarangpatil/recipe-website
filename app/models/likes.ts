import prisma from "../lib/prisma";

/**
 * Flips a users like on a comment, meaning if the comment is already liked it gets unliked and vice versa
 * @param commentId id of the comment
 * @param likerId id of the user who liked
 * @returns boolean `true` if the user liked the comment, `false` otherwise
 */
export async function flipCommentLike(commentId: bigint, likerId: number) {
  const like = await prisma.commentLikes.findUnique({
    where: { commentId_likerId: { commentId, likerId } },
  });
  if (like) {
    await prisma.commentLikes.delete({ where: { commentId_likerId: like } });
    return false;
  } else {
    await prisma.commentLikes.create({ data: { commentId, likerId } });
    return true;
  }
}

/**
 * Flips a users like on a reply, meaning if the reply is already liked it gets unliked and vice versa
 * @param replyId id of the reply
 * @param likerId id of the user who liked
 * @returns boolean `true` if the user liked the reply, `false` otherwise
 */
export async function flipReplyLike(replyId: bigint, likerId: number) {
  const like = await prisma.replyLikes.findUnique({
    where: { replyId_likerId: { replyId, likerId } },
  });
  if (like) {
    await prisma.replyLikes.delete({
      where: { replyId_likerId: { likerId, replyId } },
    });
    return false;
  } else {
    await prisma.replyLikes.create({ data: { likerId, replyId } });
    return true;
  }
}
