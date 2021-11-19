import React , {useState} from 'react'
import { Navbar } from 'react-bootstrap';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import {InputGroup,FormControl} from 'react-bootstrap'
import {Modal,Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import axios from 'axios'
import './navbar.css'
const NavBar = () => {
    const [Name,setName]=useState("");
    const [username,setUsername] = useState("");
    const [Profile,setProfile] = useState("");
    const [password,setPassword] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);
    const [LoginAttemp,setLoginAttempt] = useState(0);
    const [SignupAttemp,setSignupAttempt] = useState(0);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleLogin = (e) =>{
        e.preventDefault();
      const data = {
          username: username,
          password: password
      }
      console.log(data);
      const response = axios.post( 'https://obscure-lake-36852.herokuapp.com/login',data)
      .then(res=>{
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('profile',username);
          setLoginAttempt(1);
          window.location.reload();
      })
      .catch((err)=>{
          if(err){
            setLoginAttempt(2);
          }
      })
    }
      const handleLogout = (e) =>{
        localStorage.removeItem('token');
        setUsername("");
        setPassword("");
        setProfile("");
        window.location.reload();
      }
    const handleSignup = (e) =>{
        e.preventDefault();
      const data = {
          username: username,
          password: password,
          FullName:Name
      }
      console.log(data);
      const response = axios.post( 'https://obscure-lake-36852.herokuapp.com/signup',data)
      .then(res=>{
        if(res.status==200){
          setLoginAttempt(1);
        }
      })
      .catch((err)=>{
          if(err){
            setSignupAttempt(2);
          }
      })
    }
    var Logo = require('../images/Logo.png');
    return (<>
            <Navbar collapseOnSelect fixed="true" expand='sm' style={{backgroundColor:"#035891"}} fluid>
                <Container>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Image style={{paddingLeft:"20px",height:"50px"}} src={Logo.default}/>
                            <Nav.Link href="/" style={{paddingLeft:"25px",textDecoration:"none",color:"white",fontSize:"22px"}}>Home</Nav.Link>
                            <Nav.Link href="/favourite" style={{paddingLeft:"25px",textDecoration:"none",color:"white",fontSize:"22px"}}>Favourite</Nav.Link>
                            { !localStorage.getItem('token') && <Nav.Link onClick={(event)=>{handleShowLogin();}} style={{paddingLeft:"600px",textDecoration:"none",color:"white",fontSize:"22px",marginLeft:"auto"}}>Login</Nav.Link>}
                            { !localStorage.getItem('token') && <Nav.Link onClick={(event)=>{handleShowSignup();}} style={{paddingLeft:"25px",textDecoration:"none",color:"white",fontSize:"22px",marginLeft:"auto"}}>Sign-Up</Nav.Link>}
                            { localStorage.getItem('token') && <Nav.Link onClick={(event)=>{handleLogout();}} style={{paddingLeft:"600px",textDecoration:"none",color:"white",fontSize:"22px",marginLeft:"auto"}}><strong>{localStorage.getItem('profile')}</strong>-Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
     { !localStorage.getItem('token') && <Modal
        show={showLogin}
        onHide={handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
          <Form>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
              LoginAttemp==2 && <p>incorrect username or password</p>
            }
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={username}
                name="username"
                onChange={e=>{ setUsername(e.target.value)}}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"> # </InputGroup.Text>
                <FormControl
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon1"
                value={password}
                name="password"
                onChange={e=>{ setPassword(e.target.value)}}
                />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e)=>{handleLogin(e)}} variant="primary">Login</Button>
        </Modal.Footer>
        </Form>
      </Modal>
}
{  !localStorage.getItem('token') && <Modal
        show={showSignup}
        onHide={handleCloseSignup}
        backdrop="static"
        keyboard={false}
      >
    <Form>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {SignupAttemp==2 && <p>incorrect username or password</p>}
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Enter your Name"
                aria-label="Name"
                aria-describedby="basic-addon1"
                value={Name}
                name="FullName"
                onChange={e=>{ setName(e.target.value)}}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={username}
                name="username"
                onChange={e=>{ setUsername(e.target.value)}}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"> # </InputGroup.Text>
                <FormControl
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon1"
                value={password}
                name="password"
                onChange={e=>{ setPassword(e.target.value)}}
                />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e)=>{handleSignup(e)}} variant="primary">Signup</Button>
        </Modal.Footer>
        </Form>
    </Modal> }
        </>)
}
export default NavBar;
