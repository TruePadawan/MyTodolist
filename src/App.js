import TodoListHeader from "./components/todolist-head/TodoListHeader";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>My TodoList</h1>
      <div className="main">
        <TodoListHeader />
      </div>
    </div>
  );
}

export default App;
