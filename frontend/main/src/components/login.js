import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'

function Login(){
    let [login,setLogin] = useState({'email':'','password':''})
    let {email,password} = login
    let [isLoggedin,setIsLoggedin] = useState(false)
    let redirect = useNavigate()
    function handleChange(e){
        setLogin({
            ...login,
            [e.target.name]:e.target.value,
        }
        )
        
    }

    function handleSubmit(e){
        e.preventDefault()
        let token = localStorage.getItem('access')
        axios.post('http://127.0.0.1:8000/login/',login,{withCredentials:true,headers:{'X-CSRFToken':Cookies.get('csrftoken')}}).then((res)=>{
            redirect('/')

        }).catch(
            (err)=>{
                console.log(err.response)
                if(err.response.status===401){
                    alert('Wrong Credentials')
                }
            }
        )
    }


    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/isauthenticated/',{withCredentials:true}).then((res)=>{
            setIsLoggedin(true)

        }).catch((e)=>{
            setIsLoggedin(false)
        })
    })

    if(isLoggedin){
        return(
            <div>you are already logged in, get back to <Link to='/'>main page</Link> </div>
        )
    }

    return(
    
        <div className='login-div'>
            <form method='post' onSubmit={(e)=>handleSubmit(e)}>
            <input type='email' className='email-inp' name='email' onChange={(e)=>handleChange(e)} value ={email} placeholder='Enter your email' required autoComplete='off'></input>
            <input type='password' className='password-inp' name='password' onChange={(e)=>handleChange(e)} value={password} placeholder ='Enter your password'></input>
            <button type='submit' className='login-btn'>Login</button>
            <Link to='/signup' className='link' >New User?</Link>
            </form>
        </div>
    )
}

export default Login