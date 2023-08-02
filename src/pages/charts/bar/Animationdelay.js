import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Basicbar = ({...props}) => {
    const [chartRef, ref] = useEcharts()
    const {chartdata, asis } = props

    var x = asis[0].value
    var y = asis[1].value
    var z = asis[2].value
    
    useEffect(() => {
      const chart = chartRef.current;
      const getZaxis = (data) => {
        // Initialize an empty array to store the dates
        let dates = [];

        // Loop through each row of the data
        for (let i = 0; i < data.length; i++) {
        // Extract the date from the current row
        let currentDate = data[i][z];

        // If the date is not already in the dates array, add it
        if (!dates.includes(currentDate)) {
            dates.push(currentDate);
        }
        }

        // The `dates` array should now contain an array of unique dates from the data
        return dates;
    }

    const getXaxis = (data) => {
        // Initialize an empty array to store the production indices
        let prdIndices = [];

        // Loop through each row of the data
        for (let i = 0; i < data.length; i++) {
        // Extract the production index from the current row
        let currentPrdIndex = data[i][x];

        // If the production index is not already in the prdIndices array, add it
        if (!prdIndices.includes(currentPrdIndex)) {
            prdIndices.push(currentPrdIndex);
        }
        }

        // The `prdIndices` array should now contain an array of unique production indices from the data
        return prdIndices;
    }

    const getYaxis = (data, prdIndices) => {
                // Create an array of objects with the desired structure
        let prdData = prdIndices.map(function(prdIndex) {
            // Filter the data to extract the rows that correspond to the current production index
            let filteredData = data.filter(function(row) {
                return row[z] === prdIndex;
            });
        
            // Extract the prd_value values for the current production index and create an array of objects
            let prdValueData = filteredData.map(function(row) {
                return row[y]
            });
        
            // Create the object for the current production index
            return {
              name: prdIndex,
              type: 'bar',
              data: prdValueData,
              emphasis: {
                focus: 'series'
              },
              animationDelay: function (idx) {
                return idx * 10;
              }
            };
        });
        
        // The `prdData` array should now contain an array of objects in the desired format
        return prdData;
    }
    
      var xAxisData = getXaxis(chartdata);
      var zAxisData = getZaxis(chartdata)

      chart.setOption({
        // title: {
        //   text: 'Bar Animation Delay'
        // },
        legend: {
          data:  zAxisData 
        },
        toolbox: {
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
            magicType: {
              type: ['stack']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            },
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: getYaxis(chartdata, zAxisData),
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      })
    }, [])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Basicbar;