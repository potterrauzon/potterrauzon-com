gsap.registerPlugin(TextPlugin);

class FAQSet{
    constructor(){}

    name = "FAQ SET CLASS"
    
    faqs = [];

    get (){ return this.name }

    init(elements){
        this.faqs  = elements; 
        for(let i=0; i<this.faqs.length; i++){
            this.faqs[i].arrow = this.faqs[i].querySelector(".faq-down-arrow");
            this.faqs[i].content = this.faqs[i].querySelector(".faq-body");
            gsap.set(this.faqs[i].content, {display:"block"});
            this.faqs[i].contentHeight = gsap.getProperty(this.faqs[i].content, "offsetHeight");
            this.faqs[i].closed = true;
            this.faqs[i].addEventListener("click", this.clickHandler.bind(this));
            gsap.set(this.faqs[i], {css:{cursor:"pointer"}});
            gsap.set(this.faqs[i].content, {height:0, autoAlpha:0});
        }
    }

    clickHandler(event){    
        // console.log(this.name);
        if(event.currentTarget.closed){
            this.open(event.currentTarget);
        } else {
            this.close(event.currentTarget);
        }
    }

    open(element){
        gsap.killTweensOf(element.content);
        gsap.to(element.content, {height:element.contentHeight, duration:.5, ease:"expo.out"})
        gsap.to(element.content, {autoAlpha:1, duration:.7, ease:"expo.out"})
        element.closed = false;
    }

    close(element){
        gsap.killTweensOf(element.content);
        gsap.to(element.content, {autoAlpha:0, duration:.2, ease:"expo.out"})
        gsap.to(element.content, {height:0, duration:.7, ease:"expo.out"})
        element.closed = true;
    }
}


const faqs = new FAQSet();

// INITIALIZE THE START OF THE JAVASCRIPT
function init(){
    // console.log("init happened");
    let elements = document.getElementsByClassName("faq-item");
    faqs.init(elements);
}



// set the listeners on the content load callback, then tie it to the function and set the callback to fire when the event bubbles up
document.addEventListener( "DOMContentLoaded" , init , false ) ;
