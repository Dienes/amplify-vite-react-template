//import { createContext } from "react";

import type { Schema } from "../amplify/data/resource";
//import { generateClient } from "aws-amplify/data";
import { Client } from "aws-amplify/data";
import { AuthUser } from "aws-amplify/auth";

export interface TodoPanelProps {
  client: Client<Schema>;
  user: AuthUser;
}



//export const client = generateClient<Schema>();
//const user:AuthUser = await getCurrentUser();
//const defaultContext = <TodoPanelProps>{client, user};

//export const userContext = createContext(defaultContext)