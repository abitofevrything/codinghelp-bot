import 'package:intl/intl.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

const _verificationLevels = {
  0: 'None',
  1: 'Low',
  2: 'Medium',
  3: '(╯°□°）╯︵ ┻━┻',
  4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
};

final serverInfo = ChatCommand(
  'server-info',
  'Get information about the current server',
  aliases: ['server', 'club', 'serveri', 'serverinfo'],
  checks: [GuildCheck.all()],
  id('server-info', (IChatContext context) async {
    final owner = await context.guild!.owner.getOrDownload();

    final emojiCount = context.guild!.emojis.length;
    final normalEmojiCount = context.guild!.emojis.values.fold<int>(0, (count, emoji) {
      if (emoji.animated) {
        count++;
      }

      return count;
    });
    final animatedEmojiCount = emojiCount - normalEmojiCount;

    final embed = EmbedBuilder()
      ..color = DiscordColor.wheat
      ..title = 'r/CodingHelp server info'
      ..thumbnailUrl = context.guild!.iconURL()
      ..addField(
        name: '**Name & ID**',
        content: '${context.guild!.name} - `${context.guild!.id}`',
        inline: true,
      )
      ..addField(name: '**Owner**', content: '${owner.username} - `${owner.id}`', inline: true)
      ..addField(
        name: '**Boost Tier**',
        content: 'Tier ${context.guild!.premiumTier}',
        inline: true,
      )
      ..addField(
        name: '**Verification Level**',
        content: _verificationLevels[context.guild!.verificationLevel],
        inline: true,
      )
      ..addField(
        name: '**Boost Count**',
        content: context.guild!.premiumSubscriptionCount ?? 0,
        inline: true,
      )
      ..addField(
        name: '**Time Created**',
        content: DateFormat('d/M/y, Hm').format(context.guild!.createdAt),
        inline: true,
      )
      ..addField(name: '**Role Count**', content: context.guild!.roles.length, inline: true)
      ..addField(name: '**Emoji Count**', content: emojiCount, inline: true)
      ..addField(name: '**Regular Emoji Count**', content: normalEmojiCount, inline: true)
      ..addField(name: '**Animated Emoji Count**', content: animatedEmojiCount, inline: true)
      ..addField(
        name: '**Channels**',
        content:
            context.guild!.channels.where((channel) => channel is! ICategoryGuildChannel).length,
        inline: true,
      )
      ..timestamp = DateTime.now()
      ..addFooter((footer) {
        footer.text = 'If anything is wrong, please report this!';
        footer.iconUrl = context.guild!.iconURL();
      });

    await context.respond(MessageBuilder.embed(embed));
  }),
);
