var kpiApp = new Vue({
  el: '#agsKPI',
  data: {
    sensorTime:[],
    turbines:[],
    turbineId: null
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
        kpiApp.buildTripsChart();
        kpiApp.buildStartsChart();
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
          entry.fixedHours = Number(entry.firedHours);
          entry.trips = Number(entry.trips);
          entry.starts = Number(entry.starts);
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
                            [0, "#2d9d47"],
                            [1, "#006440"]
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
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Heat Rate'
        },
        xAxis: {
            title: {
                enabled: true
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Heat Rate'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Heat Rate',
            color: 'rgba(223, 83, 83, .5)',
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
                            [0, '#6c5b7b'],
                            [1, '#c06c84']
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
                            [0, '#c06c84'],
                            [1, '#f67280']
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
                            [0,'#f8b195'],
                            [1, '#f67280']
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
                            [0,'#355c7d'],
                            [1, '#6c5b7b']
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
                            [0, '#79bd8f'],
                            [1, '#c3c2f2']
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
                  [entry.dateCollected, entry.fixedHours]
                )
            }]
        });
    },
    buildTripsChart() {
      Highcharts.chart('tripsChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Trips'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Trips'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
              column: {
               pointPadding: 0.2,
               borderWidth: 0
           },
           fillColor: {
               linearGradient: {
                   x1: 0,
                   y1: 0,
                   x2: 0,
                   y2: 1
               },
               stops: [
                   [0, '#79bd8f'],
                   [1, '#c3c2f2']
               ]
           },
            },
            series: [{
                type: 'area',
                name: 'Trips',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.trips]
                )
            }]
        });
    },
    buildStartsChart() {
      Highcharts.chart('startsChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Starts'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Starts'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
              column: {
               pointPadding: 0.2,
               borderWidth: 0
           }
            },
            series: [{
                type: 'area',
                name: 'Starts',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.starts]
                )
            }]
        });
    }
  },
  created () {
    this.fetchTurbines();
  }
})
