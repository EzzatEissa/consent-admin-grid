import { AccountIdentification } from './account-identification';
import { Servicer } from './servicer';

export class Account {
    AccountId: string;
    userId: string;
    Status: string;
    StatusUpdateDateTime: Date;
    AccountType: string;
    Currency: string;
    AccountSubType: string;
    Description: string;
    NickName: string;
    Servicer: Servicer;
    Account: AccountIdentification[];
    OpenningDate: Date;
    MaturityDate: Date;
    SwitchStatus: string;
}
