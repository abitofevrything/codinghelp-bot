import 'package:codinghelp_bot/codinghelp_bot.dart';
import 'package:nyxx_commands/nyxx_commands.dart';
import 'package:nyxx_interactions/nyxx_interactions.dart';

final wiki = ChatCommand(
  'wiki',
  'Provides links to CodingHelp resources',
  aliases: ['kb', 'knowledgebase', 'site', 'website'],
  id('wiki', (IChatContext context) async {
    await context.respond(
      ComponentMessageBuilder()
        ..content = 'Here are the links to our other locations!'
        ..addComponentRow(ComponentRowBuilder()
          ..addComponent(LinkButtonBuilder('Our Website', websiteUrl))
          ..addComponent(LinkButtonBuilder('Our Subreddit', reddit))
          ..addComponent(LinkButtonBuilder('Our Discord', discord))),
    );
  }),
);
