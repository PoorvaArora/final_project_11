var agsApp = new Vue({
  el: '#agsClient',
  data: {
client:[
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
      fetch('api/client.php')
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
    }
  },
  created () {
    this.fetchClients();
  }
})
