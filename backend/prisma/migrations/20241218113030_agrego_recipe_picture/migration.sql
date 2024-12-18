-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "recipePicture" TEXT,
ALTER COLUMN "servings" DROP NOT NULL;
