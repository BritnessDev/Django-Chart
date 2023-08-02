import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";
import 'echarts-gl';
const Surface = ({...props}) => {
    const [chartRef, ref] = useEcharts()

  const { chartdata, asis } = props

  var x = asis[0].value
  var y = asis[1].value
  var z = asis[2].value

    const allData = []

    chartdata.map((data) => {
      allData.push([data[x],data[y],data[z]])
    })
    
    useEffect(() => {
      const chart = chartRef.current;

      chart.setOption({
        tooltip: {},
        backgroundColor: '#fff',
        visualMap: {
          show: false,
          dimension: 2,
          min: -1,
          max: 1,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          }
        },
        xAxis3D: {
          type: 'value'
        },
        yAxis3D: {
          type: 'value'
        },
        zAxis3D: {
          type: 'value'
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              //yAxisIndex: 'none',
              title: {
                zoom: 'Zoom',
                back: 'Zoom Reset'
              }
            },
            restore: {
              title: 'Restore'
            },
            saveAsImage: {
              title: 'Save Image',
              pixelRatio: 2
            }
          }
        },
        grid3D: {
          viewControl: {
            // projection: 'orthographic'
          }
        },
        series: [
          {
            type: 'surface',
            wireframe: {
              // show: false
            },
            data:allData
          }
        ]
      });
      
  }, [])
  
  return (
    <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>
      
    </div>
    )
}

export default Surface;