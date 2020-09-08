import {Segment} from "./segment";

export interface User {

  id: number;
  name: string;
  userName: string;
  firstName: string;
  lastName: string;
  segment: Segment;
  status: string;
}
