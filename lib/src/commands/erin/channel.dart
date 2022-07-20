import 'package:codinghelp_bot/src/checks.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final channel = ChatCommand.textOnly(
  'channel',
  'Sends a channel list for the channel guide channel.',
  checks: [ownerCheck],
  id('channel', (MessageChatContext context) async {
    final embed = EmbedBuilder()
      ..color = DiscordColor.gray
      ..title = 'Do you need help navigating the server?'
      ..description =
          'Just take a look at the different categories below and that should help you navigate the server. You can click the name of the channel if you find the one you are looking for.'
      ..addField(
        name: 'Information',
        content:
            '<#383032186317832202> - This channel gives you basic information about CodingHelp\'s Server.\n<#703989632110690324> - This is where you can select any roles you need.\n<#773592987141668885> - This is where you can see our Discord Partners and what that is.\n<#359760352470368281> - This is where the moderators post important announcements for the server, subreddit, discord bot, or website.\n',
      )
      ..addField(
        name: 'Suggestions',
        content:
            '<#433877613128450061> - This is where you can suggest changes to the server, bot, website or subreddit.\n<#799835436783763467> - This is where you can discuss our suggestions.',
      )
      ..addField(
        name: 'Main',
        content:
            '<#679190375000178689> - This is where you can introduce yourself to the server.\n<#383021190723272705> - This is where you can ask all of your coding questions that don\'t fit into the questions below.\n<#756992144170024991> - This is where you can request for people to help you with coding. Free or Paid. You **do not** have to pay for people\'s help in this channel.\n<#785630099822870548> - This is where you can use the <@504095380166803466> bot.\n<#786048378119127040> - This is where you can share projects that you have been working on.',
      )
      ..addField(
        name: 'Languages',
        content:
            '<#872529829088604262> - questions about meta-programming.\n\nI am not going to list these out. Each channel is where you post questions about a particular language you have. If you want to suggest a channel, you can do that in <#433877613128450061>. If you aren\'t sure which language you should post in, you can post your question in <#383021190723272705>.',
      )
      ..addField(
        name: 'Off Topic',
        content:
            '<#359760149683896322> - This is where you can talk about anything that doesn\'t have to do with programming.\n<#382912135619149835> - This is where you can post memes.\n<#844185253308530688> - This is where you can talk about video games.\n<#844185400946982923> - This is where you can talk about tech.\n<#844185945498451968> - If you have something going on in your life and you need advice, you can talk about it here. Note: You do have to be 18 or older to access this channel.\n<#844185635874930750> - You can spam the server in this channel. Please read the description though as pings are highly monitored.\n<#433962402292432896> - This is where you can run commands for any bots in our server.',
      )
      ..addField(
        name: 'Voice Channels',
        content: 'This is where you can join to talk to fellow members of our server.',
      )
      ..addFooter((footer) {
        footer.text = 'Last Updated by DudeThatsErin#8061';
      })
      ..timestamp = DateTime.now();

    await context.channel.sendMessage(MessageBuilder.embed(embed));
  }),
);
