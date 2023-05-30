import React, { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (username, age) => {
    setUsersList((prevState) => {
      return [
        ...prevState,
        { id: Math.random().toString(), name: username, age: age },
      ];
    });
  };

  return (
    <div>
      <AddUser onSubmit={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
