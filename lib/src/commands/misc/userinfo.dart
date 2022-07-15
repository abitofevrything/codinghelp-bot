import 'package:intl/intl.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final userInfo = ChatCommand(
  'user-info',
  'Get information about a user',
  aliases: ['user', 'person', 'useri', 'userinfo'],
  id('user-info', (
    IChatContext context, [
    @Description('The user to fetch information for') IUser? user,
  ]) async {
    if (context is MessageChatContext) {
      // Command was triggered with a reply, get the info for the user that was replied to.
      IMessageAuthor? author = context.message.referencedMessage?.message?.author;

      if (author is IUser) {
        user ??= author;
      }
    }

    // Default to the user that triggered the command.
    user ??= context.user;
    IMember? member = await context.guild?.fetchMember(user.id);

    final joinedDiscord = DateFormat('d/M/y').format(user.id.timestamp);
    final joinedServer = DateFormat('d/M/y').format(member?.joinedAt ?? user.id.timestamp);

    final roles =
        member?.roles.map((role) => role.getFromCache()?.name).whereType<String>().join(', ');

    final embed = EmbedBuilder()
      ..color = DiscordColor.green
      ..addAuthor((author) {
        author.name = user!.username;
        author.iconUrl = user.avatarURL();
      })
      ..title = 'About this user...'
      ..thumbnailUrl = user.avatarURL()
      ..addField(name: 'Username', content: user.username, inline: true)
      ..addField(name: 'Discriminator', content: user.discriminator, inline: true)
      ..addField(
        name: 'Nickname',
        content: member?.nickname ?? user.username,
        inline: true,
      )
      ..addField(name: 'User ID', content: user.id.toString(), inline: true)
      ..addField(name: 'Tag', content: user.tag, inline: true)
      ..addField(name: 'Joined server on', content: joinedServer, inline: true)
      ..addField(name: 'Joined Discord on', content: joinedDiscord, inline: true)
      ..timestamp = DateTime.now()
      ..addFooter((footer) {
        footer.text = 'If anything is wrong, please report this!';
        footer.iconUrl = context.guild?.iconURL();
      });

    if (roles != null && roles.isNotEmpty) {
      embed.addField(name: 'Roles', content: roles, inline: true);
    }

    await context.respond(MessageBuilder.embed(embed));
  }),
);
