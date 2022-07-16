import 'package:codinghelp_bot/codinghelp_bot.dart';
import 'package:codinghelp_bot/src/checks.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final botStatus = ChatCommand.textOnly(
  'bot-status',
  'Pushes an embed to display in the channel about a certain update.',
  aliases: ['bot-update', 'botstatus', 'botupdate'],
  checks: [modCheck],
  id('bot-status', (
    MessageChatContext context,
    @UseConverter(greedyStringConverter) String status,
  ) async {
    final channel = context.client.channels[announcementChannelId] as ITextChannel;

    final embed = EmbedBuilder()
      ..color = DiscordColor.purple
      ..title = 'Hello, Erin has a new update for you!'
      ..description = status
      ..timestamp = DateTime.now()
      ..addFooter((footer) {
        footer.text = 'Want to suggest a feature for the bot? Use ++suggest';
      });

    await channel.sendMessage(
      MessageBuilder.content('Hey, <@&772154227459883019>,')..embeds = [embed],
    );

    await context.message.createReaction(UnicodeEmoji('👍'));
  }),
);
