import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;

    const totalIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(incomeTransaction => incomeTransaction.value)
      .reduce(reducer, 0);

    const totalOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(outcomeTransaction => outcomeTransaction.value)
      .reduce(reducer, 0);

    const total = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
