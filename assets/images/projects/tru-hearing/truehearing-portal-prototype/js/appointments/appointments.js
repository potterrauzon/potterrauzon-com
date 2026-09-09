gsap.registerPlugin(TextPlugin);

class StepsController{
    constructor(){}

    name = "STEPS CONROLLER CLASS";

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

    showing = false;

    get name(){ return this.name;}

    get showing(){ return this.showing;}

    set showing(flag){ this.showing = flag;}

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

    update(next, last, delay){
        let d = 0;
        if(delay){ d = delay }
        if(next === 0 && last === 0){
            // console.log("GO TO STEP 1");
        }
        else if(next === 1 && last === 0){
            // console.log("GO TO STEP 2");
            this.stepTwo.play().delay(1.5);
            gsap.to(".steps-counter", {autoAlpha:0, duration:.75, delay:1, ease:"power2.in"});
            gsap.set(".steps-counter", {text:"Step 2 of 4", delay:2});
            gsap.to(".steps-counter", {autoAlpha:1, duration:.75, delay:2, ease:"power2.out"});
        }
        else if(next === 2 && last === 1){
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

    get height(){
        return this.stepsContainer.customHeight;
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
            gsap.to(this.stepsContainer, {height:"0px", duration:dur, delay:d, ease:"power2.inOut"});
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
        this.buttonsContainer = document.getElementById("schedule-steps-buttons");
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
        // console.log("ENABLE NAV");
        this.nextButton.addEventListener("click", this.clickHandler);
        this.backButton.addEventListener("click", this.clickHandler);
    }

	disableNav(){
        // console.log("DISABLE NAV");
        this.nextButton.removeEventListener("click", this.clickHandler);
        this.backButton.removeEventListener("click", this.clickHandler);
	}

    clickHandler(event){
        // console.log("CLICK "+event.currentTarget.id);
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

class AppointmentsView{
    constructor(){}

    name = "APPOINTMENTS VIEW CLASS";
    
    steps = [];
    scheduleMain = {};
    stepOne = {};
    stepTwo = {};
    stepThree = {};
    stepFour = {};
    stepFour = {};
    scheduleConfirm = {};

    stepsShouldShow = false;
    isStepsVisible = false;
    buttonsShouldShow = false;
    isStepsButtonsVisible = false;
    
    get name(){ return this.name;}

    init(){
        // console.log(this.name);
        this.scheduleMain = document.getElementById("schedule-main");
        this.steps.push(this.scheduleMain);
        this.stepOne = document.getElementById("schedule-step-one");
        this.steps.push(this.stepOne);
        this.stepTwo = document.getElementById("schedule-step-two");
        this.steps.push(this.stepTwo);
        this.stepThree = document.getElementById("schedule-step-three");
        this.steps.push(this.stepThree);
        this.stepFour = document.getElementById("schedule-step-four");
        this.steps.push(this.stepFour);
        this.scheduleConfirm = document.getElementById("schedule-confirm");
        this.steps.push(this.scheduleConfirm);
        
        for(let i=0; i<this.steps.length; i++){
            this.steps[i].customHeight = gsap.getProperty(this.steps[i], "offsetHeight");
            this.steps[i].customPaddingTop = gsap.getProperty(this.steps[i], "paddingTop");
            this.steps[i].customPaddingBottom = gsap.getProperty(this.steps[i], "paddingBottom");
            this.steps[i].customMarginTop = gsap.getProperty(this.steps[i], "marginTop");
            this.steps[i].customMarginBottom = gsap.getProperty(this.steps[i], "marginBottom");
        }
        
        this.hideEverything();
    }

    hideEverything(){
        for(let i=0; i<this.steps.length; i++){
            gsap.set(this.steps[i], {autoAlpha:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
        }
    }

    setUp(){
        this.update();
    }

    update(){
        window.scrollTo({ top: 280, behavior: 'smooth' });
        
        let current  = controller.getCurrentStep();
        let next  = controller.getNextStep();

        let currentStep = current-1;
        let nextStep = next-1;
            
        if(current === 0 && next === 0){
            // console.log("show the landing page");
            this.grow(.25, .75);
            this.show(.75);
        } else if (current === 0 && next === 1){
            // console.log("show the first section");
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
        } else if (current === 1 && next === 2){
            // console.log("show the second section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(nextStep, currentStep, 1);
        } else if (current === 2 && next === 3){
            // console.log("show the third section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(nextStep, currentStep, 1);
        } else if (current === 3 && next === 4){
            // console.log("show the fourth section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(nextStep, currentStep, 1);
        } else if (current === 4 && next === 5){
            // console.log("show the success section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            buttonsController.shrink(.25);
            buttonsController.hide(.5);
            stepsController.shrink(.25);
            stepsController.hide(.5);
            apptConfirmCheckmark.show(1);
        } else if (current === 5 && next === 4){
            // console.log("show the fourth section");
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
                stepsController.update(nextStep, currentStep, 1);
            }
        } else if (current === 4 && next === 3){
            console.log("show the third section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(nextStep, currentStep, 1);
        } else if (current === 3 && next === 2){
            // console.log("show the second section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(nextStep, currentStep, 1);
        } else if (current === 2 && next === 1){
            // console.log("show the first section");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            stepsController.update(nextStep, currentStep, 1);
        } else if (current === 1 && next === 0){
            // console.log("show the landing page");
            this.hide(0,.25);
            this.shrink(.25);
            this.grow(.25);
            this.show(.5);
            buttonsController.shrink(.25);
            buttonsController.hide(.5);
            stepsController.shrink(.25);
            stepsController.hide(.5);
        } 
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
}

class AppointmentsController {
    constructor(){}

    steps = [];
    currentStep = null;
    nextStep = null;
    scheduleApptButton = {};

    name = "APPOINTMENTS CONTROLLER CLASS";
    get name(){ return this.name;}

    init(){
        // console.log(this.name);
        this.scheduleApptButton = document.getElementById("schedule-submit-form-button");
        this.setCurrentStep(0);
        this.setNextStep(0);
        this.enableScheduleButton();
    }

    enableScheduleButton(){
        this.scheduleApptButton.addEventListener("click", this.clickHandler);
        gsap.set(this.scheduleApptButton, {css:{cursor:"pointer"}});
    }

    clickHandler(event){
        controller.routeClick(event);
    }

    // This is for button click handling only. 
    // There needs to be another workflow for intiruptors that would simulate api handling. 
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
        else if (target.id === "schedule-submit-form-button"){
            this.stepUp();
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


// const signUpNav = new SignUpNav();
const stepsController = new StepsController();
const buttonsController = new ButtonsController();
const apptConfirmCheckmark = new CheckMark();

const view = new AppointmentsView();
const controller = new AppointmentsController();


// INITIALIZE THE START OF THE JAVASCRIPT
function init(){
    console.log("init happened");

    stepsController.init();
    buttonsController.init();

    let check = document.getElementById("appointment-confirm-checkmark");
    let icon = document.getElementById("appointment-confirm-checkmark-icon");
    let mask = document.getElementById("appointment-confirm-checkmark-mask");
    let background = document.getElementById("appointment-confirm-checkmark-bg");
    apptConfirmCheckmark.init(check, icon, mask, background);
    
    view.init();
    controller.init();
    view.setUp();
}









// set the listeners on the content load callback, then tie it to the function and set the callback to fire when the event bubbles up
document.addEventListener( "DOMContentLoaded" , init , false ) ;
