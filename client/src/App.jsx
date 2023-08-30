import { useState } from 'react'
import './App.css'
import PostsList from  "./features/posts/PostsList.jsx"

function App() {

  return (
    <>
        <div className="app">
            <h1>React on Rails Blog</h1>
            <p>Find this app in layout in client/src/App.jsx</p>
            <PostsList />
        </div>
    </>
  )
}

export default App
