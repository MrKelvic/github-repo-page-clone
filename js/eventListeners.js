(()=>{
    window.onscroll=handleScroll;
    document.getElementById('toggleMobBtn').addEventListener('click',toggleMobileNavigation)
    document.getElementById('tog-menu-1').addEventListener('click',()=>handleMainSecondaryBarMenu('tog-menu-1'))
    document.getElementById('tog-menu-2').addEventListener('click',()=>handleMainSecondaryBarMenu('tog-menu-2'))
})()

function handleScroll(e){
    let pcScreenHandleName=[...document.querySelectorAll('.usernameAndHandle')][0];
    let pcScreen=[...document.querySelectorAll('.usernameAndHandle p')][0];
    let hiddenInfo=document.getElementById('inv-user-data')
    if(!elementInViewport(pcScreen)){
        hiddenInfo.style.display="flex"
        pcScreenHandleName.style.opacity="0"
    }else{
        if(hiddenInfo.style.display!=="none"){
            hiddenInfo.style.display="none";
            pcScreenHandleName.style.opacity="1";
        } 
    }
}
function elementInViewport(el) {
    var top = el.offsetTop+80;
    var height = el.offsetHeight;
    return (top >= window.pageYOffset &&(top + height) <= (window.pageYOffset + window.innerHeight));
  }
function toggleMobileNavigation(){
    let el=document.getElementById('nav-mob');
    if(el.classList.contains('hide')) el.classList.remove('hide')
    else el.classList.add('hide');
}
function handleMainSecondaryBarMenu(id){
    let el=document.getElementById(`${id}-menu`);
    if(el.classList.contains('hide')) el.classList.remove('hide')
    else el.classList.add('hide');
}