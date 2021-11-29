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
			if (this.href.substring(this.href.lastIndexOf("/") + 1) === "#") return;
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
		});

		/**
		 * Preloader
		 */
		(() => $(".spinner").fadeOut("slow"))();
	});
})(jQuery);

/**
 * Animation on scroll
 */
(() => {
	AOS.init({ duration: 800, easing: "ease-in-out", once: true, mirror: false });
})();
