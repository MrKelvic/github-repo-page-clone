class userSide extends HTMLElement{
    constructor(){
        super();
    }
    render(){
        // what to render
        this.setData();
        let mainDiv=this.createElement('div',['class','mainDiv']);
        let firstHalf=this.createElement('div',['class','first-half']);
        let firstHalfDiv=this.createElement('div');
        let imacointainer=this.createElement('div',['class','image-half']);
        // populate image half
        let img=this.createElement('img',['src',window?.__GITHUB_DATA?.user?.avatarUrl||'./_kelvic.png']);
        let imgSpan=this.createElement('div',['class','imgspan']);
        imgSpan.classList.add('pc')
        let di=this.createElement('div');
        di.appendChild(this.createElement('i',['class','fa fa-smile-o']));
        di.appendChild(this.createElement('p',['class','imgp'],window?.__GITHUB_DATA?.user?.status.message));
        imgSpan.appendChild(di)
        imacointainer.appendChild(img),imacointainer.appendChild(imgSpan);
        firstHalfDiv.appendChild(imacointainer);//SUB
        // firstHalf.appendChild(imgSpan);
        let usernameAndHandleContainer=this.createElement('div',['class','usernameAndHandle']);
        usernameAndHandleContainer.appendChild(this.createElement('p',['class','handle'],window?.__GITHUB_DATA?.user?.name||'iamkelvic'));
        usernameAndHandleContainer.appendChild(this.createElement('p',null,window?.__GITHUB_DATA?.user?.login||'MrKelvic'));
        firstHalfDiv.appendChild(usernameAndHandleContainer);
        firstHalf.appendChild(firstHalfDiv)//SUB
        firstHalf.appendChild(this.createElement('span',['class','mob'],`<p>${window?.__GITHUB_DATA?.user?.status.message}</p>`))
        firstHalf.appendChild(this.createElement('p',['class','bio'],window?.__GITHUB_DATA?.user?.bio||'bio'));//SUB

        mainDiv.appendChild(firstHalf);
        let interactBtn=this.createElement('div',['class','interactBtn']);
        interactBtn.appendChild(this.createElement('button',['class','ffbtn'],'Follow')),interactBtn.appendChild(this.createElement('button',null,'<i class="fa fa-ellipsis-h"></i>'));
        let mobileInteractionBtn=this.createElement('div',['class','interactBtn']);
        mobileInteractionBtn.appendChild(this.createElement('button',['class','ffbtn'],'Follow')),mobileInteractionBtn.appendChild(this.createElement('button',null,'<i class="fa fa-ellipsis-h"></i>'));
        mobileInteractionBtn.classList.add('mob')
        interactBtn.classList.add('pc');
        mainDiv.appendChild(interactBtn)//MAIN
       
        let followContainer=this.createElement('div',['class','followContainer']);
        // for(let i of this.data.ff){
            for(let i=0;i<this.data.ff.length;i++){
            let cnt=this.createElement('div',['class','ff']);
            cnt.appendChild(this.createElement('i',['class',`fa fa-${this.data.ff[i].icon}`]));
            cnt.appendChild(this.createElement('p',null,this.data.ff[i].count));
            cnt.appendChild(this.createElement('span',null,this.data.ff[i].name));
            if(i!==0) cnt.classList.add('ffdot');
            followContainer.appendChild(cnt);//sub
        }

        let contact=this.createElement('ul',['class','contact']);
        let contactMobile=this.createElement('ul',['class','contact']);
        contact.classList.add('pc')
        contactMobile.classList.add('mob')
        for(let i of this.data.r){
            let li=this.createElement('li');
            li.appendChild(this.createElement('i',['class',`fa fa-${i.icon}`]));
            if(i.type){
                li.appendChild(this.createElement(i.type,i.attrib,i.name));
            }else{
                li.appendChild(this.createElement('span',null,i.name));
            }
            contact.appendChild(li)//sub
            contactMobile.appendChild(li)//sub
        }
        mainDiv.appendChild(contactMobile)
        mainDiv.appendChild(followContainer)//MAIN
        mainDiv.appendChild(contact);//MAIN
        mainDiv.appendChild(mobileInteractionBtn)//MAIN
        this.appendChild(mainDiv)//MAJOR
    }
    connectedCallback(){
        // renders each time node is created
        if(!this.rendered) this.render(),this.rendered=true ;
    }
    static get observedAttributes() {
        return ['rerender'];
    }
    attributeChangedCallback(name, oldValue, newValue) { 
        this.innerHTML=""
        this.render();
    }
    createElement(tag,attrib,innerHTML){
        let e=document.createElement(tag);
        if(![null,undefined].includes(attrib)) e.setAttribute(attrib[0],attrib[1]);
        if(![null,undefined].includes(innerHTML)) e.innerHTML=innerHTML;
        return e;
    }
    setData(){
        this.data={
            ff:[
                {
                    name:'followers',
                    count:window?.__GITHUB_DATA?.user?.followers?.totalCount,
                    icon:`user-o`
                },
                {
                    name:'following',
                    count:window?.__GITHUB_DATA?.user?.following?.totalCount,
                },
                {
                    name:'',
                    count:window?.__GITHUB_DATA?.user?.starredRepositories?.totalCount,
                    icon:`star-o`
                },
            ],
            r:[
                {
                   icon:`map-marker`,
                   name:window?.__GITHUB_DATA?.user?.location||'Ghana'
                },
                {
                    icon:`twitter`,
                    name:window?.__GITHUB_DATA?.user?.twitterUsername||'mrkelvic',
                    type:'a',
                    attrib:['href',`https://twitter.com/${window?.__GITHUB_DATA?.user?.twitterUsername||'mrkelvic'}`]
                 }
            ]
        }
    }
}

customElements.define('side-user',userSide)