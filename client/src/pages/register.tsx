import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register=async()=>{

    await axios.post("/api/register",{
      email,
      password
    });

    window.location.href="/";
  }

  return(

    <div>

      <h1>Criar conta</h1>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={register}>
        Criar conta
      </button>

    </div>

  )
}