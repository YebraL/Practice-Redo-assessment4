import { useEffect, useState } from 'react';
import Home from './pages/Home';
import axios from 'axios'
import {HashRouter as Router, Routes, Route, Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


import './App.css'
import CategoriesPage from './components/CategoriesPage';

import Post from './pages/Post';

function App() {

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken

  // style={{display:'flex', justifyContent:'right', fixed:'top'}}
  // style={{width:'100%', justifyContent:'space-around'}}
  return (
    <div className="App">
    <h1>Welcome To Card Games CRUD </h1>
      <Router>
        <div>
          <Navbar sticky= 'top' style={{display:'flex', justifyContent:'right'}}>
            <Container fluid>
              <Nav style={{width:'20%', justifyContent:'space-around'}}>
                
                <Nav.Item>
                  <Link to='/'> Home </Link>
                </Nav.Item>
                
                <Nav.Item>
                  <Link to='categories' > Categories </Link>
                </Nav.Item>

               
              </Nav>
            </Container>
          </Navbar>
          <hr/>
        </div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='categories/' element={<CategoriesPage/>}/>
          <Route path='categories/:id_category' element={<CategoriesPage/>}/>
          <Route path='/posts/:id_category' element={<Post/>}/>
          <Route path='/postss/:id_category' element={<Post/>}/>
        </Routes>

      </Router>
    </div>
  )
}

export default App
