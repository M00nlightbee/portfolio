// https://www.youtube.com/watch?v=KLZFOhNZQL4

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger,SplitText);

    /* ----------------------------------
        SMOOTH SCROLLING
    ---------------------------------- */
    // https://github.com/darkroomengineering/lenis/blob/main/README.md
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
    lenis.raf(time * 1000); 
    });
    gsap.ticker.lagSmoothing(0);

    gsap.set([".intro h1",".outro h1"], {opacity: 1});

    // let split = SplitText.create(".intro h1", {
    //     type: "chars, words",
    //     mask: "chars"
    // });

    // gsap.from(split.chars, {
    //     duration: 0.6,
    //     yPercent: "random([-150, 150])",
    //     xPercent: "random([-150, 150])",
    //     stagger: {
    //         from:"random",
    //         amount: 0.6,
    //     },
    //     ease: "power3.out"
    // });


    /* ----------------------------------
        ANIMATE INTRO TEXT
    ---------------------------------- */

    function playIntroAnimation() {
        const introContent = document.querySelector(".intro h1");
        if (!introContent) return;

        // Split the intro text
        const splitIntro = new SplitText(introContent, { 
            type: "chars, words", 
            mask: "chars" 
        });

        // Animate characters
        gsap.from(splitIntro.chars, {
            duration: 0.6,
            yPercent: "random([-150, 150])",
            xPercent: "random([-150, 150])",
            stagger: {
            from: "random",
            amount: 0.6,
            },
            ease: "power3.out",
            onComplete: () => splitIntro
        });
    }

    // ScrollTrigger: play on enter and when scrolling back up
    ScrollTrigger.create({
        trigger: ".intro h1",
        start: "top 80%",      
        end: "bottom 20%",     
        onEnter: playIntroAnimation,      
        onEnterBack: playIntroAnimation,  
        once: false,                      
    });
    
    /* ----------------------------------
        SLIDE CONTENT LIST
    ---------------------------------- */
    const slides = [
        {
            title:
                "AIMS is a versatile ASP.NET Core MVC application tailored for efficient inventory management and user administration. ",
            image:
                "images/frames00001.png",
            btn:
                "View AIMS",
            btnlink:
                "project_aims.html"
        },
        {
            title:
                "myPass is a desktop application to upgrade from storing you password in a txt file and save time having to think of a strong password.",
            image:
                "images/frames00011.png",
            btn:
                "View myPass",
            btnlink:
                "project_mypass.html"
        },
        {
            title:
                "Skills Enablement Digital Collectible Card Game (DCCG) is a Unity-based game: A strategic card game to make learning engaging and fun!",
            image:
                "images/frames00021.png",
            btn:
                "View DCCG",
            btnlink:
                "project_dccg.html"
        },
        {
            title:
                "Exploring AI algorithms for building an intelligent system and Machine learning models for decision making using Connect4 game.",
            image:
                "images/frames00041.png",
            btn:
                "View Connect4",
            btnlink:
                "project_connect4.html"
        }, 
    ];

    /* ----------------------------------
        HANDLING THE SLIDES
    ---------------------------------- */
    const pinDistance = window.innerHeight * slides.length;
    const progressBar = document.querySelector(".slider-progress");
    const sliderImages = document.querySelector(".slider-images");
    const sliderTitle = document.querySelector(".slider-title");
    const sliderBtn = document.querySelector(".slider-btn")
    const sliderIndices = document.querySelector(".slider-indices");

    let activeSlide = 0;
    let currentSplit = null;

    function createIndices() {
        sliderIndices.innerHTML = "";

        slides.forEach((_, index) => {
            const indexNum = (index + 1).toString().padStart(2, "0");
            const indicatorElement = document.createElement("p");
            indicatorElement.dataset.index = index;
            indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
            sliderIndices.appendChild(indicatorElement);

            if (index == 0) {
                gsap.set(indicatorElement.querySelector(".index"), {
                    opacity: 1,
                });
                gsap.set(indicatorElement.querySelector(".marker"), {
                    scaleX: 1,
                });
            } else{
                gsap.set(indicatorElement.querySelector(".index"), {
                    opacity: 0.35,
                });
                gsap.set(indicatorElement.querySelector(".marker"), {
                    scaleX: 0,
                });
            }
        })
    }

    function animateNewSlide(index) {
        const newSliderImage = document.createElement("img");
        newSliderImage.src = slides[index].image;
        newSliderImage.alt = `Slide ${index + 1}`;

        gsap.set(newSliderImage, {
            opacity: 0,
            scaleX: 1.1,
        });

        sliderImages.appendChild(newSliderImage);

        gsap.to(newSliderImage, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        });

        gsap.to(newSliderImage, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        });

        const allImages = sliderImages.querySelectorAll("img");
        if(allImages.length > 2) {
            const removeCount = allImages.length - 2;
            for (let i=0; i < removeCount; i++) {
                sliderImages.removeChild(allImages[i]);
            }
        }

        animateNewTitle(index);
        animateNewLinkBtn(index);
        animateIndicators(index);
    }
    
    function animateIndicators(index) {
        const indicators = sliderIndices.querySelectorAll("p");

        indicators.forEach((indicator, i) => {
            const markerElement = indicator.querySelector(".marker");
            const indexElement = indicator.querySelector(".index");

            if(i == index) {
                gsap.to(indexElement, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });

                gsap.to(markerElement, {
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else{
                gsap.to(indexElement, {
                    opacity: 0.5,
                    duration: 0.3,
                    ease: "power2.out",
                });

                gsap.to(markerElement, {
                    scaleX: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        });
    }

    function animateNewTitle(index){
        if(currentSplit) {
            currentSplit.revert();
        }

        sliderTitle.innerHTML = `<h1>${slides[index].title}</h1>`

        currentSplit = new SplitText(sliderTitle.querySelector("h1"), {
            type: "lines",
            linesClass: "line",
            mask: "lines",
        });

        gsap.set(currentSplit.lines, {
            yPercent: 100,
            opacity: 0,
        });

        gsap.to(currentSplit.lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
        });
    }

    function animateNewLinkBtn(index){
        if(currentSplit) {
            currentSplit.revert();
        }

        sliderBtn.innerHTML = `<a href="${slides[index].btnlink}">${slides[index].btn}</a>`;

        currentSplit = new SplitText(sliderBtn.querySelector("a"), {
            type: "lines",
            linesClass: "line",
            mask: "lines",
        });

        gsap.set(currentSplit.lines, {
            yPercent: 100,
            opacity: 0,
        });

        gsap.to(currentSplit.lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
        });
    }
    
    createIndices();

    ScrollTrigger.create({
        trigger: ".slider",
        start: "top top",
        end: `+=${pinDistance}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
            gsap.set(progressBar, {
                scaleY: self.progress
            });

            const currentSlide = Math.floor(self.progress * slides.length);

            if(activeSlide != currentSlide && currentSlide < slides.length) {
                activeSlide = currentSlide;
                animateNewSlide(activeSlide);
            }
        },
    });

    /* ----------------------------------
        ANIMATE OUTRO TEXT
    ---------------------------------- */
    function playOutroAnimation() {
        const outroContent = document.querySelector(".outro h1");
        if (!outroContent) return;

        const splitOutro = new SplitText(outroContent, { 
            type: "chars, words", 
            mask: "chars" 
        });

        gsap.from(splitOutro.chars, {
            duration: 0.6,
            yPercent: "random([-150, 150])",
            xPercent: "random([-150, 150])",
            stagger: {
            from: "random",
            amount: 0.6,
            },
            ease: "power3.out",
            onComplete: () => splitOutro
        });
    }

    // Trigger outro when scrolled into view
    ScrollTrigger.create({
        trigger: ".outro",
        start: "top center",
        once: false,
        onEnter: () => playOutroAnimation(),
    });

    /* ----------------------------------
        HANDLING ANIMATION FOR MENU
    ---------------------------------- */
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
            },
        });
    }   
});