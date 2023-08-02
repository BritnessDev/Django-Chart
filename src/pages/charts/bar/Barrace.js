import useEcharts from 'react-hooks-echarts';
import { useEffect } from "react";

const  Barrace = ({...props}) => {

    const [chartRef, ref] = useEcharts()
    const {chartdata, columnsData, asis} = props;

    var a = asis[0].value
    var b = asis[1].value
    var c = asis[2].value

    const getDates = (data) => {
        // Initialize an empty array to store the dates
        let dates = [];

        // Loop through each row of the data
        for (let i = 0; i < data.length; i++) {
        // Extract the date from the current row
        let currentDate = data[i][b];

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
        let currentPrdIndex = data[i][c];

        // // If the production index is not already in the prdIndices array, add it
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
                return row[b] === prdIndex;
            });
        
            // Extract the prd_value values for the current production index and create an array of objects
            let prdValueData = filteredData.map(function(row) {
                return row[c]
            });
        
            // Create the object for the current production index
            return {
            name: prdIndex,
            type: 'line',
            stack: 'Total',
            data: prdValueData
            };
        });
        
        // The `prdData` array should now contain an array of objects in the desired format
        return prdData;
    }

    useEffect(() => {
    
        const chart = chartRef.current;
        const rawData = []

        try{
            rawData.push([...columnsData[0][0],...columnsData[1][0],...columnsData[2][0]])
          } catch (e) {
            rawData.push([...columnsData[0][0],...columnsData[1][0]])
          }
        rawData.push(...chartdata)

        const data = rawData;

        const updateFrequency = 2000;
    
        const countryColors = {
            avg_htp: '#00008b',
            bottomhole_press: '#f00',
            casing_pressure: '#ffde00',
            dayson: '#002a8f',
            fluid_level: '#003580',
            gas_rate: '#ed2939',
            oil_rate: '#000',
            tubing_pressure: '#003897',
            water_rate: '#f93',
        };

        const zAxiss = [];

        const items = getItems(chartdata)
     
        for (let i = 0; i < data.length; ++i) {
            if (zAxiss.length === 0 || zAxiss[zAxiss.length - 1] !== data[i][c]) {
                zAxiss.push(data[i][c]);
            }
        }

        function getFlag(countryName) {
            if (!countryName) {
              return '';
            }
             return countryName;
              
          }

        let startYear = zAxiss[0];
        
        const option= {
            grid: {
            top: 10,
            bottom: 30,
            left: 150,
            right: 80
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
            max: 'dataMax',
            axisLabel: {
                formatter: function (n) {
                return Math.round(n) + '';
                }
            }
            },
            dataset: {
                source: data.slice(1).filter(function (d) {
                    return d[c] === startYear;
                })
            },
            yAxis: {
                type: 'category',
                inverse: true,
                max: 10,
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function (value) {
                      return getFlag(value)
                    },
                rich: {
                  flag: {
                    fontSize: 25,
                    padding: 5
                  }
                }
            },
            animationDuration: 300,
            animationDurationUpdate: 300
            },
            series: [
            {
                realtimeSort: true,
                seriesLayoutBy: 'column',
                type: 'bar',
                itemStyle: {
                    color: function (param) {
                        return countryColors[param.value[b]] || '#5470c6';
                    }
                },
                encode: {
                    x: Number(a),//a
                    y: Number(b),//b
                },
                label: {
                    show: true,
                    precision: 1,
                    position: 'right',
                    valueAnimation: true,
                    fontFamily: 'monospace'
                }
            }
            ],
            // Disable init animation.
            animationDuration: 0,
            animationDurationUpdate: updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
            elements: [
                {
                type: 'text',
                right: 160,
                bottom: 60,
                style: {
                    text: startYear,
                    font: 'bolder 80px monospace',
                    fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 1000
                }
            ]
            }
        };

        chart.setOption(option)

        for (let i = 0; i < zAxiss.length - 1; ++i) {
            (function (i) {
            setTimeout(function () {
                updateYear(zAxiss[i + 1]);
            }, (i - 0) * updateFrequency);
            })(i);
        }
        function updateYear(year) {
            let source = data.slice(1).filter(function (d) {
                return d[c] === year;
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            chart.setOption(option);
        }
    },[])

    return (
        <div ref = {ref} className = "chart col-12" style={{ height: 700 }}>

        </div>
    )
}

export default Barrace;