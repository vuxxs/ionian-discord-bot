import CustomClient from "src/modules/customClient";

export default (client: CustomClient): void => {
  client.on("error", async (error: Error) => {
    console.log("Bot encountered an error and went in the error event..");
    console.log("=======================");
    console.log(error);
    console.log("=======================");
  });
};
