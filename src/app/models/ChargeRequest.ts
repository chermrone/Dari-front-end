enum Currency { EUR, USD}

export class ChargeRequest {

  description: string;
  amount: number;
  currency: Currency;
  stripeEmail: string;
  stripeToken: string;
}
