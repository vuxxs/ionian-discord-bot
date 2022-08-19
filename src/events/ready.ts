import { ActivityType } from "discord.js";
import CustomClient from "src/modules/customClient";
import registerSlashCommands from "src/modules/registerSlashCommands";

export default (client: CustomClient): void => {
  client.on("ready", async () => {
    client.user?.setActivity({
      type: ActivityType.Watching,
      name: `${client.prefix}help`,
    });
    console.log(`${client.user?.username} is online`);

    if (client.player) {
      client.player.on("error", (queue, error) => {
        console.log(
          `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
        );
      });
      client.player.on("connectionError", (queue, error) => {
        console.log(
          `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
        );
      });

      client.player.on("trackStart", (queue: any, track) => {
        queue.metadata.channel.send(
          `🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`
        );
      });

      client.player.on("trackAdd", (queue: any, track) => {
        console.log(queue);
        queue.metadata.channel.send(`🎶 | Track **${track.title}** queued!`);
      });

      client.player.on("botDisconnect", (queue: any) => {
        queue.metadata.channel.send(
          "❌ | I was manually disconnected from the voice channel, clearing queue!"
        );
      });

      client.player.on("channelEmpty", (queue: any) => {
        queue.metadata.channel.send(
          "❌ | Nobody is in the voice channel, leaving..."
        );
      });

      client.player.on("queueEnd", (queue: any) => {
        queue.metadata.channel.send("✅ | Queue finished!");
      });
    }

    registerSlashCommands(client);
  });
};
