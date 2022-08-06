export const isDev = (id: string) => {
  const devs = process.env.DEVS?.split(",");
  return devs?.includes(id);
};
