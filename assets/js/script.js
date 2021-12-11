/**
 * Check whether the document is ready or not
 * @param {*} callback
 * @returns callback()
 */
function ready(callback) {
	if (document.readyState != "loading") return callback();
	document.addEventListener("DOMContentLoaded", callback);
}

("use strict");

ready(() => {
	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		if (all) {
			select(el, all).forEach((e) => e.addEventListener(type, listener));
		} else {
			select(el, all).addEventListener(type, listener);
		}
	};

	/**
	 * Easy on scroll event listener
	 */
	const onscroll = (el, listener) => {
		el.addEventListener("scroll", listener);
	};

	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
	let selectHeader = select("#header");
	if (selectHeader) {
		const headerScrolled = () => {
			if (window.scrollY > 50) {
				selectHeader.classList.add("header-scrolled");
			} else {
				selectHeader.classList.remove("header-scrolled");
			}
		};
		window.addEventListener("load", headerScrolled);
		onscroll(document, headerScrolled);
	}

	/**
	 * Back to top button
	 */
	let backToTop = select(".back-to-top");
	if (backToTop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 200) {
				backToTop.classList.add("active");
			} else {
				backToTop.classList.remove("active");
			}
		};
		window.addEventListener("load", toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}

	/**
	 * Mobile nav toggle
	 */
	on("click", ".mobile-nav-toggle", function () {
		select("#navbar").classList.toggle("navbar-mobile");
		this.classList.toggle("bi-list");
		this.classList.toggle("bi-x");
	});

	/**
	 * Mobile nav dropdowns activate
	 */
	on(
		"click",
		".navbar .dropdown > a",
		function (e) {
			if (select("#navbar").classList.contains("navbar-mobile")) {
				e.preventDefault();
				this.nextElementSibling.classList.toggle("dropdown-active");
			}
		},
		true
	);

	const disabledFeatures = () => {
		Swal.fire({
			title: "Maaf..",
			icon: "error",
			html: "Fitur masih belum tersedia:(",
			confirmButtonColor: "#ff5349",
			scrollbarPadding: true,
		});
	};

	/**
	 * Show "feature disabled" message
	 */
	on("click", ".disabled", disabledFeatures, true);

	/**
	 * Back to top scroll
	 */
	backToTop.addEventListener(
		"click",
		() => {
			window.scroll({
				top: 0,
				behavior: "smooth",
			});
		},
		false
	);
	/**
	 * Scroll to element
	 */
	let hyperlink = document.querySelectorAll('a[href^="#"]');
	//scroll to element
	hyperlink.forEach((element) => {
		element.addEventListener("click", (event) => {
			event.preventDefault();
			let hrefLink = element.getAttribute("href");
			if (hrefLink === "#heroCarousel") return;
			if (hrefLink === "#") return disabledFeatures();
			document.querySelector(hrefLink).scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	});

	/**
	 * Testimonials slider
	 */
	new Swiper(".testimonials-slider", {
		speed: 800,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: 1,
		loopedSlides: 1,
		loopAdditionalSlides: 10,
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		updateOnWindowResize: true,
		spaceBetween: 200,
	});

	/**
	 * Preloader
	 */
	let preloader = document.querySelector(".spinner");
	preloader.classList.add("hide");
	preloader.classList.remove("show");

	/**
	 * change bg hero on click
	 */
	let carouselBg = select(".hero");
	let carouselItems = select(".carousel-item", true);
	let firstCarousel = carouselItems[0];
	let secondCarousel = carouselItems[1];
	let thirdCarousel = carouselItems[2];
	on("click", "#heroCarousel", function () {
		if (firstCarousel.classList.contains("active")) {
			carouselBg.style.background =
				"url(assets/img/carousel-bg.png) no-repeat center center / cover";
		}
		if (secondCarousel.classList.contains("active")) {
			carouselBg.style.background =
				"url(assets/img/carousel-bg-2.jpg) no-repeat center center / cover";
		}
		if (thirdCarousel.classList.contains("active")) {
			carouselBg.style.background =
				"url(assets/img/carousel-bg-3.jpg) no-repeat center center / cover";
		}
	});
});

/**
 * Animation on scroll
 */
(() => {
	AOS.init({
		duration: 800,
		easing: "ease-in-out",
		once: true,
		mirror: false,
	});
})();
