import React, { useState } from 'react';
import { Image, Button, Container, Col, Row, Form } from "react-bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import NavBar from './components/navbar';
import {Input} from 'react-bootstrap';
import axios from 'axios';
import './home.css';
const authAxios  =axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
});
const Home = (props) => {
    const [AlreadyStatus,setAlreadyStatus] = useState(3);
    const [value,setValue]=useState("");
    const [Name,setName]=useState("");
    const [Hp,setHp]=useState(0);
    const [Attack,setAttack]=useState("");
    const [Defense,setDefense]=useState("");
    const [Speed,setSpeed]=useState("");
    const [Sprite,setSprite]=useState("");
    const [status,setStatus]=useState(0);
    const [AddAttem,setAddAttemp] = useState(0);
    const handleFavouriteUpload = () =>{
        if(localStorage.getItem('token'))
        {
            var data = {
                name:Name,
                Hp:Hp,
                Attack:Attack,
                Defense:Defense,
                Speed:Speed,
                Sprite:Sprite
            }
            authAxios.post('https://obscure-lake-36852.herokuapp.com/favourite',data)
            .then((res)=>{
                console.log(res);
                if(res.status===200)
                {
                    setAlreadyStatus(1);
                }
                else{
                    alert('error occurred while addding the Pokemon to favourite list successfully');
                }
            })
            .catch(()=>{
                alert('error occurred while addding the Pokemon to favourite list successfully');
            })
        }
        else{
            alert('Please login before adding pokemon to favourite list');
        }
    }
    const FetchPokemon = async () =>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then((pokemon)=>{
            if(pokemon.status===200){
                var got=0;
                setName(pokemon.data.name);
                setHp(pokemon.data.stats[0].base_stat);
                setAttack(pokemon.data.stats[1].base_stat);
                setDefense(pokemon.data.stats[2].base_stat);
                setSpeed(pokemon.data.stats[5].base_stat);
                setSprite(pokemon.data.sprites.front_default);
                setStatus(pokemon.status);
                authAxios.get('https://obscure-lake-36852.herokuapp.com/favourite')
                .then((res)=>{
                    res.data.forEach(name => {
                        console.log(name.name);
                        if(name.name===pokemon.data.name){
                            got = 1;
                        }
                    });
                    setAlreadyStatus(got);
                })
            }
        })
        .catch(()=>{
            setName("");
            setHp("");
            setAttack("");
                setDefense("");
                setSpeed("");
                setSprite("");
                setStatus("");
                setStatus(1);
        })
    } 
    return (<>
            <Container fluid>
                <Row>
                <NavBar/>
                </Row>
            </Container>
            <Container>
                <Row>
                 <h1 className="Header-Search">Search for Pokemon</h1>
                </Row>
                <Row className="Bar">
                    <input className="Search-Bar" type="text" value={value} onChange={(event)=>{ setValue(event.target.value)}}/>
                </Row >
                <Row className="Bar-Button">
                <Button onClick={()=>{FetchPokemon()}} style={{height:"30px",width:"100px",backgroundColor:"#0185dd",border:"1px solid 6192AB",borderRadius:"5px",paddingTop:"0"}}>Search</Button>
                </Row>
                <Row>
                    <br/>
                </Row>
                <Row>
                    <hr/>
                </Row>
        </Container>
        { status===200 && <Container>
            <Row>
                <div>
                        <Card style={{ width: '18rem'}}>
                        <Card.Img variant="top" src={Sprite} style={{marginLeft:"35%",height:"120px",width:"120px"}}/>
                        <Card.Body>
                            <hr/>
                            <Card.Text>
                                Name: {Name}<br/>
                                HP: {Hp}<br/>
                                Attack: {Attack} <br/>
                                Defense: {Defense} <br/>
                                Speed: {Speed}
                            </Card.Text>
                            { AlreadyStatus==0 && <Button onClick={()=>{handleFavouriteUpload();}}variant="outline-primary">Add Favourite</Button>}
                            { AlreadyStatus==1 && <p><b><i>Added in favourites</i></b></p>}
                        </Card.Body>
                        </Card>
                    </div>
            </Row>
        </Container>}
        {
            status==1 && <Container>
                    <Row style={{alignText:"center"}}>
                        <h4>not found</h4>
                    </Row>
            </Container>
        }
        </>
    )
}
export default Home;
