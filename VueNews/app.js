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
     * @param {*} section 
     */
    getPosts(section){
      let url = setUrl(section);
      // If you don't use arrow func, use 'bind(this)' like this.
      // axios.get(url).then(function(res){this.results = res.data.results;}.bind(this)).catch(function(err){console.log(err);});
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
    processedPosts(){
      let posts = this.results;

      // Add image_url attribute to posts got by axios
      posts.map(
        // If you dislike arrow func, use it.
        // function(post){let imgObj = post.multimedia.find(function(media){media.format === "superJumbo"});}
        post => {
          let imgObj = post.multimedia.find(media => media.format === "superJumbo");
          post.image_url = imgObj ? imgObj.url:"http://placehold.it/300x200?text=N/A";
        }
      );

      // Put Array into Chunks(1 col has 4 posts.)
      let i, j, chunkedArray = [], chunk = 4;
      for(let i=0, j=0; i < posts.length; i += chunk, j++){
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});