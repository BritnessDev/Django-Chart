import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Visualscatter = ({...props}) => {
    const [chartRef, ref] = useEcharts()
    const { chartdata, asis } = props

    var x = asis[0].value
    var y = asis[1].value

    const allData = []

    chartdata.map((data) => {
      allData.push([data[x], data[y]])
    })

    useEffect(() => {
        const chart = chartRef.current;

        chart.setOption({
            // title: {
            //     text: 'Dispersion of house price based on the area',
            //     left: 'center',
            //     top: 0
            //   },
              visualMap: {
                min: 0,
                max: 444997,
                dimension: 1,
                orient: 'vertical',
                right: 10,
                top: 'center',
                text: ['HIGH', 'LOW'],
                calculable: true,
                inRange: {
                  color: ['#f2c31a', '#24b7f2']
                }
              },
              tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'cross'
                }
              },
              xAxis: [
                {
                  type: 'value'
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
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
                  name: 'price-area',
                  type: 'scatter',
                  symbolSize: 5,
                  data: allData
                }
              ]
        })
    }, [])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Visualscatter;