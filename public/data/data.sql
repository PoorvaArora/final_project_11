DROP TABLE IF EXISTS Client

CREATE TABLE Client (
  clientId INT PRIMARY KEY NOT NULL,
  clientName VARCHAR(31) NOT NULL,
  clientDescription VARCHAR(200) NOT NULL,
  gicsSector VARCHAR(31) NOT NULL,
  gicsSubIndustry VARCHAR(31) NOT NULL,
  headquarters VARCHAR(50) NOT NULL
)

DROP TABLE IF EXISTS Sensor

CREATE TABLE Sensor (
  sensorId INT PRIMARY KEY NOT NULL,
  sensorName VARCHAR(31) NOT NULL,
  sensorDescription VARCHAR(200) NOT NULL,
  manufacturer VARCHAR(31) NOT NULL,
  totalLifeExpentancyHours NUMERIC NOT NULL
)

DROP TABLE IF EXISTS sensorDeployed

CREATE TABLE sensorDeployed (
  TA INT  NOT NULL,
  sensorId INT NOT NULL,
  turbineDeployedId INT PRIMARY KEY NOT NULL,
  serialNumber VARCHAR(31) NOT NULL,
  deployedDate DATE NOT NULL,
  CONSTRAINT sensorId FOREIGN KEY REFERENCES Sensor(sensorId)

)

DROP TABLE IF EXISTS sensorTimeSeries
CREATE TABLE sensorTimeSeries
(
  sensorDeployedId INT NOT NULL,
  dataCollectedDate DATE NOT NULL,
  output NUMERIC NOT NULL,
  heatRate NUMERIC NOT NULL,
  compressorEfficiency NUMERIC NOT NULL,
  availability NUMERIC NOT NULL,
  reliability NUMERIC NOT NULL,
  firedHours NUMERIC NOT NULL,
  trips INT NOT NULL,
  starts INT NOT NULL,
  CONSTRAINT sensorDeployedId FOREIGN KEY REFERENCES sensorDeployed(TA)

)

DROP TABLE IF EXISTS site
CREATE TABLE site (
  siteId INT PRIMARY KEY NOT NULL,
  clientId INT NOT NULL,
  siteName VARCHAR(31) NOT NULL,
  siteDescription VARCHAR(200) NOT NULL,
  primaryContact VARCHAR(31) NOT NULL,
  capacity NUMBER NOT NULL,
  commercialDate DATE NOT NULL,
  addrLine1 VARCHAR(200) NOT NULL,
  addrLine2 VARCHAR(200),
  addrCity VARCHAR(31) NOT NULL,
  addrState VARCHAR(9) NOT NULL,
  addrZip VARCHAR(31) NOT NULL,

  addrCountry VARCHAR(31) NOT NULL
  CONSTRAINT clientId FOREIGN KEY REFERENCES Client(clientId)
)

DROP TABLE IF EXISTS turbine
CREATE TABLE turbine (
  turbineId INT PRIMARY KEY NOT NULL,
  turbineName VARCHAR(31) NOT NULL,
  capacity NUMERIC NOT NULL,
  rampUpTime NUMERIC NOT NULL,
  maintenanceInterval NUMERIC NOT NULL,
)
DROP TABLE IF EXISTS turbineDeployed
CREATE TABLE turbineDeployed (
  turbineDeployedId INT PRIMARY KEY NOT NULL,
  turbineId INT,
  siteId INT,
  serialNumber VARCHAR(31) NOT NULL,
  deployedDate DATE NOT NULL,
  totalFiredHours NUMERIC NOT NULL,
  totalStarts NUMERIC NOT NULL,
  lastPlannedOutageDate DATE NOT NULL,
  lastUnplannedOutageDate DATE NOT NULL
)
