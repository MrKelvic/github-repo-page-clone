class viewPanel extends HTMLElement{
    constructor(){
        super()
        this.notIncluded=["Overview","Projects","Packages"];
    }
    //components
    topSearchBarAndfilters(){
        let wrap=this.createElement('div',['class','topSearchAndFilters']);
        wrap.appendChild(this.createElement('input',['placeholder','Find a repository...']));
        let languages=window?.__GITHUB_DATA?.user?.repositories?.nodes;
        let localData={
            Type:['All','Sources','Forks','Archived','Mirrors'],
            Language:['All']
        }
        if(languages) languages.forEach(e=>e.languages.edges.forEach(el=>{if(!localData.Language.includes(el.node.name)) localData.Language.push(el.node.name);}));
        // 
        let buttonWrap=this.createElement('div',['class','buttonWrap']);
        Object.keys(localData).forEach(e=>{
            let btnWrap=this.createElement('div',['class','btnWrap']); 
            let typBtn=this.createElement('button',null,`${e}:${localData[e][0]} <i class="fa fa-sort-down"></i>`);
            typBtn.setAttribute('selected',localData[e][0])
            typBtn.addEventListener('click',(ele)=>this.toggleFilters(ele,e));
            btnWrap.appendChild(typBtn);
            let ul=this.createElement('ul',['id',e]);
            let closeUlLi=this.createElement('li',null,`<span>${e=="Type"?"Select type":"Select languages"}</span><i style="color:var(--greyed)" class="fa fa-close"></i>`)
            ul.appendChild(closeUlLi);
            ul.style.display="none"
            closeUlLi.addEventListener('click',(el)=>this.toggleFilters(el,e));
            // ul.setAttribute('id',e)
            for(let i of localData[e]){
                ul.appendChild(this.createElement('li',null,`${localData[e][0]==i?'<i class="fa fa-check"></i>':'<i style="opacity:0;" class="fa fa-check"></i>'}${i}`));
            }
            btnWrap.appendChild(ul)
            buttonWrap.appendChild(btnWrap)
            wrap.appendChild(buttonWrap)
        })
        return wrap;
    }
    repositories(){
        // console.log(new Intl.RelativeTimeFormat('en',{style:'narrow'}).format())
        let wrap=this.createElement('ul',['class','repoWrap']);

        for(let i of window.__GITHUB_DATA.user.repositories.nodes){
            let li=this.createElement('li',['class','list']);
            if(i.description.length>49){
                i.description=[...i.description]
                i.description.length=49
                i.description=i.description.join('')
                i.description+='...';
            } 
            let repoInfo=this.createElement('div',['class','repoInfo']);
            let repname=this.createElement('a',['href','#'],i.name)
            repoInfo.appendChild(repname);
            if(i.isPrivate) repoInfo.appendChild(this.createElement('span',['class','isprivate'],'Private'));
            repoInfo.appendChild(this.createElement('p',['class','descrip'],i.description))
            let langAndUpdatedOn=this.createElement('div',['class','langAndUpdatedOn']);
            let languages=this.createElement('ul',['class','languages']);
            if(i.languages.edges.length>0){
                for(let lang of i.languages.edges){
                    // console.log(lang)
                    languages.appendChild(this.createElement('li',null,`<span style="background:${lang.node.color}"></span> ${lang.node.name}`))
                }
                langAndUpdatedOn.appendChild(languages);
            }
            langAndUpdatedOn.appendChild(this.createElement('p',['class','updatedon'],`Updated ${new Intl.RelativeTimeFormat('en',{style:'narrow'}).format(Math.round((new Date(i.updatedAt)-new Date())/(24*60*60*1000)),'day')}`))
            repoInfo.appendChild(langAndUpdatedOn)
            li.appendChild(repoInfo)
            li.appendChild(this.createElement('button',['class','starbtn'],'<i class="fa fa-star-o"></i> Star'));
            wrap.appendChild(li);
        }
        return wrap;
    }
    render(){
        this.topSearchBarAndfilters()
        // console.log()
        let panel= this.getAttribute('panel');
        if(!panel) panel="Repositories";
        if(!this.notIncluded.includes(panel)){
            // repo panel
            let mainDiv=this.createElement('div',['class','main-wrap']);
            if(window?.__GITHUB_DATA){
                mainDiv.appendChild(this.topSearchBarAndfilters())
                mainDiv.appendChild(this.repositories())
            }
            this.appendChild(mainDiv);
        }else{
            let mainDiv=this.createElement('div',['class','out-of-scope']);
            mainDiv.appendChild(this.createElement('p',null,`${panel+' panel '||' panel '} was out of challenge's scope`));
            this.appendChild(mainDiv);
        }

    }
    connectedCallback(){
        // renders each time node is created
        if(!this.rendered) this.render(),this.rendered=true ;
    }
    
    static get observedAttributes(){
        return ['rerender','panel'];
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
    toggleFilters(e,id){
        let ul=document.getElementById(id);
        if(ul.style.display==="none") ul.style.display="initial";
        else ul.style.display="none";
        let hide=id=="Language"?"Type":"Language";
        document.getElementById(hide).style.display="none"
        // console.log(e,id)
    }
}

customElements.define('view-panel',viewPanel)