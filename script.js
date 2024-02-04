let scroll1;
let scroll2;
(function () {	
	// 1. AOS initialization
	AOS.init({
		disable: false,
		startEvent: "DOMContentLoaded",
		initClassName: "aos-init",
		animatedClassName: "aos-animate",
		useClassNames: false,
		disableMutationObserver: false,
		debounceDelay: 50,
		throttleDelay: 99,
		offset: 120,
		delay: 50,
		duration: 600,
		easing: "cubic-bezier(0.77, 0, 0.175, 1)",
		once: true,
		mirror: false,
		anchorPlacement: "top-bottom",
	});
	
	// 2. Typing animation
	const typedElements = document.querySelectorAll(".typed-animation");
		if (typedElements.length > 0) {
			typedElements.forEach((typedElement) => {
				const typedAnimation = new Typed(typedElement, {
					strings: JSON.parse(typedElement.dataset.strings),
					typeSpeed: 80,
					backSpeed: 40,
					backDelay: 3000,
					startDelay: 1000,
					fadeOut: true,
					loop: true,
				});
			});
		}

	// 3. Sticky navbar
	const header = document.querySelector(".navbar");
	const htmlBody = document.querySelector("html");

	const headroomOptions = {
		// vertical offset in px before element is first unpinned
		offset: {
			up: 100,
			down: 50,
		},
		// scroll tolerance in px before state changes
		tolerance: {
			up: 5,
			down: 0,
		},
		// css classes to apply
		classes: {
			// when element is initialised
			initial: "headroom",
			// when scrolling up
			pinned: "headroom--pinned",
			// when scrolling down
			unpinned: "headroom--unpinned",
			// when above offset
			top: "headroom--top",
			// when below offset
			notTop: "headroom--not-top",
			// when at bottom of scroll area
			bottom: "headroom--bottom",
			// when not at bottom of scroll area
			notBottom: "headroom--not-bottom",
			// when frozen method has been called
			frozen: "headroom--frozen",
		},
	};

	if (header) {
		// Initialize headroom
		const headroom = new Headroom(header, headroomOptions);
		headroom.init();

		// body padding top of fixed header
		const onSectionTop = header.classList.contains("on-over");
		if (!onSectionTop) {
			const headerHeight = header.offsetHeight;
			htmlBody.style.paddingTop = headerHeight + "px";
			htmlBody.style.scrollPaddingTop = headerHeight + "px";
		}

		// Collapse navbar menu on scroll down
		if (window.matchMedia("(max-width: 991px)").matches) {
			
			const navbarCollapse = header.querySelector(".navbar-collapse");
			const navbarToggler = header.querySelector(".navbar-toggler");

			window.addEventListener("scroll", () => {
				const scrollPosition = window.scrollY;
				const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true";
				
				if (isExpanded && scrollPosition > 0) {
					navbarCollapse.classList.remove("show");
					navbarToggler.setAttribute("aria-expanded", "false");
				}
			});
		}

		window.addEventListener("scroll", () => {
			scroll1 = window.scrollY;
			setTimeout(function() {
				scroll2 = window.scrollY;
			}, 500);
			let dir = (scroll1-scroll2) >= 0 ? 1 : -1;
			console.log("dir", dir);

			if (dir === +1) {
				const scrollPosition = window.scrollY;
				const d1 = document.getElementById("d1");
				const d2 = document.getElementById("d2");
				if (scrollPosition >= 50) {
					d1.style.opacity = 0;
					d1.style.visibility = "hidden";
					d1.style.top = "40";
					d2.style.opacity = 0;
					d2.style.visibility = "hidden";
					d2.style.top = "40";
				}
			}

			if (dir === -1) {
				const scrollPosition = window.scrollY;
				const d1 = document.getElementById("d1");
				const d2 = document.getElementById("d2");
				if (scrollPosition <= 105) {
					d1.style.removeProperty("opacity");
					d1.style.removeProperty("visibility");
					d1.style.removeProperty("top");
					d2.style.removeProperty("opacity");
					d2.style.removeProperty("visibility");
					d2.style.removeProperty("top");
				}
			}
		});
	}
})();