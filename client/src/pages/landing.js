import { React, useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import { config } from '../config';

import {db} from '../config';

import { Col, Container, Row } from 'react-bootstrap';


// let db;
// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//     db = firebase.firestore()

//   }else {
//     firebase.app(config);
//     db = firebase.firestore()
//   }


function Landing(){
    

    useEffect(()=>{

    })




    return(
      <Container className='home-page' style={{"height": "100vh"}}>
        <Row>
          <div style={{"margin": "auto"}}>
            <h1 style={{"color": "#FF9F33"}}>Chef Easy</h1>
          </div>
          
        </Row>
        <Row xl={2} lg={2} md={2} sm={2} xs={2} style={{"height": "100%"}}>
          <Link to='/demo'>
            <Col style={{"height": "90%", "backgroundColor": "#FEC76D"}}>
              <div style={{"textAlign": "center"}}>
                <h1  style={{"color": "white", "textAlign": "center"}}>
                  Demo
                </h1>
              </div>
            </Col>
          </Link>

          <Link style={{}} to='/actual'> 
            <Col style={{"height": "90%", "backgroundColor": "#FF9F33"}}>
              <div>
                <h1 style={{"color": "white"}}>
                  Actual
                </h1>
              </div>
            </Col>
          </Link>


        </Row>
      </Container>
    )


}




export default Landing