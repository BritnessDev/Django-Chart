import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Referer = ({...props}) => {
    const [chartRef, ref] = useEcharts()
    const {chartdata, asis} = props

    var x = asis[0].value
    var y = asis[1].value

    useEffect(() => {
        const chart = chartRef.current;
        
        const allData = [];

        chartdata.map((data) => {
          allData.push({name:data[x], value:data[y]})
        })

        chart.setOption({
          title: {
            // text: 'Referer Chart',
            // subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
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
              radius: '50%',
              data: allData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
    });
    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Referer;