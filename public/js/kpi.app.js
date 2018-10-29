var kpiApp = new Vue({
  el: '#agsKPI',
  data: {
    sensorTime:[],
    turbines:[]
  },
  computed: {
  },
  methods: {
    fetchTurbines () {
      fetch('api/turbine.php')
      .then( response => response.json() )
      // ^ This is the same as .then( function(response) {return response.json()} )
      .then( json => {kpiApp.turbines = json})
      .catch( err => {
        console.log('TASK FETCH ERROR:');
        console.log(err);
      })
    },
    fetchSensorTimeSeries (turbineId) {
      fetch('api/sensorTimeSeries.php?turbineId='+turbineId)
      .then( response => response.json() )
      // ^ This is the same as .then( function(response) {return response.json()} )
      .then( json => {
        kpiApp.sensorTime = json;
        kpiApp.formatSensorTime();
        kpiApp.buildOutputChart();
        kpiApp.buildHeatRateChart();
        kpiApp.buildCompressorEfficiencyChart();
        kpiApp.buildAvailabilityChart();
        kpiApp.buildReliabilityChart();
        kpiApp.buildFixedHourChart();
    //  console.log(agsApp.sensors);
    })
      .catch( err => {
        console.log('SENSOR FETCH ERROR:');
        console.log(err);
      })
    },
    formatSensorTime(){
      this.sensorTime.forEach(
        (entry, index, arr) => {
          entry.dateCollected = Date.parse(entry.dataCollectedDate);
          entry.output = Number(entry.output);
          entry.heatRate = Number(entry.heatRate);
          entry.compressorEfficiency = Number(entry.compressorEfficiency);
          entry.availability = Number(entry.availability);
          entry.reliability = Number(entry.reliability);
          entry.fixedHours = Number(entry.fixedHours);
        }
      )
    },
    buildOutputChart() {
      Highcharts.chart('outputChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Output'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Output'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Trips',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.output]
                )
            }]
        });
    },
    buildHeatRateChart() {
      Highcharts.chart('heatRateChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Heat Rate'
            },
            // xAxis: {
            //     type: 'datetime'
            // },
            yAxis: {
                title: {
                    text: 'Heat Rate'
                }
            },
            legend: {
              layout: 'vertical',
               align: 'right',
               verticalAlign: 'middle'
            },
            plotOptions: {
              series: {
             label: {
                 connectorAllowed: false
             },
     }
            },
            responsive: {
              rules: [{
           condition: {
               maxWidth: 500
           },
           chartOptions: {
               legend: {
                   layout: 'horizontal',
                   align: 'center',
                   verticalAlign: 'bottom'
               }
           }
       }]
   },
            series: [{
                type: 'line',
                name: 'Heat Rate',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.output, entry.heatRate]
                )
            }]
        });
    },
    buildCompressorEfficiencyChart() {
      Highcharts.chart('compressorEfficiencyChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Compressor Efficiency'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Compressor Efficiency'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Compressor Efficiency',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.compressorEfficiency]
                )
            }]
        });
    },
    buildAvailabilityChart() {
      Highcharts.chart('availabilityChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Availability'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Availability'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Availability',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.availability]
                )
            }]
        });
    },
    buildReliabilityChart() {
      Highcharts.chart('reliabilityChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Reliability'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Reliability'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Reliability',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.reliability]
                )
            }]
        });
    },
    buildReliabilityChart() {
      Highcharts.chart('reliabilityChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Reliability'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Reliability'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Reliability',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.reliability]
                )
            }]
        });
    },
    buildFixedHourChart() {
      Highcharts.chart('fixedHoursChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Fixed Hour'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Fixed Hour'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Fixed Hour',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.firedHours]
                )
            }]
        });
    },
  },
  created () {
    this.fetchTurbines();
  //  this.fetchSensorTimeSeries(turbineId);
  }
})
