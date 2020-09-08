import {User} from "./user";
import {Consent} from "./consent";
import {App} from "./app";
import {AccountType} from "./AccountType";

export interface Account {

  id: number;
  accountNumber: string;
  consents:  Consent [];
  user: User;
  apps:  App [];
  status: string;
  accountType: AccountType;
}
