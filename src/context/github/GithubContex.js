import { createContext } from "react";

const GithubContext = createContext()
const GIT_URL = process.env.REACT_APP_GIT_URL;
const GIT_TOKEN = process.env.REACT_APP_GIT_TOKEN;

export const GithubProvider = ({children})=>{

}