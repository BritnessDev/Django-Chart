import  { React, useState } from "react"

import Linechart from "./charts/line/Linechart"
import Barchart from "./charts/bar/Barchart"
import Piechart from "./charts/pie/Piechart"
import Scatterchart from "./charts/scatter/Scatterchart"
import Dscatter from "./charts/dscatter/Dscatter"
import Dsurface from "./charts/dsurface/Dsurface"
import Treemap from "./charts/treemap/Treemap"
import Allchart from "./charts/Allchart"

const  Echarts = ({...props}) =>  {

    const {chartdata, columnsData, asis, indexColumnsData} = props

    const [chartType , setChartType] = useState('primary')

    const onClickHandler = (chart_type) => {  
        if(chart_type == "scatter"){
            alert("Only numbers are required for this chart.")
            setChartType(chart_type);
        }
        setChartType(chart_type);
    }
   
    return (
        <>
            <div className="container col-8 pt-5 pb-5 text-start mt-5">
                <div className = "d-flex">
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('all') } style={{width: '100px', marginLeft: '10px', marginBottom: '20px'}}>All Chart</button>   
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('line') } style={{width: '100px', marginLeft: '10px', marginBottom: '20px'}}>Line</button>   
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('bar') } style={{width: '140px', marginLeft: '10px', marginBottom: '20px'}}>Bar</button>         
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('pie') } style={{width: '140px', marginLeft: '10px', marginBottom: '20px'}}>Pie</button>         
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('scatter') } style={{width: '140px', marginLeft: '10px', marginBottom: '20px'}}>Scatter</button>         
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('3dsurface') } style={{width: '140px', marginLeft: '10px', marginBottom: '20px'}}>3D Surface</button>         
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('3dscatter')  } style={{width: '140px', marginLeft: '10px', marginBottom: '20px'}}>3D Scatter</button>         
                    <button className="btn btn-secondary btn-lg" onClick = {() => onClickHandler('treemap')  } style={{width: '140px', marginLeft: '10px', marginBottom: '20px'}}>Treemap</button>         
                </div>
            </div>
            <div style={{ paddingLeft: '60px', paddingRight: '60px' }}>
                {
                    chartType === 'primary'?
                        '':
                    chartType === "all" ?
                        <Allchart  chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/>:
                    chartType === "line" ? 
                        <Linechart chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/> :
                    chartType === "bar" ? 
                        <Barchart chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/>:
                    chartType === "pie" ? 
                        <Piechart chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/>:
                    chartType === "scatter" ? 
                        <Scatterchart chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/>:
                    chartType === "3dscatter" ? 
                        <Dscatter chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/>:
                    chartType === "3dsurface" ? 
                        <Dsurface chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/>:
                        <Treemap chartdata= {chartdata} columnsData = {columnsData} asis = {asis} indexColumnsData = {indexColumnsData}/>
                }
            </div>
        </>
    )
}

export default Echarts;