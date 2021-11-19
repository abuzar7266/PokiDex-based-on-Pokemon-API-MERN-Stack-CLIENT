import React from 'react'
import { useEffect,useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Image, Button, Container, Col, Row } from "react-bootstrap";
import NavBar from './components/navbar';
import axios from 'axios';
import {Card} from 'react-bootstrap';
const authAxios  =axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
});
const Favourite = (props) => {
    const initialValue = [{_id:"?",name:"?",Hp:"?",Defense:"?",Attack:"?",Speed:"?",Sprite:"?"}];
    const [favouriteArray,setFavouriteArray] = useState(initialValue);
    useEffect(() => {
        authAxios.get('https://obscure-lake-36852.herokuapp.com/favourite')
        .then((res)=>{
            setFavouriteArray(res.data);
        })
    })
    const handleRemove = ((id)=>{
        authAxios.delete(`https://obscure-lake-36852.herokuapp.com/favourite/${id}`);
    })
    return (<>
        <NavBar/>
        <Container>
            <Row>
              <br/>
           </Row>
           <Row>
              <br/>
           </Row>
           <Row>
              <br/>
           </Row>
           <Row>
               {
                   !localStorage.getItem('token') && <h1>Please login to the account</h1>
               }
           </Row>
           <Row>
               {   localStorage.getItem('token') && 
                   favouriteArray.map(({_id,user,name,Hp,Defense,Speed,Attack,Sprite})=>{
                       if(_id!=="?"){
                       return (<div className="col-md-3 col-auto" style={{paddingBottom:"20px"}}>
                        <Card id={_id} style={{ width: '18rem'}}>
                        <Card.Img variant="top" src={Sprite} style={{marginLeft:"35%",height:"120px",width:"120px"}}/>
                        <Card.Body>
                            <hr/>
                            <Card.Text>
                                Name: {name}<br/>
                                HP: {Hp}<br/>
                                Attack: {Attack} <br/>
                                Defense: {Defense} <br/>
                                Speed: {Speed}
                            </Card.Text>
                            <Button onClick={()=>{handleRemove(_id);}} variant="outline-primary">Remove Favourite</Button>
                        </Card.Body>
                        </Card>
                        </div>);
                       }
                       else{
                           return (<div></div>);
                       }
                   })
               }
           </Row>
        </Container>
        </>
    )
}
export default Favourite;