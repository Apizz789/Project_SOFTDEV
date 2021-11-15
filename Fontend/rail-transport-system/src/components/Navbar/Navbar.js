import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../Navbar/Navbar.css';
import {InputGroup,FormControl,Col,Row,Button,Container,Form,Table} from 'react-bootstrap'

function refreshPage(){
  window.scrollTo(0,0);
}

function Navbar() {
    const [click,setClick]= useState(false);
    const [button,setButton]=useState(true);

    const handleClick =()=>setClick(!click);
    const closeMobileMenu = ()=>setClick(false);

    const showButton=()=>{
        if(window.innerWidth<=960){
            setButton(false);
        }else{
            setButton(true);
        }
    };

    useEffect(()=>{
      showButton()
    },[])

    window.addEventListener('resize',showButton);

    return (
        <div style={{display:"block",position: "fixed",width:"100vw",zIndex:"10"}}>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Container>
                <Row>
                  <Col>
                  </Col>
                  <Col>
                    <Col>
                    1
                    </Col>
                    <Col>
                    2
                    </Col>
                  </Col>
                </Row>
              </Container>
              <Link to='/home' className='navbar-logo' onClick={closeMobileMenu} onClick={refreshPage}> 
                <i className="fas fa-subway"></i>RTS
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='navbar-item'>
                  <Link to='/home' className='nav-links' onClick={closeMobileMenu} onClick={refreshPage}>
                    Home
                  </Link>
                </li>
                <li className='navbar-item'>
                  <Link
                    to='/services'
                    className='nav-links'
                    onClick={closeMobileMenu}
                    onClick={refreshPage}
                  >
                    Services
                  </Link>
                </li>
                <li className='navbar-item'>
                  <Link
                    to='/ticket'
                    className='nav-links'
                    onClick={closeMobileMenu}
                    onClick={refreshPage}
                  >
                    Ticket
                  </Link>
                </li>
                <li className='navbar-item'>
                  <Link
                    to='/contact'
                    className='nav-links'
                    onClick={closeMobileMenu}
                    onClick={refreshPage}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              
              <Link to='/register' className='btn-mobile' onClick={refreshPage}>
                <Button  variant="outline-info" style={{width:"100px",margin:"5px"}}>LOGIN</Button>
              </Link>
                    
              <Link to='/filp-page' className='btn-mobile' onClick={refreshPage}>
                <Button  variant="outline-danger" style={{width:"100px",margin:"5px"}}>LOGOUT</Button>
              </Link>
              
        
            </div>
          </nav>
        </div>
    );
}

export default Navbar;
