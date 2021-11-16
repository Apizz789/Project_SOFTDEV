import React from 'react'
import {InputGroup,FormControl,Col,Row,Button,Container,Form,Table,Modal,FloatingLabel} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { UserContextSTic } from "../Buyticket/UseContextSourceTic";
import { UserContextDTic } from '../Buyticket/UseContextDestTic';
import { UserContextCountTic } from '../Buyticket/UseContextCount';
import { useState , useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

// import { graph, dijkstra } from './distance_cal.js';
import { graph, dijkstra } from '../CalculationResult/distance_cal.js';



function TrainPayment() {

    const[picture, setPicture] = useState("");

    const[promtpay_preview, setPromtpay_preview] = useState("");

    const[bank_preview, setBank_preview] = useState("images/KBANK_LOGO.png");

    function handlePromtpay(event){
        if (event.target.files[0]){
            setPicture(event.target.files[0])
            setPromtpay_preview(URL.createObjectURL(event.target.files[0]));
        }
    }

    function handleBank(event){
        if (event.target.files[0]){
            setPicture(event.target.files[0])
            setBank_preview(URL.createObjectURL(event.target.files[0]));
        }
    }
    

    function refreshPage(){
        window.scrollTo(0,0);
      }
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);

      const handleClose1 = () => {
          if(picture !== ""){
            setCount("รูปแบบการชำระเงิน");
            setPromtpay_preview("")
            setBank_preview("images/KBANK_LOGO.png")
            setPicture("")
          }
          else{
              alert("Please Select Your Slip")
          }
          
      };

      const handleClose2 = () => {
          setCount("รูปแบบการชำระเงิน");
          setBank_preview("images/KBANK_LOGO.png")
          setPromtpay_preview("")
          setPicture("")
    };


      const handleShow = () => {
        setShow(true);
      };


      const { clickSTic , setclickSTic } = useContext(UserContextSTic);
      const { clickDTic , setclickDTic } = useContext(UserContextDTic);
      const [ Count , setCount ] = useState(0)
      const {clickCountTic,setclickCountTic} = useContext(UserContextCountTic);

      let Ans = 0;

      if (clickSTic == 'สถานีต้นทาง'  || clickDTic == 'สถานีปลายทาง')
      {
          
      }
      else
      {
        Ans = dijkstra(graph, clickSTic.split(" ")[0], clickDTic.split(" ")[0]);
      } 


      const DropdownItem =()=>{
        return(
            <div>
                {
                ["Promptpay","โอนผ่านธนาคาร","บัตรเครดิต"].map((item) => (
                <Dropdown.Item key={item} onClick={()=>{setCount(item);handleClose()}}>
                     {item}
                 </Dropdown.Item>
                ))
                }
            </div>
        )

    }
    
    return (
        <div style={{marginTop:"10px",width:"100%"}}>
            <h1 align = "center">Payment</h1>
            <Row style={{borderRadius:"20px",width:"auto",height:"23px",margin:"1px",backgroundColor:"#2F2F35",color:"#ffff",fontsize: "20px",fontWeight:"bold"}}>
            </Row>
            <br></br><br></br><br></br>
            <Container>
                <Row>
                    <Col>

                    </Col>
                    

                    <Col style={{textAlign:"center"}}>
                        <Col style={{borderRadius:"20px",width:"1000px",height:"850px",margin:"10px",backgroundColor:"#99ff99",textAlign:"center"}}>
                            <br></br><h1><i class="fas fa-check-double"></i> Confirm Order</h1><hr/><br></br>
                            <h3 align = "left">หมายเลขคำสั่งซื้อ :________________________________</h3>
                            <h3 align = "left">ชื่อผู้ใช้ :________________________________</h3>
                            <h3 align = "left">เส้นทางโดยสาร : </h3><br></br><br></br>
                            <h3>{clickSTic} <br></br> <i class="fas fa-arrow-down"></i><br></br>      {clickDTic}</h3><br></br> <br/>
                            <h3 align = "left">ระยะเวลาที่ใช้โดยประมาณ :________________________________นาที</h3>
                            <h3 align = "left"> ราคา : {Ans[1]} บาท</h3>
                            <h3 align = "left"> จำนวน : {clickCountTic} ชิ้น</h3>
                            <h3 align = "left"> ราคารวม : ________________________________</h3><br></br><br></br>
                            <h3 align = "left"> วันที่ซื้อ :________________________________</h3>
                            <h3 align = "left"> วันที่หมดอายุ :________________________________</h3>
                            
                            <Link to="/ticket">
                            <Button variant="outline-warning" style={{marginBottom:"5px",width:"100px",whiteSpace: 'pre', margin: '10px'}}>แก้ไข</Button>
                            </Link>

                            <Button onClick={()=>handleShow()} variant="outline-success" style={{marginBottom:"5px",width:"100px",whiteSpace: 'pre', margin: '10px'}}>ยืนยัน</Button>

   
                            <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>เลือกวิธีการชำระเงิน</Modal.Header>
                            <Modal.Body style={{margin:"auto"}}>
                                <h1>รูปแบบการชำระเงิน</h1>
                                <Dropdown style={{width: "100px", textAlign:"center",marginLeft:"25%"}}>
                                    <Dropdown.Toggle variant="success" style={{textAlign:"center"}}>
                                        {
                                            Count? Count:"รูปแบบการชำระเงิน"
                                        }
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <DropdownItem/>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose} >
                                    OK
                                </Button>
                            </Modal.Footer>
                            </Modal>
                            


{/* ------------------------------------- PromptPay ------------------------------------------------------------------ */}
                        
                            <Modal show={Count == "Promptpay" ?true:false} onHide={handleClose2} centered>
                            <Modal.Header closeButton>รูปแบบการชำระเงิน : PromptPay </Modal.Header>
                            <Modal.Body>
                                <center><img src={promtpay_preview} width = '300' height='auto'style={{textAlign:"center", margin:"20px",borderRadius:"30px"}}></img></center>
                                <Form.Group controlId="formFileMultiple" className="mb-3" onSubmit={handleClose1}>
                                    <Form.Label>Upload You Slip Payment</Form.Label>
                                    <Form.Control multiple type="file" name="picture" onChange={handlePromtpay}/>
                                
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose1} type = "submit">
                                    OK
                                </Button>
                            </Modal.Footer>
                            </Modal>
                        

{/* ------------------------------------- โอนผ่านธนาคาร ------------------------------------------------------------------ */}                           
                            <Modal show={Count == "โอนผ่านธนาคาร" ?true:false} onHide={handleClose2} centered style={{width: '500' ,height:'auto',borderRadius:"30px"}}>
                            <Modal.Header closeButton>รูปแบบการชำระเงิน : โอนผ่านธนาคาร</Modal.Header>
                            <Modal.Body>
                               <Container>
                                   <Col>
                                        <Row style={{textAlign:"center"}}>
                                           
                                            <Col>
                                            <h4><b>โอนผ่านธนาคาร</b></h4>
                                            <center><img src= {bank_preview} width = '100' height='auto'style={{textAlign:"center", margin:"20px",borderRadius:"30px"}}></img></center>
                                            <h7 align = "left" width = 'auto' > ธนาคารกสิกรไทย </h7><br></br>
                                            <h7 align = "left" > ชื่อบัญชี : นายอภิรักษ์ อุลิศ </h7><br></br>
                                            <h7 align = "left" > เลขที่บัญชี :040-325-288-3</h7><br></br>
                                            <h7 align = "left" > สาขาบัญชี : เดอะมอลล์บางกะปิ </h7><br></br><br></br>

                                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                                <Form.Label>Upload You Slip Payment</Form.Label>
                                                <Form.Control type="file" multiple onChange={handleBank}/>
                                            </Form.Group>
                                            </Col>
                                           
                                            
                                        </Row>
                                        <Row>
                                        <Button variant="outline-warning">แก้ไข</Button>
                                        <Button variant="outline-info">ต่อไป</Button>
                                        <Button variant="outline-danger">ยกเลิก</Button>
                                        
                                        </Row>
                                        <Row>
                                            3 test
                                        </Row>
                                   </Col>
                               </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose1} type = "submit">
                                    OK
                                </Button>
                            </Modal.Footer>
                            </Modal> 

{/* ------------------------------------- บัตรเครดิต ------------------------------------------------------------------ */}       
                        <Modal show={Count == "บัตรเครดิต" ?true:false} onHide={handleClose2} centered style={{width: '500' ,height:'auto',borderRadius:"30px"}}>
                            <Modal.Header closeButton>รูปแบบการชำระเงิน : บัตรเครดิต</Modal.Header>
                            <Modal.Body>
                               <Container>
                                   <Col>
                                        <Row style={{textAlign:"center"}}>
                                           
                                            <Col>
                                            <h4><b>บัตรเครดิต</b></h4>

                                            <div width = '500' height='300'style={{textAlign:"center", margin:"20px",borderRadius:"30px", backgroundColor:"#0C9EA8"}}>
                                                <p>...........................</p>
                                            </div>
                                            
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="หมายเลขบัตร"
                                                className="mb-3"
                                            >
                                                <Form.Control type="email" placeholder="name@example.com" />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPassword" label="CVC">
                                                <Form.Control type="password" placeholder="Password" />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPassword" label="EXP">
                                                <Form.Control type="password" placeholder="Password" />
                                            </FloatingLabel>

                                            <FloatingLabel controlId="floatingPassword" label="Fname">
                                                <Form.Control type="password" placeholder="Password" />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPassword" label="Lname">
                                                <Form.Control type="password" placeholder="Password" />
                                            </FloatingLabel><br></br>
                                            
                                            </Col>
                                           
                                            
                                        </Row>
                                        <Row>
                                        <Button variant="outline-warning">แก้ไข</Button>
                                        <Button variant="outline-info">ต่อไป</Button>
                                        <Button variant="outline-danger">ยกเลิก</Button>
                                        
                                        </Row>
                                        <Row>
                                            3 test
                                        </Row>
                                   </Col>
                               </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose1}>
                                    OK
                                </Button>
                            </Modal.Footer>
                            </Modal> 







                            <Button variant="outline-danger" style={{marginBottom:"5px",width:"100px",whiteSpace: 'pre', margin: '10px'}}>ยกเลิก</Button>
                        </Col>
                    </Col>

                    <Col>

                    </Col>

                </Row>
            </Container>

        </div>
    )
}

export default TrainPayment
