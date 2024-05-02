import { IHost } from "./Host";

export interface IRoom {
  _id: string;
  category: string;
  host: IHost;
  players: string[];
  isActive: boolean;
  __v: number;
}
