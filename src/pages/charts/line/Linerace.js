import React, { useEffect } from 'react';
import useEcharts from 'react-hooks-echarts';
import * as echarts from 'echarts';

const Linerace = ({...props}) => {
  const [chartRef, ref] = useEcharts()

  const { chartdata, columnsData, asis } = props
  
  useEffect(() => {

  var x = asis[0].value
  var y = asis[1].value
  var z = asis[2].value

  const getDates = (data) => {
      // Initialize an empty array to store the dates
      let dates = []

      // Loop through each row of the data
      for (let i = 0; i < data.length; i++) {
      // Extract the date from the current row
      let currentDate = data[i][x];

      // If the date is not already in the dates array, add it
      if (!dates.includes(currentDate)) {
          dates.push(currentDate);
      }
      }

      // The `dates` array should now contain an array of unique dates from the data
      return dates;
  }

  const getItems = (data) => {
      // Initialize an empty array to store the production indices
      let prdIndices = [];

      // Loop through each row of the data
      for (let i = 0; i < data.length; i++) {
      // Extract the production index from the current row
      let currentPrdIndex = data[i][z];

      // If the production index is not already in the prdIndices array, add it
      if (!prdIndices.includes(currentPrdIndex)) {
          prdIndices.push(currentPrdIndex);
      }
      }

      // The `prdIndices` array should now contain an array of unique production indices from the data
      return prdIndices;
  }

    const newData =[]
    const rawData = []

    const length = columnsData.length

    for(let i = 0; i < length ; i ++){
      if(columnsData[i][0].length == 1){
        newData.push(...columnsData[i][0])
      } else 
        newData.push(...columnsData[i])
    }

    rawData.push([...newData])

    rawData.push(...chartdata)

    const items = getItems(chartdata);
    const dates = getDates(chartdata)
    const seriesList = []
    const datasetWithFilters = []

    echarts.util.each(items, (item) => {
      var datasetId = 'dataset_' + item;
      // try{
        datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                // { dimension: columnsData[x][0], gte: dates[0] },
                { dimension: columnsData[z][0], '=': item }
              ]
            }
          }
        });

      seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: item,
          endLabel: {
            show: true,
            formatter: function (params) {
              return params.value[z] + ': ' + params.value[y];
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: columnsData[x][0],
            y: columnsData[y][0],
            label: [columnsData[z][0], columnsData[y][0]],
            itemName: columnsData[x][0],
            tooltip: columnsData[y][0]
          }
      });
      
      // } catch(e) {
      // }
    })

    const chart = chartRef.current;

    chart.setOption({
        animationDuration: 10000,
        dataset: [
            {
                id: 'dataset_raw',
                source: rawData
            },
            ...datasetWithFilters
        ],
        title: {
            // text: 'Income of Germany and France since 1950'
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
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
        xAxis: {
            type: 'category',
            nameLocation: 'middle'
        },
        yAxis: {
            // name: 'Income'
        },
        grid: {
            right: 140
        },
        series: seriesList
    });
  }, [])

  return (
    <div ref={ref} style={{ width: '100%', height: '700px' }}>

    </div>
  )
};

export default Linerace;