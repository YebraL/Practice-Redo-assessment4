import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'

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

 
  useEffect( () => {
    getCategories()
  },[])

  return (
    <div>
      <h1>Categories Page</h1>
        <div style={{justifyContent:'centered'}}>
        {categories && categories.map((category) => {
          return (
            <div>
              <div>
              <h4>{category.title}</h4>
              </div>
              <button onClick={ ()=>{ removeCategory(category.id)}}>Delete</button>
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