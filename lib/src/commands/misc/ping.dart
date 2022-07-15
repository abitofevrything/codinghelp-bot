import 'package:codinghelp_bot/codinghelp_bot.dart';
import 'package:duration/duration.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final ping = ChatCommand(
  'ping',
  'Checks if the bot is online',
  aliases: ['pong', 'beep', 'online', 'bot', 'hello', 'hi'],
  checks: [CooldownCheck(CooldownType.user, const Duration(seconds: 5))],
  id('ping', (IChatContext context) async {
    final uptime = prettyDuration(uptimeTimer.elapsed);

    final description = '''
Thanks for checking if $botName was online. $botName has been awake for `$uptime`! That is the last time $ownerName reset $botName.
You can see the uptime of my website [here]($websiteUptime).

My prefix is `++`, or you can mention me.

I am the official bot of the [CodingHelp]($websiteUrl) Discord Server!

You can find my source code [on GitHub]($githubUrl).

If you have found an issue with the bot, please use the `report` command to report the issue.
''';

    final embed = EmbedBuilder()
      ..color = DiscordColor.white
      ..title = (context.client as INyxxWebsocket).self.tag
      ..url = websiteUrl
      ..thumbnailUrl = (context.client as INyxxWebsocket).self.avatarURL()
      ..timestamp = DateTime.now()
      ..description = description
      ..addField(
        name: 'CodingHelp locations',
        content: '''
- [Reddit]($reddit)
- [Discord]($discord)
- [Our Website]($websiteUrl)
''',
      )
      ..addFooter((footer) {
        footer.text = 'Thanks for using $botName!';
        footer.iconUrl = (context.client as INyxxWebsocket).self.avatarURL();
      });

    await context.respond(MessageBuilder.embed(embed));
  }),
);
