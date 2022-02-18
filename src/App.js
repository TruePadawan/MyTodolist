import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>MyTodoList</h1>
      <div className="main">
        <TodoListHeader />
        <TodoListBody />
      </div>
    </div>
  );
}

export default App;
