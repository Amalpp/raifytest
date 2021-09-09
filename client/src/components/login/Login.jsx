import React, { useState,useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { useHistory } from "react-router";
import axios from "axios"
import './Login.css'




const Login = () => {
  const [Login, setLogin] = useState();
  const [LoginStatus, setLoginStatus] = useState(false)

  function changeHandler(event) {
    setLogin({
      ...Login,
      [event.target.name]: event.target.value,
    });
    console.log(Login);
  }
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:5000/login",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: Login,
    })
    .then((response) => {
      if(!response.data.auth){
        // console.log("oo",LoginStatus);
        setLoginStatus(false)
        if(response.data.wrong){
          document.getElementById('loginError').innerHTML = "Invalid username or password"
        }else if(response.data.notUser){
          document.getElementById('loginError').innerHTML = "User not valid"
        }
        
      }else{
        setLoginStatus(true)
        console.log('wr',response.data)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem('userId', response.data.userId)
        // localStorage.setItem('username', response.data)
        localStorage.setItem('username', response.data.user.username)
        history.push('/stocks');
      }
    })
  };

  useEffect(() => {
    let token = localStorage.getItem('token')
    
    console.log("effect...",token);

      if(token){
          history.push('/stocks')
      } 

    })


  const paperStyle = {
    padding: 20,
    height: "20rem",
    width: 300,
    margin: "20px auto",
    backgroundColor: "#fdfffc",
    boxShadow: "rgba(0, 0, 0, 0.35) 0onChange={changeHandler} px 5px 15px"

  };
  const btStyle = {
    margin: "10px 0px",
    marginRight: '0px',
    borderRadius: "20px",
    backgroundColor: "#061732 ",
    marginLeft: "0px",
    color: "#FFFFFF",

  }

  document.body.style = 'background: #F6F6F6 ';
  return (
    <div  >
      <form onSubmit={handleSubmit}>
        <Grid style={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }}>
          <Paper elavation={10} style={paperStyle}>
            <h3>Sign in</h3>


            <div className="input-group mb-3" style={{ marginTop: "43px" }}>
              <span className="input-group-text email-icon" id="basic-addon1"></span>
              <input type="text" id="name" onChange={changeHandler} name="username" className="form-control reset-email-input" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />

            </div>
            <div className="input-group mb-3" >
              <span className="input-group-text email-icon" id="basic-addon1"></span>
              <input type="password" id="password" onChange={changeHandler} name="password" className="form-control reset-email-input" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
            </div>
            <p id="loginError" className="text-center" style={{color: "red"}}></p>
            <button type="submit" style={btStyle} variant="contained">sign in</button>

          </Paper>
        </Grid>
      </form>

    </div>
  )
}

export default Login
