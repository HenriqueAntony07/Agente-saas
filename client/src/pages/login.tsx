import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login=async()=>{

    await axios.post("/api/auth/login",{
      email,
      password
    });

    window.location.href="/";
  }

  return(

    <div>

      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={login}>
        Entrar
      </button>

    </div>

  )
}