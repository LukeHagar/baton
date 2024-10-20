/*
  Warnings:

  - You are about to drop the column `query` on the `Webhook` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Webhook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "headers" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Webhook" ("body", "createdAt", "headers", "id", "method", "path") SELECT "body", "createdAt", "headers", "id", "method", "path" FROM "Webhook";
DROP TABLE "Webhook";
ALTER TABLE "new_Webhook" RENAME TO "Webhook";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
