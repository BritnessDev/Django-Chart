import { React, useState } from 'react'
import Stackedline from './Stackedline'
import Areastack from "./Areastack"
import Linerace from './Linerace'
import Lineaqi from './Lineaqi'
import Areastackpic from '../imgs/areastackpic.png'
import Stackedlinepic from '../imgs/stackedlinepic.png'
import Lineaqipic from '../imgs/lineaqipic.png'
import Lineracepic from '../imgs/lineracepic.png'
import ChartModal from '../../ChartModal';
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Linechart = ({...props}) => {
  
  const [ chart, setChart] = useState(false); 

  const {chartdata, columnsData, asis, indexColumnsData} = props
  

  const handleImageClick = (chart) => (e) => {

    if(asis?.length === 0){
      toast.error("Select Axis!!!")
      return;
    }

    if(chartdata?.length === 0) {
      toast.error("Select coulmns!!!")
      return;
    }

    if(chart === "Stacked Line") 
    {
      if(asis.length === 3 )
        setChart(chart);
     else 
        toast.error('This table require 3 fields.')
    }
    else if(chart === "Stacked Area Chart") 
    {
      if(asis.length === 3 )
        setChart(chart);
      else 
        toast.error('This table require 3 fields.')
     }
    else if(chart === "Line Race") 
    {
      if(asis.length === 3 )
        setChart(chart);
       else 
        toast.error('This table require 3 fields.')
    }else if(chart === "Beijing AQI") 
    {
      if(asis.length === 2 )
        setChart(chart);
       else 
        toast.error('This table require 2 fields.')
    }
  }

  return (
    <Container>
     <Row className='justify-content-md-center'>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3"onClick ={handleImageClick("Stacked Line")}>
            <img src= { Stackedlinepic } alt = "areastackpic" style = {{ visibility: "visible"}} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Stacked Area Chart")}>
            <img src= { Areastackpic } alt = "stackedlinepic" style = {{ visibility: "visible"}} /> 
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Beijing AQI")}>
            <img src= { Lineaqipic } alt = "lineaqipic" style = {{ visibility: "visible"}} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Line Race")}>
            <img src= { Lineracepic } alt = "lineracepic" style = {{ visibility: "visible"}} /> 
          </div>
        </Col>
      </Row>
      <ChartModal show = {chart} dialogshow = {setChart}> 
        {
          chart === "Stacked Line" ? 
              <Stackedline chartdata = {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/> :
          chart === "Stacked Area Chart" ? 
              <Areastack chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/>:
          chart === "Line Race" ? 
              <Linerace chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/>:
          chart === "Beijing AQI" ? 
              <Lineaqi chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/>:<></>
        }
      </ChartModal>
    </Container>
  )
}

export default Linechart;