/* ========================================
   DOM
======================================== */
const header = document.getElementById("header");
const mobileMenu = document.getElementById("mobileMenu");
const nav = document.getElementById("nav");
const navLinks =
    document.querySelectorAll(".nav-link");
const sections =
    document.querySelectorAll("main section[id]");
const revealElements =
    document.querySelectorAll(".reveal");
const counters =
    document.querySelectorAll(".counter");
/* ========================================
   HEADER SCROLL
======================================== */
function handleHeaderScroll() {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}
window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);
/* ========================================
   MOBILE MENU
======================================== */
function toggleMobileMenu() {
    const isOpen =
        nav.classList.toggle("open");
    mobileMenu.setAttribute(
        "aria-expanded",
        isOpen
    );
}
mobileMenu.addEventListener(
    "click",
    toggleMobileMenu
);
/* 메뉴 클릭 시 닫기 */
navLinks.forEach(link => {
    link.addEventListener(
        "click",
        () => {
            nav.classList.remove("open");
            mobileMenu.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    );
});
/* ========================================
   SCROLL REVEAL
======================================== */
const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add(
                    "visible"
                );
                observer.unobserve(
                    entry.target
                );
            });
        },
        {
            threshold: 0.12
        }
    );
revealElements.forEach(element => {
    revealObserver.observe(element);
});
/* ========================================
   ACTIVE NAVIGATION
======================================== */
const sectionObserver =
    new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                navLinks.forEach(link => {
                    link.classList.remove(
                        "active"
                    );
                });
                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );
                if (activeLink) {
                    activeLink.classList.add(
                        "active"
                    );
                }
            });
        },
        {
            threshold: 0.35
        }
    );
sections.forEach(section => {
    sectionObserver.observe(section);
});
/* ========================================
   NUMBER COUNTER
======================================== */
let counterStarted = false;
function startCounters() {
    if (counterStarted) {
        return;
    }
    counterStarted = true;
    counters.forEach(counter => {
        const target =
            Number(
                counter.dataset.target
            );
        const duration = 1300;
        const startTime =
            performance.now();
        function updateCounter(currentTime) {
            const elapsed =
                currentTime - startTime;
            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );
            /*
             * easeOut 효과
             */
            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );
            const current =
                Math.floor(
                    target * eased
                );
            counter.textContent =
                current.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );
            } else {
                counter.textContent =
                    target.toLocaleString();
            }
        }
        requestAnimationFrame(
            updateCounter
        );
    });
}
/* 숫자 영역 감지 */
const numbersSection =
    document.querySelector(
        ".numbers"
    );
if (numbersSection) {
    const counterObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (
                        entry.isIntersecting
                    ) {
                        startCounters();
                        counterObserver.disconnect();
                    }
                });
            },
            {
                threshold: 0.4
            }
        );
    counterObserver.observe(
        numbersSection
    );
}
/* ========================================
   HERO PARALLAX
======================================== */
const heroVisual =
    document.querySelector(
        ".hero-visual"
    );
function handleParallax() {
    if (!heroVisual) {
        return;
    }
    /*
     * 모바일에서는 parallax 비활성화
     */
    if (window.innerWidth <= 900) {
        heroVisual.style.transform =
            "none";
        return;
    }
}
window.addEventListener(
    "scroll",
    handleParallax,
    { passive: true }
);
/* ========================================
   RESIZE
======================================== */
window.addEventListener(
    "resize",
    () => {
        if (
            window.innerWidth > 900
        ) {
            nav.classList.remove(
                "open"
            );
            mobileMenu.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }
);
/* ========================================
   INITIALIZE
======================================== */
handleHeaderScroll();
handleParallax();