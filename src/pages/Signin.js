import { React, useState } from 'react'
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
const  SignIn = () =>  {

  const [ipAddress, setIpAddress] = useState('');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onClickLoginHandler = () => {
    const loginInfo = {
      ipAddress:ipAddress,
      database:database,
      username:username,
      password:password
    }


    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        loginInfo
      )
    }

    fetch('http://localhost:8000/api/book-api/', requestOptions)
    .then(response => response.json())
    .then(data => {
      if(data.message === "success") {
        localStorage.setItem("logInfo", JSON.stringify(loginInfo))

        navigate(`/search`)
      } else {
        alert("Database connection failed!")
      }
      
    })
  }

    return (
      <div className="container col-4 pt-5 pb-5 text-start mt-5" style = {{ height: "100vh"}}>
        <h2>Obtain Database Schema</h2>
          <div className="mb-3 mt-5">
            <label htmlFor="email">Host IP Address:</label>
            <input 
                type="text" 
                className="form-control"
                id="ipAddress"
                placeholder="Enter IP Address"
                name="ipaddress"
                value={ipAddress}
                onChange = {(e) => setIpAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">Database:</label>
            <input
              type="text"
              className="form-control"
              id="database" 
              placeholder="Enter Database Name"
              name="database"
              value={database}
              onChange = {(e) => setDatabase(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">DB Username:</label>
            <input 
              type="username" 
              className="form-control" 
              id="username" 
              placeholder="Enter Username" 
              name="username"
              value={username}
              onChange = {(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd">DB Password:</label>
            <input 
              type="password" 
              className="form-control" 
              id="pwd" 
              placeholder="Enter password" 
              name="pswd" 
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
            />
          </div>
          <div className = "d-flex">
            
              <button 
                className="btn btn-secondary btn-lg" 
                style={{width: '100px'}} 
                onClick = {() => onClickLoginHandler()}
              >
                OK
              </button>

            <button 
              type="cancel" 
              className="btn btn-secondary btn-lg" 
              style={{width: '100px', marginLeft: '10px'}} 
            >
              Cancel
            </button>
          </div>
          <div className ="d-flex flex-row-reverse pt-3">
            <FontAwesomeIcon icon={ faCircleQuestion } size="2x" style = {{ color : '#0080ff' }}/>
          </div>
      </div>
    )
}

export default SignIn
