var agsApp = new Vue({
  el: '#agsClient',
  data: {
    clients:[]
  },
  computed: {
  },
  methods: {
    fetchClients () {
      fetch('api/client.php')
      .then( response => response.json() )
      // ^ This is the same as .then( function(response) {return response.json()} )
      .then( json => {agsApp.clients = json})
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
