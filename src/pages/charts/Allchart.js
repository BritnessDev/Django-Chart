import Linechart from "./line/Linechart"
import Barchart from "./bar/Barchart"
import Piechart from "./pie/Piechart"
import Scatterchart from "./scatter/Scatterchart";
import Dscatter from "./dscatter/Dscatter";
import Dsurface from "./dsurface/Dsurface";
import Treemap from "./treemap/Treemap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faChartSimple, faChartPie,faSquareCaretLeft  } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon="fa-solid fa-circle-three-quarters-stroke" />
const Allchart = ({...props}) => {
    const {chartdata, columnsData, asis} = props

    return (
    <div style = {{ height:1000 }}>
        <div className = "d-flex" style={{alignItems: 'center'}}>
            <span style = {{paddingRight:'15px'}}><FontAwesomeIcon icon={ faChartLine } size = "2xl"/></span>
            <h2>Line</h2>
            <Linechart chartdata= {chartdata} columnsData = {columnsData} asis = {asis}/>
        </div>
        <div className = "d-flex" style={{alignItems: 'center'}}>
            <span style = {{paddingRight:'15px'}}><FontAwesomeIcon icon={ faChartSimple } size = "2xl"/></span>
            <h2>Bar</h2>
            <Barchart chartdata= {chartdata} columnsData = {columnsData} asis = {asis}/>
        </div>
        <div className = "d-flex" style={{alignItems: 'center'}}>
            <span style = {{paddingRight:'15px'}}><FontAwesomeIcon icon={ faChartPie } size = "2xl"/></span>
            <h2>Pie</h2>
            <Piechart chartdata= {chartdata} columnsData = {columnsData} asis = {asis}/>
        </div>
        <div className = "d-flex" style={{alignItems: 'center'}}>
            <span style = {{paddingRight:'15px'}}><FontAwesomeIcon icon={ faSquareCaretLeft } size = "2xl"/></span>
            <h2>Scatter</h2>
            <Scatterchart chartdata= {chartdata} columnsData = {columnsData} asis = {asis}/>
        </div>
        <div className = "d-flex" style={{alignItems: 'center'}}>
            <h2>3D Scatter</h2>
            <Dscatter chartdata= {chartdata} columnsData = {columnsData} asis = {asis}/>
        </div>
        <div className = "d-flex" style={{alignItems: 'center'}}>
            <h2>3D Surface</h2>
            <Dsurface chartdata= {chartdata} columnsData = {columnsData} asis = {asis}/>
        </div>
        <div className = "d-flex" style={{alignItems: 'center'}}>
            <h2>Treemap</h2>
            <Treemap chartdata= {chartdata} columnsData = {columnsData} asis = {asis}/>
        </div>
    </div>
    )
}

export default Allchart;