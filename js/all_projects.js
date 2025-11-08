gsap.registerPlugin(ScrollTrigger, CustomEase,CustomBounce);

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
    lenis.raf(time * 1000); 
    });
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray(".card");

    // Initial stacking setup
    gsap.set(cards, {
      y: (i) => i * -25,
      scale: (i) => 1 - i * 0.5,
      scale: 1,
      zIndex: (i) => cards.length - i,
    });

    // Master timeline controlled by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards",
        start: "top center",
        end: "+=3000", 
        scrub: true,
        pin: true,
      }
    });

    // For each card drops out of the stack one after another
    cards.forEach((card, i) => {
      tl.to(card, {
        y: 100,           // drop down
        rotation: 5,      // slight tilt
        opacity: 0,
        ease: "power2.inOut",
        duration: 0.5,
      }, i * 0.3);        // offset between cards
    });

    const container =  document.querySelector("section");
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
        x: 150,
        y: 0,
        scale: 1,
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

        //Create a custom bounce ease:
    CustomBounce.create("myBounce", {
        strength: 0.6,
        squash: 3,
        squashID: "myBounce-squash",
    });

    //do the bounce by affecting the "y" property.
    gsap.from(".down-arrow", { duration: 2, y: -100, ease: "myBounce", repeat: -1, yoyo: true });

    //and do the squash/stretch at the same time:
    gsap.to(".down-arrow", {
        duration: 2,
        scaleX: 1.4,
        scaleY: 0.6,
        ease: "myBounce-squash",
        transformOrigin: "center bottom",
    });

});