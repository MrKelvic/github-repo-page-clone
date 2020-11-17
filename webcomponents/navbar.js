class TabBar extends HTMLElement{
    constructor(){
        super()
        this.setData()
    }
    render(){
        // what to render
        this.setData()
        let mainDiv=this.createElement('div',['class','tab-bar']);
        mainDiv.setAttribute('id','tab-bar')
        let invisibleSpace=this.createElement('div',['class','tab-inv']);
        let invisibleUserInf=this.createElement('div',['id','inv-user-data'],`
            <div>
                <img src="${window.__GITHUB_DATA?.user?.avatarUrl}">
            </div>
            <div>
                <p>${window?.__GITHUB_DATA?.user?.name||'iamkelvic'}</p>
                <button>Follow</button>
            </div>
        `)
        invisibleSpace.appendChild(invisibleUserInf);
        mainDiv.appendChild(invisibleSpace)
        let wrap=this.createElement('nav',['class','tab-wrap'])
        if(!this.getAttribute('mobile')) this.classList.add('pc');
        for(let i of this.data.tabs){
            let child=this.createElement('div',['class','tab']);
            child.setAttribute('datas',i.name);
            child.addEventListener('click',this.handleTabs)
            let inSpan=this.createElement('span')
            let icon=this.createElement('i',['class',`fa fa-${i.icon||'user'}`])
            let activeTab=this.getAttribute('activetab');
            if(i.name===activeTab) child.classList.add('activeTab');
            inSpan.innerHTML=i.name;
            // 
            child.appendChild(icon),child.appendChild(inSpan)
            if(i.count){
                let count=this.createElement('div',['id',i.name])
                count.innerHTML=i.count
                child.appendChild(count)
            }
            wrap.appendChild(child);
        }
        mainDiv.appendChild(wrap)
        this.appendChild(mainDiv)
    }
    connectedCallback(){
        // renders each time node is created
        if(!this.rendered) this.render(),this.rendered=true ;
    }
    static get observedAttributes() {
        return ['rerender','activetab'];
    }
    attributeChangedCallback(name, oldValue, newValue) { 
        this.innerHTML=""
        this.render();
    }
    handleTabs(e){
        e=[...e.target.classList].includes('tab')?e.target:e.target.parentElement;
        let t=e.getAttribute('datas')
        if(!t) t="Repositories";
        let tab=e.parentElement.parentElement.parentElement.getAttribute("mobile")?"panelTabMobile":"panelTab";
        document.getElementById('panel').setAttribute('panel',t)
        document.getElementById(tab).setAttribute('activetab',t)
    }
    createElement(tag,attrib,innerHTML){
        let e=document.createElement(tag);
        if(![null,undefined].includes(attrib)) e.setAttribute(attrib[0],attrib[1]);
        if(![null,undefined].includes(innerHTML)) e.innerHTML=innerHTML;
        return e;
    }
    setData(){
        this.data={
            tabs:[
                {
                    name:'Overview',
                    icon:`folder-open-o`
                },
                {
                    name:'Repositories',
                    count:window?.__GITHUB_DATA?.user?.repositories?.nodes.length,
                    icon:`file-o`
                },
                {
                    name:`Projects`,
                    icon:'list-alt'
                },{
                    name:`Packages`,
                    icon:`cube`
                }
            ]
        }
    }
}

customElements.define('tab-bar',TabBar)