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
        kpiApp.buildHeartRateChart();
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
    buildHeartRateChart() {
      Highcharts.chart('heatRateChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Heart Rate'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Heart Rate'
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
                name: 'Heart Rate',
                data: kpiApp.sensorTime.map( entry=>
                  [entry.dateCollected, entry.heatRate]
                )
            }]
        });
    }
  },
  created () {
    this.fetchTurbines();
  //  this.fetchSensorTimeSeries(turbineId);
  }
})
