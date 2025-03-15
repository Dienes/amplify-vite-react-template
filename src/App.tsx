import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { TodoCreateForm } from "./ui-components";


const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();
  //const { signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ 
      content: window.prompt("Todo content"), 
      isDone: false 
    });
  }

  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      {/*<h1>My todos</h1>*/}
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (<li 
			onClick={() => deleteTodo(todo.id)}
			key={todo.id}>
			task:{todo.content}   done: {todo.isDone}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <div>

      </div>
      <button onClick={signOut}>Sign out</button>
      <div>
        <a href="./startpage.html">Start page</a>
      </div>
      <div>
        <TodoCreateForm />
      </div>
    </main>
  );
}

export default App;
