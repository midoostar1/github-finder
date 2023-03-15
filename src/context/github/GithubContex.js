import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()
const GIT_URL = process.env.REACT_APP_GIT_URL;
const GIT_TOKEN = process.env.REACT_APP_GIT_TOKEN;

export const GithubProvider = ({children})=>{

    const initialState = {
        users: [],
        loading: true
    }

    const[state, dispatch] = useReducer(githubReducer, initialState)


    const fetchUsers = async () => {
        const response = await fetch(`${GIT_URL}/users`, {
          headers: {
            Authorization: `token ${GIT_TOKEN}`,
          },
        });
        const data = await response.json();
        console.log(data);
        dispatch({
           type: 'GET_USERS', 
           payload: data,
        })
      };

      return <GithubContext.Provider value={{users: state.users, loading: state.loading, fetchUsers}}>
          {children}
      </GithubContext.Provider>
}

export default GithubContext;