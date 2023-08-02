import {React, useState} from 'react'
import Treemappic from '../imgs/treemapic.png'
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChartModal from '../../ChartModal'
import TreeChart from './TreeChart'

const Treemap = ({...props}) => {

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

    if(chart === "Treemap") 
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
          <div className = "p-3"onClick ={handleImageClick("Treemap")}>
            <img src= { Treemappic } alt = "treemapic" style = {{ visibility: "visible"}}/>
          </div>
        </Col>
      </Row>
      <ChartModal show = {chart} dialogshow = {setChart}> 
        { 
            <TreeChart chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/> 
        }
      </ChartModal>

    </Container>

    
  )
}

export default Treemap;