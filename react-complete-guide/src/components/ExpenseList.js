import ExpenseItem from "./ExpenseItem";

function ExpenseList(props) {
  return (
    <div className="expense-list">
      {props.expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
