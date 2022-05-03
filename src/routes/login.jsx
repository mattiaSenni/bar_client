import { useSelector, useDispatch } from "react-redux";
import { setlogin } from "../features/login.js";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { useState } from "react";  
import { login as loginREST } from '../request.js'
import { useNavigate } from "react-router-dom";



export default function Login() {
  const number = useSelector(state => state.number)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false)

  const handleLogin = () => { 
    loginREST(email, password).then(res => {
      //login ok
      let l = JSON.parse(atob(res.data.token.split('.')[1]))
      dispatch(setlogin({ login: l, token: res.data.token }))
      navigate('/home')
    }
    ).catch(err => { 
      setLoginError(true);
      //login fallito
    })
  }

  return (
    <div style={{ textAlign: 'center', width:'250px', marginLeft:'auto', marginRight:'auto' }}>
      
      <Typography variant="h4" className="mt-5">Login</Typography>
      {
        loginError ?
          <Alert severity="error">Login errato</Alert>
          :
          null
      }
      <TextField label="email" className="mt-2" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <TextField label="password" className="mt-2" variant="outlined" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <Button onClick={handleLogin}>LOGIN</Button>

    </div>
  )
}