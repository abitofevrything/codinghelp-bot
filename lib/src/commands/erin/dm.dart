import 'package:codinghelp_bot/src/checks.dart';
import 'package:codinghelp_bot/src/helpers.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';
import 'package:nyxx_interactions/nyxx_interactions.dart';

/// First try to parse the user, then fallback to a String
/// If a user wasn't parsed, we'll try to get it from the message reply, if any
const _userOrStringConverter = FallbackConverter([userConverter, greedyStringConverter]);

final dm = ChatCommand.textOnly(
  'dm',
  'Shoots an official embed to a user that is replied to or pinged.',
  checks: [modCheck],
  id('dm', (
    MessageChatContext context, [
    @UseConverter(_userOrStringConverter) dynamic /* IUser|String */ target,
    @UseConverter(greedyStringConverter) String? message,
  ]) async {
    if (message == null) {
      message = target as String;

      IMessageAuthor? referencedUser = context.message.referencedMessage?.message?.author;
      if (referencedUser is IUser) {
        target = referencedUser;
      }
    }

    if (target is! IUser) {
      await context.respond(MessageBuilder.content('No target found.'));
      return;
    }

    final embed = EmbedBuilder()
      ..color = DiscordColor.aquamarine
      ..title = 'You received a DM from r/CodingHelp'
      ..thumbnailUrl = 'https://imgur.com/U6cwQxj.png'
      ..description =
          '${context.user.mention} sent you the following message:```$message```\nIf you have any questions, please send a message to <@575252669443211264>.'
      ..timestamp = DateTime.now()
      ..addFooter((footer) {
        footer.text = 'This is not an official warning.';
        footer.iconUrl = 'https://imgur.com/U6cwQxj.png';
      });

    await target.sendMessage(ComponentMessageBuilder()
      ..embeds = [embed]
      ..addComponentRow(
        ComponentRowBuilder()
          ..addComponent(LinkButtonBuilder('Our Website', 'https://codinghelp.site'))
          ..addComponent(LinkButtonBuilder('Our Subreddit', 'https://reddit.com/r/CodingHelp')),
      ));

    await context.message.createReaction(UnicodeEmoji('👍'));
  }),
);
