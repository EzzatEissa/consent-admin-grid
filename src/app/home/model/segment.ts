import {Permission} from "./permission";
import {User} from "./user";

export interface Segment {
  id: number;
  name: string
  code: string;
  permissions: Permission [];
  user: User [];
  status: string;

}
