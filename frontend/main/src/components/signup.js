import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Signup = ()=>{
    let [signup,setSignup] = useState({'email':'','password':''})
    let {email,password} = signup
    function handleSubmit(e){
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/signup/',signup).then((res)=>{
    }


        ).catch((e)=>{
                console.log(e.response.data)
                
        })
    }
    function handleChange(e){
        setSignup(
            {
                ...signup,
                [e.target.name]:e.target.value
            }
        )
        
    }
    return(
        <div className='signup-div'>
            <form method='post' onSubmit={handleSubmit}>
                <input type='email' className='email-sinp' name='email' onChange={handleChange} value={email} placeholder='Enter your email' required autoComplete='off'></input>
                <input type='password' className='password-sinp' name='password' onChange={handleChange} value={password} placeholder='Enter your password' required></input>
                <button type='submit' className='signup-btn'>Sign Up</button>
                <Link className='signup-login' to='/login'>Already have an account?</Link>
            </form>
        </div>
    )
}

export default Signup
