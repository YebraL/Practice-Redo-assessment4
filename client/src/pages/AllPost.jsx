import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function AllPost() {

    const [allPosts, setAllPosts] = useState([])

    const getAllPost= async() => {
        let response = await axios.get('/allPosts')
        console.log(response.data.success)
        setAllPosts(response.data.success)
        }
    
    useEffect( () => {
        getAllPost()
    },[])

    return (
        <div>
            <h1>All Post</h1>
            
            {allPosts.map((post)=>{
                return(
                <div style={{display:'flex', width:'80%', justifyContent:'space-evenly' }}>
                    <h4> Title: {post.title} </h4>
                    <p> Content: {post.content}</p>
                    <p> Post ID: {post.id} </p>
                    <p> Category ID: {post.category_id}</p>
                </div>
                )
            })}
            
        </div>
    )
}

export default AllPost