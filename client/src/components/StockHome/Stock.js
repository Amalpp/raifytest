

import React from 'react'
import Header from './header/Header'
import Searchbar from './searchBar/Searchbar'
import "./Stock.css"



const Stock = () => {
    return (
        <div style={{backgroundColor:"rgb(241 249 254)"}}>
            <Header/>
           <div>
            <h3 className="body-title" >The easiest way to buy <br></br> and shell stocks.</h3>
            <h5>Stock analysis and screening tool for inversters in india</h5>
           </div>
           <div>
           
           <Searchbar/>
           </div>
         
        </div>
    )
}

export default Stock
