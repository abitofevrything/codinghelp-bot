import 'package:nyxx_commands/nyxx_commands.dart';

/// A [Stopwatch] keeping track of uptime.
final uptimeTimer = Stopwatch();

/// A [Converter] that greedily converts a String
const greedyStringConverter = Converter<String>(_greedyString);

String? _greedyString(StringView view, IChatContext context) {
  String result = view.remaining;
  view.index = view.end;

  result = result.trim();
  if (result.isEmpty) {
    return null;
  }

  return result;
}
