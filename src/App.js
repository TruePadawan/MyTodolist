import { useEffect } from "react";
import TodoListContextProvider from "./components/context/TodoListContextProvider";
import TodoListHeader from "./components/todolist-head/TodoListHeader";
import TodoListBody from "./components/todolist-body/TodoListBody";

import "./App.css";

let resizeObserver = new ResizeObserver(entries => {
  let appSize = {
    width: entries[0].borderBoxSize[0].inlineSize,
    height: entries[0].borderBoxSize[0].blockSize
  };
  
  window.localStorage.setObj("appSize",appSize);
});

function App() {

  /* When app loads, update app size with whatever the user set it to previously */
  useEffect(() => {
    let appSize = window.localStorage.getObj("appSize");
    let appBody = document.querySelector("main");

    if (appSize !== null)
    {
      appBody.style.width = `${appSize.width}px`;
      appBody.style.height = `${appSize.height}px`;
    }
    resizeObserver.observe(appBody);
  },[]);

  return (
    <div className="App">
      <h1>MyTodoList</h1>
      <TodoListContextProvider>
        <main>
          <TodoListHeader />
          <TodoListBody />
        </main>
      </TodoListContextProvider>
    </div>
  );
}

export default App;
