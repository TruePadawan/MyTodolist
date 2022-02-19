import TodoListContextProvider from "./components/context/TodoListContextProvider";
import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>MyTodoList</h1>
      <TodoListContextProvider>
        <div className="main">
          <TodoListHeader />
          <TodoListBody />
        </div>
      </TodoListContextProvider>
    </div>
  );
}

export default App;
