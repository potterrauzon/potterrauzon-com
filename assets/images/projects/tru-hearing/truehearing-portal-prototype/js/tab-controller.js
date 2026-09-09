gsap.registerPlugin(TextPlugin);

class TabController{
    constructor(){}

    tabPersonal = {};
    tabDetails = {};

    contentContainer = {};
    personalContent = {};
    personalContentContainer = {};
    detailsContent = {};
    detailsContentContainer = {};

    init(){
        this.tabPersonal = document.getElementById("tab-personal");
        this.tabDetails = document.getElementById("tab-details");   

        this.tabPersonal.addEventListener("click", this.clickHandler.bind(this));
        gsap.set(this.tabPersonal, {css:{cursor:"pointer"}});
        this.tabDetails.addEventListener("click", this.clickHandler.bind(this));
        gsap.set(this.tabDetails, {css:{cursor:"pointer"}});
        
        this.contentContainer = document.getElementById("account-tabbed-content");
        this.personalContent = document.getElementById("personal-content");
        this.personalContent.contentHeight = gsap.getProperty(this.personalContent, "offsetHeight");
        this.detailsContent = document.getElementById("details-content");
        this.detailsContent.contentHeight = gsap.getProperty(this.detailsContent, "offsetHeight");
        this.detailsContentContainer = document.getElementById("details-content-container");
        this.personalContentContainer = document.getElementById("personal-content-container");
        
        gsap.set(this.contentContainer, {height:this.personalContent.contentHeight});
        gsap.set(this.detailsContentContainer, {height:0});
        gsap.set(this.detailsContent, {x:610});
    }

    clickHandler(event){
        if(event.currentTarget.id === "tab-details"){
            gsap.to(this.personalContent, {x:-620, duration:.5, ease:"expo.out"});
            gsap.to(this.detailsContent, {x:0, duration:.5, ease:"expo.out"});
            this.tabDetails.classList.add("active");
            this.tabPersonal.classList.remove("active");
            gsap.set(this.contentContainer, {height:this.detailsContent.contentHeight});
            gsap.set(this.personalContentContainer, {height:this.detailsContent.contentHeight});
            gsap.set(this.detailsContentContainer, {height:this.detailsContent.contentHeight});
        }
        else if (event.currentTarget.id === "tab-personal"){
            gsap.to(this.personalContent, {x:0, duration:.5, ease:"expo.out"});
            gsap.to(this.detailsContent, {x:620, duration:.5, ease:"expo.out"});
            this.tabPersonal.classList.add("active");
            this.tabDetails.classList.remove("active");
            gsap.set(this.contentContainer, {height:this.personalContent.contentHeight});
            gsap.set(this.detailsContentContainer, {height:0});
        }
    }
}

const tabController = new TabController();

// INITIALIZE THE START OF THE JAVASCRIPT
function init(){
    // console.log("init happened");
    tabController.init();
}




// set the listeners on the content load callback, then tie it 
// to the function and set the callback to fire when the event 
// bubbles up
document.addEventListener( "DOMContentLoaded" , init , false ) ;
