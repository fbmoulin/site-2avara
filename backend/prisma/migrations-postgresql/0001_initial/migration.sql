-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answered_at" TIMESTAMP(3),
    "answered_by" TEXT,
    "notes" TEXT,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "with_whom" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "oab_number" TEXT,
    "process_number" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pre_reserved',
    "preferred_date" TIMESTAMP(3),
    "confirmed_date" TIMESTAMP(3),
    "zoom_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(3),
    "confirmed_by" TEXT,
    "notes" TEXT,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demands" (
    "id" TEXT NOT NULL,
    "process_number" TEXT NOT NULL,
    "demand_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),
    "resolved_by" TEXT,
    "resolution_notes" TEXT,

    CONSTRAINT "demands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_messages_status_idx" ON "contact_messages"("status");
CREATE INDEX "contact_messages_created_at_idx" ON "contact_messages"("created_at");

-- CreateIndex
CREATE INDEX "appointments_status_idx" ON "appointments"("status");
CREATE INDEX "appointments_created_at_idx" ON "appointments"("created_at");
CREATE INDEX "appointments_process_number_idx" ON "appointments"("process_number");

-- CreateIndex
CREATE INDEX "demands_status_idx" ON "demands"("status");
CREATE INDEX "demands_priority_idx" ON "demands"("priority");
CREATE INDEX "demands_created_at_idx" ON "demands"("created_at");
CREATE INDEX "demands_process_number_idx" ON "demands"("process_number");
