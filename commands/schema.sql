CREATE DATABASE crazyyall;

CREATE TABLE Suggs (
    Author VARCHAR(300) NOT NULL PRIMARY KEY,
    Message VARCHAR(50000) NOT NULL,
    Moderator VARCHAR(300) NOT NULL,
    LAST_EDITED TIMESTAMP NOT NULL,
    STATUS VARCHAR(300) NOT NULL DEFAULT 'Needs votes!'
);

CREATE TABLE Challenges (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    player VARCHAR(300) NOT NULL,
    challengeAnnouncementsChannel VARCHAR(100) NOT NULL,
    submissionsDumpChannel VARCHAR(100) NOT NULL,
    challengeParticipants VARCHAR(100) NOT NULL
);

CREATE TABLE Points (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    user VARCHAR(300) NOT NULL,
    xpLogId VARCHAR(100) NOT NULL,
    nextLevel INT(255) NOT NULL DEFAULT '0',
    currentPoints INT(255) NOT NULL DEFAULT '0',
    remainingPoints INT(255) NOT NULL DEFAULT '100'
);