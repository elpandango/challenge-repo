export type Protokoll = {
  message: string;
  typ: "log" | "warning" | "error";
  username: string;
  stamp: string;
};
