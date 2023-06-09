import React, { useContext, useState } from 'react'
import { login } from '../../context/authContext/apiCalls';
import { Auth_context } from '../../context/authContext/AuthContext';
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isFetching, dispatch} = useContext(Auth_context);

    const handleLogin = (e) =>{
        e.preventDefault();

        login({email, password}, dispatch);
    }
  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login