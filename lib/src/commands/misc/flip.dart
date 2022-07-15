import 'dart:math';

import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final _random = Random();

final coinFlip = ChatCommand(
  'coin-flip',
  'Flip a coin',
  aliases: ['flip', 'coinflip', 'heads', 'tails'],
  id('coin-flip', (IChatContext context) async {
    const choices = ['HEADS!', 'TAILS!'];

    final choice = choices[_random.nextInt(2)];

    final embed = EmbedBuilder()
      ..color = DiscordColor.hotPink
      ..title = 'You got...'
      ..description = choice
      ..timestamp = DateTime.now();

    await context.respond(MessageBuilder.embed(embed));
  }),
);
