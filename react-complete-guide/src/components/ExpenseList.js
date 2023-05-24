import ExpenseItem from "./ExpenseItem";
import './ExpenseList.css'

function ExpenseList(props) {
  return (
    <div className="expenses">
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
