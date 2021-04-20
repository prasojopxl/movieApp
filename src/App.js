import "./assets/css/style.scss";
import React from 'react'
import {Favorites, Movie} from "./components/";

export const App = () => {  
  return (
    <div className="container">
      <Movie/>
    </div>
  )
}


export default App;
