class Test {
	constructor(data) {
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.activeIndex = 0;
		this.answers = {
			А: 0,
			Б: 0,
			В: 0,
			Г: 0,
		};

		this.$testContainer = $(".test");
		this.$questionCounter = $(".test__counter span");
		this.$questionTitle = $(".test__title");
		this.$answerItem = $(".test__item");
		this.$answer = $(".test__answer");
		this.$questionWomanImage = $(".test__woman");

		this.$resultFrameTitle = $(".result__answer");
		this.$resultFrameText = $(".result__text");
		this.$resultFrameInfo = $(".result__info");
		this.$resultWomanImage = $(".result__woman-img");
		this.$resultBrandImage = $(".result__brand-img");
	}

	init() {
		this.handleEvents();
		this.renderQuestion();
	}

	handleEvents() {
		this.$answerItem.on("click", (e) => {
			const id = $(e.target).closest(".test__item").data("id");
			this.answers[id] += 1;
			this.activeIndex += 1;
			if (this.activeIndex >= this.questions.length) {
				this.renderResults();
			} else {
				this.renderQuestion();
			}
		});
		$(".result__btn").on("click", () => {
			fullpage_api.setMouseWheelScrolling(true);
			fullpage_api.setAllowScrolling(true);
			setTimeout(() => {
				$("body").removeClass("show-result");
			}, 700);
			this.activeIndex = 0;
			this.answers = {
				А: 0,
				Б: 0,
				В: 0,
				Г: 0,
			};
			this.renderQuestion();
		});
	}

	getTestClass() {
		if (this.activeIndex >= 6) {
			return "test_images";
		}
		if (this.activeIndex % 2) {
			return "test_right";
		} else {
			return "test_left";
		}
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		const { title, answers } = currentQuestion;
		this.$testContainer.removeClass("test_left test_right test_images");
		this.$testContainer.attr("data-id", this.activeIndex);
		this.$testContainer.addClass(this.getTestClass());
		this.$questionCounter.text(this.activeIndex + 1);
		this.$questionTitle.html(title);
		this.$questionWomanImage.html(
			`<img src="/images/test-woman-${this.activeIndex + 1}.jpg" />`
		);
		this.$answerItem.each((id, item) => {
			if (this.activeIndex < this.questions.length - 1) {
				$(item).find(".test__answer-text").html(answers[id].text);
			} else {
				$(item)
					.find(".test__answer-text")
					.html(`<img src="/images/${answers[id].text}" />`);
			}
		});
	}

	getWinner() {
		let count = 0;
		let winner = "";
		for (let key in this.answers) {
			if (this.answers[key] > count) {
				count = this.answers[key];
				winner = key;
			}
		}
		return winner;
	}

	getWinnerIndex(winner) {
		let index = 0;
		this.results.forEach((item, i) => {
			if (item.id === winner) {
				index = i;
			}
		});
		return index + 1;
	}

	renderResults() {
		const winner = this.getWinner();
		$("body").addClass("show-result");
		$("html, body").animate(
			{
				scrollTop: $(".result").offset().top,
			},
			500
		);
		const idx = this.getWinnerIndex(winner);
		const currentResult = this.results.find((item) => item.id === winner);
		const { title, text, info } = currentResult;
		this.$resultFrameTitle.html(title);
		this.$resultFrameText.html(text);
		this.$resultFrameInfo.html(info);
		this.$resultWomanImage.html(
			`<img src="/images/result-woman-${idx}.png" />`
		);
		this.$resultBrandImage.html(`<img src="/images/result-${idx}.png" />`);
		fullpage_api.setMouseWheelScrolling(false);
		fullpage_api.setAllowScrolling(false);
	}
}

export default Test;
