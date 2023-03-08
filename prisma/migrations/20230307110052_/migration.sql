-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "passwordHash" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'GUEST',
    "preferencesId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "FlowRow" (
    "id" TEXT NOT NULL,
    "x" INTEGER DEFAULT 100,
    "y" INTEGER DEFAULT 100,
    "label" TEXT NOT NULL DEFAULT '',
    "input" TEXT,
    "output" TEXT,
    "type" TEXT NOT NULL DEFAULT 'node',
    "name" TEXT NOT NULL DEFAULT '',
    "percTE" INTEGER DEFAULT 0,
    "equipmentType" TEXT DEFAULT '',
    "manufacturer" TEXT DEFAULT '',
    "model" TEXT DEFAULT '',
    "modelVersion" TEXT DEFAULT '',
    "yearBuilt" INTEGER DEFAULT 0,
    "size" INTEGER DEFAULT 0,
    "sizeUnit" INTEGER DEFAULT 0,
    "value" INTEGER DEFAULT 0,
    "latitude" DOUBLE PRECISION DEFAULT 0,
    "longitude" DOUBLE PRECISION DEFAULT 0,
    "geotagId" TEXT DEFAULT '',
    "isCriteriaMet" BOOLEAN DEFAULT false,
    "lastModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "authors" TEXT DEFAULT '',
    "viewers" TEXT DEFAULT '',

    CONSTRAINT "FlowRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "userId" TEXT,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "lastModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "authors" TEXT DEFAULT '',
    "viewers" TEXT DEFAULT '',
    "latitude" DOUBLE PRECISION DEFAULT 0,
    "longitude" DOUBLE PRECISION DEFAULT 0,
    "geotagId" TEXT DEFAULT '',
    "isCriteriaMet" BOOLEAN DEFAULT false,
    "input" TEXT,
    "output" TEXT,
    "type" TEXT NOT NULL DEFAULT 'node',
    "riskPerc" INTEGER DEFAULT 0,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_preferencesId_key" ON "User"("preferencesId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
