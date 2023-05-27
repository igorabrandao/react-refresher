import React, { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";

const ExpenseList = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");
  const filteredExpenses = props.expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  const expenseFilterChangeHandler = (selectedYear) => {
    // Set the filtered year
    setFilteredYear(selectedYear);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        onExpenseFilterChange={expenseFilterChangeHandler}
        selected={filteredYear}
      />
      {filteredExpenses && filteredExpenses.length > 0 ? (
        filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))
      ) : (
        <p className="not-found">No expenses found.</p>
      )}
    </Card>
  );
};

export default ExpenseList;
