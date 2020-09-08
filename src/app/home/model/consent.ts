import {App} from "./app";
import {Permission} from "./permission";
import {Account} from "./account";

export interface Consent {

  id: number;
  permissions: Permission [];
  app: App;
  account: Account;
  expirationDateTime: string;
  transactionFromDateTime: string;
  transactionToDateTime: string;
  status: string;
}
