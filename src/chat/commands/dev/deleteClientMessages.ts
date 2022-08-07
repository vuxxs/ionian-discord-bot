import CommandParameters from "src/modules/commandParameters";
import { isDev } from "src/tools/common";

export function deleteClientAnnouncements({ msg, client }: CommandParameters) {
  if (!isDev(msg.author.id)) return;
  client.announcements?.forEach((announcement) => {
    announcement.delete();
  });
}

deleteClientAnnouncements.dev = true;
