-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RelayTarget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_RelayTarget" ("createdAt", "id", "name", "url") SELECT "createdAt", "id", "name", "url" FROM "RelayTarget";
DROP TABLE "RelayTarget";
ALTER TABLE "new_RelayTarget" RENAME TO "RelayTarget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
