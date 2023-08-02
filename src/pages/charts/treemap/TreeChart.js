import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";
import 'echarts-gl';

const TreeChart = ({...props}) => {
  const [chartRef, ref] = useEcharts()

  const { chartdata, asis } = props

  var x = asis[0].value
  var y = asis[1].value

    const allData = []

    chartdata.map((data) => {
      allData.push([data[x],data[y]])
    })

    const getItems = (data) => {
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

    const getChildren = (data, prdIndices) => {
        // Create an array of objects with the desired structure
        let prdData = prdIndices.map(function(prdIndex) {
            
            let total = 0
            // Filter the data to extract the rows that correspond to the current production index
            let filteredData = data.filter(function(row) {
                return row[x] === prdIndex;
            });

            // Extract the prd_value values for the current production index and create an array of objects
            filteredData.map(function(row) {
             total += Number(row[y])
            });

            let prdValueData = total;

            // Create the object for the current production index
            return {
                name: prdIndex,
                value: prdValueData
            };
        });

    // The `prdData` array should now contain an array of objects in the desired format

        return prdData;
    }

    const getTotal = (data) => {
        let total = 0

        data.map(function(row) {
            total += Number(row[y])            
        })

        let totalValue = total;

        return totalValue
    }

    useEffect(() => {
      const chart = chartRef.current;

      chart.setOption({
        series: [
            {
              type: 'treemap',
              data: [
                {
                  name: 'Total Value',
                  value: getTotal(chartdata),
                  children: getChildren(chartdata, getItems(chartdata))
                },
              ]
            }
          ]
      });
      
  }, [])
  
  return (
    <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>
      
    </div>
    )
}

export default TreeChart;