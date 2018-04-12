'use strict';

// NYT-API base url
const ApiBaseUrl = 'https://api.nytimes.com/svc/topstories/v2/';
// NYT-API Key
const ApiKey = 'd6c24974592e4c28a27e2c7eecc4c5fe';

/**
 * @returns url which axios connects.
 * @param {*} url 
 */
function setUrl(url){
  return ApiBaseUrl + url + '.json?api-key=' + ApiKey;
}

const vm = new Vue({
  el: '#app',
  data: {
    results: [ /* news posts data */ ]
  }, 
  mounted(){
    this.getPosts('home');
  },
  methods: {
    getPosts(section){
      let url = setUrl(section);
      axios.get(url)
      .then(
        response => {
          this.results = response.data.results;
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
    }
  }
});