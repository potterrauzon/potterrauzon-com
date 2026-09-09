class Navigation {
	constructor(){

	}
	
	name = "NAVIGATION CLASS";
	inited = false;
	mainNavContainer = {};
	headerContainer = {};
	mainNavItems = [];
	clickable = [];
	backButton = {};
	activeBar = {};
	
	init(main, back, clickables){
		this.initHeaderNav();
		this.initMainNav(main);
		this.initBackButton(back);
		this.initClickableElements(clickables);

		this.enableNav();
	}
	
	//nav.initMainNav(document.getElementsByClassName("nav-item");)
	initMainNav(items){
		for(let i=0; i<items.length; i++){
			let obj = {
				name: items[i].id,
				element:items[i],
			};
			/*console.log("ITEMS "+ items[i].id)*/
			gsap.set(items[i], {css:{cursor:"pointer"}});
			this.mainNavItems.push(obj);

			let ele = gsap.utils.selector(items[i]);
			let  redIcon = ele(".ni-icon-red");
			let active = ele(".ni-text-active");
			gsap.set(redIcon, {autoAlpha:0});
			gsap.set(active, {autoAlpha:0});
			
		}
		let ele = document.getElementById("nav-active-bar");
		this.activeBar["element"] = ele;
		this.activeBar["name"] = ele.id;
		this.mainNavContainer = document.getElementById("nav-container");
		gsap.set(this.activeBar.element, {x:this.mainNavItems[0].element.offsetLeft});
		let t = gsap.utils.selector(this.mainNavItems[0].element);
		
	}

	initBackButton(item){

		this.backButton = {
			name:item.id,
			element:item,
		}
		view.hideBackButton();
	}

	//document.getElementsByClassName("navigation");
	initClickableElements(clickables){
		this.clickable = clickables;
		for(let i=0; i<this.clickable.length; i++){
			gsap.set(this.clickable[i], {css:{cursor:"pointer"}});
		}
	}

	enableNav(){
		for(let i=0; i<this.clickable.length; i++){
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

	getHeaderNavObj(){
		return this.headerContainer;
	}

	getMainNavObj(){
		return this.mainNavContainer;
	}

	getBackButtonObj(){
		return this.backButton.element;
	}

	getActiveBarObj(){
		return this.activeBar.element;
	}

	initHeaderNav(){
		this.headerContainer = document.getElementById("header-container");
		
		gsap.to("#back-arrow-white", {autoAlpha:0, duration:.5, ease:"expo.inOut"});
		gsap.to("#adobe-logo-white", {autoAlpha:0, duration:.5, ease:"expo.inOut"});
		gsap.to("#back-arrow-black", {autoAlpha:1, duration:.5, ease:"expo.inOut"});
		gsap.to("#adobe-logo-red", {autoAlpha:1, duration:.5, ease:"expo.inOut"});
	}

	clickHandler(event){
		view.movePage(pages.getTargetPage(event.currentTarget));
	}
}



class Pages {
	constructor(){
		
	}

	name = "PAGES CLASS";
	init = false;
	pages = [];

	nextPage = null; // string
	currentPage = null; // string
	pageStack = []; //strings

	initPages(p){
		for (let i = 0; i < p.length; i++){
			let page = {};
	        page.name = p[i].id;
	        page.element = p[i];

	        if(p[i].getAttribute("is-base") === "true"){
	        	page["isBase"] = true;

	        } else {
	        	page["isBase"] = false;
	        }
	        if(p[i].getAttribute("is-animated") === "true"){
	        	page["isAnimated"] = true;

	        } else {
	        	page["isAnimated"] = false;
	        }
	        this.pages.push(page);
	    }	
    	this.init = true;
	}
	
	getAllPages(){
		return this.pages;
	}

	getPageObj(pageName){
		for (let i = 0; i < this.pages.length; i++){
			if(pageName === this.pages[i].name){
				return this.pages[i].element;
			}
    	}
	}

	getPage(pageName){
		for (let i = 0; i < this.pages.length; i++){
			if(pageName === this.pages[i].name){
				return this.pages[i];
			}
    	}
	}

	setNextPage(page){
		if(this.currentPage === null){
			this.currentPage = page;
			return;
		}
		if(page === this.currentPage && page != "back-button"){
			return;
		}

		for (let i = 0; i < this.pages.length; i++){
			if(page === this.pages[i].name){
				if(this.pages[i].isBase){
					this.pageStack = [];
					this.nextPage = page;
					return;
				}else{
					this.pageStack.push(this.currentPage);
					this.nextPage = page;
					return;
				}
			} 
		}
		this.nextPage = this.pageStack.pop();
	}

	getNextPage(){
		return this.nextPage;
	}

	getCurrentPage(){
		return this.currentPage;
	}

	setCurrentPage(page){
		this.currentPage = page;
	}

	getTargetPage(clickedPage){
		return clickedPage.getAttribute("target-page");
	}

	getPageStack(){
		return this.pageStack;
	}

	getIsBasePage(page){
		return this.getPage(page).isBase;
	}

	getIsAnimatedPage(page){
		return this.getPage(page).isAnimated;
	}
}















class View {

	constructor(){

	}

	name = "VIEW CLASS";

	header = {};
	main = {};
	appWidth = null;
	appHeight = null;
	isTransitioning = false;

	initView(){
		this.appWidth = window.innerWidth;
		this.appHeight = window.innerHeight;

		let h = {};
		h.name = "header";
		h.element = document.querySelector("#header-container");
		this.header = h;

		let m = {};
		m.name = "main";
		m.element = document.querySelector("#nav-container");
	}

	updateView(pages){
		/*console.log("PAGES LENGTH "+pages);*/
		this.appWidth = window.innerWidth;

		this.appHeight = window.innerHeight;

		for (let i = 0; i < pages.length; i++){
	        gsap.set(pages[i].element, {x:this.appWidth});
	        // set the position to fixed so they stack on top of each other
	        gsap.set(pages[i].element, {css:{position:"fixed"}});
	        /*gsap.set(pages[i].element, {zIndex:i*10});*/
	        // set the width of the div to the width of the screen.
	        gsap.set(pages[i].element, {css:{width:this.appWidth}});
	    }
	    window.scrollTo(0, 0);
	}

	setPageInView(pageObj){
		gsap.set(pageObj, {x:0});
    	gsap.set(pageObj, {css:{position:"relative"}});
	}

	movePage(target){
		console.log("TARGET "+target);
		// Already on this page — ignore so the page order isn't corrupted.
		if(target === pages.getCurrentPage()){
			return;
		}
		// A transition is already running. Guards every entry point (including
		// alert buttons, whose listeners aren't removed by disableNav) so a
		// second navigation can't restart tweens or double-push the page stack.
		if(this.isTransitioning){
			return;
		}
		// Nothing to go back to — popping an empty stack would navigate to undefined.
		if(target === "back-button" && pages.getPageStack().length === 0){
			return;
		}
		this.isTransitioning = true;
		nav.disableNav();
		gsap.killTweensOf(nav.getBackButtonObj());

		if(target === "back-button"){
			console.log("-------BACK BUTTON-------");
			pages.setNextPage(target);
			// Returning to a base page: fade the arrow out as the header starts
			// animating out. Still on a sub page: keep the arrow visible.
			if(pages.getIsBasePage(pages.getNextPage())){
				gsap.to(nav.getBackButtonObj(), {autoAlpha:0, duration:.4, ease:"power2.in"});
			} else {
				this.showBackButton();
			}
			handlePageMove("back");
			this.handleMainNavSubPage();
			// PAGE HEADER ANIMATION 
			//pageHeader.move();
			gsap.set(pages.getPageObj(pages.getNextPage()), {x:0-view.getAppWidth()});
			gsap.set(pages.getPageObj(pages.getNextPage()), {css:{position:"fixed"}});
			gsap.to(pages.getPageObj(pages.getNextPage()), {duration:1, x:0, ease:"expo.inOut", onComplete:this.movePageOnComplete});
			gsap.to(pages.getPageObj(pages.getCurrentPage()), {duration:1, x:view.getAppWidth(), ease:"expo.inOut"});

		} else if (pages.getIsBasePage(target)){
			console.log("---------IS BASE---------");
			// Fade the arrow out as the header starts animating out.
			gsap.to(nav.getBackButtonObj(), {autoAlpha:0, duration:.4, ease:"power2.in"});
			pages.setNextPage(target);
			handlePageMove("base");
			this.handleMainNavSubPage();
			// PAGE HEADER ANIMATION 
			//pageHeader.move();
			gsap.set(pages.getPageObj(pages.getNextPage()), {x:view.getAppWidth()});
			gsap.set(pages.getPageObj(pages.getNextPage()), {css:{position:"fixed"}});
			gsap.to(pages.getPageObj(pages.getNextPage()), {duration:1, x:0, ease:"expo.inOut", onComplete:this.movePageOnComplete});
			gsap.to(pages.getPageObj(pages.getCurrentPage()), {duration:1, x:0-view.getAppWidth(), ease:"expo.inOut"});
		} else {
			console.log("-------IS SUB PAGE-------");
			// Fade the arrow in after the sub-page header has animated down.
			gsap.to(nav.getBackButtonObj(), {autoAlpha:1, duration:.4, ease:"power2.out", delay:.7});

			pages.setNextPage(target);

			handlePageMove("sub");
			
			this.handleMainNavSubPage();
			// PAGE HEADER ANIMATION 
			//pageHeader.move();
			gsap.set(pages.getPageObj(pages.getNextPage()), {x:view.getAppWidth()});
			gsap.set(pages.getPageObj(pages.getNextPage()), {css:{position:"fixed"}});
			gsap.to(pages.getPageObj(pages.getNextPage()), {duration:1, x:0, ease:"expo.inOut", onComplete:this.movePageOnComplete});
			gsap.to(pages.getPageObj(pages.getCurrentPage()), {duration:1, x:0-view.getAppWidth(), ease:"expo.inOut"});
		}
	}

	movePageOnComplete(){
		// if the current page is not a base level page, add it to the last pages array
		//currentPage = pages.getPageObj(pages.getNextPage());
		/*console.log("CURRENT PAGE "+pages.getCurrentPage());
		console.log("NEXT PAGE "+pages.getNextPage());*/
		
		pages.setCurrentPage(pages.getNextPage());
		let p = pages.getAllPages();	
		for (let i = 0; i < p.length; i++){
			/*console.log("LOOP "+p[i].name);*/
			gsap.set(p[i].element, {css:{position:"fixed"}});
	        gsap.set(p[i].element, {css:{width:view.getAppWidth()}});
	    }
	    window.scrollTo(0, 0);
	    
		gsap.set(pages.getPageObj(pages.getCurrentPage()), {css:{position:"relative"}});
		// if there are no more pages in the stack, reset 
		
		if (pages.getPageStack().length === 0){
			view.hideBackButton();
		}
		view.isTransitioning = false;
		nav.enableNav();
	}

	handleMainNavSubPage(){
		// GSAP doesn't overwrite by default, so an older highlight tween still
		// running would fight the sets/tweens below and can leave two nav items
		// active at once. Stop them all before animating the new state.
		for (let i = 0; i < nav.mainNavItems.length; i++){
			let t = gsap.utils.selector(nav.mainNavItems[i].element);
			gsap.killTweensOf(t(".ni-icon-red"));
			gsap.killTweensOf(t(".ni-icon-gray"));
			gsap.killTweensOf(t(".ni-text"));
			gsap.killTweensOf(t(".ni-text-active"));
		}
		gsap.killTweensOf(nav.getActiveBarObj());

		if(pages.getIsBasePage(pages.getNextPage())){
			let np = pages.getNextPage();
			let ni = nav.mainNavItems.slice();
			for (let i = 0; i < ni.length; i++){
				if(ni[i].name.includes(np)){
					let target = gsap.utils.selector(ni[i].element);
					gsap.to(target(".ni-text"), {autoAlpha:0, duration:.5, ease:"expo.out"});
					gsap.to(target(".ni-text-active"), {autoAlpha:1, duration:.5, ease:"expo.in"});
					gsap.to(target(".ni-icon-gray"), {autoAlpha:0, duration:.5, ease:"expo.inOut"});
					gsap.to(target(".ni-icon-red"), {autoAlpha:1, duration:.5, ease:"expo.inOut"});
					gsap.to(nav.activeBar.element, {duration:1, x:ni[i].element.offsetLeft, ease:"expo.out"});
					ni.splice(i, 1);
				}
			}
			for (let i = 0; i < ni.length; i++){
				let target = gsap.utils.selector(ni[i].element);
				gsap.set(target(".ni-icon-red"), {autoAlpha:0});
				gsap.set(target(".ni-icon-gray"), {autoAlpha:1});
				gsap.to(target(".ni-text-active"), {autoAlpha:0, duration:.5, ease:"expo.inOut"});
				gsap.to(target(".ni-text"), {autoAlpha:1, duration:.5, ease:"expo.inOut"});
			}
		}else{
			gsap.to(nav.getActiveBarObj(), {duration:1, x:0-nav.getActiveBarObj().offsetWidth, ease:"expo.out"});
			let ni = nav.mainNavItems.slice();
			for (let i = 0; i < ni.length; i++){
					let target = gsap.utils.selector(ni[i].element);
					gsap.set(target(".ni-icon-red"), {autoAlpha:0});
					gsap.set(target(".ni-icon-gray"), {autoAlpha:1});
					gsap.to(target(".ni-text-active"), {autoAlpha:0, duration:.5, ease:"expo.inOut"});
					gsap.to(target(".ni-text"), {autoAlpha:1, duration:.5, ease:"expo.inOut"});
			}
		}
	}



	
	showHeaderNav(){
		gsap.set(nav.getHeaderNavObj(), {autoAlpha:1});
	}

	hideHeaderNav(){
		gsap.set(nav.getHeaderNavObj(), {autoAlpha:0});
	}

	whiteHeaderNav(flag){

		/*let baw = nav.getHeaderNavObj().querySelector("#back-arrow-white");
		let alw = nav.getHeaderNavObj().querySelector("#adobe-logo-white");
		let bag = nav.getHeaderNavObj().querySelector("##back-arrow-gray");
		let alr = nav.getHeaderNavObj().querySelector("#back-arrow-red");
		
		console.log("BAW "+baw.id);*/
		
		if (flag){
			gsap.to("#back-arrow-white", {autoAlpha:1, duration:.5, ease:"expo.inOut"});
			gsap.to("#adobe-logo-white", {autoAlpha:1, duration:.5, ease:"expo.inOut"});
			gsap.to("#back-arrow-black", {autoAlpha:0, duration:.5, ease:"expo.inOut"});
			gsap.to("#adobe-logo-red", {autoAlpha:0, duration:.5, ease:"expo.inOut"});

		} else {
			gsap.to("#back-arrow-white", {autoAlpha:0, duration:.5, ease:"expo.inOut"});
			gsap.to("#adobe-logo-white", {autoAlpha:0, duration:.5, ease:"expo.inOut"});
			gsap.to("#back-arrow-black", {autoAlpha:1, duration:.5, ease:"expo.inOut"});
			gsap.to("#adobe-logo-red", {autoAlpha:1, duration:.5, ease:"expo.inOut"});
		}
	}

	showHeaderBG(flag){
		if (flag){
			gsap.to("#header-bg", {autoAlpha:1, duration:.5, ease:"expo.inOut"});
		}else{
			gsap.to("#header-bg", {autoAlpha:0, duration:.5, ease:"expo.inOut"});
		}
	}

	showMainNav(){
		gsap.set(nav.getMainNavObj(), {autoAlpha:1});
	}

	hideMainNav(){
		gsap.set(nav.getMainNavObj(), {autoAlpha:0});
	}

	showBackButton(){
		gsap.set(nav.getBackButtonObj(), {autoAlpha:1});
	}

	hideBackButton(){
		gsap.set(nav.getBackButtonObj(), {autoAlpha:0});
	}

	getAppWidth(){
		return this.appWidth;
	}

	getAppHeight(){
		return this.appHeight;
	}

	getZIndex(ele){
		let z = window.getComputedStyle(ele).getPropertyValue('z-index');
		//if (isNaN(z)) return this.getZIndex(ele.parentNode);
		return z;
	}

	setZIndex(ele, index){

		/*console.log("SET Z INDEX "+ index);*/
		gsap.set(ele, {zIndex:index});
		/*console.log("SET Z INDEX "+ this.getZIndex(ele));*/
		
	}
}





















































class Alert{
	constructor(ele){
		this.container = ele;
		this.init(ele);
	}
	name = "ALERT CLASS";
	container ={};
	closeButton = {};
	fadeOut = {};
	destination = "";

	init(ele){
		gsap.set(this.container, {autoAlpha:0});
	}

	get name(){ return this.name;}
	//attach the alert to an element (mostly for testing)
	// this could also be an array using the same UI object
	addCaller(ele){
		gsap.set(ele, {css:{cursor:"pointer"}});
    	ele.addEventListener("click", this.show.bind(this));
	}
	setCloseButton(ele){
		this.closeButton = ele;
		gsap.set(this.closeButton, {css:{cursor:"pointer"}});
    	this.closeButton.addEventListener("click", this.hide.bind(this));
	}

	// If there is a button on the alert 
	// must be have a target property: target-page="case-details"
	setTarget(ele){
		this.targetPage = ele;
		gsap.set(this.targetPage, {css:{cursor:"pointer"}});
		this.targetPage.addEventListener("click", this.clickHandler.bind(this));
	}

	// string
	setDestination(page){
		this.destination = page;
	}


	// need to pass in scope of this on event listeners
	show(event){
		/*console.log("show ");*/
		
		//fade out after 10 sec if not closed		
		this.fadeOut = gsap.delayedCall(7, this.hide.bind(this));
		gsap.to(this.container, {autoAlpha:1, y:"+=7", duration:.3, ease:"power2.in"});
	}

	// need to pass in scope of this on event listeners
	hide(event){
		/*console.log("hide");*/
		this.fadeOut.kill();
		gsap.to(this.container, {autoAlpha:0, y:"-=7", duration:.3, ease:"power2.in"});
	}

	// if there is a clickable button tie it to this handler
	clickHandler(event){
		/*console.log("current target "+event.currentTarget.id);
		console.log("current target page "+pages.getTargetPage(event.currentTarget));
		console.log("destination "+this.destination);*/
		
		this.fadeOut = gsap.delayedCall(2, this.hide.bind(this));
		// move the page 
		view.movePage(this.destination);
	}
}















class animatedPageHeader{
	constructor(){

	}

	name = "ANIMATED PAGE HEADER CLASS";
	animatedPages = [];
	notAnimatedPages = [];

	// full page, top header, or none (full, top, none)
	nextPageStyle = "";
	currentPageStyle = "";

	currentContent = null;
	nextContent = null;
	hideDelay = {};

	init(mainNav){

		let ni = mainNav.slice();
		for (let i = 0; i < ni.length; i++){

			if(ni[i].isAnimated){
				/*console.log("ANIMATED PAGE "+ni[i].name);*/
				if(ni[i].name === "start-chat-product"){
					ni[i]["isFull"] = true;
					/*console.log("ANIMATED PAGE IS FULL "+ni[i].name);*/
				}else if(ni[i].name === "open-case-product"){
					ni[i]["isFull"] = true;
					console.log("open case product FULL "+ni[i].name);
				}else{
					ni[i]["isFull"] = false;
					/*console.log("ANIMATED PAGE IS NOT FULL "+ni[i].name);*/
				}

				/*console.log("ANIMATED PAGE FLAG "+ni[i].isFull);*/
				this.animatedPages.push(ni[i]);
			}
		}
	}

	/*ANIMATED PAGE start-chat-product
script.js:674 ANIMATED PAGE start-chat-details
script.js:674 ANIMATED PAGE submit-feedback
script.js:674 ANIMATED PAGE open-case-product
script.js:674 ANIMATED PAGE open-case-details
script.js:674 ANIMATED PAGE case-details
script.js:674 ANIMATED PAGE status-details*/


	move(){
		console.log("---------------------");
		//console.log(this.name);
		//console.log("next page "+pages.getNextPage());
		//console.log("next page is base "+pages.getIsBasePage(pages.getNextPage()));
		//console.log("next page is animated "+pages.getIsAnimatedPage(pages.getNextPage()));
		//console.log("next page is full bg "+this.getIsPageFull(pages.getNextPage()));
		
		//console.log("-----");
		
		//console.log("current page "+pages.getCurrentPage());
		//console.log("current page is base "+pages.getIsBasePage(pages.getCurrentPage()));
		//console.log("current page is animated "+pages.getIsAnimatedPage(pages.getCurrentPage()));
		//console.log("---------------------");
		
		let next = pages.getNextPage();
		let nextBase = pages.getIsBasePage(pages.getNextPage());
		let nextAnimated = pages.getIsAnimatedPage(pages.getNextPage());
		let nextFull = this.getIsPageFull(pages.getNextPage());
		/*console.log("NEXT FULL "+nextFull+" | "+pages.getNextPage());*/
		
		let current = pages.getCurrentPage();
		let currentBase = pages.getIsBasePage(pages.getCurrentPage());
		let currentAnimated = pages.getIsAnimatedPage(pages.getCurrentPage());
		let currentFull = this.getIsPageFull(pages.getCurrentPage());
		
		if(!currentAnimated && nextFull){
			console.log("Animate from right to left | full");
			console.log("No content for chat");
			console.log("Show content for open case product");
			// LEFT OFF HERE
			if(current === "start-chat-product"){
				gsap.to("#abg-inner-container", {x:view.getAppHeight(), duration:1, ease:"expo.inOut"});
				
			} else {
				gsap.set("#animated-bg-container",{zIndex:90});
				gsap.set("#abg-inner-container",{x:view.getAppWidth()});
				gsap.set("#abg-inner-container",{y:0});
				gsap.to("#abg-inner-container", {x:0, duration:1, ease:"expo.inOut"});
			}
			view.whiteHeaderNav(false);



			this.showContent(next, 0);
		}

		if(currentAnimated && nextBase){
			console.log("Animate from right to left | base");
		}

		if(currentFull && nextAnimated){
			console.log("Move the background up");
			console.log("show content");
			console.log("chat details");
			console.log("case details");

			gsap.to("#toc-chat-container", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
			gsap.to("#abg-inner-container", {y:150-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
			gsap.set("#animated-bg-container",{zIndex:890, delay:1});

			view.whiteHeaderNav(true);
				

			this.showContent(next, 0);
		}

		if(currentAnimated && nextFull){
			console.log("Move the background down");

			gsap.to("#toc-chat-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
			gsap.to("#abg-inner-container", {y:0, duration:1, ease:"expo.inOut"});
			gsap.set("#animated-bg-container",{zIndex:90});
			view.whiteHeaderNav(false);
		}

		if(currentFull && !nextAnimated){
			console.log("Keep the bg where it is");
			console.log("Animate from left to right");
		}

		if(nextAnimated && !nextFull && !currentAnimated){
			console.log("Animate from top off screen to 150px");
			console.log("Show content ");
			console.log("case details ");
			console.log("status details");
			this.showContent(next, 0);

		}
		if(!currentFull && currentAnimated && !nextAnimated){
			console.log("next animated "+nextAnimated);
			console.log("Animate from 150px top off screen");
			console.log("Show content");
			this.showContent(next, 0);
		}

		if(currentAnimated && nextAnimated && !currentFull && !nextFull){
			console.log("leave the header and change the content");
			console.log("show content");
			console.log("from success alert show details");
			this.showContent(next, 0);
		}

		//pages.getAllPages()
	
	}

	moveBGUp(flag){
		// if true change the z index up
		console.log("move up "+flag);
	}

	showContent(newpage, delay){
		// if the animation needs a delay then we set one

		/*console.log("show content "+newpage);*/
		if(newpage === "start-chat-details"){
			if(this.currentContent != null){
				this.hideContent(this.currentContent);
			}

			console.log("SHOW CONTENT "+newpage);

			// delayed call howContentOnComplete(newpage)

			//this.hideDelay = gsap.delayedCall(2, this.showContentOnComplete(newpage).bind(this));

		} else if(newpage === "open-case-product"){
			if(this.currentContent != null){
				this.hideContent(this.currentContent);
			}

			console.log("SHOW CONTENT "+newpage);

			gsap.set("#toc-steps-text-white", {autoAlpha:0});
			gsap.set("#toc-step-1-check", {autoAlpha:0});
			gsap.set("#toc-step-2-white", {autoAlpha:0});
			gsap.to("#toc-steps", {autoAlpha:1,duration:.5, ease:"expo.out", delay:.7});



			// delayed call howContentOnComplete(newpage)
			//this.hideDelay = gsap.delayedCall(2, this.showContentOnComplete(newpage).bind(this));

		}else if(newpage === "open-case-details"){

			if(this.currentContent != null){
				this.hideContent(this.currentContent);
			}

			console.log("SHOW CONTENT "+newpage);

			// delayed call howContentOnComplete(newpage)
			//this.hideDelay = gsap.delayedCall(2, this.showContentOnComplete(newpage).bind(this));
		}else if(newpage === "case-details"){

			if(this.currentContent != null){
				this.hideContent(this.currentContent);
			}

			console.log("SHOW CONTENT "+newpage);

			// delayed call howContentOnComplete(newpage)
			//this.hideDelay = gsap.delayedCall(2, this.showContentOnComplete(newpage).bind(this));
		}else if(newpage === "status-details"){
			if(this.currentContent != null){
				this.hideContent(this.currentContent);
			}

			console.log("SHOW CONTENT "+newpage);

			// delayed call howContentOnComplete(newpage)
			//this.hideDelay = gsap.delayedCall(2, this.showContentOnComplete(newpage).bind(this));

		}

		//start-chat-details
		//open-case-product
		//open-case-details
		//case-details
		//status-details

		//currentContent = "";
		//nextContent = "";
	}

	showContentOnComplete(newpage){
		console.log("show content on complete");
		this.nextContent = newpage;
		this.currentContent = this.nextContent;
	}

	hideContent(page){

		if(page === "start-chat-details"){
			

		} else if(page === "open-case-product"){


		}else if(page === "open-case-details"){


		}else if(page === "case-details"){


		}else if(page === "status-details"){


		}
	}

	getIsPageTop(){

	}

	getIsPageFull(page){
		let ap = this.animatedPages;
		for(let i=0; i<ap.length; i++){
			if(page === ap[i].name && ap[i].isFull){
				/*console.log("IS FULL "+page);*/
				return true;
			}
		}
	}

} /* end animated page header class */




















const pages = new Pages();
const view = new View();
const nav = new Navigation();
const pageHeader = new animatedPageHeader();




// INITIATE THE APP 
function init(){
	window.scrollTo(0, 0);

	setUpLoginPage();
	
	pages.initPages(document.getElementsByClassName("page"));
	view.initView();
	let main = document.getElementsByClassName("nav-item");
	let back = document.getElementById("button-back");
	let click = document.getElementsByClassName("navigation");
	nav.init(main, back, click);


	view.updateView(pages.getAllPages());

	pageHeader.init(pages.getAllPages())

    
    view.hideMainNav();
	view.hideHeaderNav();
	
	view.setPageInView(pages.getPageObj("home"));
	pages.setNextPage("home");
	
	let c = document.querySelector("#abg-inner-container");

	//gsap.set("#abg-inner-container",{x:view.getAppWidth()});
	//gsap.to(document.querySelector("#abg-inner-container"), {x:0, duration:2, ease:"expo.inOut"});
	//gsap.to(document.querySelector("#abg-inner-container"), {y:150-view.getAppHeight(), duration:2, ease:"expo.inOut", delay:2});
	setUpAnimatedHeaders();



	setUpAlerts();
	setUpExpandables();
	setUpToggleButtons();
	setUpRadioButtons();
	setUpFeedbackButtons();
	enableCaseDetailsNav();
}

function setUpLoginPage(){
	/*HIDE THIS THING*/
	/*gsap.set("#login", {autoAlpha:0});*/

    gsap.set("#login", {x:0});
    gsap.set("#login", {css:{position:"fixed"}});
    let btn = document.querySelector(".login-button");
    gsap.set(btn, {css:{cursor:"pointer"}});
    btn.addEventListener("click", handleLoginButtonClick);
}

function handleLoginButtonClick(){
	let btn = document.querySelector(".login-button");
    let page = document.querySelector("#login");
    let video = document.querySelector("#login-video-bg");

    video.pause();
    btn.removeEventListener("click", handleLoginButtonClick);
    gsap.to(page, {autoAlpha:0, duration:1, ease:"power2.inOut"});
    gsap.to(page, {y:100, scale:1.2, duration:.75, ease:"power2.inOut"});

    view.showHeaderNav();
    view.showMainNav();
}

function setUpAnimatedHeaders(){
	gsap.set("#abg-inner-container",{x:400});
	view.showHeaderBG(false);

	gsap.set("#toc-chat-container", {autoAlpha:0});
	gsap.set("#toc-status-details-container", {autoAlpha:0});
	gsap.set("#toc-steps", {autoAlpha:0});
	gsap.set("#toc-case-container", {autoAlpha:0});
	gsap.set("#toc-chat-container", {autoAlpha:0});
	gsap.set("#toc-steps-line-white", {autoAlpha:0});
	gsap.set("#toc-status-details-container", {autoAlpha:0});
}

function moveAnimatedHeaders(){

}


function handlePageMove(state){
		/*console.log("state "+state);
		console.log("next page "+pages.getNextPage());
		console.log("current page "+pages.getCurrentPage());*/

		// The animated header is shared across pages and some of its tweens use
		// delays that outlive the nav lockout (e.g. {zIndex:890, delay:1} and the
		// .7s-delayed fades). Kill anything still pending before the next move.
		gsap.killTweensOf([
			"#abg-inner-container",
			"#abg-inner-container img",
			"#animated-bg-container",
			"#toc-chat-container",
			"#toc-steps",
			"#toc-steps-text-white",
			"#toc-step-1-check",
			"#toc-step-2-white",
			"#toc-steps-line-white",
			"#toc-case-container",
			"#toc-status-details-container"
		]);

		
		if(state === "sub"){
				
			if(pages.getNextPage() === "start-chat-product"){
				/*console.log("start-chat-product | sub");*/
				gsap.set("#animated-bg-container",{zIndex:90});

				gsap.set("#abg-inner-container",{x:view.getAppWidth()});
				gsap.set("#abg-inner-container",{y:0});
				gsap.to("#abg-inner-container", {x:0, duration:1, ease:"expo.inOut"});
				

				view.whiteHeaderNav(false);
			} 
			else if(pages.getNextPage() === "start-chat-details"){
				console.log("start-chat-details | sub");
				gsap.to("#toc-chat-container", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
				
				gsap.to("#abg-inner-container", {y:150-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
				gsap.set("#animated-bg-container",{zIndex:890, delay:1});

				view.whiteHeaderNav(true);
				/*view.showHeaderBG(true);*/
			}
			else if(pages.getNextPage() === "open-case-product"){
				/*console.log("open-case-product | sub");*/
				gsap.set("#animated-bg-container",{zIndex:90});

				gsap.set("#abg-inner-container",{x:view.getAppWidth()});
				gsap.set("#abg-inner-container",{y:0});
				

				gsap.set("#toc-steps-text-white", {autoAlpha:0});
				gsap.set("#toc-step-1-check", {autoAlpha:0});
				gsap.set("#toc-step-2-white", {autoAlpha:0});
				gsap.to("#toc-steps", {autoAlpha:1,duration:.5, ease:"expo.out", delay:.7});


				gsap.to("#abg-inner-container", {x:0, duration:1, ease:"expo.inOut"});
				
				view.whiteHeaderNav(false);

			}
			else if(pages.getNextPage() === "open-case-details"){
				/*console.log("open-case-details | sub");*/

				//gsap.set("#toc-steps-text-white", {autoAlpha:0});
				//gsap.set("#toc-step-1-check", {autoAlpha:0});
				//gsap.set("#toc-step-2-white", {autoAlpha:0});

				gsap.to("#toc-steps-text-white", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
				gsap.to("#toc-step-1-check", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
				gsap.to("#toc-step-2-white", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
				gsap.to("#toc-steps-line-white", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
				


				gsap.to("#abg-inner-container", {y:150-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
				gsap.set("#animated-bg-container",{zIndex:890, delay:1});
				view.whiteHeaderNav(true);
			}
			else if(pages.getNextPage() === "case-details"){
				/*console.log("case-details | sub");*/
				gsap.to("#toc-case-container", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
				//gsap.to("#toc-steps", {autoAlpha:0,duration:.5, ease:"expo.out"});

				gsap.to("#toc-steps", {autoAlpha:0,duration:.5, ease:"expo.out"});
				gsap.to("#toc-chat-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				

				gsap.set("#animated-bg-container",{zIndex:890});

				// Fade out the main top-nav background as the sub-page header
				// animates down so it doesn't show over it.
				view.showHeaderBG(false);

				if(pages.getCurrentPage() === "open-case-details"){
					// Arriving from step 2 (success alert) the header is already
					// parked at the top — keep it there and crossfade the content
					// instead of re-sliding it down.
					gsap.set("#abg-inner-container",{x:0, y:150-view.getAppHeight()});
					gsap.to("#toc-steps-text-white", {autoAlpha:0, duration:.5, ease:"expo.out"});
					gsap.to("#toc-step-1-check", {autoAlpha:0, duration:.5, ease:"expo.out"});
					gsap.to("#toc-step-2-white", {autoAlpha:0, duration:.5, ease:"expo.out"});
					gsap.to("#toc-steps-line-white", {autoAlpha:0, duration:.5, ease:"expo.out"});
				} else {
					gsap.set("#abg-inner-container",{y:0-view.getAppHeight()});
					gsap.set("#abg-inner-container",{x:0});
					gsap.to("#abg-inner-container", {y:150-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
				}

				view.whiteHeaderNav(true);
			}
			else if(pages.getNextPage() === "status-details"){
				/*console.log("status-details | sub");*/

				// Fade out the main top-nav background as the sub-page header
				// animates down so it doesn't show over it.
				view.showHeaderBG(false);

				gsap.set("#abg-inner-container img",{autoAlpha:0});
				gsap.set("#abg-inner-container",{y:0-view.getAppHeight()});
				gsap.set("#abg-inner-container",{x:0});
				gsap.to("#abg-inner-container", {y:150-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
				gsap.set("#animated-bg-container",{zIndex:890, delay:1});
				gsap.to("#toc-status-details-container", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
				
				
			}
			else{
				view.whiteHeaderNav(false);

				/*console.log("NO OVERLAY HEADER");*/
			}


		} else if (state === "back"){

			if(pages.getCurrentPage() === "start-chat-product"){
				/*console.log("start-chat-product | back");*/
				gsap.to("#abg-inner-container", {x:view.getAppHeight(), duration:1, ease:"expo.inOut"});
				
				view.whiteHeaderNav(false);
			} 
			else if(pages.getCurrentPage() === "start-chat-details"){
				/*console.log("start-chat-details | back");*/
				
				gsap.to("#toc-chat-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				gsap.to("#abg-inner-container", {y:0, duration:1, ease:"expo.inOut"});
				gsap.set("#animated-bg-container",{zIndex:90});
				view.whiteHeaderNav(false);
				
			}
			else if(pages.getCurrentPage() === "open-case-product"){
				/*console.log("open-case-product | back");*/
				gsap.to("#abg-inner-container", {x:view.getAppWidth(), duration:1, ease:"expo.inOut"});
				gsap.to("#toc-steps", {autoAlpha:0,duration:.5, ease:"expo.out"});
			}
			else if(pages.getCurrentPage() === "open-case-details"){
				/*console.log("open-case-details | back");*/

				gsap.to("#toc-steps-text-white", {autoAlpha:0, duration:.5, ease:"expo.out", delay:.7});
				gsap.to("#toc-step-1-check", {autoAlpha:0, duration:.5, ease:"expo.out", delay:.7});
				gsap.to("#toc-step-2-white", {autoAlpha:0, duration:.5, ease:"expo.out", delay:.7});
				gsap.to("#toc-steps-line-white", {autoAlpha:0, duration:.5, ease:"expo.out", delay:.7});
				
				gsap.to("#abg-inner-container", {y:0, duration:.7, ease:"expo.inOut"});
				gsap.set("#animated-bg-container",{zIndex:90});
				view.whiteHeaderNav(false);
			}
			else if(pages.getCurrentPage() === "case-details"){
				/*console.log("case-details | back");*/
				gsap.set("#animated-bg-container",{zIndex:890});


				gsap.to("#toc-case-container", {autoAlpha:0, duration:.5, ease:"expo.out"});

				if(pages.getNextPage() === "open-case-details"){
					// Case was opened from step 2 via the success alert. Going
					// back there the header stays parked at the top — just swap
					// the case content back out for the steps content.
					gsap.set("#abg-inner-container",{x:0, y:150-view.getAppHeight()});
					gsap.to("#toc-steps", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
					gsap.to("#toc-steps-text-white", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
					gsap.to("#toc-step-1-check", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
					gsap.to("#toc-step-2-white", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
					gsap.to("#toc-steps-line-white", {autoAlpha:1, duration:.5, ease:"expo.out", delay:.7});
					view.whiteHeaderNav(true);
				} else {
					gsap.to("#abg-inner-container", {y:0-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
					view.whiteHeaderNav(false);
				}
			}
			else if(pages.getCurrentPage() === "status-details"){
				/*console.log("status-details | back");*/

				gsap.set("#abg-inner-container img",{autoAlpha:1, delay:.7});
				gsap.to("#abg-inner-container", {y:0-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
				gsap.to("#toc-status-details-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				view.whiteHeaderNav(false);
			}
			else{
				view.whiteHeaderNav(false);
				
			}
			

		} else if (state === "base"){

			if(pages.getCurrentPage() === "start-chat-product"){
				/*console.log("start-chat-product | base");*/
				gsap.to("#toc-chat-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				gsap.to("#abg-inner-container", {x:0-view.getAppWidth(), duration:1, ease:"expo.inOut"});
			} 
			else if(pages.getCurrentPage() === "start-chat-details"){
				/*console.log("start-chat-details | base");*/
				
				gsap.to("#toc-chat-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				gsap.to("#abg-inner-container", {x:0-view.getAppWidth(), duration:1, ease:"expo.inOut"});
			}
			else if(pages.getCurrentPage() === "open-case-product"){
				/*console.log("open-case-product | base");*/
				gsap.to("#abg-inner-container", {x:0-view.getAppWidth(), duration:1, ease:"expo.inOut"});
			}
			else if(pages.getCurrentPage() === "open-case-details"){
				/*console.log("open-case-details | base");*/
				gsap.to("#abg-inner-container", {x:0-view.getAppWidth(), duration:1, ease:"expo.inOut"});
				gsap.to("#toc-steps", {autoAlpha:0,duration:.5, ease:"expo.out"});
				view.whiteHeaderNav(false);
			}
			else if(pages.getCurrentPage() === "case-details"){
				/*console.log("case-details | base");*/

				gsap.to("#toc-steps", {autoAlpha:0,duration:.5, ease:"expo.out"});
				gsap.to("#toc-chat-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				





				gsap.set("#animated-bg-container",{zIndex:890});
				gsap.to("#toc-case-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				
				gsap.to("#abg-inner-container", {y:0-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
				
				view.whiteHeaderNav(false);

			}
			else if(pages.getCurrentPage() === "status-details"){
				/*console.log("status-details | base");*/

				gsap.set("#animated-bg-container",{zIndex:890});
				gsap.set("#abg-inner-container img",{autoAlpha:1, delay:.7});
				gsap.to("#abg-inner-container", {y:0-view.getAppHeight(), duration:.7, ease:"expo.inOut"});
				gsap.to("#toc-status-details-container", {autoAlpha:0, duration:.5, ease:"expo.out"});
				
				view.whiteHeaderNav(false);

			}
			else{
				/*console.log("NO OVERLAY HEADER");*/
			}
			

		}

}


function setUpAlerts(){

	let successAlert = new Alert(document.querySelector("#success-alert-container"));
	successAlert.addCaller(document.querySelector("#submit-case-button"));
	successAlert.setCloseButton(document.querySelector("#sa-status-close-button"));
	successAlert.setTarget(document.querySelector("#sa-status-button"));
	successAlert.setDestination("case-details");

	let warningAlert = new Alert(document.querySelector("#warning-alert-container"));
	warningAlert.addCaller(document.querySelector("#input-alert"));
	warningAlert.setCloseButton(document.querySelector("#wa-status-close-button"));

	document.getElementById("input-alert").addEventListener("focus", function() {
	  document.getElementById("input-warning-text").style.display = "block";
	});
	document.getElementById("input-alert").addEventListener("blur", function() {
	  document.getElementById("input-warning-text").style.display = "none";
	});

}


function setUpExpandables(){
	let expandables = document.getElementsByClassName("expandable");
	for (let i = 0; i < expandables.length; i++){
        gsap.set(expandables[i], {css:{cursor:"pointer"}});
        
        let p = expandables[i].parentElement.parentElement;
        p.setAttribute("state", "closed");
        p.setAttribute("open-height", p.offsetHeight);
        gsap.set(p, {height:77});
        
        let subCards = p.getElementsByClassName("sse-sub-card");
        gsap.set(subCards, {autoAlpha: 0});
        
        expandables[i].addEventListener("click", expandableClickHandler);
    }
}

function expandableClickHandler(event){
	let parent = event.currentTarget.parentElement.parentElement;
	let h = parent.getAttribute("open-height");
	let s = parent.getAttribute("state");
	let subCards = parent.getElementsByClassName("sse-sub-card");

	if (s === "closed"){
		gsap.to(parent, {duration:.5, height:h, ease:"expo.inOut"});
		parent.setAttribute("state", "open");
		parent.querySelector(".sse-show-text").innerHTML = "Show less";
		gsap.set(parent.querySelector(".issue-status"), {autoAlpha: 0});
		gsap.to(subCards, {autoAlpha: 1, stagger: .15, delay: .4});
	} else{
		gsap.set(subCards, {autoAlpha: 0});
		gsap.to(parent, {duration:.5, height:77, ease:"expo.inOut"});
		parent.setAttribute("state", "closed");
		parent.querySelector(".sse-show-text").innerHTML = "Show more";
		gsap.to(parent.querySelector(".issue-status"), {autoAlpha: 1, duration:.5, delay:.5});
	}
}

function setUpToggleButtons(){
	let toggles = document.getElementsByClassName("toggle-pill");
	for (let i = 0; i < toggles.length; i++){
        gsap.set(toggles[i], {css:{cursor:"pointer"}});
        let s = toggles[i].getAttribute("state");
		if (s === "on"){
			gsap.set(toggles[i].querySelector(".tp-button"), {x:24});
			gsap.set(toggles[i].querySelector(".tp-gray-bg"), {x:24, width:24});
		} 
        toggles[i].addEventListener("click", toggleButtonHandler);
    }
}

function toggleButtonHandler(event){
	let t = event.currentTarget;
	
	let s = t.getAttribute("state");
	if (s === "off"){
		t.setAttribute("state", "on");
		gsap.to(t.querySelector(".tp-button"), {x:24, duration:.4, ease:"expo.out"});
		gsap.to(t.querySelector(".tp-gray-bg"), {x:24, width:24, duration:.4, ease:"expo.out"});
	} else{
		t.setAttribute("state", "off");
		gsap.to(t.querySelector(".tp-button"), {x:0, duration:.4, ease:"expo.out"});
		gsap.to(t.querySelector(".tp-gray-bg"), {x:0, width:48, duration:.4, ease:"expo.out"});
	}
}

function setUpRadioButtons(){
	let radios = document.getElementsByClassName("radio-button");
	for (let i = 0; i < radios.length; i++){
        gsap.set(radios[i], {css:{cursor:"pointer"}});
        let s = radios[i].getAttribute("state");
		if (s === "off"){
			gsap.set(radios[i].querySelector(".rb-check-active"), {x:11, y:11, width:0, height:0});
		} 
		radios[i].addEventListener("click", radioButtonHandler);
    }
}

function radioButtonHandler(event){
	let t = event.currentTarget;
	let p = event.currentTarget.parentElement;
	let radios = p.getElementsByClassName("radio-button");
	for (let i = 0; i < radios.length; i++){
		if (radios[i] === t){
			gsap.to(t.querySelector(".rb-check-active"), {x:0, y:0, width:22, height:22, duration:.7, ease:"expo.out"});
		} else {
			gsap.to(radios[i].querySelector(".rb-check-active"), {x:11, y:11, width:0, height:0, duration:.5, ease:"expo.out"});
		} 
	}
}


function setUpFeedbackButtons(){
	let smileys = document.getElementsByClassName("gfe-emoticon");
	for (let i = 0; i < smileys.length; i++){
        gsap.set(smileys[i], {css:{cursor:"pointer"}});
        gsap.set(smileys[i].querySelector(".gfe-overlay"), {x:30, y:30, width:0, height:0, autoAlpha:0});
		gsap.set(smileys[i].querySelector(".gfe-smiley-black"), {autoAlpha:0});
		gsap.set(smileys[i].querySelector(".gfe-overlay"), {autoAlpha:0});
		
		smileys[i].addEventListener("click", feedbackButtonHandler);
    }
}

function feedbackButtonHandler(event){
	let t = event.currentTarget;
	let p = event.currentTarget.parentElement;
	let smileys = p.getElementsByClassName("gfe-emoticon");
	for (let i = 0; i < smileys.length; i++){
		if (smileys[i] === t){
			gsap.set(t.querySelector(".gfe-overlay"), {autoAlpha:1});
			gsap.to(t.querySelector(".gfe-overlay"), {x:0, y:0, width:60, height:60, duration:.7, ease:"expo.out"});
			gsap.to(t.querySelector(".gfe-smiley-black"), {autoAlpha:1, duration:.6, ease:"expo.out", delay:.2});
		} else {
			gsap.to(smileys[i].querySelector(".gfe-overlay"), {x:30, y:30, width:0, height:0, duration:.5, ease:"expo.out"});
			gsap.set(smileys[i].querySelector(".gfe-overlay"), {autoAlpha:0, delay:.3});
			gsap.to(smileys[i].querySelector(".gfe-smiley-black"), {autoAlpha:0, duration:.3, ease:"expo.out"});
		} 
	}
}


function enableCaseDetailsNav(){
	let buttons = document.getElementsByClassName("cdc-nav-button");
	for (let i = 0; i < buttons.length; i++){
		gsap.set(buttons[i], {css:{cursor:"pointer"}});
        buttons[i].addEventListener("click", caseDetailsNavHandler);
    }
}

function disableCaseDetailsNav(){
	let buttons = document.getElementsByClassName("cdc-nav-button");
	for (let i = 0; i < buttons.length; i++){
		gsap.set(buttons[i], {css:{cursor:"pointer"}});
        buttons[i].removeEventListener("click", caseDetailsNavHandler);
    }
}


function caseDetailsNavHandler(event){
	
	disableCaseDetailsNav();

	let t = event.currentTarget;
	let p = event.currentTarget.parentElement.parentElement;
	let active = p.querySelector(".cdc-nav-active-bar");
	let l = t.offsetLeft - active.offsetLeft;
	
	let cu = document.querySelector("#cdc-updates");
	let cd = document.querySelector("#cdc-details");

	gsap.to(active, {x:l, width:t.offsetWidth, duration:.5, ease:"expo.inOut"});
	
	if(t === cu){
		/*console.log("updates click");*/
		/*console.log("updates offsetHeight "+gsap.getProperty("#cd-content-updates", "offsetHeight"));*/
		gsap.to("#cd-content-updates", {x:0, duration:.5, ease:"expo.inOut", onComplete:caseDetailsOnComplete});
		gsap.to("#cd-content-details", {x:0, duration:.5, ease:"expo.inOut", onComplete:caseDetailsOnComplete});
		gsap.set(".cd-content-container", {height:gsap.getProperty("#cd-content-updates", "offsetHeight")});
	}else if (t === cd){
		/*console.log("details click");*/
		/*console.log("details offsetHeight "+gsap.getProperty("#cd-content-details", "offsetHeight"));*/
		gsap.to("#cd-content-updates", {x:-view.getAppWidth(), duration:.5, ease:"expo.inOut", onComplete:caseDetailsOnComplete});
		gsap.to("#cd-content-details", {x:-view.getAppWidth(), duration:.5, ease:"expo.inOut", onComplete:caseDetailsOnComplete});
		gsap.set(".cd-content-container", {height:gsap.getProperty("#cd-content-details", "offsetHeight")});
	}else {
		console.log("something went wrong")
	}
}

function caseDetailsOnComplete(){
	enableCaseDetailsNav();
}


var triggers = document.querySelectorAll('.color-card-trigger');
var isReversed = true; // Variable to track the state
var expandTextElement = document.getElementById('expandText');
var collapseTextElement = document.getElementById('collapseText');
var expandIconElement = document.getElementById('expand-icon');

// Add click event listener to each trigger
triggers.forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    // Toggle the state on each click
    isReversed = !isReversed;

    // Get all elements with the class "color-card"
    var cards = document.querySelectorAll('.color-card');

    // Toggle the class "card-inactive" based on the state
    cards.forEach(function (card) {
      if (isReversed) {
		expandIconElement.classList.add('expandArrow');
		expandIconElement.classList.remove('collapseArrow');
		collapseTextElement.classList.add('hiddenText');
		expandTextElement.classList.remove('hiddenText');
        card.classList.add('card-inactive');
      } else {
		expandIconElement.classList.remove('expandArrow');
		expandIconElement.classList.add('collapseArrow');
		expandTextElement.classList.add('hiddenText');
		collapseTextElement.classList.remove('hiddenText');
        card.classList.remove('card-inactive');
      }
    });
  });
});


	  document.addEventListener('DOMContentLoaded', function () {
		var headerBg = document.getElementById('header-bg');
		var adobeLogoWhite = document.getElementById('adobe-logo-white');
	  
		// Function to update header visibility based on scroll position
		function updateHeaderVisibility() {
		  // status-details uses the white overlay panel as its header, so the
		  // grey main-header background should never show through on scroll.
		  if (pages.getCurrentPage() === "status-details") {
			headerBg.style.opacity = '0';
			headerBg.style.visibility = 'hidden';
			return;
		  }
		  // Check if the adobe-logo-white has opacity set to 1
		  if (getComputedStyle(adobeLogoWhite).opacity !== '1') {
			if (window.scrollY > 0) {
			  headerBg.style.opacity = '1';
			  headerBg.style.visibility = 'visible';
			} else {
			  headerBg.style.opacity = '0';
			  headerBg.style.visibility = 'hidden';
			}
		  }
		}
	  
		// Function to check adobe-logo-white opacity with a tiny delay after click
		function checkAdobeLogoOpacityOnClick() {
		  // Introduce a 100ms delay before checking opacity
		  setTimeout(function() {
			if (getComputedStyle(adobeLogoWhite).opacity === '1') {
			  headerBg.style.opacity = '0';
			  headerBg.style.visibility = 'hidden';
			  console.log("Adobe logo opacity is 1 after the delay");
			}
		  }, 600);
		}
	  
		// Initial call to set header visibility based on page load
		updateHeaderVisibility();
	  
		// Add scroll event listener to update header visibility on scroll
		window.addEventListener('scroll', updateHeaderVisibility);
	  
		// Add click event listener to check adobe-logo-white opacity on every click
		document.addEventListener('click', checkAdobeLogoOpacityOnClick);
	  });
	  



// BELOW JS IS FOR FANCIER CARD FANNING

//   // Get all elements with class "color-card-trigger"
//   const triggers = document.querySelectorAll('.color-card-trigger');

//   // Loop through each trigger element
//   triggers.forEach(trigger => {
//     // Add click event listener to each trigger
//     trigger.addEventListener('click', function() {
//       // Get all color-card elements on the page
//       const cards = document.querySelectorAll('.color-card');

//       // Loop through each card and update the classes
//       cards.forEach(card => {
//         if (card === this.nextElementSibling) {
//           // Remove "color-card-inactive" class from the immediate following element
//           card.classList.remove('card-inactive');
//         } else {
//           // Add "color-card-inactive" class to all other color-card elements
//           card.classList.add('card-inactive');
//         }
//       });
//     });
//   });









// set the listeners on the content load callback, then tie it to the function and set the callback to fire when the event bubbles up
document.addEventListener( "DOMContentLoaded" , init , false ) ;


