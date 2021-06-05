CREATE DATABASE sakura;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL,
    guildName VARCHAR(100) NOT NULL,
    ownerID VARCHAR(300) NOT NULL,
    ownerName VARCHAR(300) NOT NULL,
    region VARCHAR(300) NOT NULL,
    memberCount BIGINT(255) NOT NULL,
    createdAt DATE NOT NULL,
    UNIQUE KEY(guildId)
);

CREATE TABLE reactionRoles (
    guildId VARCHAR(100) NOT NULL,
    messageID VARCHAR(100) NOT NULL,
    emoji VARCHAR(100) NOT NULL,
    roleID VARCHAR(100) NOT NULL,
    UNIQUE KEY(guildId)
);

CREATE TABLE Suggs (
    noSugg BIGINT(255) NOT NULL,
    Author VARCHAR(300) NOT NULL,
    Avatar VARCHAR(2048) NOT NULL,
    Message VARCHAR(50000) NOT NULL,
    Moderator VARCHAR(300) NOT NULL DEFAULT 'New Suggestion, No Mod.',
    LAST_EDITED TIMESTAMP NOT NULL,
    STATUS VARCHAR(2048) NOT NULL DEFAULT 'Needs votes!',
    UNIQUE KEY(noSugg, Author)
);

CREATE TABLE Challenges (
    guildId VARCHAR(100) NOT NULL,
    player VARCHAR(300) NOT NULL,
    challengeAnnouncementsChannel VARCHAR(100) NOT NULL,
    submissionsDumpChannel VARCHAR(100) NOT NULL,
    challengeParticipants VARCHAR(100) NOT NULL,
    UNIQUE KEY(guildId, player)
);

CREATE TABLE Challenge (
    guildId VARCHAR(100) NOT NULL,
    msgId BIGINT(255) NOT NULL,
    moderator VARCHAR(300) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description VARCHAR(50000) NOT NULL,
    challengeNo VARCHAR(255) NOT NULL,
);

CREATE TABLE Submissions (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    msgId BIGINT(255) NOT NULL,
    author VARCHAR(300) NOT NULL,
    message VARCHAR(50000) NOT NULL,
    challengeNo VARCHAR(255) NOT NULL,
    moderator VARCHAR(255) NOT NULL,
    points VARCHAR(1000)
);

CREATE TABLE Thanks (
    guildId VARCHAR(255) NOT NULL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    thanks int NOT NULL,
    last_thanks TIMESTAMP NOT NULL
);