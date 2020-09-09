import React, {useState, useEffect} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Axios from "axios";
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Header from "./components/layout/Header"
import UserContext from "./context/UserContext";

import "./style.css";

const SERVER_URL = "http://localhost:5000";

export default function App(){
    const [userData, setUserData]= useState({
        token: undefined,
        user : undefined
    });

    useEffect(()=>{
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            console.log(token);
            if(token == null){
                localStorage.setItem("auth-token", "");
                token = "";
            }
            let tokenRes = "";            
            try {
                tokenRes = await Axios.post(SERVER_URL + "/users/istokenvalid", null, {headers: {
                    "x-auth-token": token
                }});
                console.log(tokenRes.data);
                if(tokenRes.data){
                    const userRes = await Axios.get(SERVER_URL + "/users", {
                        headers: {
                            "x-auth-token": token
                        }
                    });
                    console.log(userRes.data);
                    setUserData({
                        token,
                        user: userRes.data
                    });
                }
            } catch (error) {
                console.log(error.data);
            }
        };
        checkLoggedIn();
    },[])
    return < >
        <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>

            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
            </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    </>
}