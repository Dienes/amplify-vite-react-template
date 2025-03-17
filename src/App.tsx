//import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { TodoCreateForm } from "./ui-components";
import  TodoPanel  from "./TodoPanel";

//npx ampx sandbox
//npm run dev
function App() {
  const { user, signOut } = useAuthenticator();
  const client = generateClient<Schema>();
  
  //const { signOut } = useAuthenticator();
  //const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
/*
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);
*/

  return (
    <main>
      
      <TodoPanel
        client={client}
        user ={user}  /> 
      <button onClick={signOut}>Sign out</button>
      <div>
        <h1>
        <a href="./startpage.html">Start page what?</a>
        </h1>
      </div>
      <div>
        <TodoCreateForm />
      </div>
      
    </main>
  );
}

export default App;
