import React, { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";

const ExpenseList = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const expenseFilterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        onExpenseFilterChange={expenseFilterChangeHandler}
        selected={filteredYear}
      />
      {props.expenses &&
        props.expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))}
    </Card>
  );
};

export default ExpenseList;
