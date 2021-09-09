import React from 'react'
import "./Table.css"
const Table = () => {
    return (
        <div className="main-table">
            <div className="table-top">
                <div className="table-header">
                    <h3 className="table-heading">name</h3>
                </div>
                <div className="table-items">
                    <div className="inner-table">
                        <ul  style={{ 
                            display: '-ms-flexbox',       
                            display: '-webkit-flex',        
                            webkitFlexFlow: 'wrap column',
                            flexFlow: 'wrap column',                           
                             maxHeight: '190px',  
                             marginLeft: "-2rem "         
                          }}>
                            <li class="list-group-item list-group-item-warning">First item<span class="badge">12</span></li>
                            <li class="list-group-item list-group-item-info">Second item<span class="badge">12</span></li>
                            <li class="list-group-item list-group-item-warning">Third item<span class="badge">12</span></li>
                            <li class="list-group-item list-group-item-info">Fourth item<span class="badge">12</span></li>
                            <li class="list-group-item list-group-item-warning">First item<span class="badge">12</span></li>
                            <li class="list-group-item list-group-item-info">Second item<span class="badge">12</span></li>
                            <li class="list-group-item list-group-item-warning">Third item<span class="badge">12</span></li>
                            <li class="list-group-item list-group-item-info">Fourth item<span class="badge">12</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
