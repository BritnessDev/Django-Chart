import { React, useState } from 'react'
import { toast } from 'react-toastify'
import ChartModal from '../../ChartModal'
import Basicbar from './Basicbar'
import Waterfall from './Waterfall'
import Worldpopulation from './Worldpopulation'
import Barrace from './Barrace'
import Animationdelay from './Animationdelay'
import Basicbarpic from '../imgs/basicbarpic.png'
import Waterfallpic from '../imgs/waterfallpic.png'
import Populationpic from '../imgs/populationpic.png'
import Barracepic from '../imgs/barracepic.png'
import Animationdelaypic from '../imgs/animationdelaypic.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Barchart = ({...props}) => {
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

      if(chart === "Basic Bar") 
      {
        if(asis.length === 2 )
          setChart(chart);
       else 
          toast.error('This table require 2 fields.')
      }
      else if(chart === "Waterfall Chart") 
      {
        if(asis.length === 2 )
          setChart(chart);
        else 
          toast.error('This table require 2 fields.')
       }
      else if(chart === "World Population") 
      {
        if(asis.length === 3 )
          setChart(chart);
         else 
          toast.error('This table require 3 fields.')
      }
      else if(chart === "Bar Race") 
      {
        if(asis.length === 3 )
          setChart(chart);
         else 
          toast.error('This table require 3 fields.')
      }else if(chart === "Animation Delay") 
      {
        if(asis.length === 3 )
          setChart(chart);
         else 
          toast.error('This table require 3 fields.')
      }
    }

   return (
      <Container>
         <Row className='justify-content-md-center'>
            <Col xs={12} md={6} lg={4}>
            <div className = "p-3" onClick ={handleImageClick("Basic Bar")}>
               <img src= { Basicbarpic } alt = "basicbarpic" style = {{ visibility: "visible"}} />
            </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
            <div className = "p-3" onClick ={handleImageClick("Waterfall Chart")}>
               <img src= { Waterfallpic } alt = "waterfallpic" style = {{ visibility: "visible"}} />
            </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
            <div className = "p-3" onClick ={handleImageClick("World Population")}>
               <img src= { Populationpic } alt = "populationpic" style = {{ visibility: "visible"}} />
            </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
            <div className = "p-3" onClick ={handleImageClick("Bar Race")}>
               <img src= { Barracepic } alt = "barracepic" style = {{ visibility: "visible"}} />
            </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
            <div className = "p-3" onClick ={handleImageClick("Animation Delay")}>
               <img src= { Animationdelaypic } alt = "Animationdelaypic" style = {{ visibility: "visible"}} />
            </div>
            </Col>
         </Row>

         <ChartModal show = {chart} dialogshow = {setChart}> 
         {
               chart === "Animation Delay" ? 
               <Animationdelay chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/> :
               chart === "World Population" ? 
               <Worldpopulation chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/>:
               chart === "Bar Race" ? 
               <Barrace chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/> :
               chart === "Basic Bar" ? 
               <Basicbar chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/> :
               chart === "Waterfall Chart" ? 
               <Waterfall chartdata = {chartdata} columnsData = {columnsData} asis = {asis}/>:<></>
         }
         </ChartModal>
      </Container>
  )
}

export default Barchart;