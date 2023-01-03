import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'


function PostPage() {
    

    const[posts, setAllPosts] = useState([]);
    const [categories, setCategories] = useState([])

    const getCategories= async() => {
        let response = await axios.get('/categories')
        // console.log(response.data.success)
        setCategories(response.data.success)
    
      }

    const getPosts = async() => {
        let response = await axios.get(`#/posts/${category.id}`)
        // console.log(response.data)
        setAllPosts(response.data.success)
    }

    // const createPost= async(event)=>{
    //     let response = await axios.post(`/post/${params.category_id}`,{
    //         'title':document.getElementById('newPost').value,
    //         'content':document.getElementById('content').value
    //     })
    //     getPosts()
    // }

    useEffect( () => {
        getPosts(),
        getCategories()
      },[])

    return (
        <div>
            <h2>PostPage</h2>
            <h3>All Posts</h3>
                
                {posts.map((post) =>(
                    <div key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                    </div>
                ))}
            <hr/>
            <h3>Add Post</h3>
                <form style={{display:'flex', flexDirection:'column'}} onSubmit={(event) => {createPost(event)}}>
                    <input placeholder='title'/>
                    <textarea id='text'/>
                    <input type='submit'/>
                </form>
        </div>
   
    )

    
}

export default PostPage