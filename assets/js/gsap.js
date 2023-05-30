gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const tl = gsap.timeline();

tl.to(".wrapper",5,{x:-window.innerWidth*6})


ScrollTrigger.create({
    animation:tl,
    trigger:".wrapper",
    start:"center center",
    end:"+=8000",
    scrub:1,
    pin:true,
})

function values (){
    gsap.to(window, {duration: 2, scrollTo: 525});
}
function trivia (){
    gsap.to(window, {duration: 2, scrollTo: 1100});
}
function resume (){
    gsap.to(window, {duration: 2, scrollTo: 1755});
}
function skills (){
    gsap.to(window, {duration: 2, scrollTo: 2535});
}
function projects (){
    gsap.to(window, {duration: 2, scrollTo: 3550});
}
function contact (){
    gsap.to(window, {duration: 2, scrollTo: 5750});
}
function home (){
    gsap.to(window, {duration: 2, scrollTo: 0});
}




