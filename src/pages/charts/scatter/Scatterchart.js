import { React, useState } from 'react'
import ChartModal from '../../ChartModal'
import Simplescatter from './Simplescatter'
import Visualscatter from "./Visualscatter"
import Bubblescatter from "./Bubblescatter"
import { toast } from 'react-toastify'
import Basicscatterpic from '../imgs/basicscatterpic.png'
import Visaulscatter from '../imgs/visualscatter.png'
import Bubblescatterpic from '../imgs/bubblescatterpic.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Scatterchart = ({...props}) => {

  const [ chart, setChart] = useState(false); 
  const {chartdata, columnsData, asis} = props

  const handleImageClick = (chart) => (e) => {
    if(asis?.length === 0){
      toast.error("Select Axis!!!")
      return;
    }

    if(chartdata?.length === 0) {
      toast.error("Select coulmns!!!")
      return;
    }

    if(chart === "Basic Scatter Chart") 
    {
      if(asis.length === 2 )
        setChart(chart);
     else 
        toast.error('This table require 2 fields.')
    }
    else if(chart === "Visual interaction with stream") 
    {
      if(asis.length === 2)
        setChart(chart);
      else 
        toast.error('This table require 2 fields.')
     }
    else if(chart === "Bubble Chart") 
    {
      if(asis.length === 5 )
        setChart(chart);
       else 
        toast.error('This table require 5 fields.')
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Basic Scatter Chart")}>
            <img src= { Basicscatterpic } alt = "basicscatterpic"style = {{ visibility: "visible"}} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Visual interaction with stream")}>
            <img src= { Visaulscatter } alt = "visaulscatter"style = {{ visibility: "visible"}} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Bubble Chart")}>
            <img src= { Bubblescatterpic } alt = "bubblescatterpic" style = {{ visibility: "visible"}} />
          </div>
        </Col>
      </Row>

        <ChartModal show = {chart} dialogshow = {setChart}> 
          {
            chart === "Bubble Chart" ? 
                <Bubblescatter chartdata = {chartdata} columnsData = {columnsData} asis={asis}/> :
            chart === "Visual interaction with stream" ? 
                <Visualscatter chartdata = {chartdata} columnsData = {columnsData} asis={asis}/>:
            chart === "Basic Scatter Chart" ? 
            <Simplescatter chartdata = {chartdata} columnsData = {columnsData} asis={asis}/>:<></>
          }
        </ChartModal>
    </Container>
  )
}

export default Scatterchart;