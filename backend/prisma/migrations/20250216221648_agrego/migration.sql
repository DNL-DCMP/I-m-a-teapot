/*
  Warnings:

  - You are about to drop the column `servings` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToRecipe" DROP CONSTRAINT "_CategoryToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "servings";

-- DropTable
DROP TABLE "_CategoryToRecipe";

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "recipeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("recipeId","categoryId")
);

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
