import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Post from '../pages/Post';

function CategoriesPage() {

  const [categories, setCategories] = useState([])
  const [titleInput,setTitleInput] = useState('')
  const [currentID, setCurrentID]= useState(0)

  const getCategories= async() => {
    let response = await axios.get('/categories')
    // console.log(response.data.success)
    setCategories(response.data.success)

  }

  const addCategory= async() => {
    // event.preventDefault(); 
    let response = await axios.post('categories/', {'title':titleInput})
    console.log(response.data)
    if(response.data.success){
      getCategories();
    } 
  }

  function removeCategory(id) {
    console.log(id)
    axios.delete('category/'+id+'/' )
    .then( response => {
      console.log(response.data)
      getCategories()
    })
   
  }

  function updateCategory(id){
    console.log(id)
    console.log(titleInput)
    axios.put('category/'+id+'/' , {'title': titleInput})
    .then( response => {
      console.log(response.data.success)
    }).then(
      getCategories()
    )
  }

  useEffect( () => {
    getCategories()
  },[])

  return (
    <div>
      <h1>Categories Page</h1>
        <div style={{justifyContent:'centered'}}>
      
        
        {categories && categories.map((category) => {
          return (
           
            <div style={{display:'flex', width:'80%', justifyContent:'space-evenly' }}>
              <div>
              <h4><a href={`#/posts/${category.id}`}>{category.title}</a></h4>
              </div>
              <button onClick={ ()=>{ removeCategory(category.id)}}>Delete</button>
              <input 
                    value={titleInput} 
                    onChange={(event)=>{setTitleInput(event.target.value)}}
                    placeholder='edit title'/>
              <button onClick={ ()=>{ updateCategory(category.id)}}>Update</button>
              <p><a href={`#/info/${category.id}`}> INFO </a></p>
            </div>
          )
        })}
    
        </div>

      <hr/>
      <h1> Add Category </h1>
        
          <input value={titleInput} onChange={(event)=>{setTitleInput(event.target.value)}}/>
          <input type='submit' onClick={addCategory}/> 
      

      <hr/>
     

    </div>
  )
}

export default CategoriesPage