/*
  Warnings:

  - Made the column `body` on table `Webhook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `headers` on table `Webhook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `method` on table `Webhook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `path` on table `Webhook` required. This step will fail if there are existing NULL values in that column.
  - Made the column `query` on table `Webhook` required. This step will fail if there are existing NULL values in that column.

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
    "query" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Webhook" ("body", "createdAt", "headers", "id", "method", "path", "query") SELECT "body", "createdAt", "headers", "id", "method", "path", "query" FROM "Webhook";
DROP TABLE "Webhook";
ALTER TABLE "new_Webhook" RENAME TO "Webhook";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
