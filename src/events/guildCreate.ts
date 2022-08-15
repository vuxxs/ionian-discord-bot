import CustomClient from "src/modules/customClient";

export default (client: CustomClient): void => {
  client.on("guildCreate", async (guild) => {
    console.log(`Joined Guild: ${guild.name} ID: ${guild.id}`);
  });
};
