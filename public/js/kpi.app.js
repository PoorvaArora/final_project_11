var kpiApp = new Vue({
  el: '#agsKPI',
  data: {
    sensorTime:[]
  },
  computed: {
  },
  methods: {
    fetchSensorTimeSeries (turbineId) {
      fetch('api/sensorTimeSeries.php?turbineId='+turbineId')
      .then( response => response.json() )
      // ^ This is the same as .then( function(response) {return response.json()} )
      .then( json => {
        kpiApp.sensorTime = json;
        kpiApp.formatSensorTime();
        kpiApp.buildEffortChart();
      console.log(agsApp.sensors);
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
        }
      )
    },
    buildEffortChart() {
      Highcharts.chart('effortChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Cumulative Effort'
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
                // data: this.sensors.map( entry =>
                //  [entry.dataCollectedDate, entry.trips])
                // data:  this.sensors.map( entry =>
                //   [entry.dataCollectedDate, entry.trips]
                 //Expects [ [date1, val1], [date2, val2], [] ]
            }]
        });
    }
  },
  created () {
    this.fetchSensorTimeSeries(turbineId);
  }
})
