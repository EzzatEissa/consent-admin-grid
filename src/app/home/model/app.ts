import {Permission} from "./permission";

export interface App {

  id: number;
  clientId: string;
  status: string;
  clientSecret: string;
  authorizedGrantTypes: string;
  registeredRedirectUri: string;
  permissions: Permission[];
  appName: string;
}
