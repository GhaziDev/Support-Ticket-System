import React,{useEffect, useState} from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Ticket = ()=>{
    let [ticket,setTicket] = useState({'user':'','title':'','desc':'','is_solved':false})
    let [ticketList,setTicketList] = useState([])
    let {user,title,desc,is_solved}=ticket
    let redirect = useNavigate()
    function handleChange(e){
        setTicket(
            {
                ...ticket,
                [e.target.name]:e.target.value
            }
        )
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/isauthenticated/',{withCredentials:true}).then((res)=>{
            setTicket(
                {
                ...ticket,user:res.data
                }
            )
        }).catch((e)=>{
            console.log(e.response.data)
            redirect('/login')
        })
    },[])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/ticket/',{withCredentials:true}).then(
            (res)=>{
                setTicketList(
                    [...res.data]
                )
            }
        ).catch((e)=>{
            if(e.response.status===401){
                console.log(e.response.data)



            }
        })
        },[ticket.desc])
    

    function handleSubmit(e){
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/ticket/',ticket,{withCredentials:true,headers:{'X-CSRFToken':Cookies.get('csrftoken')}}).then((res)=>{
            setTicketList([...ticketList,res.data])
            console.log(...ticketList)
    }
        ).catch((e)=>{
            console.log(e.response.data)
        }
        )

}

function handleLogout(e){
    e.preventDefault()
    axios.get('http://127.0.0.1:8000/logout/',{withCredentials:true}).then(()=>{
        redirect('/login')
    })
}

    function listTickets(){
        return(
        ticketList.map((someTicket)=>{
            return(
                <div className='ticket-div'>
                    <details className='desc'>
                        <summary className='title'>
                            {someTicket.title}
                        </summary>
                        {someTicket.desc}
                    </details>
                    <div className='status' >{statusCheck(someTicket)}</div>
                </div>
            )

        })
        )


}
function statusCheck(props){
    if(props.is_solved){
        return "Solved"
    }
    else{
        return ""
    }
}
return(
    <div className='ticket-form-div'>
        {listTickets()}
        <form onSubmit={(e)=>handleLogout(e)}>
            <button type='submit' className='logout-btn' >Logout</button>
        </form>
        <form method='post' onSubmit={handleSubmit}>
            <input type='text' className='title-inp' name='title' onChange={handleChange} value={title} required placeholder='write the title'></input>
            <input type='text' className='desc-inp' name='desc' onChange={handleChange} value={desc} required placeholder='write description'></input>
            <button type='submit' className='ticket-btn'>Submit</button>
        </form>

    </div>
)

}

export default Ticket