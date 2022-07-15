import 'package:codinghelp_bot/codinghelp_bot.dart';
import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

void main() async {
  final client = NyxxFactory.createNyxxWebsocket(
    token,
    GatewayIntents.allUnprivileged,
    options: ClientOptions(
      initialPresence: PresenceBuilder.of(activity: ActivityBuilder.game('Use ++ prefix')),
    ),
  );

  final commands = CommandsPlugin(
    prefix: mentionOr((_) => '++'),
    guild: guild,
  );

  commands.check(CooldownCheck(
    // Give each user a per-command cooldown with a duration of one
    CooldownType.command | CooldownType.user,
    const Duration(seconds: 1),
  ));

  commands
    ..addCommand(ping)
    ..addCommand(wiki)
    ..addCommand(userInfo);

  client
    ..registerPlugin(Logging())
    ..registerPlugin(CliIntegration())
    ..registerPlugin(IgnoreExceptions())
    ..registerPlugin(commands);

  await client.connect();
  uptimeTimer.start();
}
