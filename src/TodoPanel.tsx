import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";

import type {TodoPanelProps} from "./Exports";

/*interface TodoPanelProps {
  client: Client<Schema>;
  user: AuthUser;
}
*/

//{client, user}:TodoPanelProps

function TodoPanel({client, user}:TodoPanelProps) {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);


  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, [client.models.Todo]);

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
    <div>
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
    </div>
  );
}

export default TodoPanel;
