import {Amount} from './amount';
import {Balance} from './balance';
import {BankTransactionCode} from './bankTransactionCode';
import {CurrencyExchange} from './currencyExchange';
import {MerchantDetails} from './merchantDetails';

export class Transaction {
    AccountId: string;
    userId: string;
    TransactionId: string;
    TransactionReference: string;
    CreditDebitIndicator: string;
    status: string;
    Mutability: string;
    ValueDateTime: Date;
    BookingDateTime: Date;
    TransactionInformation: string;
    StatementRefrence: string;
    Amount: Amount;
    ChargeAmount: Amount;
    CurrencyExchange: CurrencyExchange;
    // proprietaryBankTransactionCode:proprietaryBankTransactionCode;

    BankTransactionCode: BankTransactionCode;
    Balance: Balance;
    MerchantDetails: MerchantDetails;
    // CreditorAgent:CreditorAgent;
    // creditorAgentPostalAddress:creditorAgentPostalAddress;
    // CreditorAccount:Account;
    // DeptorAccount:Account;
    // CardInstrument:CardInstrument;

}
