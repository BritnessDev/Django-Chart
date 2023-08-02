import { React, useState } from 'react'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatatablePage from './DatatablePage'
const Search = ({...props}) => {

  const [search, setSearch] = useState(1);
  const [rawData, setRawData] = useState([]);
  const [columnsData, setColumnsData] = useState([]);


  const onSubmitClick = () => {
    var logInfo = localStorage.getItem("logInfo");
    logInfo = JSON.parse(logInfo);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test_opt: search,
        ...logInfo
      })
    }
    fetch('http://localhost:8000/api/book-api/', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.status == 'true') {
          setRawData(data.message)
          setColumnsData(data.columns)
          
        } else {
          alert(data.message)
        }
      })
  }

  const onInputChange = (e) => {
    setSearch(e.target.value)
  }

  return (
      <>
        <div className="container col-8 pt-5 pb-3 text-start" >
            <div className = "d-flex">
                <div className="input-group">
                    <input className="form-control" id="question" value={search} placeholder="Enter question" onChange={(e) => onInputChange(e)} name="question" />
                    <span className="input-group-text"><FontAwesomeIcon icon={ faMagnifyingGlass } style = {{ color : '#0080ff' }}/></span>
                </div>
                <button 
                  onClick = {() => onSubmitClick()} 
                  className="btn btn-outline-primary" style={{marginLeft: '10px'}}
                >
                  Submit
                </button>
            </div>
        </div>
          <DatatablePage tableData  = { rawData } columns={columnsData}/>
      </>
  )
}

export default Search;
