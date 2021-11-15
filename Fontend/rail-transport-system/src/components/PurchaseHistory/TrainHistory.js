import { render } from '@testing-library/react'
import React,{useState} from 'react'
import {InputGroup,FormControl,Col,Row,Button,Container,Form,Table} from 'react-bootstrap'
import { useCookies } from "react-cookie";
import axios from "axios";

let ticket_list = [];
    let user_list = [];
    let Src_list = [];
    let Dst_list = [];
    let Date_buy_list = [];
    let Date_exp_list = [];
    const fetchedResult = [];
let cookie ;
const history = [
    {user_customer : 'dsfpieqwjiorjqwo' , ticket_id : '5165468489' , Source_Station :'N24' , Destination_Station : 'E01'}
]
async function makeGetRequest() {
    ticket_list = [];
    const res = await axios.get(
      "https://us-central1-soft-dev-tutorial.cloudfunctions.net/Ticket"
    );
    for (let key in res.data) {
      fetchedResult.unshift({
        // ...res.data[key],
        Date_buy :res.data[key].Date_buy,
        Date_exp :res.data[key].Date_exp,
        ticket_id: res.data[key].ticket_id,
        user_map: res.data[key].user_customer,
        Src: res.data[key].S_Source,
        Dst: res.data[key].S_Dest,
      });
      ticket_list.push(res.data[key].ticket_id);
      user_list.push(res.data[key].user_customer);
      Src_list.push(res.data[key].Src);
      Dst_list.push(res.data[key].Dst);
      Date_buy_list.push(res.data[key].Date_buy);
      Date_exp_list.push(res.data[key].Date_exp);
      
    }
    console.log(fetchedResult)
    for(let i in user_list){
        if(user_list[i] == cookie){
            
            console.log(user_list[i])
            console.log(ticket_list[i])
            history.push({
                ticket_id:   ticket_list[i],
                user_customer: user_list[i],
                Source_Station : Src_list[i],
                Destination_Station : Dst_list[i]
            });
        }
        
    }
    console.log(history)
    // let key = user_list.indexOf(username_cookie['username_tkn']);
    // console.log(fetchedResult[key].ticket_id)
    // console.log(key)
    // if (fetchedResult[key]. === values.login_password) {

    // }
}
makeGetRequest();


function TrainHistory() {
    const [username_cookie, setUsername_cookie, removeUsername_cookie] = useCookies([
        "username_tkn",
      ]);
    cookie = username_cookie["username_tkn"];  
    const [numberOrder, setNumberOrder] = useState("")
    const [number, setNumber] = useState("")
    
    const [isSearch, setIsSearch] = useState(false)
    const [showAll, setShowAll] = useState(true)

    function onClickSearch(event) {
        if(numberOrder === ""){
            //console.log(username_cookie['username_tkn'])
            setIsSearch(false)
            alert("กรุณากรอกหมายเลขคำสั่งซื้อ")
            setShowAll(true)
            
            
        }
        else{
            setIsSearch(true)
            setShowAll(false)
            setNumber(numberOrder)
        }
    }
    
    


    const ShowHistory=history.map((item, index)=>{
        return (
            <tbody>
                    <tr>
                    <td>{item.ticket_id}</td>
                    <td>{item.user_customer}</td>
                    <td>{item.Source_Station}</td>
                    <td>{item.Destination_Station}</td>
                    </tr>
                    
                </tbody>
        );
    });
    const ShowSearch=history.filter((item)=>{
        return (
            item.numberOrder===ticket_list
        );
    }).map((item)=>{
        return (
            <tbody>
                    <tr>
                    <td>{item.ticket_id}</td>
                    <td>{item.user_customer}</td>
                    <td>{item.Source_Station}</td>
                    <td>{item.Destination_Station}</td>
                    </tr>
                </tbody>
        );
    });
    
    
    return (
        <div style={{marginTop:"10px",width:"100%"}}>
            <h1>Rail Transport System</h1>
            <br/>
            <Container>
                <div  style={{display:"flex",justifyContent:"space-between",width:"45%",margin:"auto"}}>
                            <Form.Control style={{ borderRadius:"10px",marginRight:"10px"}} value={numberOrder}   onChange={(event)=>{setNumberOrder(event.target.value)}} type="input" placeholder="หมายเลขคำสั่งซื้อ" />
                            <Button style={{ borderRadius:"10px"}} onClick={onClickSearch}  variant="outline-primary" >Search</Button>
                </div>
            </Container>
            <br/>
            <Row style={{borderRadius:"20px",width:"auto",height:"23px",margin:"1px",backgroundColor:"#0C9EA8",color:"#ffff",fontsize: "20px",fontWeight:"bold"}}></Row>
            <br/>
            <h2 align="center">รายการสั่งซื้อล่าสุด</h2>
            
                <div style={{ width: "100vh",textAlign: "center",backgroundColor:"#F7F3EE",borderRadius:"10px",marginLeft:"25%",borderStyle: "solid",borderWidth: "20px",borderColor:"#8FB1EB"}}>
                <Table >
                    <thead>
                        <tr>
                            <th style={{ width: "150px"}}>หมายเลขคำสั่งซื้อ</th>
                            <th>สถานีต้นทาง</th>
                            <th>สถานีปลายทาง</th>
                            <th>เวลา</th>
                        </tr>
                    </thead>

                    {showAll ? ShowHistory:null}
                    {isSearch ? ShowSearch:null}
                    
                    
                </Table>
                </div>
            
            
           
        </div>
    )
}

export default TrainHistory
