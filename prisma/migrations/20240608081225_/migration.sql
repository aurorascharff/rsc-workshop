-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "first" TEXT,
    "last" TEXT,
    "avatar" TEXT,
    "email" TEXT,
    "github" TEXT,
    "position" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT
);
