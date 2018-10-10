var agsApp = new Vue({
  el: '#ags',
  data: {
client: [
  {
    clientId: "",
    clientName: "",
    clientDescription: "",
    gicsSector: "",
    gicsSubIndustry: "",
    headquarters: ""
  }
]
  },
  computed: {
  },
  methods: {
    fetchClients () {
      fetch('http://ec2-52-43-127-41.us-west-2.compute.amazonaws.com/api/client.php')
      .then( response => response.json() )
      // ^ This is the same as .then( function(response) {return response.json()} )
      .then( json => {
        agsApp.clients = json;
        console.log(agsApp.clients);
      })
      .catch( err => {
        console.log('TASK FETCH ERROR:');
        console.log(err);
      })
    },
    gotoTask(tid) {
      window.location = 'task.html?taskId=' + tid;
    }
  },
  created () {
    this.fetchClients();
    this.fetchTasks();
  }
})