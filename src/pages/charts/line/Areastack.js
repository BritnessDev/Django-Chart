import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Areastack = ({...props}) => {
    const [chartRef, ref] = useEcharts()

    const { chartdata, asis } = props
   
    var x = asis[0].value
    var y = asis[1].value
    var z = asis[2].value

    
    const getDates = (data) => {
      // Initialize an empty array to store the dates
      let dates = [];

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

    const getSeries = (data, prdIndices) => {
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
              type: 'line',
              stack: 'Total',
              areaStyle:{},
              emphasis:{
                focus:'series'
              },
              data: prdValueData
            };
        });
        
        return prdData;
    }

    useEffect(() => {
        const chart = chartRef.current;
          chart.setOption({
              // title: {
              //   text: 'Stacked Area Chart'
              // },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                data: getItems(chartdata)
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
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  data: getDates(chartdata)
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: getSeries(chartdata, getItems(chartdata))
          })
}, [])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Areastack;