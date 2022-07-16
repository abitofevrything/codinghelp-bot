import 'package:codinghelp_bot/src/checks.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final access = ChatCommand.textOnly(
  'access',
  'Displays an embed telling people how to get access to our server.',
  checks: [ownerCheck],
  (IChatContext context) async {
    final embed = EmbedBuilder()
      ..color = DiscordColor.orange
      ..title = 'Get Access to our Server!'
      ..description =
          'Please check <#703989632110690324> and react to the correct message to get access to our server!';

    await context.channel.sendMessage(MessageBuilder.embed(embed));
  },
);
