import 'package:codinghelp_bot/src/checks.dart';
import 'package:codinghelp_bot/src/config.dart';
import 'package:codinghelp_bot/src/helpers.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final subStatus = ChatCommand.textOnly(
  'sub-status',
  'Pushes an embed to display in the channel about a certain update.',
  aliases: ['sub-update', 'substatus', 'subupdate'],
  checks: [modCheck],
  id('sub-status', (
    MessageChatContext context,
    @UseConverter(greedyStringConverter) String status,
  ) async {
    final channel = context.client.channels[announcementChannelId] as ITextChannel;

    final embed = EmbedBuilder()
      ..color = DiscordColor.purple
      ..title = 'Hello, The Moderators have a new update for you!'
      ..description = status
      ..timestamp = DateTime.now()
      ..addFooter((footer) {
        footer.text = 'Want to suggest a feature for the website? Use ++suggest';
      });

    await channel.sendMessage(
      MessageBuilder.content('Hello <@&780111997861363742>,')..embeds = [embed],
    );

    await context.message.createReaction(UnicodeEmoji('👍'));
  }),
);
