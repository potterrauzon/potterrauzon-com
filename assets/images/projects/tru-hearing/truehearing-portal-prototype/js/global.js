

// This function gets rid of the flash of unstyled content 
// that you can see when the page loads and the css hasn't kicked in
function init(){
    gsap.set("body", {autoAlpha:0});
    document.body.style.display = "block";    
    gsap.to("body", {autoAlpha:1, duration:.2, ease:"power2.in"});
}



// set the listeners on the content load callback, then tie it to 
// the function and set the callback to fire when the event bubbles up
document.addEventListener( "DOMContentLoaded" , init , false ) ;
