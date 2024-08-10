-- CreateTable
CREATE TABLE "departaments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "departamentId" INTEGER,
    CONSTRAINT "Task_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
