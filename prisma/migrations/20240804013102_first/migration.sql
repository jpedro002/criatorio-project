-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bird" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "genealogyId" INTEGER NOT NULL,

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genealogy" (
    "id" SERIAL NOT NULL,
    "paternalGrandfather" TEXT,
    "paternalGrandmother" TEXT,
    "maternalGrandfather" TEXT,
    "maternalGrandmother" TEXT,
    "paternalGreatGrandfather1" TEXT,
    "paternalGreatGrandmother1" TEXT,
    "paternalGreatGrandfather2" TEXT,
    "paternalGreatGrandmother2" TEXT,
    "maternalGreatGrandfather1" TEXT,
    "maternalGreatGrandmother1" TEXT,
    "maternalGreatGrandfather2" TEXT,
    "maternalGreatGrandmother2" TEXT,
    "paternalGreatGreatGrandfather1" TEXT,
    "paternalGreatGreatGrandmother1" TEXT,
    "paternalGreatGreatGrandfather2" TEXT,
    "paternalGreatGreatGrandmother2" TEXT,
    "paternalGreatGreatGrandfather3" TEXT,
    "paternalGreatGreatGrandmother3" TEXT,
    "paternalGreatGreatGrandfather4" TEXT,
    "paternalGreatGreatGrandmother4" TEXT,
    "maternalGreatGreatGrandfather1" TEXT,
    "maternalGreatGreatGrandmother1" TEXT,
    "maternalGreatGreatGrandfather2" TEXT,
    "maternalGreatGreatGrandmother2" TEXT,
    "maternalGreatGreatGrandfather3" TEXT,
    "maternalGreatGreatGrandmother3" TEXT,
    "maternalGreatGreatGrandfather4" TEXT,
    "maternalGreatGreatGrandmother4" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genealogy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bird_genealogyId_key" ON "Bird"("genealogyId");

-- AddForeignKey
ALTER TABLE "Bird" ADD CONSTRAINT "Bird_genealogyId_fkey" FOREIGN KEY ("genealogyId") REFERENCES "Genealogy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
