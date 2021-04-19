import "./assets/css/style.scss";
import React from 'react'
import {Favorites, Movie} from "./components/";

export const App = () => {  
  return (
    <div className="container">
      <Favorites/>
      <Movie/>
    </div>
  )
}


export default App;
