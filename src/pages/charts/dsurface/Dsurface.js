import { React, useState } from 'react'
import { toast } from 'react-toastify'
import ChartModal from '../../ChartModal'
import Dsurfacepic from '../imgs/3dsurfacepic.png'
import Surface from './Surface'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dsurface = ({...props}) => {
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

    if(chart === "3D Surface") 
    {
      if(asis.length === 3 )
        setChart(chart);
     else 
        toast.error('This table require 3 number fields.')
    }
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6} lg={4}>
          <div className = "p-3" onClick ={handleImageClick("3D Surface")}>
            <img src= { Dsurfacepic } alt = "Animationdelaypic" style = {{ visibility: "visible"}} />
          </div>
        </Col>
      </Row>

      <ChartModal show = {chart} dialogshow = {setChart}> 
        { 
            <Surface chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/> 
        }
      </ChartModal>
    </Container>
  )
}

export default Dsurface;
