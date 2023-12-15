const mainTl = gsap.timeline()

mainTl.from("#logo_image", {
    duration: 0.5,
    opacity: 0,
    y: -50,
})
mainTl.from("nav ul li", {
    duration: 0.5,
    opacity: 0,
    y: -50,
    stagger: 0.2,
})

mainTl.from("#btnContainer", {
    duration: 0.5,
    y: -50,
    opacity: 0,
})

mainTl.from("#background_images img", {
    duration: 0.75,
    scale: 0,
    opacity: 0,
})

mainTl.from("#content h2", {
    duration: 0.75,
    y: 100,
    opacity: 0,
    stagger: 0.2,
})

mainTl.from("#announcement_section", {
    duration: 0.75,
    opacity: 0,
    y: -50,
})

mainTl.from("#icons_container div", {
    duration: 0.65,
    opacity: 0,
    y: 50,
    stagger: 0.2,
})

mainTl.from("#scroll_div", {
    duration: 0.75,
    opacity: 0,
    y: -50,
})
mainTl.to("#scroll_div", {
    repeat: -1,
    duration: 0.75,
    opacity: 0.7,
    y: -35,
    yoyo: true,
})