import {useEffect} from 'react'
import useEcharts from 'react-hooks-echarts';

const Lineaqi = ({...props}) => {

  const [chartRef, ref] = useEcharts()

  const { chartdata, asis } = props

  var x = asis[0].value
  var y = asis[1].value

  useEffect(() => {

    const chart = chartRef.current;

    const xData = []
    chartdata.map((data, index) => {
      xData.push(data[x])
    })

    const yData = []

    chartdata.map((data, index) => {
      yData.push(data[y])
    })

    chart.setOption(
      {
        title: {
          left: '1%'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '10%',
          right: '15%',
          bottom: '10%'
        },
        xAxis: {
          data: chartdata.map(function (item) {
            return item[x];
          })
        },
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
        dataZoom: [
          {
            startValue: '2014-06-01'
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 50000,
              lte: 100000,
              color: '#93CE07'
            },
            {
              gt: 100000,
              lte: 150000,
              color: '#FBDB0F'
            },
            {
              gt: 150000,
              lte: 200000,
              color: '#FC7D02'
            },
            {
              gt: 200000,
              lte: 220000,
              color: '#FD0100'
            },
            {
              gt: 220000,
              lte: 250000,
              color: '#AA069F'
            },
            {
              gt: 250000,
              color: '#AC3B2A'
            }
          ],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          type: 'line',
          data: chartdata.map(function (item) {
            return item[y];
          }),
          markLine: {
            silent: true,
            lineStyle: {
              color: '#333'
            },
            data: [
              {
                yAxis: 50000
              },
              {
                yAxis: 100000
              },
              {
                yAxis: 150000
              },
              {
                yAxis: 200000
              },
              {
                yAxis: 220000
              },
              {
                yAxis: 250000
              }
            ]
          }
        }
     }
    )

    }, [])

  return (
    <div>
      <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

      </div>  
    </div>
  )
}

export default Lineaqi;