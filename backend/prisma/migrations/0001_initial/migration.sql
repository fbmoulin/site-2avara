-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answered_at" DATETIME,
    "answered_by" TEXT,
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "with_whom" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "oab_number" TEXT,
    "process_number" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pre_reserved',
    "preferred_date" DATETIME,
    "confirmed_date" DATETIME,
    "zoom_link" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" DATETIME,
    "confirmed_by" TEXT,
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "demands" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "process_number" TEXT NOT NULL,
    "demand_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" DATETIME,
    "resolved_by" TEXT,
    "resolution_notes" TEXT
);
