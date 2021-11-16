import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { UserContextS } from "../Calculate/UseContextSource";
import { UserContextD } from "../Calculate/UseContextDest";
import { useState, useContext } from "react";
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './TrainCalculationResult.css';
import { graph, dijkstra } from './distance_cal.js';
// import { useState , useContext } from "react";

function refreshPage() {
  window.scrollTo(0, 0);
}

function TrainCalculationResult() {
  const { clickS, setclickS } = useContext(UserContextS);
  const { clickD, setclickD } = useContext(UserContextD);
  let Ans = ['','',''];
  let way = '';
  let time = '';
  let price = '';

  const handleSetdefault = () => {
    setclickS("Please Select Source")
    setclickD("Please Select Dest")
  }

  

  // const [mystate, setMystate] = useState(false);

  if (clickS == 'Please Select Source')
  {
    
  }
  else if(clickD == 'Please Select Dest')
  {

  }
  else
  {
    Ans = dijkstra(graph, clickS.split(" ")[0], clickD.split(" ")[0]);
  } 


  return (
    <div style={{ marginTop: "10px", width: "100%" }}>

      <h1 align="center">CalculationResult ====</h1>


      <br></br>
      <br></br>
      <br></br>
      <div className="result" style={{
        backgroundColor: "#93A9A3",
        borderRadius: "12px",
        width: "70vw",
        textAlign: "center",
        borderStyle: "solid",
        borderColor: "#7E7D81",
        margin: "auto"
      }}>
        <br />
        <div style={{ backgroundColor: "#A4C0BF", borderRadius: "12px", width: "30vw", margin: "auto", color: "#F9F9F8" }}><h4>สถานีต้นทาง   : {clickS}</h4><h4 align="center">สถานีปลายทาง : {clickD}</h4></div>
        {/* <h2 align="center">ทดสอบระบบ : {clickS.split(" ")[0]}</h2> */}
        {/* <h2 align="center">ทดสอบระบบ2 : {clickD.split(" ")[0]}</h2> */}
        <h5
          style={{
            whiteSpace: 'pre',
            backgroundColor: "#F9F9F8",
            borderRadius: "12px",
            width: "50vw",
            textAlign: "center",
            marginLeft: "20px",
            borderStyle: "solid",
            borderColor: "#7E7D81",
            borderWidth: "5px",
            margin: "auto"
          }}>เส้นทางที่คำนวณได้ : {Ans[0]}</h5>
        <br />
        <div style={{ backgroundColor: "#A4C0BF", borderRadius: "12px", width: "20vw", margin: "auto", color: "#F9F9F8" }}>
          <h4 align="center">เวลาที่คำนวณได้ : {Ans[2]} นาที</h4>
          <h4 align="center">ราคาที่คำนวณได้ : {Ans[1]} บาท</h4>
        </div>
        <Link to="/home">
          <br></br>
          <Button
            onClick={() => handleSetdefault()}
            variant="outline-success"
            size="lg"
            style={{ width: "auto", borderRadius: "12px" }}
          >
            เสร็จสิ้นการทำงาน
          </Button>
        </Link>
        <br></br>
        <br></br>
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="info" />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )



}

export default TrainCalculationResult
