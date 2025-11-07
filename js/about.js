
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger,SplitText);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
    lenis.raf(time * 1000); 
    });
    gsap.ticker.lagSmoothing(0);

    // let splitLeft = SplitText.create(".about-left", {
    //     type: "chars, words",
    //     mask: "chars"
    // });

    // gsap.from(splitLeft.chars, {
    //     x: 150,
    //     opacity: 0,
    //     duration: 0.7, 
    //     ease: "power4",
    //     stagger: 0.04
    // });

    let splitRight = SplitText.create([".about-left", ".about-right"] , {
        type: "chars, words",
        mask: "words"
    });

    gsap.from(splitRight.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7, 
        ease: "back",
        stagger: 0.15
    });

    const container =  document.querySelector("main");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const menuPreviewImg = document.querySelector(".menu-preview-img");
    const menuLinks = document.querySelectorAll(".link a");
    
    let isOpen = false;
    let isAnimating = false;

    menuToggle.addEventListener("click", () => {
        if (!isOpen) openMenu();
        else closeMenu();
    });

    function resetPreviewImage() {
        if (menuPreviewImg) {
        menuPreviewImg.innerHTML = "";
        const defaultPreviewImg = document.createElement("img");
        defaultPreviewImg.src = "images/frames00041.png";
        menuPreviewImg.appendChild(defaultPreviewImg);
        }
    }

    function animateMenuToggle(isOpening) {
        const open = document.querySelector("p#menu-open");
        const close = document.querySelector("p#menu-close");

        gsap.to(isOpening ? open : close, {
        x: isOpening ? -5 : 5,
        y: isOpening ? -10 : 10,
        rotation: isOpening ? -5 : 5,
        opacity: 0,
        delay: 0.25,
        duration: 0.5,
        ease: "power2.out",
        });

        gsap.to(isOpening ? close : open, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
        ease: "power2.out",
        });
    }

    function openMenu() {
        if (isAnimating || isOpen) return;
        isAnimating = true;

        gsap.to(container, {
        rotation: 10,
        x: 300,
        y: 450,
        scale: 1.5,
        duration: 1.25,
        ease: "power4.inOut",
        });

        animateMenuToggle(true);

        gsap.to(menuContent, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.25,
        ease: "power4.inOut",
        });

        gsap.to([".link a", ".social a"], {
        y: "0%",
        opacity: 1,
        duration: 1,
        delay: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        });

        gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
            isOpen = true;
            isAnimating = false;
        },
        });
    }

    function closeMenu() {
        if (isAnimating || !isOpen) return;
        isAnimating = true;

        gsap.to(container, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.25,
        ease: "power4.inOut",
        });

        animateMenuToggle(false);

        gsap.to(menuContent, {
        rotation: -15,
        x: -100,
        y: -100,
        scale: 1.5,
        opacity: 0.25,
        duration: 1.25,
        ease: "power4.inOut",
        });

        gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
            isOpen = false;
            isAnimating = false;
            gsap.set([".link a", ".social a"], { y: "120%" });
            resetPreviewImage();
        },
        });
    }
    
});