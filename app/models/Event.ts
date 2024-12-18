import { Participant } from "./Participant";

export interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: Date;
  eventEnd?: Date;
  location: string;
  createdAt?: Date;
  participants?: Participant[];
}
