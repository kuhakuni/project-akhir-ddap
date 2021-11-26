(($) => {
	"use strict";
	$(document).ready(() => {
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
		 * Scrolls to an element with header offset
		 */
		const scrollto = (el) => {
			let header = select("#header");
			let offset = header.offsetHeight;

			if (!header.classList.contains("header-scrolled")) {
				offset -= 10;
			}

			let elementPos = select(el).offsetTop;
			window.scrollTo({
				top: elementPos - offset,
				behavior: "smooth",
			});
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
		let backtotop = select(".back-to-top");
		if (backtotop) {
			const toggleBacktotop = () => {
				if (window.scrollY > 50) {
					backtotop.classList.add("active");
				} else {
					backtotop.classList.remove("active");
				}
			};
			window.addEventListener("load", toggleBacktotop);
			onscroll(document, toggleBacktotop);
		}

		/**
		 * Mobile nav toggle
		 */
		on("click", ".mobile-nav-toggle", function (e) {
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

		/**
		 * Porfolio isotope and filter
		 */
		window.addEventListener("load", () => {
			let portfolioContainer = select(".portfolio-container");
			if (portfolioContainer) {
				let portfolioIsotope = new Isotope(portfolioContainer, {
					itemSelector: ".portfolio-item",
					layoutMode: "fitRows",
				});

				let portfolioFilters = select("#portfolio-flters li", true);

				on(
					"click",
					"#portfolio-flters li",
					function (e) {
						e.preventDefault();
						portfolioFilters.forEach(function (el) {
							el.classList.remove("filter-active");
						});
						this.classList.add("filter-active");

						portfolioIsotope.arrange({
							filter: this.getAttribute("data-filter"),
						});
						aos_init();
					},
					true
				);
			}
		});

		/**
		 * Show "feature disabled" message
		 */
		$(".form").click((e) => {
			e.preventDefault();
			Swal.fire({
				title: "Maaf..",
				icon: "error",
				html: "Fitur masih belum tersedia:(",
				confirmButtonColor: "#ff5349",
				scrollbarPadding: true,
			});
		});

		/**
		 * Back to top scroll
		 */
		$(".back-to-top").click(() => {
			$("body,html").animate(
				{
					scrollTop: 0,
				},
				50
			);
		});
		/**
		 * Scroll to element
		 */
		$('a[href^="#"]').on("click", function (e) {
			e.preventDefault();
			$("html, body").animate(
				{
					scrollTop: $($(this).attr("href")).offset().top - 20,
				},
				50,
				"linear"
			);
		});
		/**
		 * Testimonials slider
		 */
		new Swiper(".testimonials-slider", {
			speed: 600,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			slidesPerView: "auto",
			pagination: {
				el: ".swiper-pagination",
				type: "bullets",
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 40,
				},

				1200: {
					slidesPerView: 3,
				},
			},
		});

		/**
		 * Animation on scroll
		 */
		function aos_init() {
			AOS.init({
				duration: 800,
				easing: "ease-in-out",
				once: true,
				mirror: false,
			});
		}
		window.addEventListener("load", () => {
			aos_init();
		});
	});
})(jQuery);
