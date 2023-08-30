-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "totalDocks" INTEGER NOT NULL,
    "docksAvailable" INTEGER NOT NULL,
    "bikesAvailable" INTEGER NOT NULL,
    "classicBikesAvailable" INTEGER NOT NULL,
    "smartBikesAvailable" INTEGER NOT NULL,
    "electricBikesAvailable" INTEGER NOT NULL,
    "rewardBikesAvailable" INTEGER NOT NULL,
    "rewardDocksAvailable" INTEGER NOT NULL,
    "kioskStatus" TEXT NOT NULL,
    "kioskPublicStatus" TEXT NOT NULL,
    "kioskConnectionStatus" TEXT NOT NULL,
    "kioskType" INTEGER NOT NULL,
    "addressStreet" TEXT NOT NULL,
    "addressCity" TEXT NOT NULL,
    "addressState" TEXT NOT NULL,
    "addressZipCode" TEXT NOT NULL,
    "closeTime" TEXT,
    "eventEnd" TEXT,
    "eventStart" TEXT,
    "isEventBased" BOOLEAN NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "kioskId" INTEGER NOT NULL,
    "notes" TEXT,
    "openTime" TEXT,
    "publicText" TEXT,
    "timeZone" TEXT,
    "trikesAvailable" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battery" (
    "id" SERIAL NOT NULL,
    "dockNumber" INTEGER NOT NULL,
    "isElectric" BOOLEAN NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "battery" INTEGER,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Battery" ADD CONSTRAINT "Battery_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
