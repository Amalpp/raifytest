import axios from 'axios'
import React, { useState } from 'react'
import SearchIcon from "@material-ui/icons/Search";
import '../table/Table.css'
import './Searchbar.css'
const Searchbar = () => {

    let [searchResult, setSearchResult] = useState([])
    function searchFunction(e) {
        console.log('@@@@@e:', e.target.value)
        axios.post('http://localhost:5000/search', {
            keyword: e.target.value
        }).then((response) => {

            let userSerch = response.data.data.result;
            console.log('respo response:!!!!==:', userSerch)
            setSearchResult(response.data.data.result)
            console.log('state response:!!!!==:', searchResult)

        })
    }

    const [details, setDetails] = useState()

    return (
        <div>
            <div className="searchbar">
                <div className="input-searchbar">
                    <SearchIcon />
                    <input type="text" className="search" onKeyUp={searchFunction} />
                </div>

                <div className='searchResultBox'>

                    {searchResult.map((data, index) =>
                        <div className='searchListContainer' onClick={() => { setDetails(data) }}>
                            <div className='searchNameContainer'>
                                <h5 className="search-name">{data.Name}</h5>
                            </div>
                        </div>
                    )}

                </div>

            </div>


            <div className="table-top">

                <div className="main-table">
                    <h3 className="table-heading">{details ? details.Name : null}</h3>
                    <div className="table-items">

                        <div className="inner-table">
                            <ul style={{
                                display: '-ms-flexbox',
                                display: '-webkit-flex',
                                webkitFlexFlow: 'wrap column',
                                flexFlow: 'wrap column',
                                maxHeight: '190px',
                                marginLeft: '-1rem',
                                marginTop: '1rem'
                            }}>
                                <li class="list-group-item   
                                list-group-item-warning">Market Cap  <span class="badge">{details ? details['Market Cap'] : null}</span></li>
                                <li class="list-group-item
                
                                list-group-item-info">Current Market Price<span class="badge">{details ? details["Current Market Price"] : null}</span></li>
                                <li class="list-group-item list-group-item-warning">Stock P/E<span class="badge">{details ? details['Stock P/E'] : null}</span></li>
                                <li class="list-group-item list-group-item-info">Debt<span class="badge">{details ? details['Debt'] : null}</span></li>
                                <li class="list-group-item list-group-item-warning">Dividend Yield<span class="badge">{details ? details['Dividend Yield'] : null}</span></li>
                                <li class="list-group-item ist-group-item-info">ROCE %<span class="badge">{details ? details['ROCE %'] : null}</span></li>
                                <li class="list-group-item list-group-item-warning">ROE<span class="badge">{details ? details['DROE Previous Annumebt'] : null}</span></li>
                                <li class="list-group-item list-group-item-info">Debt to Equity<span class="badge">{details ? details['Debt to Equity'] : null}</span></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchbar
