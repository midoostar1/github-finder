import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()
const GIT_URL = process.env.REACT_APP_GIT_URL;
const GIT_TOKEN = process.env.REACT_APP_GIT_TOKEN;

export const GithubProvider = ({children})=>{

    const initialState = {
        users: [],
        loading: false
    }

    const[state, dispatch] = useReducer(githubReducer, initialState)


    // get initial users(testing)

    const fetchUsers = async () => {
        setLoading()
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

     

      const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GIT_URL}/search/users?${params}`,
        )
        const {items} = await response.json();
        console.log(items);
        dispatch({
           type: 'GET_USERS', 
           payload: items,
        })
      };


      const setLoading = () => dispatch({
          type: 'SET_LOADING'
      })

      return <GithubContext.Provider value={{
          users: state.users,
       loading: state.loading, 
       searchUsers,}}>
          {children}
      </GithubContext.Provider>
}

export default GithubContext;