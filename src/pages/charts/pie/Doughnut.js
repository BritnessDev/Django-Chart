import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Doughnut = ({...props}) => {
    const [chartRef, ref] = useEcharts()
    const {chartdata, asis } = props

    var x = asis[0].value
    var y = asis[1].value

    useEffect(() => {
      const chart = chartRef.current;
      
      const allData = [];

      chartdata.map((data) => {
        allData.push({name:data[x], value:data[y]})
      })

      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              title: 'Save Image',
              pixelRatio: 2
            }
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
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

export default Doughnut;