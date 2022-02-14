# r/CodingHelp Discord Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/REjFpZ9) [![Twitter Follow](https://img.shields.io/twitter/follow/DudeThatsErin.svg?style=social)](https://twitter.com/DudeThatsErin)

This is a bot that I created and decided to make it open-source.

## Table of Contents
None yet!

### Setup Bot
1. Go to Discord's [Developer Portal](https://discordapp.com/developers/applications).

2. Create a new application.

> Take note of your bot's client ID. You will need this to invite your bot to a server.

3. Go to the bot tab and add a bot user to your application.

> Take note of your bot's token. You will need this in the next section.

4. Invite your bot to a server using: [https://discordapp.com/oauth2/authorize?scope=bot&client_id=DISCORD_BOT_CLIENT_ID_PLACEHOLDER](https://discordapp.com/oauth2/authorize?scope=bot&client_id=DISCORD_BOT_CLIENT_ID_PLACEHOLDER)

> Alternatively, `npx peterthehan/create-discord-bot` will generate a bot invite link for you when you create a bot project and you provide a valid bot token.

> A Discord bot's client ID is not the same as its token. Keep your token and any file containing it **private**. If your token ever leaks or you suspect it may have leaked, simply `regenerate` a new token to invalidate your compromised token.

