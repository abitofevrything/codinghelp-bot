import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final tech = ChatCommand(
  'tech',
  'Refers user to the Techway Server for additional technical help',
  id('tech', (IChatContext context) async {
    await context.respond(MessageBuilder.content(
      'Hey! Not sure if you knew this but you can visit the Techway server for additional help. Here is the invite link: https://discord.gg/cBUetVq',
    ));
  }),
);
