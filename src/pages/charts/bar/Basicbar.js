import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Basicbar = ({...props}) => {
    const [chartRef, ref] = useEcharts()

    const {chartdata, asis} = props
    
    var x = asis[0].value
    var y = asis[1].value

    const xData = []
    const yData = []

    chartdata.map((data) => {
      xData.push(data[x])
      yData.push(data[y])
    })

    useEffect(() => {
        const chart = chartRef.current;
        
        chart.setOption({
          xAxis: {
            type: 'category',
            data: xData,
            deduplication: true,
          },
          yAxis: {
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
          series: [
            {
              data: yData,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        })
    }, [])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Basicbar;