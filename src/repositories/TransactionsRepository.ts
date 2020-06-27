import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const { income, outcome } = this.transactions.reduce(
      (
        accumalator: Omit<Balance, 'total'>,
        transaction: Omit<TransactionDTO, 'title'>,
      ) => {
        switch (transaction.type) {
          case 'income':
            accumalator.income += transaction.value;
            break;
          case 'outcome':
            accumalator.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumalator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
