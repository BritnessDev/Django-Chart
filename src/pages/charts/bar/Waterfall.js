import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Waterfall = ({...props}) => {
    const [chartRef, ref] = useEcharts()
    const {chartdata, asis } = props
    
    var x = asis[0].value
    var y = asis[1].value

    useEffect(() => {
        const chart = chartRef.current;

        const xData = []
        const yData = []

        chartdata.map((data) => {
          xData.push(data[x])
          yData.push(data[y])
        })

        chart.setOption({
          // title: {
            // text: 'Waterfall Chart',
            // subtext: 'Living Expenses in Shenzhen'
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            // formatter: function (params) {
            //   var tar = params[1];
            //   return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            // }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: xData
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
              name: 'Placeholder',
              type: 'bar',
              stack: 'Total',
              itemStyle: {
                borderColor: 'transparent',
                color: 'transparent'
              },
              emphasis: {
                itemStyle: {
                  borderColor: 'transparent',
                  color: 'transparent'
                }
              },
              data: yData
            },
            {
              name: 'Life Cost',
              type: 'bar',
              stack: 'Total',
              label: {
                show: true,
                position: 'inside'
              },
              data:  yData
            }
          ]
        })
    }, [])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Waterfall;