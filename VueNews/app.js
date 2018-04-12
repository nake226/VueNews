'use strict';

const vm = new Vue({
  el: '#app',
  data: {
    results: [
      // news contents area
    ]
  },
  mounted(){
    axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=d6c24974592e4c28a27e2c7eecc4c5fe")
    .then(response => {
      this.results = response.data.results
    })
  }
});