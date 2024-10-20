/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `content` on the `Webhook` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Webhook` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Webhook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "headers" TEXT,
    "method" TEXT,
    "path" TEXT,
    "body" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Webhook" ("id") SELECT "id" FROM "Webhook";
DROP TABLE "Webhook";
ALTER TABLE "new_Webhook" RENAME TO "Webhook";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
