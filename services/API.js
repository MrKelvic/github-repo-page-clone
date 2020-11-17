let Api=(url,method,body)=> {
  fetch(url, {
    headers:{
        "Authorization":`bearer a70833fde80cfc5068cbcb885df821fb3713042e`
    },
    method:method, 
    body: JSON.stringify(body)
  }).then(res => {
    return res.json()
  }).then(data=>{
    window.__GITHUB_DATA=data.data
    let app =document.getElementById('app');
    let loader=document.getElementById('loader');
    loader.remove()
    app.style.visibility="unset";
    app.style.display="block";
    document.title=window.__GITHUB_DATA?.user?.login
    globalRerender()
    resetStaticUserImages()
    resetStaticUserNames()
    console.log(data.data)
  })
  .catch((e)=>{
    document.getElementById('loadStat').innerHTML=`There was an error trying to fetch github data`;
    document.title=`MrKelvic`
    // temp
    console.error(e)
  });
}

function globalRerender(){
  let hash=`${window.__GITHUB_DATA?.user?.name||'__'}`+Date.now()
  let el =[...document.querySelectorAll('.rerender')]
  for(let i of el){
    i.setAttribute('rerender',hash)
  }
}
function resetStaticUserNames(){
  let el =[...document.querySelectorAll('.render-user-name')]
  for(let i of el){
    i.innerHTML=window.__GITHUB_DATA?.user?.login
  }
}
function resetStaticUserImages(){
  let el =[...document.querySelectorAll('.render-user-image')]
  for(let i of el){
    i.setAttribute('href',window.__GITHUB_DATA?.user?.avatarUrl)
  }
}

// (()=>{
//   setTimeout(()=>{
//     window.__GITHUB_DATA={user:{
//       "avatarUrl": "https://avatars0.githubusercontent.com/u/42574751?u=d1947eaf211f5f4e4b6c1467354cb4b917d3a231&v=4",
//       "bio": "Rest, Eat, Learn, Code,Family time, repeat()",
//       "followers": {
//         "totalCount": 1
//       },
//       "following": {
//         "totalCount": 5
//       },
//       "location": "Ghana",
//       "name": "iamkelvic",
//       "twitterUsername": "mrkelvic",
//       "repositories": {
//         "nodes": [
//           {
//             "name": "music-share-platform",
//             "forkCount": 0,
//             "isPrivate": true,
//             "updatedAt": "2020-05-13T17:38:59Z",
//             "viewerPermission": "WRITE",
//             "languages": {
//               "edges": []
//             },
//             "description": "I see this as a platform to allow us to share our new song discoveries along side our views and comments on the song with other users whilst allowing for their comments and ratings as well"
//           },
//           {
//             "name": "jobsearch",
//             "forkCount": 0,
//             "isPrivate": true,
//             "updatedAt": "2020-08-06T05:16:59Z",
//             "viewerPermission": "ADMIN",
//             "languages": {
//               "edges": []
//             },
//             "description": "Job search UI"
//           },
//           {
//             "name": "vue-twitter-clone",
//             "forkCount": 0,
//             "isPrivate": false,
//             "updatedAt": "2020-11-14T06:25:25Z",
//             "viewerPermission": "ADMIN",
//             "languages": {
//               "edges": [
//                 {
//                   "node": {
//                     "color": "#f1e05a",
//                     "name": "JavaScript"
//                   }
//                 },
//                 {
//                   "node": {
//                     "color": "#2c3e50",
//                     "name": "Vue"
//                   }
//                 }
//               ]
//             },
//             "description": "A twitter clone with vue js"
//           },
//           {
//             "name": "vue-instagram-clone",
//             "forkCount": 0,
//             "isPrivate": false,
//             "updatedAt": "2020-11-14T07:05:14Z",
//             "viewerPermission": "ADMIN",
//             "languages": {
//               "edges": [
//                 {
//                   "node": {
//                     "color": "#f1e05a",
//                     "name": "JavaScript"
//                   }
//                 },
//                 {
//                   "node": {
//                     "color": "#2c3e50",
//                     "name": "Vue"
//                   }
//                 }
//               ]
//             },
//             "description": "A clone of instagram built with vue..."
//           },
//           {
//             "name": "dynamic_svg",
//             "forkCount": 0,
//             "isPrivate": false,
//             "updatedAt": "2020-11-16T10:11:30Z",
//             "viewerPermission": "ADMIN",
//             "languages": {
//               "edges": [
//                 {
//                   "node": {
//                     "color": "#f1e05a",
//                     "name": "JavaScript"
//                   }
//                 },
//                 {
//                   "node": {
//                     "color": "#2c3e50",
//                     "name": "Vue"
//                   }
//                 }
//               ]
//             },
//             "description": "two way binding with svg element"
//           },
//           {
//             "name": "foncare-POS",
//             "forkCount": 0,
//             "isPrivate": true,
//             "updatedAt": "2020-11-16T10:24:29Z",
//             "viewerPermission": "ADMIN",
//             "languages": {
//               "edges": []
//             },
//             "description": "foncare management system "
//           },
//           {
//             "name": "chat-app",
//             "forkCount": 0,
//             "isPrivate": true,
//             "updatedAt": "2020-11-16T10:37:31Z",
//             "viewerPermission": "ADMIN",
//             "languages": {
//               "edges": []
//             },
//             "description": "A chat app(ui) giving the desktop feel and experience "
//           }
//         ]
//       },
//       "login": "MrKelvic",
//       "status": {
//         "emoji": ":hand_over_mouth:",
//         "message": "studying to get better"
//       },
//       "starredRepositories": {
//         "totalCount": 0
//       }
//     }}
//     console.log(window.__GITHUB_DATA.user.repositories.nodes)
//     let app =document.getElementById('app');
//     let loader=document.getElementById('loader');
//     loader.remove()
//     app.style.visibility="unset";
//     app.style.display="block";
//     globalRerender()
  
//   },500)
// })()

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
                languages(first: 3) {
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
})()