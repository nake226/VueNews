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
    /**
     * get posts by connecting url
     * @param {*} section => url
     */
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
  },
  computed: {
    /**
     * add some function and arrangement to results, which are...
     * 1. add image_url attribute to posts 
     * 2. arrange news for 4posts by 1rows.
     * (3). You can show only posts including 'Trump' in tags.
     */
    processedPosts(){
      let posts = this.results;
      
      // 1. ''
      posts.map(
        post => {
          let imgObj = post.multimedia.find(media => media.format === "superJumbo");
          post.image_url = imgObj ? imgObj.url:"http://placehold.it/300x200?text=N/A";
        }
      );

      // 2. ''
      let i, j, chunkedArray = [], chunk = 4;
      for(let i=0, j=0; i < posts.length; i += chunk, j++){
        // 3. ''
        //if(JSON.stringify(posts[i]['per_facet']).match(/Trump/i)){
          chunkedArray[j] = posts.slice(i,i+chunk);
        //}
      }
      return chunkedArray;
    }
  }
});