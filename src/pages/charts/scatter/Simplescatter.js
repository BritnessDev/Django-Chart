import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Simplescatter = ({...props}) => {
    const [chartRef, ref] = useEcharts()
    const { chartdata, asis } = props

    var x = asis[0].value
    var y = asis[1].value

    const allData =[]

    chartdata.map((data, item) => {
        allData.push([data[x], data[y]])
    })

    useEffect(() => {
        const chart = chartRef.current;
        
        chart.setOption({
            xAxis: {},
            yAxis: {},
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
                    symbolSize: 20,
                    data: allData,
                    type: 'scatter'
                }
            ]
        })
    }, [])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Simplescatter;