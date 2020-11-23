// API call function
let Api=(url,method,body)=> {
  document.getElementById('loadStat').innerHTML=`Fetching Kelvic's github information...`;
    fetch(url, {
      headers:{
          "Authorization":`bearer 102240c7d4f6fa4452008da694a0668bca0df056`
      },
      method:method, 
      body: JSON.stringify(body)
    }).then(res => {
      // document.getElementById('loadStat').innerHTML=`Data came through`;
      return res.json();
    }).then(data=>{
      if(!data.data.user) throw new Error;
      window.__GITHUB_DATA=data.data
      let app =document.getElementById('app');
      let loader=document.getElementById('loader');
      // document.getElementById('loadStat').innerHTML=`render page!!`;
      // Show page and remove Loader element from DOM node
      loader.remove()
      app.style.visibility="unset";
      app.style.display="block";
      document.title=window.__GITHUB_DATA.user.login||`MrKelvic`;//set page title
      // 
      globalRerender();
      resetStaticUserImages();
      resetStaticUserNames();
    }).catch((e)=>{
      // incase something goes bad :(
      document.getElementById('loadStat').innerHTML=`There was an error trying to fetch github data... token migth have been revoked`;
      document.getElementById('loader').classList.remove("c-animated-background");
      document.title=`MrKelvic`;
    })
}

function globalRerender(){
  /*
  Get all elements with the rerender class
  loop through changing the rerender attribute with a new "hash"
  each custom element listens for change in this attribute and rerenders
  */
  let hash=`${window.__GITHUB_DATA.user.name||'__'}`+Date.now();
  let el =[...document.querySelectorAll('.rerender')];
  for(let i of el){
    i.setAttribute('rerender',hash);
  }
}
function resetStaticUserNames(){
  // Global set all static names to what was returned from the API
  let el =[...document.querySelectorAll('.render-user-name')];
  for(let i of el){
    i.innerHTML=window.__GITHUB_DATA.user.login;
  }
}
function resetStaticUserImages(){
  // Global set all static image ulrs to what was returned from the API
  let el =[...document.querySelectorAll('.render-user-image')];
  for(let i of el){
    i.setAttribute('href',window.__GITHUB_DATA.user.avatarUrl);
  }
}

// Make an API call ass soon as page get this Javascript file
(()=>{
  Api(
    'https://api.github.com/graphql',
    'POST',
     {
         operationName:"MyQuery",
         query:`query MyQuery {
          user(login: "MrKelvic") {
            avatarUrl
            bio
            followers {
              totalCount
            }
            following {
              totalCount
            }
            location
            name
            twitterUsername
            repositories(first: 20, orderBy: {field: UPDATED_AT, direction: ASC}) {
              nodes {
                name
                forkCount
                isPrivate
                updatedAt
                viewerPermission
                languages(first: 2) {
                  edges {
                    node {
                      color
                      name
                    }
                  }
                }
                description
              }
            }
            login
            status {
              emoji
              message
            }
            starredRepositories {
              totalCount
            }
          }
        } `,
           variables:{},
     }
  )
})();