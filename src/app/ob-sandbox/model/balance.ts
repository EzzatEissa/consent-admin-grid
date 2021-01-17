import { Amount } from './amount';
import { CreditLine } from './CreditLine';

export class Balance {
    AccountId: string;
    CreditDebitIndicator: string;
    BalanceType: string;
    DateTime: Date;
    Amount: Amount;
    CreditLine: CreditLine;
    userId: string
    balanceId: any;


}
