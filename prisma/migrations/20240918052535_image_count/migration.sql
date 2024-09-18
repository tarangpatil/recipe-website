-- CreateTable
CREATE TABLE "ImageCount" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "coverImageCount" BIGINT NOT NULL,
    "stepImageCount" BIGINT NOT NULL,

    CONSTRAINT "ImageCount_pkey" PRIMARY KEY ("id")
);
