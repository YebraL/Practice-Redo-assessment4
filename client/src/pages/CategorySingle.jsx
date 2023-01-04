import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'

function CategorySingle() {
    
    const params = useParams()

    const[posts,setPosts] = useState([])

    const getPostsAgain = async() => {
        console.log(params.id_category)
        let response = await axios.get(`posts/${params.id_category}/`)
        // console.log(response.data.success)
        setPosts(response.data.success)
    }

    useEffect( () => {
        getPostsAgain()
    },[])

    return (

        <div>
            <h1> Category Single </h1>

            <h4>Info</h4>
            <p>some description this is...</p>
            <hr/>
            {posts.map((post)=>{
                return(
                    <div style={{display:'flex', width:'80%', justifyContent:'space-evenly' }}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                    </div>
                )
            })
            }
        </div>
    )
}

export default CategorySingle