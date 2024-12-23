import { useState } from "react";
import reactLogo from "./assets/react.svg";
import koaLogo from "./assets/koa.svg";
import viteLogo from "/vite.svg";
import TodoList from "./todo-list";
import store from "./store";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://koa.nodejs.cn" target="_blank">
          <img src={koaLogo} className="logo" alt="Koa logo" />
        </a>
      </div>
      <h1>Vite + React + Koa + 约定式接口路由</h1>
      <h2>全栈项目实践</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button
        onClick={() => {
          store.visible = true;
        }}
      >
        CRUD DEMO
      </button>
      <TodoList />
    </>
  );
}

export default App;
