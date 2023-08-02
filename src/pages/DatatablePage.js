import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SortAscending, SortDescending } from "react-hero-icon/solid";
import { MultiSelect } from "react-multi-select-component";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import Echarts from "./Echarts";
import Table from 'react-bootstrap/Table';


const PAGE_SIZE = 10;

const DatatablePage = ({...props}) => {
  const { tableData, columns } = props;
  
  const [tbodyData, setTableData] = useState([])
  const [columnsData, setColumnsData] = useState([]);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const [checkedRows, setCheckedRows] = useState([]);
  const [checkedCols, setCheckedCols] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedColumnData, setSelectedColumnData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);

  const [editingIndex, setEditingIndex] = useState(null);
  const [newHeaderTexts, setNewHeaderTexts] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([])


  const onSetClick = () => {
    toast.success('Success')
  }

  const handleDoubleClick = (index) => {
    setEditingIndex(index);
  };

  const handleNewHeaderTextChange = (event, index) => {
    const newHeaderTextsCopy = [...columnsData];
    newHeaderTextsCopy[index] = event.target.value;
    setNewHeaderTexts(newHeaderTextsCopy);
  };

  const handleSave = (index) => {
    const headerTextsCopy = [...columnsData];

    const selColDataIndex = selectedColumnData.indexOf(headerTextsCopy[index])
    if(selColDataIndex !== -1) {
      const selHeaderTextCopy = [...selectedColumnData]
      selHeaderTextCopy[selColDataIndex] = [newHeaderTexts[index]]
      setSelectedColumnData(selHeaderTextCopy)
    }

    headerTextsCopy[index] = newHeaderTexts[index];
    setColumnsData(headerTextsCopy)
    setEditingIndex(null);
  };

  const handleCancel = (index) => {
    const newHeaderTextsCopy = [...columnsData];
    newHeaderTextsCopy[index] = columnsData[index];
    setColumnsData(newHeaderTextsCopy)
    setNewHeaderTexts(newHeaderTextsCopy);
    setEditingIndex(null);
  };

  const renderHeaderCell = (headerText, index) => {
    if (editingIndex === index) {
      return (
        <th key={index} className="d-flex flex-row  justify-content-center" style={{width: '15%'}}>
          <input
            type="text"
            defaultValue={columnsData[index]}
            onChange={(event) => handleNewHeaderTextChange(event, index)}
          />
          <button onClick={() => handleSave(index)}>OK</button>
          <button onClick={() => handleCancel(index)}>Cancel</button>
        </th>
      );
    } else {
      return (
        <th key={index} onDoubleClick={() => handleDoubleClick(index)}>
          <div className="d-flex flex-row  justify-content-between align-items-center">
                  <input
                    style={{width:'20px', height:'20px'}}
                    type="checkbox"
                    checked={isChecked(null, index)}
                    onChange={() => handleColCheckboxChange(index)}
                  />
                  {headerText}
              
                  <div className="pointer" onClick={() => handleSort(index) }>
                    {
                      sortDirection === 'asc' ? <SortAscending /> : <SortDescending />
                    }
                  </div>
          </div>
        </th>
      );
    }
  };

  const initTable = () => {
    setCheckedRows([]);
    setCheckedCols([]);
    setSelectedData([]);
    setSelectedColumnData([]);
    setCurrentPage(0);
  }

  useEffect(() => {

    setTableData(tableData);
    setColumnsData(columns);
    
    setSortColumn([]);
    setSortDirection([]);

    initTable();

  }, [tableData, columns])

  const handleRowCheckboxChange = (rowIndex) => {
    // Event Row Checkbox
    if (checkedRows.includes(rowIndex)) {
      setCheckedRows(checkedRows.filter((row) => row !== rowIndex));
    } else {
      setCheckedRows([...checkedRows, rowIndex]);
    }

  };

  const handleColCheckboxChange = (colIndex) => {
    // Event Col Checkbox
    if (checkedCols.includes(colIndex)) {
      setCheckedCols(checkedCols.filter((col) => col !== colIndex));
    } else {
      setCheckedCols([...checkedCols, colIndex]);
    }

  };

  const compare = (value1, value2) =>{
    return value1 - value2;
  }


  useEffect(() => {
    if(checkedCols && checkedCols.length !== 0) {
      let temp  = checkedCols.sort(compare);
      let selectedColumnsTexts = temp.map((colIndex, key) => [columnsData[colIndex]] )
      
      setSelectedColumnData(selectedColumnsTexts);
    }
  }, [checkedCols])

  const isChecked = (rowIndex, colIndex) => {
    if (rowIndex !== null) {
      return checkedRows.includes(rowIndex);
    } else if (colIndex !== null) {
      return checkedCols.includes(colIndex);
    }

  };

  const allCheck = () => {
    // Event All Row Checkbox
    if(checkedRows.length === 0 || checkedRows.length !== tableData.length) {
      let rows = tableData.map((__, index) => index);
      setCheckedRows(rows);
    } else {
      setCheckedRows([])
    }
  } 

  const handleOkButtonClick = () => {
    // Event Ok Button
    const filteredData = sortedData
      .filter((_, rowIndex) => checkedRows.includes(rowIndex))
      .map((row) => row.filter((_, colIndex) => checkedCols.includes(colIndex)));
    setSelectedData(filteredData);
    toast.success('Success')
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //Sort tha data if a sort column and direction are set
  const sortedData = React.useMemo(() => {
    if(sortColumn === null){
      return tbodyData;
    }

    return [...tbodyData].sort((a,b) =>{
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if(aValue === bValue){
        return 0;
      }
      return sortDirection === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
  }, [sortColumn, sortDirection, tbodyData])

  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, tableData.length);
  const visibleRows = sortedData.slice(startIndex, endIndex);

  const handleSort = (columnIndex) =>{
    initTable();
    if(sortColumn === columnIndex){
      setSortDirection(sortDirection === 'asc' ? 'desc':'asc');
      // desc

    } else{
      setSortColumn(columnIndex);
      setSortDirection('asc');
      // asc
    }
  }

  return (
    <div>
      <div style={{width: '90%', marginLeft:'auto', marginRight: 'auto', overflowX: 'auto'}}>
        <Table striped bordered hover style={{ overflowX:'auto',whiteSpace:'nowrap', width:'100%', margin:'auto'}}>
          <thead>
          <tr>
            <th><button onClick={allCheck} className = "btn btn-outline-secondary">All</button></th>
            {columnsData.map((headerText, index) =>
              renderHeaderCell(headerText, index)
            )}
          </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <tr key={startIndex + rowIndex}>
                <td>
                  <input
                    style={{width:'20px', height:'20px'}}
                    type="checkbox"
                    checked={isChecked(startIndex + rowIndex, null)}
                    onChange={() => handleRowCheckboxChange(startIndex + rowIndex)}
                  />
                </td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="pagination" style={{marginTop: '20px'}}>
          <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)} className = "btn btn-outline-secondary">
            Prev
          </button>
          <button style={{marginLeft: '20px'}} disabled={currentPage === Math.floor(tableData.length / PAGE_SIZE)} className = "btn ml-2 btn-outline-secondary" 
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <button type="button" className="btn btn-primary mt-3 col-8 mb-3" onClick={handleOkButtonClick}>
        OK
      </button>
      <div className="d-flex justify-content-center">
          <MultiSelect
              options={
                selectedColumnData.map((data, index) => ({
                  value:index, label:data[0]
                }))
              }
              value={selectedOptions}
              onChange={setSelectedOptions}
              labelledBy={"Select"}
              isCreatable={true}
            />
          <button className = "btn btn-outline-secondary" style={{marginLeft: '20px', marginRight: '20px'}} onClick={() => onSetClick()}>
            Set
          </button>
      </div>
        <Echarts chartdata = {selectedData} columnsData = {selectedColumnData} asis = {selectedOptions}/> 
    </div>
  )
}

export default DatatablePage;
