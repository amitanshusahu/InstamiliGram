import styled from "styled-components"
import { useState, useEffect } from "react"
import { postLogin, TOKEN, USERNAME } from "../kv";
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/schat.png'

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        if(TOKEN && USERNAME) navigate(`../home`)
    }, []);

    const [auth, setAuth] = useState({
        username: null,
        password: null,
    });
    const handelInput = (e) => {
        setAuth({...auth, [e.target.name] : e.target.value});
    }

    const handelSubmit =  async (e) => {
		 e.preventDefault();
        let { username, password } = auth;

        //payload
        let data = {
            "username": username,
            "password": password,
        };

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data)
        }
        let res = await fetch(postLogin, options);

        // get the output as a responce from the server
        let output = await res.json();
		
		if (output.status) {
            localStorage.setItem("TOKEN", output.token);
            localStorage.setItem("USERNAME", username);
            navigate(`../home`);
            location.reload();
        }
        else{
            alert(output.msg);
        }

    }
    
    return (
        <StyledDiv>
            <div className="login-holder">
                <h1><img src={logo} /></h1>
                <input type="text" name="username" placeholder="Username" onChange={handelInput}/>
                <input type="password" name="password" placeholder="Password" onChange={handelInput}/>
                <button onClick={handelSubmit}>Login</button>
                <Link to={"../signup"}>New User? Signup</Link>
            </div>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;

.login-holder{
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 300px;

    h1{
        text-align: center;
        img {
          width: 200px;
        }
    }

    a{
        display: block;
        text-align: center;
        color: #a3a3a3;
        cursor: pointer;
    }
    input, button {
      font-size: 14px;
    }
}
`
