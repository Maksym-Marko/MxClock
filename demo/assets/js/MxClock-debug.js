'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// MxClock
var CreateClock = function () {
	function CreateClock(ID, settings) {
		_classCallCheck(this, CreateClock);

		// get elevent
		this.ID = ID.replace('#', '');

		// settings
		this.sizeClock = typeof settings === "undefined" || typeof settings.sizeClock === "undefined" ? 300 : settings.sizeClock;
		this.moveToCenter = typeof settings === "undefined" || typeof settings.moveToCenter === "undefined" ? 3 : settings.moveToCenter;
		this.fontSizeNumbers = typeof settings === "undefined" || typeof settings.fontSizeNumbers === "undefined" ? 20 : settings.fontSizeNumbers;
		this.backgroundColor = typeof settings === "undefined" || typeof settings.backgroundColor === "undefined" ? '#FFCC66' : settings.backgroundColor;
		this.centerCircle = typeof settings === "undefined" || typeof settings.centerCircle === "undefined" ? 52 : settings.centerCircle;
		this.colorCenterCircle = typeof settings === "undefined" || typeof settings.colorCenterCircle === "undefined" ? '#CC9933' : settings.colorCenterCircle;
		this.gradientCenter = typeof settings === "undefined" || typeof settings.gradientCenter === "undefined" ? '#fff' : settings.gradientCenter;
		this.gradientOutside = typeof settings === "undefined" || typeof settings.gradientOutside === "undefined" ? '#999900' : settings.gradientOutside;
		this.colorNumbers = typeof settings === "undefined" || typeof settings.colorNumbers === "undefined" ? '#000066' : settings.colorNumbers;
		this.colorSecondsDots = typeof settings === "undefined" || typeof settings.colorSecondsDots === "undefined" ? '#000066' : settings.colorSecondsDots;
		this.sizeSecondsDots = typeof settings === "undefined" || typeof settings.sizeSecondsDots === "undefined" ? 1 : settings.sizeSecondsDots;
		this.hourArrowSize = typeof settings === "undefined" || typeof settings.hourArrowSize === "undefined" ? 25 : settings.hourArrowSize;
		this.minuteArrowSize = typeof settings === "undefined" || typeof settings.minuteArrowSize === "undefined" ? 35 : settings.minuteArrowSize;
		this.secondArrowSize = typeof settings === "undefined" || typeof settings.secondArrowSize === "undefined" ? 45 : settings.secondArrowSize;

		this.canvas = document.getElementById(this.ID);
		this.c = this.canvas.getContext('2d');
		this.radius = this.sizeClock / this.moveToCenter;
		this.MATH_PI = Math.PI * 2;

		this.createClock = this.createClock.bind(this);

		// set width
		this.canvas.width = this.sizeClock;
		this.canvas.height = this.sizeClock;

		// draw arrow
		this.angleSMH = [];
		this.sizeSMH = [this.hourArrowSize, this.minuteArrowSize, this.secondArrowSize];

		// initialize
		this.init();
	}

	// ----------------- helpers


	_createClass(CreateClock, [{
		key: 'createCircle',
		value: function createCircle(_backgroundColor, _arcPapam1, _arcPapam2, _arcPapam3) {
			this.c.fillStyle = _backgroundColor;
			this.c.beginPath();
			this.c.arc(_arcPapam1, _arcPapam2, _arcPapam3, 0, this.MATH_PI, false);
			this.c.fill();
			this.c.closePath();
		}
	}, {
		key: 'isInteger',
		value: function isInteger(num) {
			return (num ^ 0) === num;
		}
		// ----------------- helpers

	}, {
		key: 'createClock',
		value: function createClock() {
			this.createCircle(this.backgroundColor, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2);
		}
	}, {
		key: 'createCenterCircle',
		value: function createCenterCircle() {
			this.createCircle(this.colorCenterCircle, this.canvas.width / 2, this.canvas.height / 2, this.centerCircle);
		}
	}, {
		key: 'PaintClock',
		value: function PaintClock(_x, _y) {

			// Clock circle
			this.c.beginPath();
			this.c.arc(_x, _y, this.radius, 0, this.MATH_PI, false);
			this.c.closePath();

			// Date
			var d = new Date(),
			    s = d.getSeconds(),
			    m = d.getMinutes(),
			    h = d.getHours();
			h = h % 12;
			var hPercentM = m * 100 / 60 * 0.01;
			var corectDate = 15;

			this.angleSMH = [this.MATH_PI * (h + hPercentM - 15) / 12, this.MATH_PI * (m - corectDate) / 60, this.MATH_PI * (s - corectDate) / 60];

			// Arrows
			for (var i = 0; i < 3; i++) {

				var x = _x + this.radius * Math.cos(this.angleSMH[i]);
				var y = _y + this.radius * Math.sin(this.angleSMH[i]);

				var rgd = this.c.createRadialGradient(x, y, this.sizeSMH[i], x, y, 0);
				rgd.addColorStop(1, this.gradientCenter);
				rgd.addColorStop(0, this.gradientOutside);

				this.createCircle(rgd, x, y, this.sizeSMH[i]);
			}

			// Draw num
			this.c.font = this.fontSizeNumbers + 'px Arial';

			for (var hn = 1; hn <= 60; hn++) {
				var _x2 = _x + this.radius * Math.cos(this.MATH_PI * hn / 60);
				var _y2 = _y + this.radius * Math.sin(this.MATH_PI * hn / 60);
				var xNum = _x + this.radius * Math.cos(this.MATH_PI * (hn - 15) / 60);
				var yNum = _y + this.radius * Math.sin(this.MATH_PI * (hn - 15) / 60);

				var getNum = hn / 5;
				if (this.isInteger(getNum)) {
					this.c.fillStyle = this.colorNumbers;
					this.c.fillText(hn / 5, xNum - this.fontSizeNumbers / 2.2, yNum + this.fontSizeNumbers / 2.2);
				} else {
					this.createCircle(this.colorSecondsDots, _x2, _y2, this.sizeSecondsDots);
				}
			}
		}
	}, {
		key: 'drawClock',
		value: function drawClock() {
			this.createClock();
			this.createCenterCircle();
			this.PaintClock(this.sizeClock / 2, this.sizeClock / 2);
		}
	}, {
		key: 'init',
		value: function init() {
			var _this = this;

			this.drawClock();

			setInterval(function () {

				_this.c.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
				_this.drawClock();
			}, 1000);
		}
	}]);

	return CreateClock;
}();