import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";
import * as echarts from 'echarts';

const  Bubblescatter = ({...props}) => {
    const [chartRef, ref] = useEcharts()

    const { chartdata, asis } = props

    var x = asis[0].value
    var y = asis[1].value
    var z = asis[2].value
    var m = asis[3].value
    var n = asis[4].value

    const newData = []

    const length = chartdata.length

    for(let i = 0; i <length ;i ++){
      newData.push([chartdata[i][x],chartdata[i][y],chartdata[i][z],chartdata[i][m],chartdata[i][n]])
    }

    const getDates = (data) => {
        // Initialize an empty array to store the dates
        let dates = [];
        // Loop through each row of the data
        for (let i = 0; i < data.length; i++) {
            // Extract the date from the current row
            let currentDate = data[i][n];
            // If the date is not already in the dates array, add it
            if (!dates.includes(currentDate)) {
                dates.push(currentDate);
        }
        }
        // The `dates` array should now contain an array of unique dates from the data
        return dates;
    }
    
    const getSeries = (data, prdIndices) => {
            // Create an array of objects with the desired structure
        let prdData = prdIndices.map(function(prdIndex) {
            // Filter the data to extract the rows that correspond to the current production index
            let filteredData = data.filter(function(row) {
                return row[4] === prdIndex;
            });
        
            // Extract the prd_value values for the current production index and create an array of objects
            let prdValueData = filteredData.map(function(row) {
                return row
            });
        
            // Create the object for the current production index
            return prdValueData;
        });
        
        // The `prdData` array should now contain an array of objects in the desired format
        return prdData;
    }

    useEffect(() => {

      const chart = chartRef.current;

      const dates = getDates(chartdata)

      const seriesData = getSeries(newData, getDates(chartdata))

      const option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          {
            offset: 0,
            color: '#f7f8fa'
          },
          {
            offset: 1,
            color: '#cdd0d5'
          }
        ]),
        title: {
          // text: 'Life Expectancy and GDP by Country',
          left: '5%',
          top: '3%'
        },
        legend: {
          right: '10%',
          top: '3%',
          data: dates
        },
        grid: {
          left: '8%',
          top: '10%'
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          scale: true
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
            name: dates[0],
            data: seriesData[0],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: 'rgb(251, 118, 123)'
                },
                {
                  offset: 1,
                  color: 'rgb(204, 46, 72)'
                }
              ])
            }
          },
          {
            name: dates[1],
            data: seriesData[1],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(25, 100, 150, 0.5)',
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: 'rgb(129, 227, 238)'
                },
                {
                  offset: 1,
                  color: 'rgb(25, 183, 207)'
                }
              ])
            }
          }
        ]
      }

      chart.setOption(option)
    }, [])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Bubblescatter;