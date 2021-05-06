import { bot, cache, ChannelTypes, snowflakeToBigint } from "../../deps.ts";

bot.arguments.set("guildtextchannel", {
  name: "guildtextchannel",
  execute: async function (_argument, parameters, message) {
    const [id] = parameters;
    if (!id) return;

    const guild = cache.guilds.get(message.guildId);
    if (!guild) return;

    const channelIdOrName = id.startsWith("<#")
      ? id.substring(2, id.length - 1)
      : id.toLowerCase();

    const channel = cache.channels.get(snowflakeToBigint(channelIdOrName)) ||
      cache.channels.find((channel) =>
        channel.name === channelIdOrName && channel.guildId === guild.id
      );

    // TODO: support all new text channels
    if (
      channel?.type !== ChannelTypes.GuildText &&
      channel?.type !== ChannelTypes.GuildNews
    ) {
      return;
    }

    return channel;
  },
});