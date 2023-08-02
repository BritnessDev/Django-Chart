import ChartModal from '../../ChartModal'
import { React, useState, useEffect } from 'react'
import Dscatterpic from '../imgs/3dscatterpic.png'
import useEcharts from 'react-hooks-echarts';
import { toast } from 'react-toastify'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dscatter = ({...props}) => {
  const [ chart, setChart] = useState(false); 

  const [chartRef, ref] = useEcharts()
    
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

    if(chart === "3D Scatter") {
        toast.error('This table require other fields.')
    }
  }

  const DscatterChart = () => {
  
  useEffect(() => {
    const chart = chartRef.current;

    chart.setOption({

    })
  }, [])
  }
   
  return (
    <Container>
      <Row>
        <Col>
          <div className = "p-3" onClick ={handleImageClick("3D Scatter")}>
            <img src= { Dscatterpic } alt = "3dscatterpic" style = {{ visibility: "visible"}} />
          </div>
        </Col>
      </Row>
     
     <ChartModal show = {chart} dialogshow = {setChart}> 
        { 
            <DscatterChart /> 
        }
      </ChartModal>
    </Container>
  )
}

export default Dscatter;