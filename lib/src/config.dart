import 'dart:io';

import 'package:nyxx/nyxx.dart';

/// Get a [String] from an environment variable, throwing an exception if it is not set.
///
/// If [def] is provided and the environment variable [key] is not set, [def] will be returned
/// instead of throwing an exception.
String getEnv(String key, [String? def]) =>
    Platform.environment[key] ?? def ?? (throw Exception('Missing `$key` environment variable'));

/// The bot token.
final String token = getEnv('TOKEN');

/// The guild to run the bot in.
final Snowflake guild = Snowflake(getEnv('GUILD'));

// =========================
//     Bot configuration
// =========================

/// The URL to the bot's website.
final String websiteUrl = getEnv('WEBSITE', 'https://codinghelp.site');

/// The name to display when referring to the bot.
final String botName = getEnv('BOT_NAME', 'coding.help[ ]');

/// The name of the bot owner.
final String ownerName = getEnv('OWNER_NAME', 'Erin');

/// The URL to the website's uptime stats.
final String websiteUptime = getEnv('UPTIME_URL', 'https://stats.uptimerobot.com/0pj23Sk01K');

/// The URL to the bot's GitHub repository.
final String githubUrl = getEnv('GITHUB_URL', 'https://github.com/DudeThatsErin/codinghelp-bot');

/// The URL to the CodingHelp subreddit.
final String reddit = getEnv('REDDIT', 'https://reddit.com/r/CodingHelp');

/// The URL to the CodingHelp Discord server.
final String discord = getEnv('DISCORD', 'https://discord.gg/geQEUBm/');

/// The ID of the bot owner
final Snowflake ownerId = Snowflake(getEnv('OWNER_ID'));
