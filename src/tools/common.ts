require("dotenv").config();

export const isAdmin = (id: string) => {
  const admins = process.env.ADMINS?.split(",");
  return admins?.includes(id);
};
