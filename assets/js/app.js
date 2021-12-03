$(document).ready(function () {
	/**
	 * Testimonials slider
	 */
	let swiper = new Swiper(".testimonials-slider", {
		speed: 800,
		loop: true,
		autoplay: {
			delay: 3000,
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
	swiper.loopDestroy();
	swiper.loopCreate();
});

async function fetchData() {
	let url = "assets/js/data.json";
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

(async function renderData() {
	let data = await fetchData();
	let random = Math.floor(Math.random() * 5);
	let output = data[random].content;
	let factSection = document.querySelector("#fact");
	factSection.innerHTML = output;
})();

async function fetchTestimonials() {
	let url = "assets/js/testimonials.json";
	try {
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		console.log(error);
	}
}

(async function renderTestimonials() {
	let users = await fetchTestimonials();
	let wrapper = document.querySelector(".swiper-wrapper");
	let output = "";
	users.forEach((user) => {
		output += `
	    <div class="swiper-slide">
	        <div class="testimonial-item">
	            <img src="assets/img/${user.imgURL}" class="testimonial-img img-fluid" alt="Photo of ${user.name}"/>
	            <h3>${user.name}</h3>
	            <h4>${user.age} Tahun</h4>
	            <p> ${user.testimonial} </p>
	        </div>
	    </div>
		<!-- End testimonial item -->
	    `;
	});
	wrapper.innerHTML += output;
})();
