export class Transaction {
  public categoryCode: string;
  public dates: { valueDate: number };
  public merchant: { accountNumber: string; name: string };
  public transaction: {
    amountCurrency: {
      amount: number;
      currencyCode: string;
    };
    creditDebitIndicator: string;
    type: string;
  };
}
