import React from 'react'
import sadKitty from '../assets/404-sad-kitty.webp'
const NotFound = () => {
  return (
    <main>
        <h1>404 - Page Not Found</h1>  
        <img src = {sadKitty} alt = "sad cat photo"/>
    </main>
  )
}

export default NotFound