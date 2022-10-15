import Test from "./test";
import $ from "jquery";
import DATA from "./data";

const test = new Test(DATA);

$(() => {
	test.init();

	$(".promo__arrow").on("click", () => {
		$("body").addClass("show-test");
		$("html, body").animate(
			{
				scrollTop: $(".test").offset().top,
			},
			500
		);
	});

	new fullpage("#fullpage", {
		licenseKey: "DB3EE7EC-94FE42A9-B0CA39EF-B4289CFF",
		scrollOverflow: true,
		scrollOverflowReset: true,
		anchors: ["section1", "section2", "section3"],
		onLeave: function (origin, destination, direction) {
			let skip = false; // do we need to skip some slides?
			let nextSibling = destination.item;
			let nextSlideNr = destination.index + 1; // convert from index to slide nr.

			// in/decrement nextSlideNr to point to next non-hidden slide
			while ($(nextSibling).is(":hidden")) {
				nextSlideNr += direction === "down" ? 1 : -1;
				nextSibling =
					direction === "down"
						? nextSibling.nextElementSibling
						: nextSibling.previousElementSibling;

				skip = true;
			}

			if (skip) {
				fullpage_api.moveTo(nextSlideNr);
				return false; // cancel slide that triggered this onLeave
			}
		},
	});
});
