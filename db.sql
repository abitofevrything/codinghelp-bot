/* This is how the databases are set up. I copied and pasted this into PuTTY but you can copy and paste it into PHPMyAdmin and that will work as well. */

CREATE TABLE IF NOT EXISTS GuildSetup (
    guildID VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerId VARCHAR(100) NOT NULL,
    cmdPrefix CHAR(10) NOT NULL DEFAULT '++',
    modLogId VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    userID CHAR(25) PRIMARY KEY NOT NULL,
    intLastGaveRepOn INTEGER DEFAULT 0,
    intScore INTEGER DEFAULT 0,
    intLevel INTEGER DEFAULT 0,
    intReputation INTEGER DEFAULT 0,
    nickName VARCHAR(1000) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS Challenges (
    guildId VARCHAR(100) NOT NULL,
    announcementsChannel VARCHAR(100) NOT NULL,
    submissionsDumpChannel VARCHAR(100) NOT NULL,
    userID CHAR(25) NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(guildID) REFERENCES GuildSetup(guildID)
);