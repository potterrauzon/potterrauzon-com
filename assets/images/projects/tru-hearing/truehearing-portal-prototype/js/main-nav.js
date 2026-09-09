gsap.registerPlugin(TextPlugin);


class LanguageToggle{
    constructor(){}

    toggle = {};
    button = {};
    clicked = false;
    
    init(toggle, button){
        this.toggle = toggle;
        this.button = button;
        this.toggle.addEventListener("click", this.clickHandler.bind(this));
        gsap.set(this.toggle, {css:{cursor:"pointer"}});
    }

    clickHandler(event){
        if(!this.clicked){
            this.clicked = true;
            gsap.to(this.button, {x:16, duration:.2, ease:"power2.out"});
        }
        else if(this.clicked){
            this.clicked = false;
            gsap.to(this.button, {x:0, duration:.2, ease:"power2.out"});
        }
    }
}


class MainNav{
    constructor(){}

    name = "MAIN NAV CLASS";
    
    mblNavHeight = null;
    mblNavBtn = {};

    utilNavHeight = 0;

    mblBtnAnim = {};
    mblNavAnim = {};
    mobileNavIsOpen = false;

    init(){
        this.mblNavBtn = document.querySelector("#main-nav-mobile-button");
        gsap.set(this.mblNavBtn, {autoAlpha:0, display:"none"});

        this.utilNavHeight = gsap.getProperty(".universal-nav", "offsetHeight");
        this.mblNavHeight = gsap.getProperty(".main-nav-mobile-content", "offsetHeight");
        
        this.mblNavBtn.addEventListener("click", this.handleNavButtonClick.bind(this));

        this.mblBtnAnim = gsap.timeline();
        this.mblBtnAnim.to(".main-bar-1", {y:"+=8px", duration:.4, ease:"expo.out"});
        this.mblBtnAnim.to(".main-bar-3", {y:"-=8px", duration:.4, ease:"expo.out"}, "<");
        this.mblBtnAnim.set(".main-bar-2", {autoAlpha:0});
        this.mblBtnAnim.to(".main-bar-1", {rotation:225, duration:.7, ease:"expo.inOut"});
        this.mblBtnAnim.to(".main-bar-3", {rotation:315, duration:.7, ease:"expo.inOut"}, "<");
        this.mblBtnAnim.pause();

        this.mblNavAnim = gsap.timeline();
        this.mblNavAnim.set("#main-nav-mobile", {autoAlpha:1, display:"flex"});
        this.mblNavAnim.to(".main-nav-mobile-bg", {height:this.mblNavHeight, duration:.5, ease:"power2.inOut"})
        this.mblNavAnim.to("#main-nav-mobile-item-1", {autoAlpha:1, duration: .4, ease:"power2.inOut"}, 0);
        this.mblNavAnim.to("#main-nav-mobile-item-2", {autoAlpha:1, duration: .4, ease:"power2.inOut"}, "-=.35");
        this.mblNavAnim.to("#main-nav-mobile-item-3", {autoAlpha:1, duration: .4, ease:"power2.inOut"}, "-=.35");
        this.mblNavAnim.to("#main-nav-mobile-item-4", {autoAlpha:1, duration: .4, ease:"power2.inOut"}, "-=.35");
        this.mblNavAnim.to("#main-nav-mobile-item-5", {autoAlpha:1, duration: .4, ease:"power2.inOut"}, "-=.35");
        this.mblNavAnim.to("#main-nav-mobile-item-6", {autoAlpha:1, duration: .4, ease:"power2.inOut"}, "-=.35");
        this.mblNavAnim.pause();
        
        gsap.set("#main-nav-mobile", {autoAlpha:0, display:"none"});
        
        if(window.innerWidth < 1025){
            gsap.set(".universal-nav-inner", {autoAlpha:0});
            gsap.set(".universal-nav", {paddingTop:0, paddingBottom:0, height:0});
            gsap.set(".main-nav", {paddingTop:18, paddingBottom:18});
        }

        gsap.set(".main-nav-mobile-bg", {height:0});
        gsap.set("#main-nav-mobile-item-1", {autoAlpha:0});
        gsap.set("#main-nav-mobile-item-2", {autoAlpha:0});
        gsap.set("#main-nav-mobile-item-3", {autoAlpha:0});
        gsap.set("#main-nav-mobile-item-4", {autoAlpha:0});
        gsap.set("#main-nav-mobile-item-5", {autoAlpha:0});
        gsap.set("#main-nav-mobile-item-6", {autoAlpha:0});
            
        //Create a MediaQueryList object
        this.mediaList = window.matchMedia("(max-width: 1024px)");
        this.mediaList.addEventListener("change", this.switchMobile.bind(this));
        this.switchMobile(this.mediaList);
    }
    
    get name(){ return this.name;}

    switchMobile(e){
        
        if (e.matches) { // If media query matches
            // MOBILE
            gsap.to(".universal-nav-inner", {autoAlpha:0, duration:.3, ease:"power2.in"});
            gsap.to(".universal-nav", { paddingTop:0, paddingBottom:0, height:0, duration:.5, ease:"power2.inOut"});
            gsap.to(".main-nav", {paddingTop:18, paddingBottom:18,duration:.3, ease:"power2.in"});
            gsap.set(".main-nav-left .main-nav-items", {autoAlpha:0, display:"none"});
            gsap.set(".main-nav-right .main-nav-items", {autoAlpha:0, display:"none"});
            gsap.to(this.mblNavBtn, {autoAlpha:1, display:"flex", duration:.3, ease:"power2.in"});
            
          } else {
            // DESKTOP
            gsap.to(this.mblNavBtn, {autoAlpha:0, display:"none", duration:.3, ease:"power2.in"});
            gsap.to(".universal-nav", {paddingTop:16, paddingBottom:16, height:this.utilNavHeight, duration:.5, ease:"power2.inOut"});
            gsap.to(".universal-nav-inner", {autoAlpha:1, duration:.3, delay:.2, ease:"power2.out"});
            gsap.to(".main-nav", {paddingTop:24, paddingBottom:24,duration:.3, ease:"power2.in"});
            gsap.to(".main-nav-left .main-nav-items", {autoAlpha:1, display:"flex", duration:.3, ease:"power2.in", delay:.2});
            gsap.to(".main-nav-right .main-nav-items", {autoAlpha:1, display:"flex", duration:.3, ease:"power2.in", delay:.2});
            
            if(this.mobileNavIsOpen){
                // close it
                this.mblBtnAnim.reverse();
                this.closeMobileNav();
            }
        }
    }

    handleNavButtonClick(e){
        // animate the button
        if(this.mobileNavIsOpen){
            // close it
            this.mblBtnAnim.reverse();
            this.closeMobileNav();
        } else{
            // open it
            this.mblBtnAnim.play(0);
            this.openMobileNav();
        }
    }

    openMobileNav(){
        this.mblNavAnim.play(0);
        this.mobileNavIsOpen = true;
    }

    closeMobileNav(){
        this.mblNavAnim.reverse();
        this.mobileNavIsOpen = false;
    }
}



const mainNav = new MainNav();
const languageToggle = new LanguageToggle();

// INITIALIZE THE START OF THE JAVASCRIPT
function init(){
    // console.log("init happened");
    mainNav.init();
    let langToggle = document.querySelector(".language-toggle");
    let langButton = document.querySelector(".language-toggle-button");
    languageToggle.init(langToggle, langButton);
}


// set the listeners on the content load callback, then tie it 
// to the init function and set the callback to fire when the 
// event bubbles up.  This ensures everything is loaded before 
// you try to reference it.
document.addEventListener( "DOMContentLoaded" , init , false ) ;
