import CustomClient from "src/modules/customClient";

export default (client: CustomClient): void => {
  client.on("messageUpdate", async () => {});
};
