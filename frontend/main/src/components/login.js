import axios from 'axios';
import React,{useState} from 'react';
import {Link} from 'react-router-dom';

function Login(){
    let [login,setLogin] = useState({'username':'','password':''})
    let {username,password} = login
    let [isLoggedin,setIsLoggedin] = useState(false)
    function handleChange(e){
        setLogin({
            ...login,
            [e.target.name]:e.target.value,
        }
        )
        
    }
    /*
    function designElements(){
        if(document.getElementsByClassName('email-inp') == document.activeElement){
            document.getElementsByClassName('email-label').style.display='block';
            document.getElementsByClassName('email-label').style.textDecoration='underline';
        }
    }*/


    function handleSubmit(e){
        e.preventDefault()
        let token = localStorage.getItem('access')
        axios.post('http://127.0.0.1:8000/token/',login,{withCredentials:true},{headers:{'Accept':'application/json','Content-Type':'application/json','Authorization':`Bearer ${token}`,'Access-Control-Allow-Origin': '*'}}).then((res)=>{
            localStorage.setItem('access',res.data.access)
            localStorage.setItem('refresh',res.data.refresh)
            localStorage.setItem('username',res.data.username)
            window.location.replace('/ticket')

        }).catch(
            (err)=>{
                console.log(err.response)
                if(err.response.status===401){
                    alert('Wrong Credentials')
                }
            }
        )
    }


    return(
    
        <div className='login-div'>
            <form method='post' onSubmit={(e)=>handleSubmit(e)}>
            <input type='email' className='email-inp' name='username' onChange={handleChange} value ={username} placeholder='Enter your email' required autoComplete='off'></input>
            <input type='password' className='password-inp' name='password' onChange={handleChange} value={password} placeholder ='Enter your password'></input>
            <button type='submit' className='login-btn'>Login</button>
            <Link to='/signup' className='link' >New User?</Link>
            </form>
        </div>
    )
}

export default Login