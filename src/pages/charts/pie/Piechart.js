import { React, useState } from 'react'
import ChartModal from '../../ChartModal'
import Referer from './Referer'
import Doughnut from "./Doughnut"
import Refererpic from '../imgs/refererpic.png'
import Doughnutpic from '../imgs/doughnutpic.png'
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PieChart = ({...props}) => {
  const [ chart, setChart] = useState(false); 

  const {chartdata, columnsData, asis} = props

  const handleImageClick = (chart) => (e) => {

    if(asis?.length === 0){
      toast.error("Select Axis!!!")
      return;
    }

    if(chartdata?.length == 0) {
      toast.error("Select coulmns!!!")
      return;
    }

    if(chart === "Referer of a Website") 
    {
      if(asis.length === 2 )
        setChart(chart);
     else 
        toast.error('This table require 2 fields.')
    }
    else if(chart === "Doughnut Chart With Rounded Corner") 
    {
      if(asis.length === 2 )
        setChart(chart);
      else 
        toast.error('This table require 2 fields.')
     }
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Referer of a Website")}>
            <img src= { Refererpic } alt = "refererpic" style = {{ visibility: "visible"}} />
          </div>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("Doughnut Chart With Rounded Corner")}>
            <img src= { Doughnutpic } alt = "doughnutpic" style = {{ visibility: "visible"}} />
          </div>
        </Col>
      </Row>
  
   
      <ChartModal show = {chart} dialogshow = {setChart}> 
        {
          chart === "Referer of a Website" ? 
              <Referer chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/> :
          chart === "Doughnut Chart With Rounded Corner" ? 
              <Doughnut chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/>:<></>
        }
      </ChartModal>
    </Container>
  )
}

export default PieChart;