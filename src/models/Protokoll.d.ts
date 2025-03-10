export type Protokoll = {
  id: number;
  message: string;
  typ: "log" | "warning" | "error";
  username: string;
  mitarbeiter_vorname: string;
  mitarbeiter_name: string;
  stamp: string;
};
