import React,{useEffect, useState} from 'react';
import { useNavigate ,BrowserRouter} from 'react-router-dom';
import axios from 'axios'

const Ticket = ()=>{
    let [ticket,setTicket] = useState({'user':+localStorage.getItem("username"),'title':'','desc':'','is_solved':false})
    let [ticketList,setTicketList] = useState([])
    let {user,title,desc,is_solved}=ticket
    let [color,setColor] = useState('red')
    function handleChange(e){
        setTicket(
            {
                ...ticket,
                [e.target.name]:e.target.value
            }
        )
    }
    useEffect(()=>{
        const token = localStorage.getItem('access')
        axios.get('http://127.0.0.1:8000/ticket/',{headers:{'Authorization':`Bearer ${token}`}}).then(
            (res)=>{
                setTicketList(
                    [...res.data]
                )
            }
        ).catch((e)=>{
            if(e.response.status===401){
                window.location.replace('/login')


            }
        })
        },[])
    

    function handleSubmit(e){
        e.preventDefault()
        let token = localStorage.getItem('access')
        axios.post('http://127.0.0.1:8000/ticket/',ticket,{headers:{'Authorization':`Bearer ${token}`}}).then((res)=>{
            setTicketList([...ticketList,res.data])
            console.log(...ticketList)
            console.log(res.data)
    }
        ).catch((e)=>{
            console.log(e.response)
            if(e.response.status===401){
                window.location.replace('/login')


            }
        }
        )

}

function handleLogout(e){
    e.preventDefault()
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('username')
    window.location.replace('/login')
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