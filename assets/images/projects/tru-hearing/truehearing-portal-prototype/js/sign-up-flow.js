gsap.registerPlugin(TextPlugin);

class SignUpNav{
    constructor(){}

    name = "SIGN UP NAV CLASS";
    mobileNav = {};
    mobileNavCopy = {};
    mobileNavCopyPhone = {};
    mobileNavButton = {};
    mainNavContent = {};
    mobileNavButtonBar1 = {};
    mobileNavButtonBar2 = {};
    mobileNavButtonBar3 = {};
    buttonAnimation = {};
    mobileNavIsOpen = false;

    init(){
        // console.log("nav init");
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
    constructor(){}

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
}

class StepsController{
    constructor(){}

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
        let d = 0;
        if(delay){ d = delay }
        if(next === 1 && last === 0){
            // console.log("GO TO STEP 2");
            this.stepTwo.play().delay(1.5);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 2 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }else if(next === 2 && last === 1){
            // console.log("GO TO STEP 3");
            this.stepThree.play().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 3 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }else if(next === 3 && last === 2){
            // console.log("GO TO STEP 4");
            this.stepFour.play().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 4 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }else if(next === 2 && last === 3){
            // console.log("BACK TO STEP 3");
            this.stepFour.reverse().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 3 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }else if(next === 1 && last === 2){
            // console.log("BACK TO STEP 2");
            this.stepThree.reverse().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 2 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }else if(next === 0 && last === 1){
            // console.log("BACK TO STEP 1");
            this.stepTwo.reverse().delay(d);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 1 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }
    }

    show(animate, delay){
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
    constructor(){}

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

    enableNav(){
        this.nextButton.addEventListener("click", this.clickHandler);
        this.backButton.addEventListener("click", this.clickHandler);
    }

	disableNav(){
        this.nextButton.removeEventListener("click", this.clickHandler);
        this.backButton.removeEventListener("click", this.clickHandler);
	}

    clickHandler(event){
        controller.clickHandler(event)
    }
}

class CheckMark{
    constructor(){}

    checkMark = {};
    icon = {};
    mask = {};
    background = {};

    init(check, icon, mask, background){
        this.checkMark = check;
        this.icon = icon;
        this.mask = mask;
        this.background = background;
        
        gsap.set(this.mask, {autoAlpha:0});
        gsap.set(this.icon, {autoAlpha:0});
        gsap.set(this.background, {x:24, y:24});
        gsap.set(this.background, {width:0, height:0});
    }

    show(delay){
        let d = 0;
        if(delay){
            d = delay;
        }
        gsap.to(this.background, {width:48, height:48, x:0, y:0, duration:.5, delay:d, ease:"power2.inOut"});
        gsap.set(this.mask, {autoAlpha:1, delay:d+.5});
        gsap.set(this.icon, {autoAlpha:1, delay:d+.5});
        gsap.to(this.mask, {width:0, height:0, x:42, y:10, duration:.7, delay:d+.7, ease:"power2.inOut"});
    }
}


class View{
    constructor(){}

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
        // console.log(this.name);
        this.steps.push(document.getElementById("step-one"));
        this.steps.push(document.getElementById("step-two"));
        this.steps.push(document.getElementById("step-three"));
        this.steps.push(document.getElementById("step-four"));
                
        for(let i=0; i<this.steps.length; i++){
            this.steps[i].customHeight = gsap.getProperty(this.steps[i], "offsetHeight");
            this.steps[i].customPaddingTop = gsap.getProperty(this.steps[i], "paddingTop");
            this.steps[i].customPaddingBottom = gsap.getProperty(this.steps[i], "paddingBottom");
            this.steps[i].customMarginTop = gsap.getProperty(this.steps[i], "marginTop");
            this.steps[i].customMarginBottom = gsap.getProperty(this.steps[i], "marginBottom");
        }

        this.interuptors.push(document.getElementById("varify"));
        this.interuptors.push(document.getElementById("no-varify"));
        this.interuptors.push(document.getElementById("sso-varify"));
        this.interuptors.push(document.getElementById("no-varify-confirm"));
        
        for(let i=0; i<this.steps.length; i++){
            this.interuptors[i].customHeight = gsap.getProperty(this.interuptors[i], "offsetHeight");
            this.interuptors[i].customPaddingTop = gsap.getProperty(this.interuptors[i], "paddingTop");
            this.interuptors[i].customPaddingBottom = gsap.getProperty(this.interuptors[i], "paddingBottom");
            this.interuptors[i].customMarginTop = gsap.getProperty(this.interuptors[i], "marginTop");
            this.interuptors[i].customMarginBottom = gsap.getProperty(this.interuptors[i], "marginBottom");
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

    update(delay){
        let d = 0;
        if(delay){ d = delay}

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        let current  = controller.getCurrentStep();
        let next  = controller.getNextStep();

        if(current === 0 && next === 0){
            // console.log("show the landing page");
            overlay.show(true, 0, true);
            this.grow(.25, .75);
            this.show(.75);
        } else if (current === 0 && next === 1){
            // console.log("show the second section");
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
                stepsController.update(next, current, 1);
            }
        } else if (current === 1 && next === 2){
            // console.log("show the third section");
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
            // console.log("show the fourth section");
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
            // console.log("go to the dashboard");
            window.location = "dashboard.html";
        }
        else if (current === 3 && next === 2){
            // console.log("show the third section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(next, current, 1);
            gsap.set("#next-button", {text:"Next"});
        } else if (current === 2 && next === 1){
            // console.log("show the second section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(next, current, 1);
        } else if (current === 1 && next === 0){
            // console.log("show the landing page");
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
        // console.log("update Interuptor called");
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

        if(controller.varifyOutcome === 1){
            // show the no varify screen
            let target = this.interuptors[1];
            let h = this.interuptors[1].customHeight+180;
            this.varifyAnimation.set("#varify", {autoAlpha:0, display:"none"});
            overlay.show(true, 3, true);
            this.growInterruptor(target, 3, .5);
            this.showInterruptor(target, 3.5, .75);
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
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {autoAlpha:1, duration:dur, delay:d, ease:"power2.inOut"});
    }

    hideInterruptor(target, delay, duration){
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
        let target = this.interuptors[3];
        this.hideInterruptor(target, 0, .75);
        this.shrinkInterruptor(target, .5, .5);
        this.update(1);
    }

    exitSSOVarify(){
        let target = this.interuptors[2];
        this.hideInterruptor(target, 0, .75);
        this.shrinkInterruptor(target, .5, .5);
        this.update(1);
    }
    

    show(delay, duration){
        let target  = this.steps[controller.getNextStep()];
        let d = 0;
        let dur = .5;
        if(delay){
            d = delay;
        }
        if(duration){
            dur = duration;
        }
        gsap.to(target, {autoAlpha:1, duration:dur, delay:d, ease:"power2.inOut"});
    }

    hide(delay, duration){
        let target  = this.steps[controller.getCurrentStep()];
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
        let target  = this.steps[controller.getNextStep()];
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
        let target  = this.steps[controller.getCurrentStep()];
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

class Controller {

    constructor(){}

    steps = [];
    currentStep = null;
    nextStep = null;

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
        // console.log(this.name);
        this.setCurrentStep(0);
        this.setNextStep(0);
        this.enableButtons();
        this.enableVarifyOutcomeButtons();
    }

    enableButtons(){
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

    // This is a helper function just for the demo
    // it allows you to click on the steps to change 
    // the varification outcome by setting a variable
    varifyOutcomeClickHandler(event){
        let target = event.currentTarget; 
        if(target.id === "step-dot-one"){
            // console.log("VARIFY ONE");
            this.varifyOutcome = 1;
        }
        else if(target.id === "step-dot-two"){
            // console.log("VARIFY TWO");
            this.varifyOutcome = 2;
        }
        else if(target.id === "step-dot-three"){
            // console.log("VARIFY THREE");
            this.varifyOutcome = 3;
        }
    }

    clickHandler(event){
        controller.routeClick(event);
    }

    routeClick(event){
        let target = event.currentTarget; 
        if(target.id === "next-button"){
            // console.log("NEXT BUTTON");
            this.stepUp();
        }
        else if(target.id === "back-button"){
            // console.log("BACK BUTTON");
            this.stepDown();
        }
        else if (target.id === "sign-up-button"){
            // console.log("SIGN UP BUTTON");
            this.stepUp();
        }
        else if (target.id === "no-varify-button"){
            // console.log("NO VARIFY BUTTON");
            view.showNoVarifyConfirm();
            return;
        }
        else if (target.id === "no-varify-confirm-button"){
            // console.log("NO VARIFY CONFIRM BUTTON");
            view.exitNoVarify();
            return;
        }
        else if (target.id === "sso-varify-button"){
            // console.log("SSO VARIFY BUTTON");
            view.exitSSOVarify();
            return;
        }
        
        // if the next step is where the interuptor is supposed to 
        // interupt the flow and simulate an api call it re-routs 
        // the flow here
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
        this.nextStep = step;
        return this.nextStep;
    }
    stepUp(){
        let current = this.getNextStep();
        if(this.getCurrentStep() === view.steps.length-1){
            // console.log("reached the pos end");
            return;
        } else {
            this.setCurrentStep(current);
            let next = current;
            this.setNextStep(++next);
        }
    }
    stepDown(){
        if(this.getNextStep() === 0 || this.getNextStep() === 0){
            // console.log("reached the neg end");
            return;
        } else {
            let current = this.getNextStep();
            this.setCurrentStep(current);
            let next = current;
            this.setNextStep(--next);
        }
    }

}


// Set the classes to constant variables so they basically become
// singletons and ensure there are no two competing classes
const signUpNav = new SignUpNav();
const overlay = new OverlayController();
const view = new View();
const controller = new Controller();
const stepsController = new StepsController();
const buttonsController = new ButtonsController();
const noVarifyCheckmark = new CheckMark();

// INITIALIZE THE START OF THE JAVASCRIPT
function init(){
    signUpNav.init();
    stepsController.init();
    buttonsController.init();
    overlay.init();

    let check = document.getElementById("no-varify-confirm-checkmark");
    let icon = document.getElementById("no-varify-confirm-checkmark-icon");
    let mask = document.getElementById("no-varify-confirm-checkmark-mask");
    let background = document.getElementById("no-varify-confirm-checkmark-bg");
    noVarifyCheckmark.init(check, icon, mask, background);

    controller.init();
    view.init();
}









// set the listeners on the content load callback, then tie it to the function and set the callback to fire when the event bubbles up
document.addEventListener( "DOMContentLoaded" , init , false ) ;
