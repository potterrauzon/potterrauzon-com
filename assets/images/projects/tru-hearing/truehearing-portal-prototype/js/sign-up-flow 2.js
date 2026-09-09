gsap.registerPlugin(TextPlugin);



class SignUpNav{

    constructor(){

    }

    name = "SIGN UP NAV CLASS";
    //mainNav = {};
    mobileNav = {};
    mobileNavCopy = {};
    mobileNavCopyPhone = {};
    mobileNavButton = {};
    //navLogo = {};
    mainNavContent = {};
    mobileNavButtonBar1 = {};
    mobileNavButtonBar2 = {};
    mobileNavButtonBar3 = {};
    //mediaList = {};
    buttonAnimation = {};
    mobileNavIsOpen = false;

    

    init(){
        console.log("nav init");
        // this.mainNav = document.querySelector("#sign-in-main-nav");
        // this.navLogo = document.querySelector("#sign-in-nav-logo");
        // this.mainNavContent = document.querySelector("#sign-in-main-nav-content");
        this.mobileNav = document.querySelector("#sign-in-mobile-nav");
        gsap.set(this.mobileNav, {autoAlpha:0});
        this.mobileNavCopy.element = document.querySelector("#mobile-nav-copy");
        this.mobileNavCopyPhone.element = document.querySelector("#mobile-nav-copy-phone");
        gsap.set(this.mobileNavCopy.element, {autoAlpha:0});
        gsap.set(this.mobileNavCopyPhone.element, {autoAlpha:0});
        this.mobileNavCopy.y = gsap.getProperty(this.mobileNavCopy.element, "y", "px");
        this.mobileNavCopyPhone.y = gsap.getProperty(this.mobileNavCopyPhone.element, "y", "px");
        
        this.mobileNavButton = document.querySelector("#sign-in-mobile-nav-button");
        this.mobileNavButtonBar1 = document.querySelector(".bar-1");
        this.mobileNavButtonBar2 = document.querySelector(".bar-2");
        this.mobileNavButtonBar3 = document.querySelector(".bar-3");
        

        // Create a MediaQueryList object
        //this.mediaList = window.matchMedia("(max-width: 650px)");
        //this.mediaList.addEventListener("change", this.switchMobile.bind(this));

        this.mobileNavButton.addEventListener("click", this.handleNavButtonClick.bind(this));

        this.buttonAnimation = gsap.timeline();
        this.buttonAnimation.to(this.mobileNavButtonBar1, {y:"+=6px", duration:.4, ease:"expo.out"});
        this.buttonAnimation.to(this.mobileNavButtonBar3, {y:"-=6px", duration:.4, ease:"expo.out"}, "<");
        this.buttonAnimation.set(this.mobileNavButtonBar2, {autoAlpha:0});
        this.buttonAnimation.to(this.mobileNavButtonBar1, {rotation:225, duration:.7, ease:"expo.inOut"});
        this.buttonAnimation.to(this.mobileNavButtonBar3, {rotation:315, duration:.7, ease:"expo.inOut"}, "<");
        this.buttonAnimation.pause();
        

    }
    
    get name(){ return this.name;}

    switchMobile(e){
        //console.log("switch mobile called "+this.name);
        if (e.matches) { // If media query matches
            //console.log("matches");
            // gsap.to(this.mainNav, {paddingTop:"17px", duration:.7, ease:"power2.inOut"});
            // gsap.to(this.mainNav, {paddingBottom:"17px", duration:.7, ease:"power2.inOut"});
            // gsap.to(this.mainNav, {paddingRight:"20px", duration:.7, ease:"power2.inOut"});
            // gsap.to(this.mainNav, {paddingLeft:"20px", duration:.7, ease:"power2.inOut"});
          } else {
            //console.log("no match");
            // gsap.to(this.mainNav, {paddingTop:"24px", duration:.4, ease:"power2.inOut"});
            // gsap.to(this.mainNav, {paddingBottom:"24px", duration:.4, ease:"power2.inOut"});
            // gsap.to(this.mainNav, {paddingRight:"40px", duration:.4, ease:"power2.inOut"});
            // gsap.to(this.mainNav, {paddingLeft:"40px", duration:.4, ease:"power2.inOut"});  
          }
        //TweenLite.to("#secondrow", 1, {paddingTop:"50px"});
    }

    handleNavButtonClick(e){
        // animate the button
        if(this.mobileNavIsOpen){
            // close it
            this.buttonAnimation.reverse();
            this.mobileNavIsOpen = false;
            this.closeMobileNav();
        } else{
            // open it
            this.buttonAnimation.play(0);
            this.mobileNavIsOpen = true;
            this.openMobileNav();
        }
    }

    openMobileNav(){
        gsap.set(this.mobileNavCopy.element, {y:this.mobileNavCopy.y});
        gsap.set(this.mobileNavCopyPhone.element, {y:this.mobileNavCopyPhone.y});
        gsap.to(this.mobileNav, {autoAlpha:1, duration: .5, ease:"expo.inOut"});
        gsap.to(this.mobileNavCopy.element, {autoAlpha:1, duration: .5, delay:.4, ease:"power2.out"});
        gsap.from(this.mobileNavCopy.element, {y:"+=20", duration: .5, delay:.4, ease:"power2.out"});
        gsap.to(this.mobileNavCopyPhone.element, {autoAlpha:1, duration: .5, delay:.5, ease:"power2.out"});
        gsap.from(this.mobileNavCopyPhone.element, {y:"+=20", duration: .5, delay:.5, ease:"power2.out"});
        
    }

    closeMobileNav(){
        gsap.to(this.mobileNav, {autoAlpha:0, duration: .5, delay:.4, ease:"expo.in"});
        gsap.to(this.mobileNavCopy.element, {autoAlpha:0, y:"+=20", duration: .5, delay:.1, ease:"power2.in"});
        gsap.to(this.mobileNavCopyPhone.element, {autoAlpha:0, y:"+=20", duration: .5, ease:"power2.in"});
    }



}


class OverlayController{

    constructor(){

    }

    overlay = {};
    showing = false;

    init(){
        this.overlay = document.getElementById("overlay");
        this.overlay.customHeight = gsap.getProperty(this.overlay, "offsetHeight");
        this.overlay.customPaddingTop = gsap.getProperty(this.overlay, "paddingTop");
        this.overlay.customPaddingBottom = gsap.getProperty(this.overlay, "paddingBottom");
        this.overlay.customMarginTop = gsap.getProperty(this.overlay, "marginTop");
        this.overlay.customMarginBottom = gsap.getProperty(this.overlay, "marginBottom");
        gsap.set("#overlay", {autoAlpha:0, display:"flex"});
    }

    show(animate, delay, display){
        // console.log("SHOW CALLED ");
        // console.log("THIS "+this.name);
        // console.log("OVERLAY DISPLAY "+display);
        this.showing = true;

        let d = 0;
        if(delay){
            d = delay;
        }

        let dis = null;
        if(display){
            dis  = "flex";
        }

        if(animate){
            
            gsap.to(this.overlay, {paddingTop:this.overlay.customPaddingTop, paddingBottom:this.overlay.customPaddingBottom, marginTop:this.overlay.customMarginTop, marginBottom:this.overlay.customMarginBottom, duration:.5, delay:d, ease:"power2.inOut"});
            gsap.to(this.overlay, {autoAlpha:1, duration:.75, delay:d+.25, ease:"power2.inOut"});
            if(display){
                gsap.set(this.overlay, {display:"flex", delay:d});
            }
            
        }else{
            gsap.set(this.overlay, {autoAlpha:1, delay:d, paddingTop:this.overlay.customPaddingTop, paddingBottom:this.overlay.customPaddingBottom, marginTop:this.overlay.customMarginTop, marginBottom:this.overlay.customMarginBottom});
            if(display){
                gsap.set(this.overlay, {display:"flex", delay:d});
            }
        }
    }

    hide(animate, delay, display){
        // console.log("HIDE CALLED ");
        // console.log("THIS "+this.name);
        // console.log("OVERLAY DISPLAY "+display);
        this.showing = false;
        
        let d = 0;
        if(delay){
            d = delay;
        }
        
        let dis = null;
        if(display){
            dis  = "none";
        }

        if(animate){
            gsap.to(this.overlay, {autoAlpha:0, duration:.5, delay:d, ease:"power2.inOut"});
            gsap.to(this.overlay, {paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0, duration:.5, delay:d+.5, ease:"power2.inOut"});
            if(display){
                gsap.set(this.overlay, {display:"none", delay:d+.6});
            }
        }else{
            gsap.set(this.overlay, {autoAlpha:0, delay:d, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            if(display){
                gsap.set(this.overlay, {display:"none", delay:d});
            }
        }

    }

    // update(){

    // }

}



class StepsController{

    constructor(){
    
    }

    stepsContainer = {};

    stepOneDot = {};
    stepTwoDot = {};
    stepThreeDot = {};
    stepFourDot = {};

    stepLineOne = {};

    stepOne = {};
    stepTwo = {};
    stepThree = {};
    stepFour = {};

    init(){
        this.stepsContainer = document.getElementById("steps");
        this.stepsContainer.customHeight = gsap.getProperty(this.stepsContainer, "offsetHeight");

        
        gsap.set("#step-line-one .step-center-line-solid", {width:0});

        gsap.set("#step-dot-two .step-dot-active", {x:12, y:12, width:0, height:0});
        gsap.set("#step-dot-two .step-dot-active", {autoAlpha:0});
        gsap.set("#step-dot-two .step-dot-center-white", {x:5, y:5, width:0, height:0});
        gsap.set("#step-dot-two .step-dot-center-white", {autoAlpha:0});
        gsap.set("#step-line-two .step-center-line-solid", {width:0});

        gsap.set("#step-dot-three .step-dot-active", {x:12, y:12, width:0, height:0});
        gsap.set("#step-dot-three .step-dot-active", {autoAlpha:0});
        gsap.set("#step-dot-three .step-dot-center-white", {x:5, y:5, width:0, height:0});
        gsap.set("#step-dot-three .step-dot-center-white", {autoAlpha:0});
        gsap.set("#step-line-three .step-center-line-solid", {width:0});

        gsap.set("#step-dot-four .step-dot-active", {x:12, y:12, width:0, height:0});
        gsap.set("#step-dot-four .step-dot-active", {autoAlpha:0});
        gsap.set("#step-dot-four .step-dot-center-white", {x:5, y:5, width:0, height:0});
        gsap.set("#step-dot-four .step-dot-center-white", {autoAlpha:0});
        
        gsap.set(".steps-counter", {text:"Step 1 of 4", delay:2});

        this.stepTwo = gsap.timeline();
        this.stepTwo.to("#step-line-one .step-center-line-solid", {width:"100%", duration:.5, ease:"power2.inOut"});
        this.stepTwo.set("#step-dot-two .step-dot-active", {autoAlpha:1});
        this.stepTwo.to("#step-dot-two .step-dot-active", {x:0, y:0, width:24, height:24, duration:.4, ease:"power2.inOut"});
        this.stepTwo.set("#step-dot-two .step-dot-center-white", {autoAlpha:1}, "-=.2");
        this.stepTwo.to("#step-dot-two .step-dot-center-white", {x:0, y:0, width:10, height:10, duration:.4, ease:"power2.inOut"}, "-=.2");
        this.stepTwo.pause();

        this.stepThree = gsap.timeline();
        this.stepThree.to("#step-line-two .step-center-line-solid", {width:"100%", duration:.5, ease:"power2.inOut"});
        this.stepThree.set("#step-dot-three .step-dot-active", {autoAlpha:1});
        this.stepThree.to("#step-dot-three .step-dot-active", {x:0, y:0, width:24, height:24, duration:.4, ease:"power2.inOut"});
        this.stepThree.set("#step-dot-three .step-dot-center-white", {autoAlpha:1}, "-=.2");
        this.stepThree.to("#step-dot-three .step-dot-center-white", {x:0, y:0, width:10, height:10, duration:.4, ease:"power2.inOut"}, "-=.2");
        this.stepThree.pause();

        this.stepFour = gsap.timeline();
        this.stepFour.to("#step-line-three .step-center-line-solid", {width:"100%", duration:.5, ease:"power2.inOut"});
        this.stepFour.set("#step-dot-four .step-dot-active", {autoAlpha:1});
        this.stepFour.to("#step-dot-four .step-dot-active", {x:0, y:0, width:24, height:24, duration:.4, ease:"power2.inOut"});
        this.stepFour.set("#step-dot-four .step-dot-center-white", {autoAlpha:1}, "-=.2");
        this.stepFour.to("#step-dot-four .step-dot-center-white", {x:0, y:0, width:10, height:10, duration:.4, ease:"power2.inOut"}, "-=.2");
        this.stepFour.pause();

        this.hide();
        this.shrink();

    }

    get height(){
        return this.stepsContainer.customHeight;
    }

    update(next, last, delay){

        // console.log("--- NEXT STEP "+next);
        // console.log("--- LAST STEP "+last);
        
        let d = 0;
        if(delay){ d = delay }
        // console.log("--- DELAY "+d);
        if(next === 1 && last === 0){
            console.log("GO TO STEP 2");
            
            this.stepTwo.play().delay(1.5);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 2 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
            
            // this.varifyAnimation.set("#varify-headline", {text:"Your identity has been verified!"});
            // <div class="steps-counter turaco-green-text">Step 2 of 4</div>
        
        }else if(next === 2 && last === 1){
            console.log("GO TO STEP 3");
           
            this.stepThree.play().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 3 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
            

        }else if(next === 3 && last === 2){
            console.log("GO TO STEP 4");
            
            this.stepFour.play().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 4 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
            

        }else if(next === 2 && last === 3){
            console.log("BACK TO STEP 3");
            
            this.stepFour.reverse().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 3 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
            

        }else if(next === 1 && last === 2){
            console.log("BACK TO STEP 2");
           
            this.stepThree.reverse().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 2 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
            

        }else if(next === 0 && last === 1){
            console.log("BACK TO STEP 1");
        
            this.stepTwo.reverse().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 1 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }
    }

    show(animate, delay){
        // console.log("SHOW CALLED ");
        // console.log("THIS "+this.name);
        this.showing = true;

        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.stepsContainer, {autoAlpha:1, duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.stepsContainer, {autoAlpha:1, delay:d});
        }
    }

    hide(animate, delay){
        // console.log("HIDE CALLED ");
        // console.log("THIS "+this.name);
        this.showing = false;
        
        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.stepsContainer, {autoAlpha:0, duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.stepsContainer, {autoAlpha:0, delay:d});
        }
    }

    grow(animate, delay, duration){
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        if(animate){
            gsap.to(this.stepsContainer, {height:this.height, duration:dur, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.stepsContainer, {height:this.height, delay:d});
        }
    }

    shrink(animate, delay, duration){
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        if(animate){
            gsap.to(this.stepsContainer, {height:0, duration:dur, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.stepsContainer, {height:0, delay:d});
        }
    }
}


class ButtonsController{

    constructor(){
    
    }

    name = "BUTTONS CONROLLER CLASS";

    buttonsContainer = {};

    nextButton = {};
    backButton = {};


    showing = false;



    get name(){ return this.name;}

    get showing(){ return this.showing;}
    set showing(flag){ this.showing = flag;}

    init(){
        this.buttonsContainer = document.getElementById("steps-buttons");
        this.buttonsContainer.customHeight = gsap.getProperty(this.buttonsContainer, "offsetHeight");

        this.nextButton = document.getElementById("next-button");
        gsap.set(this.nextButton, {css:{cursor:"pointer"}});
        this.backButton = document.getElementById("back-button");
        gsap.set(this.backButton, {css:{cursor:"pointer"}});
        
        this.enableNav();

        
        this.hide();
        this.shrink();

    }

    get height(){
        return this.buttonsContainer.customHeight;
    }

    show(animate, delay){
        // console.log("SHOW CALLED ");
        // console.log("THIS "+this.name);
        this.showing = true;

        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.buttonsContainer, {autoAlpha:1, duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.buttonsContainer, {autoAlpha:1, delay:d});
        }
    }

    hide(animate, delay){
        // console.log("HIDE CALLED ");
        // console.log("THIS "+this.name);
        this.showing = false;
        
        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.buttonsContainer, {autoAlpha:0, duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.buttonsContainer, {autoAlpha:0, delay:d});
        }
    }

    grow(animate, delay, duration){
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        if(animate){
            gsap.to(this.buttonsContainer, {height:this.height, duration:dur, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.buttonsContainer, {height:this.height, delay:d});
        }
    }

    shrink(animate, delay, duration){
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        if(animate){
            gsap.to(this.buttonsContainer, {height:0, duration:dur, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.buttonsContainer, {height:0, delay:d});
        }
    }

    showNextButton(animate, delay){
        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.nextButton, {autoAlpha:1, display:"flex", duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.nextButton, {autoAlpha:1, display:"flex", delay:d});
        }
    }

    hideNextButton(animate, delay){
        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.nextButton, {autoAlpha:0, display:"none", duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.nextButton, {autoAlpha:0, display:"none", delay:d});
        }
    }

    showBackButton(animate, delay){
        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.backButton, {autoAlpha:1, display:"flex", duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.backButton, {autoAlpha:1, display:"flex", delay:d});
        }
    }

    hideBackButton(animate, delay){
        let d = 0;
        if(delay){
            d = delay;
        }
        if(animate){
            gsap.to(this.backButton, {autoAlpha:0, display:"none", duration:.5, delay:d, ease:"power2.inOut"});
        }else{
            gsap.set(this.backButton, {autoAlpha:0, display:"none", delay:d});
        }
    }

    update(next, last, delay){

        // console.log("--- NEXT STEP "+next);
        // console.log("--- LAST STEP "+last);
    }

    enableNav(){
        // console.log("ENABLE NAV");
        this.nextButton.addEventListener("click", this.clickHandler);
        this.backButton.addEventListener("click", this.clickHandler);
    }

	disableNav(){
        // console.log("DISABLE NAV");
        
        this.nextButton.removeEventListener("click", this.clickHandler);
        this.backButton.removeEventListener("click", this.clickHandler);
		
		/*console.log("DISABLE ALL NAV");*/
	}

    clickHandler(event){
        // console.log("CLICK "+event.currentTarget.id);
        controller.clickHandler(event)
    }



}

class CheckMark{

    constructor(){
    
    }

    checkMark = {};
    mask = {};

    init(check, mask){
        // console.log("CHECK "+check);
        // console.log("MASK "+mask);

        this.checkMark = check;
        this.mask = mask;

        this.checkMarkAnim = gsap.timeline({paused:true});
        this.checkMarkAnim.to(this.mask, {width:0, height:0, x:42, y:10, duration:.7, ease:"power2.inOut"});
        this.checkMarkAnim.pause();
        this.checkMarkAnim.delay(10);
    }

    show(delay){
        // console.log("CHECKMARK SHOW "+delay);
        let d = 0;
        if(delay){
            d = delay;
        }
        // this.checkMarkAnim.delay(10).play();
        // this.checkMarkAnim.play();
        gsap.to(this.mask, {width:0, height:0, x:42, y:10, duration:.7, delay:d, ease:"power2.inOut"});
        // gsap.to(this.mask, {width:0, height:0, x:42, y:10, duration:5, delay:d, ease:"power2.inOut"});
    }

    reset(){
        // this.checkMarkAnim.restart();
        // this.checkMarkAnim.pause();
    }

}



//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////



class View{

    constructor(){
    
    }

    name = "NEW VIEW CLASS";
    
    steps = [];
    interuptors = [];

    varify = {};
    
    spinner = {};
    spinnerAnimation = {};

    stepsShouldShow = false;
    isStepsVisible = false;
    buttonsShouldShow = false;
    isStepsButtonsVisible = false;

    
    get name(){ return this.name;}

    init(){
        console.log(this.name);

        this.steps.push(document.getElementById("step-one"));
        this.steps.push(document.getElementById("step-two"));
        this.steps.push(document.getElementById("step-three"));
        this.steps.push(document.getElementById("step-four"));
                
        for(let i=0; i<this.steps.length; i++){
            // console.log("STEPS "+this.steps[i].id);
            this.steps[i].customHeight = gsap.getProperty(this.steps[i], "offsetHeight");
            this.steps[i].customPaddingTop = gsap.getProperty(this.steps[i], "paddingTop");
            this.steps[i].customPaddingBottom = gsap.getProperty(this.steps[i], "paddingBottom");
            this.steps[i].customMarginTop = gsap.getProperty(this.steps[i], "marginTop");
            this.steps[i].customMarginBottom = gsap.getProperty(this.steps[i], "marginBottom");
            // console.log("HEIGHT"+this.steps[i].customHeight);
            // console.log("TOP"+this.steps[i].customPaddingTop);
            // console.log("BOTTOM"+this.steps[i].customPaddingBottom);
            // console.log("TOP"+this.steps[i].customMarginTop);
            // console.log("BOTTOM"+this.steps[i].customMarginBottom);
        }

        this.interuptors.push(document.getElementById("varify"));
        this.interuptors.push(document.getElementById("no-varify"));
        this.interuptors.push(document.getElementById("sso-varify"));
        this.interuptors.push(document.getElementById("no-varify-confirm"));
        
        for(let i=0; i<this.steps.length; i++){
            // console.log("STEPS "+this.steps[i].id);
            this.interuptors[i].customHeight = gsap.getProperty(this.interuptors[i], "offsetHeight");
            this.interuptors[i].customPaddingTop = gsap.getProperty(this.interuptors[i], "paddingTop");
            this.interuptors[i].customPaddingBottom = gsap.getProperty(this.interuptors[i], "paddingBottom");
            this.interuptors[i].customMarginTop = gsap.getProperty(this.interuptors[i], "marginTop");
            this.interuptors[i].customMarginBottom = gsap.getProperty(this.interuptors[i], "marginBottom");
            // console.log("HEIGHT"+this.steps[i].customHeight);
            // console.log("TOP"+this.steps[i].customPaddingTop);
            // console.log("BOTTOM"+this.steps[i].customPaddingBottom);
            // console.log("TOP"+this.steps[i].customMarginTop);
            // console.log("BOTTOM"+this.steps[i].customMarginBottom);
        }

        this.varify = document.getElementById("varify");
        this.varify.custonHeight = gsap.getProperty(this.varify, "offsetHeight");
        gsap.set(this.varify, {autoAlpha:0, display:"none"});

        this.spinner = document.getElementById("spinner");

        this.spinnerAnimation = gsap.to(this.spinner, .5, {css:{rotation:360}, ease:Linear.easeNone, repeat: -1});
        this.spinnerAnimation.pause();
        
        
        this.hideEverything();
        this.update();
          
    }

    hideEverything(){
        overlay.hide();
        for(let i=0; i<this.steps.length; i++){
            gsap.set(this.steps[i], {autoAlpha:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
        }
        for(let i=0; i<this.interuptors.length; i++){
            gsap.set(this.interuptors[i], {autoAlpha:0, height:0, display:"none", paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
        }
    }

    // setUp(){
    
    //     this.update();
        
    // }

    

    update(delay){
        
        let d = 0;
        if(delay){ d = delay}

        console.log("VIEW UPDATE CALLED");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        let current  = controller.getCurrentStep();
        let next  = controller.getNextStep();

        let currentStep = current-1;
        let nextStep = next-1;
        console.log("current step "+controller.getCurrentStep());
        console.log("next step "+controller.getNextStep());
            
        if(current === 0 && next === 0){
            console.log("show the landing page");
            // overlay.show(animate, delay, display)
            // gsap.set("#overlay", {display:"flex"});
            overlay.show(true, 0, true);
            this.grow(.25, .75);
            this.show(.75);
        
        } else if (current === 0 && next === 1){
            console.log("show the second section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);

            if(!buttonsController.showing){
                // console.log("BUTTONS ARE NOT SHOWING");
                buttonsController.grow(.25);
                buttonsController.show(.5);
            } 

            if(!stepsController.showing){
                stepsController.grow(.25);
                stepsController.show(.5);
                stepsController.update(next, current, 1);
            }
        
        } else if (current === 1 && next === 2){
            console.log("show the third section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            if(!buttonsController.showing){
                buttonsController.grow(.25);
                buttonsController.show(.5);
            } 
            if(!stepsController.showing){
                stepsController.grow(.25);
                stepsController.show(.5);
            }
            stepsController.update(next, current, 1);

        } else if (current === 2 && next === 3){
            console.log("show the fourth section");
            this.hide(d,.25);
            this.shrink(d+.25);
            this.grow(d+.25);
            this.show(d+.75);
            if(!buttonsController.showing){
                buttonsController.grow(true, d+.25);
                buttonsController.show(true, d+.75);
            } 
            if(!stepsController.showing){
                stepsController.grow(true, d+.25);
                stepsController.show(true, d+.75);
            }
            stepsController.update(next, current, 1);

            gsap.set("#next-button", {text:"Go to my dashboard"});
            

        } 
        else if (current === 3 && next === 4){
            console.log("go to the dashboard");
            window.location = "dashboard.html";
        }
        
        
        else if (current === 3 && next === 2){
            console.log("show the third section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(next, current, 1);
            gsap.set("#next-button", {text:"Next"});
            
            
        } else if (current === 2 && next === 1){
            console.log("show the second section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(next, current, 1);
        
        } else if (current === 1 && next === 0){
            console.log("show the landing page");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.5);
            this.show(.75);

            buttonsController.shrink(.25);
            buttonsController.hide(.5);
        
            stepsController.shrink(.25);
            stepsController.hide(.5);
        } 

    }


    updateInterruptor(){
        console.log("update Interuptor called");
        controller.interruptorWasCalled = true;
        overlay.hide(true, 0, true);
        this.hide(.5);
        this.shrink(.5);
        buttonsController.shrink(.25);
        buttonsController.hide(.5);
        stepsController.shrink(.25);
        stepsController.hide(.5);

        gsap.set("#my-account", {autoAlpha:0, display:"none"});
        gsap.set("#finish-set-up", {autoAlpha:0, display:"none"});

        gsap.set("#varify #checkmark", {x:24, y:24});
        gsap.set("#varify #checkmark", {width:0, height:0});
            
        gsap.set("#varify #checkmark", {autoAlpha:0});
        gsap.set("#varify #checkmark .spinner", {autoAlpha:0});
        gsap.set("#varify #spinner-mask", {autoAlpha:0});
        gsap.to("#varify", {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
        this.startSpinner();

        this.varifyAnimation  = gsap.timeline();
        this.varifyAnimation.delay(2);
        this.varifyAnimation.to("#spinner", {autoAlpha:0, duration:.5, ease:"power2.inOut"});
        this.varifyAnimation.call(this.stopSpinner.bind(this));
        this.varifyAnimation.to("#varify-headline", {autoAlpha:0, duration:.5, ease:"power2.inOut"});

        // set the interruptor to the 4th step (3rd position)
        // interruptorPosition = 3;
        // set the outcome of the varification process
        // 1. unable to varify
        // 2. sso varification 
        // 3. move to step four
        // varifyOutcome = 1;
        
        if(controller.varifyOutcome === 1){
            // show the no varify screen
            let target = this.interuptors[1];
            console.log("OUTCOME ONE "+target.id);
            let h = this.interuptors[1].customHeight+180;
            // let h = this.noVarify.height+180;
            // this.shrinkInterruptor(target, 0, .1)
            // this.hideInterruptor(target, 0, .1);
            
            
            this.varifyAnimation.set("#varify", {autoAlpha:0, display:"none"});
            // this.varifyAnimation.set(view.stepsContainer, {height:0});
            // this.varifyAnimation.to("#overlay", {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
            overlay.show(true, 3, true);
            this.growInterruptor(target, 3, .5);
            this.showInterruptor(target, 3.5, .75);
            // this.varifyAnimation.to(target, {autoAlpha:1, display:"flex", duration:.75, ease:"power2.inOut"});

            // gsap.to(target, {autoAlpha:1, display:"flex", duration:.75, delay:.5, ease:"power2.inOut"});
            
        }
        else if(controller.varifyOutcome === 2){
            // show sso varification
            let target = this.interuptors[2];

            this.varifyAnimation.set("#varify-headline", {text:"Your identity has been verified!"});
            this.varifyAnimation.to("#varify-headline", {autoAlpha:1, duration:.5, ease:"power2.inOut"});
            this.varifyAnimation.set("#varify #checkmark", {autoAlpha:1});
            this.varifyAnimation.to("#varify #checkmark", {x:0, y:0, width:48, height:48, duration:.5, ease:"power2.inOut"});
            this.varifyAnimation.set("#varify #spinner-mask", {autoAlpha:1});
            this.varifyAnimation.set("#varify #checkmark .spinner", {autoAlpha:1});
            this.varifyAnimation.to("#varify #spinner-mask", {width:0, height:0, x:42, y:10, duration:.7, ease:"power2.inOut"}, "+=.5");
            this.varifyAnimation.to("#varify", {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
            
            
            overlay.show(true, 5.6, true);
            this.growInterruptor(target, 5.6, .5);
            this.showInterruptor(target, 6, .75);
        }
        else if(controller.varifyOutcome === 3){
            console.log("OUTCOME 3 MOVE TO STEP 4");
            // move on to step 4
            this.varifyAnimation.set("#varify-headline", {text:"Your identity has been verified!"});
            this.varifyAnimation.to("#varify-headline", {autoAlpha:1, duration:.5, ease:"power2.inOut"});
            this.varifyAnimation.set("#varify #checkmark", {autoAlpha:1});
            this.varifyAnimation.to("#varify #checkmark", {x:0, y:0, width:48, height:48, duration:.5, ease:"power2.inOut"});
            this.varifyAnimation.set("#varify #spinner-mask", {autoAlpha:1});
            this.varifyAnimation.set("#varify #checkmark .spinner", {autoAlpha:1});
            this.varifyAnimation.to("#varify #spinner-mask", {width:0, height:0, x:42, y:10, duration:.7, ease:"power2.inOut"}, "+=.5");
            this.varifyAnimation.to("#varify", {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
            
            overlay.show(true, 5.6, true);
            this.update(6);
        }


    }

    showInterruptor(target, delay, duration){
        // console.log("VIEW SHOW "+controller.getNextStep());
        console.log("VIEW ELEMENT "+target.id);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {autoAlpha:1, duration:dur, delay:d, ease:"power2.inOut"});
        
        // if(animate){
        //     gsap.to(target, {height:this.height, duration:dur, delay:d, ease:"power2.inOut"});
        // }else{
        //     gsap.set(target, {height:this.height, delay:d});
        // }
        

    }

    hideInterruptor(target, delay, duration){
        // console.log("VIEW HIDE "+controller.getCurrentStep());
        console.log("VIEW ELEMENT "+target.id);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {autoAlpha:0, duration:dur, delay:d, ease:"power2.inOut"});
        
        
    }

    growInterruptor(target, delay, duration){
        console.log("VIEW GROW "+target.id);
        console.log("VIEW ELEMENT "+target.customHeight);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.set(target, {display:"flex"});
        gsap.to(target, {height:target.customHeight, paddingTop:target.customPaddingTop, paddingBottom:target.customPaddingBottom, marginTop:target.customMarginTop, marginBottom:target.customMarginBottom, duration:dur, delay:d, ease:"power2.inOut"});
        
    }

    shrinkInterruptor(target, delay, duration){
        // console.log("VIEW GROW "+controller.getCurrentStep());
        console.log("VIEW ELEMENT "+target.customHeight);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0, duration:dur, delay:d, ease:"power2.inOut"});
        
       
    }

    showNoVarifyConfirm(){
        console.log("SHOW NO VARIFY CONFIRM ");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        let target = this.interuptors[1];
        this.hideInterruptor(target, 0, .75);
        this.shrinkInterruptor(target, .5, .5);
        let confirm = this.interuptors[3];
        this.growInterruptor(confirm, 1, .5);
        this.showInterruptor(confirm, 1.5, .75);
        noVarifyCheckmark.show(2.25);
    }

    exitNoVarify(){
        console.log("EXIT NO VARIFY ");
        let target = this.interuptors[3];
        this.hideInterruptor(target, 0, .75);
        this.shrinkInterruptor(target, .5, .5);
        
        this.update(1);
    }

    exitSSOVarify(){
        console.log("EXIT SSO VARIFY ");
        let target = this.interuptors[2];
        this.hideInterruptor(target, 0, .75);
        this.shrinkInterruptor(target, .5, .5);
        
        this.update(1);
    }
    

    show(delay, duration){
        // console.log("VIEW SHOW "+controller.getNextStep());
        let target  = this.steps[controller.getNextStep()];
        // console.log("VIEW ELEMENT "+target.id);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {autoAlpha:1, duration:dur, delay:d, ease:"power2.inOut"});
        
        // if(animate){
        //     gsap.to(target, {height:this.height, duration:dur, delay:d, ease:"power2.inOut"});
        // }else{
        //     gsap.set(target, {height:this.height, delay:d});
        // }
        

    }

    hide(delay, duration){
        // console.log("VIEW HIDE "+controller.getCurrentStep());
        let target  = this.steps[controller.getCurrentStep()];
        // console.log("VIEW ELEMENT "+target.id);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {autoAlpha:0, duration:dur, delay:d, ease:"power2.inOut"});
        
        
    }

    grow(delay, duration){
        console.log("VIEW GROW "+controller.getNextStep());
        let target  = this.steps[controller.getNextStep()];
        console.log("VIEW ELEMENT "+target.customHeight);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {height:target.customHeight, paddingTop:target.customPaddingTop, paddingBottom:target.customPaddingBottom, marginTop:target.customMarginTop, marginBottom:target.customMarginBottom, duration:dur, delay:d, ease:"power2.inOut"});
        
    }

    shrink(delay, duration){
        // console.log("VIEW GROW "+controller.getCurrentStep());
        let target  = this.steps[controller.getCurrentStep()];
        // console.log("VIEW ELEMENT "+target.customHeight);
        
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0, duration:dur, delay:d, ease:"power2.inOut"});
        
       
    }

    startSpinner(){
        this.spinnerAnimation.play();
    }

    stopSpinner(){
        this.spinnerAnimation.pause();
    }

}


//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

class Controller {

    constructor(){
        //console.log("controller");
    }

    
    steps = [];
    currentStep = null;
    nextStep = null;

    // scheduleApptButton = {};
    interruptorWasCalled = false;
    // set the interruptor to the 4th step (3rd position)
    interruptorPosition = 3;
    // set the outcome of the varification process
    // 1. unable to varify
    // 2. sso varification 
    // 3. move to step four
    varifyOutcome = 1;

    isVarifyShowing = false;
    

    name = "NEW CONTROLLER CLASS";
    get name(){ return this.name;}

    init(){
        console.log(this.name);
        // this.scheduleApptButton = document.getElementById("schedule-submit-form-button");

        this.setCurrentStep(0);
        this.setNextStep(0);
        
        // this.enableScheduleButton();
        this.enableButtons();
        this.enableVarifyOutcomeButtons();
                
    }

    enableButtons(){

        // sign-up-button
        // no-varify-button
        // sso-varify-button
        // my-account
        // finish-set-up
        document.getElementById("sign-up-button").addEventListener("click", this.clickHandler);
        gsap.set("#sign-up-button", {css:{cursor:"pointer"}});
        document.getElementById("no-varify-button").addEventListener("click", this.clickHandler);
        gsap.set("#no-varify-button", {css:{cursor:"pointer"}});
        document.getElementById("no-varify-confirm-button").addEventListener("click", this.clickHandler);
        gsap.set("#no-varify-confirm-button", {css:{cursor:"pointer"}});
        document.getElementById("sso-varify-button").addEventListener("click", this.clickHandler);
        gsap.set("#sso-varify-button", {css:{cursor:"pointer"}});
        document.getElementById("my-account").addEventListener("click", this.clickHandler);
        gsap.set("#my-account", {css:{cursor:"pointer"}});
        document.getElementById("finish-set-up").addEventListener("click", this.clickHandler);
        gsap.set("#finish-set-up", {css:{cursor:"pointer"}});
    }

    enableVarifyOutcomeButtons(){
        document.getElementById("step-dot-one").addEventListener("click", this.varifyOutcomeClickHandler.bind(this));
        document.getElementById("step-dot-two").addEventListener("click", this.varifyOutcomeClickHandler.bind(this));
        document.getElementById("step-dot-three").addEventListener("click", this.varifyOutcomeClickHandler.bind(this));
    }

    varifyOutcomeClickHandler(event){
        let target = event.currentTarget; 
        if(target.id === "step-dot-one"){
            console.log("VARIFY ONE");
            this.varifyOutcome = 1;
        }
        else if(target.id === "step-dot-two"){
            console.log("VARIFY TWO");
            this.varifyOutcome = 2;
        }
        else if(target.id === "step-dot-three"){
            console.log("VARIFY THREE");
            this.varifyOutcome = 3;
        }
    }

    // enableScheduleButton(){
    //     this.scheduleApptButton.addEventListener("click", this.clickHandler);
    //     gsap.set(this.scheduleApptButton, {css:{cursor:"pointer"}});
    // }

    clickHandler(event){
        // console.log("CONTROLLER CLICK HANDLER "+event.currentTarget.id);
        // console.log("current target page "+controller.getTargetPage(event.currentTarget));
        controller.routeClick(event);
       
    }

    // This is for button click handling only. 
    // There needs to be another workflow for intiruptors that would simulate api handling. 
    routeClick(event){
        let target = event.currentTarget; 
        // console.log("current target id "+target.id);

        if(target.id === "next-button"){
            console.log("NEXT BUTTON");
            this.stepUp();
            
        }
        // Is it a back button click?
        // back-button
        else if(target.id === "back-button"){
            console.log("BACK BUTTON");
            // console.log("current step "+this.getCurrentStep());
            // console.log("next step "+this.getNextStep());
            this.stepDown();
                        
        }
        else if (target.id === "sign-up-button"){
            console.log("SIGN UP BUTTON");
            this.stepUp();
        }
        else if (target.id === "no-varify-button"){
            console.log("NO VARIFY BUTTON");
            view.showNoVarifyConfirm();
            return;
            // this.stepUp();
        }
        else if (target.id === "no-varify-confirm-button"){
            console.log("NO VARIFY CONFIRM BUTTON");
            view.exitNoVarify();
            return;
            // this.stepUp();
        }
        else if (target.id === "sso-varify-button"){
            console.log("SSO VARIFY BUTTON");
            view.exitSSOVarify();
            
            return;
            // this.stepUp();
        }
        

        

        

        
        console.log("TARGET STEP "+this.getNextStep());
        if(this.getNextStep() === this.interruptorPosition){
            view.updateInterruptor();
            return;
        }

        view.update();

    }

    getCurrentStep(){
        return this.currentStep;
    }
    setCurrentStep(step){
        this.currentStep = step;
        return this.currentStep;
    }
    getNextStep(){
        return this.nextStep;
    }
    setNextStep(step){
        // console.log("SET NEXT STEP "+step);
        this.nextStep = step;
        return this.nextStep;
    }
    stepUp(){
        // console.log("step up called");
        // console.log("current step "+this.getCurrentStep());
        // console.log("next step "+this.getNextStep());
        let current = this.getNextStep();
        if(this.getCurrentStep() === view.steps.length-1){
            console.log("reached the pos end");
            return;
        } else {
            this.setCurrentStep(current);
            let next = current;
            console.log("NEXT STEP "+next);
        
            this.setNextStep(++next);
            // console.log("not at the end");
        }
    }
    stepDown(){
        // console.log("step down called "+this.getCurrentStep());
        // console.log("current step "+this.getCurrentStep());
        // console.log("next step "+this.getNextStep());
        if(this.getNextStep() === 0 || this.getNextStep() === 0){
            console.log("reached the neg end");
            return;
        } else {
            let current = this.getNextStep();
            this.setCurrentStep(current);
            let next = current;
            this.setNextStep(--next);
        }
    }

}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////























class OldView{

    constructor(){
    
    }

    name = "VIEW CLASS";
    overlay = {};
    stepOne = {};
    stepTwo = {};
    stepThree = {};
    stepFour = {};
    stepsContainer = {};
    steps = {};
    stepsButtons = {};
    varify = {};
    noVarify = {};
    ssoVarify = {};
    spinner = {};
    spinnerAnimation = {};

    stepsShouldShow = false;
    isStepsVisible = false;
    buttonsShouldShow = false;
    isStepsButtonsVisible = false;

    varifyAnimation = {};

    // let main = document.getElementsByClassName("nav-item");
	// let back = document.getElementById("button-back");
	// let click = document.getElementsByClassName("navigation");





    get name(){ return this.name;}

    init(){
        this.overlay.element = document.getElementById("overlay");
        this.stepsContainer = document.getElementById("steps-content-outer-container");

        this.stepOne.element = document.getElementById("step-one");
        this.stepOne.height = gsap.getProperty(this.stepOne.element, "offsetHeight");
        
        this.stepTwo.element = document.getElementById("step-two");
        this.stepTwo.height = gsap.getProperty(this.stepTwo.element, "offsetHeight");
        // console.log("HEIGHT PROP "+this.stepTwo.element.height);
        this.stepThree.element = document.getElementById("step-three");
        this.stepThree.height = gsap.getProperty(this.stepThree.element, "offsetHeight");

        this.stepFour.element = document.getElementById("step-four");
        this.stepFour.height = gsap.getProperty(this.stepFour.element, "offsetHeight");

        this.steps.element = document.getElementById("steps");
        this.steps.height = gsap.getProperty(this.steps.element, "offsetHeight");

        this.stepsButtons.element = document.getElementById("steps-buttons");
        this.stepsButtons.height = gsap.getProperty(this.stepsButtons.element, "offsetHeight");

        this.varify.element = document.getElementById("varify");
        this.varify.height = gsap.getProperty(this.varify.element, "offsetHeight");

        this.noVarify.element = document.getElementById("no-varify");
        this.noVarify.height = gsap.getProperty(this.noVarify.element, "offsetHeight");

        this.ssoVarify.element = document.getElementById("sso-varify");
        this.ssoVarify.height = gsap.getProperty(this.ssoVarify.element, "offsetHeight");

        this.spinner.element = document.getElementById("spinner");

        this.spinnerAnimation = gsap.to(this.spinner.element, .5, {css:{rotation:360}, ease:Linear.easeNone, repeat: -1});
        this.spinnerAnimation.pause();
        
        this.hideEverything();
        this.setUp();

    }

    hideEverything(){
        this.hideStepOne(true);
        // this.hideOverlay(true);
        overlay.hide();
        this.hideStepTwo(true);
        this.hideStepThree(true);
        this.hideStepFour(true);
        this.hideSteps(true);
        this.hideStepsButtons(true);
        this.hideVarify(true);
        this.hideNoVarify(true);
        this.hideSSOVarify(true);
                
	}

    setUp(){
        // this.showOverlay();
        overlay.show(true, .5);
        gsap.delayedCall(1, this.showStepOne.bind(this));

        controller.setCurrentPage("step-one");
    }

    update(target){
        
        // console.log("VIEW UPDATE CALLED");
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // this is temporary and needs to be replaced with 
        // stopping on 0 and moving on to the dashboard at 3
        if (controller.getCurrentStep() === controller.getNextStep()){
            return;
        }
        if(controller.interruptorPosition === controller.getNextStep() && !controller.interruptorWasCalled){
            // console.log("INTERRUPT UPDATE SHOULD BE CALLED");
            this.updateInterruptor();
            return;
        }
        this.hide(controller.getStepObj(controller.getCurrentStep()));
        this.show(controller.getStepObj(controller.getNextStep()), .5);

        stepsController.update(controller.getNextStep(), controller.getCurrentStep(), 1);
        
        controller.setCurrentStep(controller.getNextStep());

    }

    updateInterruptor(){
        controller.interruptorWasCalled = true;
        this.hide(controller.getStepObj(controller.getCurrentStep()));
        gsap.to(this.steps.element, {autoAlpha:0, display:"none", duration:.75});
        this.isStepsVisible = false;
        gsap.to(this.stepsButtons.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        this.isStepsButtonsVisible = false;
        
        if(!controller.isVarifyShowing){

            gsap.set("#my-account", {autoAlpha:0, display:"none"});
            gsap.set("#finish-set-up", {autoAlpha:0, display:"none"});



            gsap.set("#varify #checkmark", {x:24, y:24});
            gsap.set("#varify #checkmark", {width:0, height:0});
             
            gsap.set("#varify #checkmark", {autoAlpha:0});
            gsap.set("#varify #checkmark .spinner", {autoAlpha:0});
            gsap.set("#varify #spinner-mask", {autoAlpha:0});


            // gsap.to("#overlay", {autoAlpha:0, display:"none", duration:.5, delay:0, ease:"power2.inOut"});
            overlay.hide(true, 0, true);
            gsap.to("#varify", {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
            this.startSpinner();

            
            this.varifyAnimation  = gsap.timeline();
            this.varifyAnimation.delay(2);
            this.varifyAnimation.to("#spinner", {autoAlpha:0, duration:.5, ease:"power2.inOut"});
            this.varifyAnimation.call(this.stopSpinner.bind(this));
            this.varifyAnimation.to("#varify-headline", {autoAlpha:0, duration:.5, ease:"power2.inOut"});

            controller.isVarifyShowing = true;
            
            if(controller.varifyOutcome === 1){
                // show the no varify screen
                console.log("OUTCOME ONE");
                let h = this.noVarify.height+180;
                this.varifyAnimation.set("#varify", {autoAlpha:0, display:"none"});
                this.varifyAnimation.set(view.stepsContainer, {height:0});
                // this.varifyAnimation.to("#overlay", {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
                overlay.show(true, .5, true);
                this.varifyAnimation.to(this.noVarify.element, {autoAlpha:1, display:"flex", duration:.75, ease:"power2.inOut"});

                gsap.to(this.noVarify.element, {autoAlpha:1, display:"flex", duration:.75, delay:.5, ease:"power2.inOut"});
                
            }else if (controller.varifyOutcome === 2){
                // show the sso varification screen
                this.varifyAnimation.set("#varify-headline", {text:"Your identity has been verified!"});
                this.varifyAnimation.to("#varify-headline", {autoAlpha:1, duration:.5, ease:"power2.inOut"});
                this.varifyAnimation.set("#varify #checkmark", {autoAlpha:1});
                this.varifyAnimation.to("#varify #checkmark", {x:0, y:0, width:48, height:48, duration:.5, ease:"power2.inOut"});
                this.varifyAnimation.set("#varify #spinner-mask", {autoAlpha:1});
                this.varifyAnimation.set("#varify #checkmark .spinner", {autoAlpha:1});
                this.varifyAnimation.to("#varify #spinner-mask", {width:0, height:0, x:42, y:10, duration:.7, ease:"power2.inOut"}, "+=.5");
                
                this.varifyAnimation.to("#finish-set-up", {autoAlpha:1, display:"flex", duration:.5, ease:"power2.inOut"});

            }else if (controller.varifyOutcome === 3){
                // hide the varify screen and move on to step 4
                this.varifyAnimation.set("#varify-headline", {text:"Your identity has been verified!"});
                this.varifyAnimation.to("#varify-headline", {autoAlpha:1, duration:.5, ease:"power2.inOut"});
                this.varifyAnimation.set("#varify #checkmark", {autoAlpha:1});
                this.varifyAnimation.to("#varify #checkmark", {x:0, y:0, width:48, height:48, duration:.5, ease:"power2.inOut"});
                this.varifyAnimation.set("#varify #spinner-mask", {autoAlpha:1});
                this.varifyAnimation.set("#varify #checkmark .spinner", {autoAlpha:1});
                this.varifyAnimation.to("#varify #spinner-mask", {width:0, height:0, x:42, y:10, duration:.7, ease:"power2.inOut"}, "+=.5");
            
                this.varifyAnimation.to("#my-account", {autoAlpha:1, display:"flex", duration:.5, ease:"power2.inOut"});
            }
            
        }

    }

    show(target, delay){

        // set a variable to store the height for the overlay
        let h = 0;
        if(controller.getNextStep() != 0){
            // console.log("SHOW THE STEPS");
            // show the steps and buttons
            this.stepsShouldShow = true;
            this.buttonsShouldShow = true;
            h = this.steps.height+this.stepsButtons.height+target.customHeight+180;
        } else {
            // hide the steps and buttons
            // console.log("HIDE THE STEPS");
            this.stepsShouldShow = false;
            this.buttonsShouldShow = false;
            h = target.customHeight+180;
        }
        
        let stepsHeight = 0;
        if(this.stepsShouldShow){ stepsHeight = this.steps.height}
        let buttonsHeight = 0;
        if(this.buttonsShouldShow){ buttonsHeight = this.stepsButtons.height}
        
        // console.log("HEIGHT PROP "+this.stepTwo.height);
        // console.log("TARGET CUSTOM HEIGHT "+target.customHeight);
        // console.log("TARGET ID "+target.id);
        // console.log("STEPS HEIGHT "+stepsHeight);
        // console.log("BUTTONS HEIGHT "+buttonsHeight);

        let d = 0;
        if(delay){ d = delay }
        
        // console.log("DELAY "+delay);
        // console.log("CURRENT STEP COUNT "+controller.getCurrentStep());
        // console.log("NEXT STEP COUNT "+controller.getNextStep());

        if(controller.getNextStep() > 0){
            // console.log("NOT ZERO");
            gsap.to(view.stepsContainer, {height:target.customHeight, duration:.5, ease:"power2.inOut", delay:d});
        } else if(controller.getNextStep() === 0){
            gsap.set(view.stepsContainer, {height:0, delay:d});
        }
        
        gsap.to(target, {autoAlpha:1, display:"flex", duration:.5, delay:d+.5, ease:"power2.inOut"});

        if(!this.isStepsVisible && this.stepsShouldShow === true){
            // console.log("STEPS ARE NOT VISIBLE AND SHOULD BE");
            gsap.to(this.steps.element, {autoAlpha:1, display:"flex", duration:.75, delay:d});
        } else if(!this.isStepsVisible && this.stepsShouldShow === false){
            gsap.to(this.steps.element, {autoAlpha:0, display:"none", duration:.75});
            this.isStepsVisible = false;
        }

        if(!this.isStepsButtonsVisible && this.buttonsShouldShow === true){
            // console.log("BUTTONS ARE NOT VISIBLE AND SHOULD BE");
            gsap.to(this.stepsButtons.element, {autoAlpha:1, display:"flex", duration:.5, ease:"power2.inOut", delay:d});
        } else if(!this.isStepsButtonsVisible && this.buttonsShouldShow === false){
            // console.log("BUTTONS SHOULD NOT BE VISIBLE");
            gsap.to(this.stepsButtons.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
            this.isStepsButtonsVisible = false;
        }

        
    }

    hide(target){
        gsap.to(target, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
    }

    showOverlay(now){
        //console.log("SHOW OVERLAY CALLED")
        if(now){
            gsap.set(this.overlay, {autoAlpha:1});
        } else {
            gsap.to(this.overlay.element, {autoAlpha:1, duration:.5, delay:.5});
        }
    }

    hideOverlay(now){
        //console.log("HIDE OVERLAY");
        if(now){
            gsap.set(this.overlay.element, {autoAlpha:0});
        } else {
            gsap.to(this.overlay.element, {autoAlpha:0, duration:.5});
        }
    }

    showStepOne(){
        let targetObj = controller.getStepObj(controller.getCurrentStep());
        // console.log("TARGET OBJ "+targetObj.id);
        gsap.to(targetObj, {height:targetObj.customHeight, duration:.5, ease:"power2.inOut"});
        gsap.to(targetObj, {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
    }

    hideStepOne(now){
        if(now){
            gsap.set(this.stepOne.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.stepOne.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        }
    }

    showStepTwo(){
        // console.log("SHOW STEP TWO");
        //console.log("this.steps.height "+ this.steps.height);
        let h = this.steps.height+this.stepsButtons.height+this.stepTwo.height+180;
        gsap.to(this.stepTwo.element, {autoAlpha:1, display:"flex", duration:.5, delay:.75, ease:"power2.inOut"});
        
        if(!this.isStepsVisible){gsap.delayedCall(.5, this.showSteps.bind(this));}
        if(!this.isStepsButtonsVisible){gsap.delayedCall(1, this.showStepsButtons.bind(this));}
        
    }

    hideStepTwo(now){
        if(now){
            gsap.set(this.stepTwo.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.stepTwo.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        }
        
    }

    showStepThree(){
        
        let h = this.steps.height+this.stepsButtons.height+this.stepThree.height+180;
        //console.log(h);
        gsap.to(this.stepThree.element, {autoAlpha:1, display:"flex", duration:.5, delay:1.5, ease:"power2.inOut"});
        
        if(!this.isStepsVisible){gsap.delayedCall(1, this.showSteps.bind(this));}
        if(!this.isStepsButtonsVisible){gsap.delayedCall(2, this.showStepsButtons.bind(this));}
        
    }

    hideStepThree(now){
        if(now){
            gsap.set(this.stepThree.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.stepThree.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        }
        
    }

    showStepFour(){
        //console.log("SHOW STEP 4 CALLED");
        let h = this.steps.height+this.stepsButtons.height+this.stepFour.height+180;
        //console.log(h);
        gsap.to(this.stepFour.element, {autoAlpha:1, display:"flex", duration:.5, delay:1, ease:"power2.inOut"});
        
        if(!this.isStepsVisible){gsap.delayedCall(5, this.showSteps.bind(this));}
        if(!this.isStepsButtonsVisible){gsap.delayedCall(1, this.showStepsButtons.bind(this));}
        
    }

    hideStepFour(now){
        if(now){
            gsap.set(this.stepFour.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.stepFour.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        }
    }
    
   
    showSteps(now){
        this.isStepsVisible = true;
        if(now){
            gsap.set(this.steps.element, {autoAlpha:1, display:"flex"});
        } else {
            gsap.to(this.steps.element, {autoAlpha:1, display:"flex", duration:.75});
        }
    }

    hideSteps(now){
        this.isStepsVisible = false;
        if(now){
            gsap.set(this.steps.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.steps.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        }
       
    }

    showStepsButtons(now){
        this.isStepsButtonsVisible = true;
        if(now){
            gsap.set(this.stepsButtons.element, {autoAlpha:1, display:"flex"});
        } else {
            gsap.to(this.stepsButtons.element, {autoAlpha:1, display:"flex", duration:.5, ease:"power2.inOut"});
        }
    }

    hideStepsButtons(now){
        this.isStepsButtonsVisible = false;
        if(now){
            gsap.set(this.stepsButtons.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.stepsButtons.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        }
       
    }

    showVarify(){
        
        gsap.to(this.varify.element, {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
        this.startSpinner();

        controller.setLastPage(controller.getCurrentPage());
        controller.setCurrentPage("no-varify");
        gsap.delayedCall(6, this.update.bind(this));
        gsap.delayedCall(5, this.hideVarify.bind(this));
        gsap.delayedCall(6, this.stopSpinner.bind(this));
        
    }

    hideVarify(now){
        if(now){
            gsap.set(this.varify.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.varify.element, {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
        }
    }

    showNoVarify(){
        // console.log("NO VARIFY CALLED"+ this.name);
        let h = this.noVarify.height+180;
        // console.log("height " +h);
        // gsap.set("#overlay", {autoAlpha:1, display:"flex"});
        overlay.show(false, 0, true);
        gsap.to(this.noVarify.element, {autoAlpha:1, display:"flex", duration:.75, delay:.5, ease:"power2.inOut"});
    }

    hideNoVarify(now){
        if(now){
            gsap.set(this.noVarify.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.noVarify.element, {autoAlpha:0, display:"none", duration:.75, ease:"power2.inOut"});
        }
                
    }

    showSSOVarify(){
        console.log("SHOW SSO VARIFY");
        let h = this.ssoVarify.height+180;
        //console.log(h);
        gsap.to(this.ssoVarify.element, {autoAlpha:1, display:"flex", duration:.75, delay:.5, ease:"power2.inOut"});
        
    }

    hideSSOVarify(now){
        if(now){
            gsap.set(this.ssoVarify.element, {autoAlpha:0, display:"none"});
        } else {
            gsap.to(this.ssoVarify.element, {autoAlpha:0, display:"none", duration:.75, ease:"power2.inOut"});
        }
        
    }

    startSpinner(){
        this.spinnerAnimation.play();
    }

    stopSpinner(){
        this.spinnerAnimation.pause();
    }

}






class OldController {

    constructor(){
        //console.log("controller");
    }

    clickable = {};
    currentPage = "";
    lastPage = null;
    steps = [];
    currentStep = null;
    nextStep = null;

    interruptors = {};
    interruptorWasCalled = false;
    // set the interruptor to the 4th step (3rd position)
    interruptorPosition = 3;
    // set the outcome of the varification process
    // 1. unable to varify
    // 2. sso varification 
    // 3. move to step four
    varifyOutcome = 3;

    isVarifyShowing = false;
    isVarifyOutcomeShowing = false;


    // Pass in all of the navigation items
    // let click = document.getElementsByClassName("navigation");

    init(clickables){
        //console.log("controller.init");

        this.initClickableElements(clickables);
        this.enableNav();
        this.setCurrentPage("step-one");
    }

    initClickableElements(clickables){
        //console.log("init clickables");
        this.clickable = clickables;
		for(let i=0; i<this.clickable.length; i++){
            gsap.set(this.clickable[i], {css:{cursor:"pointer"}});
		}
    }

    enableNav(){
		for(let i=0; i<this.clickable.length; i++){
            //console.log("enable clickables");
			this.clickable[i].addEventListener("click", this.clickHandler);
		}
		/*console.log("ENABLE ALL NAV");*/
	}

	disableNav(){
		for(let i=0; i<this.clickable.length; i++){
			this.clickable[i].removeEventListener("click", this.clickHandler);
		}
		/*console.log("DISABLE ALL NAV");*/
	}

    clickHandler(event){
        // console.log("click handler "+event.currentTarget);
        // console.log("current target page "+controller.getTargetPage(event.currentTarget));
        controller.routeClick(event);
        // view.update(controller.getTargetPage(event.currentTarget));
    }

    initInterruptors(interruptors){
        this.interruptors = interruptors;
        // console.log("interruptors length "+this.interruptors.length);
        for(let i=0; i<this.interruptors.length; i++){
            // console.log("INTERRUPTOR "+this.interruptors[i].id);
            this.interruptors[i].customHeight = gsap.getProperty(this.interruptors[i], "offsetHeight");
		}
    }

    initSteps(steps){
        this.steps = steps;
        this.setCurrentStep(0);
        // console.log("steps length"+this.steps.length);
        for(let i=0; i<this.steps.length; i++){
            this.steps[i].customHeight = gsap.getProperty(this.steps[i], "offsetHeight");
		}
    }

    // This is for button click handling only. 
    // There needs to be another workflow for intiruptors that would simulate api handling. 
    routeClick(event){
        let target = event.currentTarget; 
        // console.log("current target id "+target.id);
        // console.log("current target page "+target.getAttribute("target-page"));
        // Is it a next button click?
        newcontroller.routeClick(event);
        // next-button
        if(target.id === "next-button"){
            // console.log("NEXT BUTTON");
            // console.log("next step "+this.getNextStep());
            // console.log("current step "+this.getCurrentStep());
            this.stepUp();
            view.update(controller.getTargetPage(event.currentTarget));
            if(this.getNextStep() == 3){
                gsap.set("#next-button", {text:"Go to my dashboard"});
            }
            if(this.getNextStep() == 3 && this.getCurrentStep() === 3){
                console.log("GO TO DASHBOARD");
                window.location = "dashboard.html";
            }

        }
        // Is it a back button click?
        // back-button
        else if(target.id === "back-button"){
            // console.log("BACK BUTTON");
            // console.log("next step "+this.getNextStep());
            this.stepDown();
            view.update(controller.getTargetPage(event.currentTarget));
            if(this.getNextStep() == 2){
                gsap.set("#next-button", {text:"Next"});
            }
            // call the view 
            // set the new current 
            // console.log("next step "+this.getNextStep());
        }
        // is it a sign-in click?
        // sign-in-button
        else if(target.id === "sign-in-button"){
            console.log("SIGN IN BUTTON");
        }
        // Is it a create account click?
        // sign-up-button
        else if(target.id === "sign-up-button"){
            // console.log("SIGN UP BUTTON");
            this.stepUp();
            view.update(controller.getTargetPage(event.currentTarget));
            // CALL THE VIEW FUNCTION AND PASS IT IN THE STEPS[I].ID
            // setCurrent
        }
        // Is it a can not varify form submit?
        // no-varify-button
        else if(target.id === "no-varify-button"){
            console.log("NO VARIFY BUTTON");
        }
        // Is it an SSO varify form submit?
        // sso-varify-button
        else if(target.id === "sso-varify-button"){
            console.log("SSO VARIFY BUTTON");

            view.hideSSOVarify();
            gsap.delayedCall(1, view.update());
        }
        
        else if(target.id === "my-account"){
            console.log("MY ACCOUNT BUTTON");
            // console.log("next step "+this.getNextStep());
            gsap.set(view.stepsContainer, {height:300});
            if(this.getNextStep() == 3){
                gsap.set("#next-button", {text:"Go to my dashboard"});
            }

            gsap.to("#varify", {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
            // gsap.to("#overlay", {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
            overlay.show(true, .5, true);
            gsap.delayedCall(1, view.update());
        }

        else if(target.id === "finish-set-up"){
            console.log("FINISH SET UP BUTTON");
            // SHOW SSO 
            if(this.getNextStep() == 3){
                gsap.set("#next-button", {text:"Go to my dashboard"});
            }
            gsap.set(view.stepsContainer, {height:0});
            gsap.to("#varify", {autoAlpha:0, display:"none", duration:.5, ease:"power2.inOut"});
            // gsap.to("#overlay", {autoAlpha:1, display:"flex", duration:.5, delay:.5, ease:"power2.inOut"});
            overlay.show(true, .5, true);
            gsap.delayedCall(1, view.showSSOVarify());
           
        }
        
        
        else {
            console.log("NO BUTTON MATCH");
        }

        // console.log("current step "+this.getCurrentStep());
        // console.log("next step "+this.getNextStep());

    }

    getCurrentStep(){
        return this.currentStep;
    }
    setCurrentStep(step){
        this.currentStep = step;
        return this.currentStep;
    }
    getNextStep(){
        return this.nextStep;
    }
    setNextStep(step){
        this.nextStep = step;
        return this.nextStep;
    }
    stepUp(){
        // console.log("step up called");
        let current = this.getCurrentStep();
        if(current === this.steps.length-1){
            // console.log("reached the pos end");
            return;
        } else {
            let next = current;
            this.setNextStep(++next);
            // console.log("not at the end");
        }
    }
    stepDown(){
        // console.log("step down called");
        let current = this.getCurrentStep();
        if(current === 0){
            // console.log("reached the neg end");
            return;
        } else {
            let next = current;
            this.setNextStep(--next);
        }
    }

    getStepObj(stepNum){
        return this.steps[stepNum];
    }





    setCurrentPage(page){
        this.currentPage = page;
    }

    getCurrentPage(){
        return this.currentPage;
    }

    setLastPage(page){
        this.lastPage = page;
    }

    getLastPage(){
        return this.lastPage;
    }
    
    getTargetPage(clickedPage){
		return clickedPage.getAttribute("target-page");
	}

}














// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************
// *********************************************************

// To do: 

// Change the modal so that it changes the height of the inner container rather than the background height
// on complete make sure the min height is not going to zero and is set to the last container height. 
















const signUpNav = new SignUpNav();

const overlay = new OverlayController();

// const newview = new NewView();
// const newcontroller = new NewController();

const view = new View();
const controller = new Controller();
const stepsController = new StepsController();
const buttonsController = new ButtonsController();
const noVarifyCheckmark = new CheckMark();

// INITIALIZE THE START OF THE JAVASCRIPT
function init(){
    console.log("init happened");

    signUpNav.init();
    stepsController.init();
    buttonsController.init();
    
    overlay.init();

    let check = document.getElementById("no-varify-confirm-checkmark");
    let mask = document.getElementById("no-varify-confirm-checkmark-mask");
    noVarifyCheckmark.init(check, mask);

    // let click = document.getElementsByClassName("navigation");
    controller.init();

    // let steps = document.getElementsByClassName("step");
    // controller.initSteps(steps);

    // let interruptors = document.getElementsByClassName("interruptor");
    // controller.initInterruptors(interruptors);

    view.init();

}























// set the listeners on the content load callback, then tie it to the function and set the callback to fire when the event bubbles up
document.addEventListener( "DOMContentLoaded" , init , false ) ;
