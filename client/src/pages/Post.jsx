import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Post() {
    const params = useParams();
    const[posts, setAllPosts] = useState([]);

    const getPosts = async() => {
        let response = await axios.get(`posts/${params.id_category}/`)
        console.log(response.data.success)
        setAllPosts(response.data.success)
    }

    const createPost = async(event) =>{
        event.preventDefault()
        try{
            let response = await axios.post(`posts/${params.id_category}/`,{
                'title':document.getElementById('newPost').value,
                'content':document.getElementById('content').value
            })
            if(response.data.success){
                getPosts()
                console.log(response.data.success)
            }
        }catch(error){
            console.log(error)
        }
    }

    const removePost = async(post_id) =>{
        console.log(post_id)
        let response = await axios.delete(`postss/${post_id}/`)
        if(response.data.success){
            getPosts()
        }
    }

    useEffect( () => {
        getPosts()
      },[])


    return (
        <div>
            <h4>Post: {JSON.stringify(params)}</h4>
            <h3>All Posts</h3>
                
                {posts.map((post) =>(
                    <div key={post.id} style={{display:'flex', width:'80%', justifyContent:'space-evenly' }}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <button onClick={ ()=>{ removePost(post.id)}}>Delete</button>
                    </div>
                ))}
            <hr/>

            <h3>Add Post</h3>
                <form style={{display:'flex', flexDirection:'column'}} onSubmit={(event) => {createPost(event)}}>
                    <input id='newPost' placeholder='title'/>
                    <textarea id='content'/>
                    <input type='submit'/>
                </form>
        </div>
        
    )
}

export default Post