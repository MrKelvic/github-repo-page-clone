(()=>{
    // set all eventlisteners
    window.onscroll=handleScroll;
    document.getElementById('toggleMobBtn').addEventListener('click',toggleMobileNavigation);
    document.getElementById('tog-menu-1').addEventListener('click',()=>handleMainSecondaryBarMenu('tog-menu-1'));//triggers the top most menus next to the bell icon
    document.getElementById('tog-menu-2').addEventListener('click',()=>handleMainSecondaryBarMenu('tog-menu-2'));//triggers the top most menus next to the bell icon
})()

function handleScroll(){
    // listen as user scrolls and display the altanative follow button section;
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
    // check if an element is in the view port
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