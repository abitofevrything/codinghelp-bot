import 'package:codinghelp_bot/src/config.dart';
import 'package:nyxx_commands/nyxx_commands.dart';

final ownerCheck = UserCheck.id(ownerId);
final modCheck = Check.any([ownerCheck, UserCheck.anyId(modIds)]);
