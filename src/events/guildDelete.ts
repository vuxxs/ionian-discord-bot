import CustomClient from "src/modules/customClient";

export default (client: CustomClient): void => {
  client.on("guildDelete", async (guild) => {
    console.log(`Left Guild: ${guild.name} ID: ${guild.id}`);
  });
};
