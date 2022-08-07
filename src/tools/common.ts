function isAnything(groupName: string, id: string) {
  if (!process.env[groupName]) {
    console.log("ERROR! Can't locate groups in enviromental variables.");
    console.log(`in ${__dirname}`);
    console.log(`at ${__filename}`);
    return;
  }
  const group = process.env[groupName]!.split(".");
  return group?.includes(id);
}

export const isUni = (id: string) => isAnything("UNI", id);

export const isDev = (id: string) => isAnything("DEV", id);
