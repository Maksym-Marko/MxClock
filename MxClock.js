function createClock(settings){

	// default
	var sizeClock = (typeof settings === "undefined" || typeof settings.sizeClock === "undefined") ? 300 : settings.sizeClock;
	var moveToCenter = (typeof settings === "undefined" || typeof settings.moveToCenter === "undefined") ? 3 : settings.moveToCenter;
	var fontSizeNumbers = (typeof settings === "undefined" || typeof settings.fontSizeNumbers === "undefined") ? 20 : settings.fontSizeNumbers;
	var backgroundColor = (typeof settings === "undefined" || typeof settings.backgroundColor === "undefined") ? '#d0b900' : settings.backgroundColor;
	var centerCircle = (typeof settings === "undefined" || typeof settings.centerCircle === "undefined") ? 52 : settings.centerCircle;
	var colorCenterCircle = (typeof settings === "undefined" || typeof settings.colorCenterCircle === "undefined") ? '#5100d0' : settings.colorCenterCircle;
	var gradientCenter = (typeof settings === "undefined" || typeof settings.gradientCenter === "undefined") ? '#fff' : settings.gradientCenter;
	var gradientOutside = (typeof settings === "undefined" || typeof settings.gradientOutside === "undefined") ? '#17d000' : settings.gradientOutside;
	var colorNumbers = (typeof settings === "undefined" || typeof settings.colorNumbers === "undefined") ? '#0017d0' : settings.colorNumbers;
	var colorSecondsDots = (typeof settings === "undefined" || typeof settings.colorSecondsDots === "undefined") ? '#d05100' : settings.colorSecondsDots;
	var sizeSecondsDots = (typeof settings === "undefined" || typeof settings.sizeSecondsDots === "undefined") ? 1 : settings.sizeSecondsDots;
	var hourArrowSize = (typeof settings === "undefined" || typeof settings.hourArrowSize === "undefined") ? 25 : settings.hourArrowSize;
	var minuteArrowSize = (typeof settings === "undefined" || typeof settings.minuteArrowSize === "undefined") ? 35 : settings.minuteArrowSize;	
	var secondArrowSize = (typeof settings === "undefined" || typeof settings.secondArrowSize === "undefined") ? 45 : settings.secondArrowSize;


	var canvas = document.getElementById( 'MxClock' ),
		c = canvas.getContext( '2d' ),
		radius = sizeClock / moveToCenter,
		MATH_PI = Math.PI * 2;

	// set width
	canvas.width = sizeClock;
	canvas.height = sizeClock;

	c.fillStyle = backgroundColor;
	c.beginPath();
	c.arc( canvas.width / 2, canvas.height / 2, canvas.width / 2,  0, MATH_PI, false );
	c.fill();
	c.closePath();

	c.fillStyle = colorCenterCircle;
	c.beginPath();
	c.arc( canvas.width / 2, canvas.height / 2, centerCircle,  0, MATH_PI, false );
	c.fill();
	c.closePath();

	function isInteger( num ){
		return ( num ^ 0 ) === num;
	}

	function PaintClock( x, y ){
		this.x = x;
		this.y = y;
		this.angleSMH = [];
		this.sizeSMH = [ hourArrowSize, minuteArrowSize, secondArrowSize ];
	}

	PaintClock.prototype.draw = function(){

		// Clock circle
		c.beginPath();
		c.arc( this.x, this.y, radius, 0, MATH_PI, false );
		c.closePath();

		// Date
		d = new Date(),
		s = d.getSeconds(),
		m = d.getMinutes(),
		h = d.getHours();
		h = h % 12;
		hPercentM = ( m * 100 / 60 ) * 0.01;
		corectDate = 15;

		this.angleSMH = [
			MATH_PI * ( ( h + hPercentM ) - 15 ) / 12,
			MATH_PI * ( m - corectDate ) / 60,
			MATH_PI * ( s - corectDate ) / 60
		];

		// Arrows
		for( var i = 0; i < 3; i++ ){

			x = this.x + radius * Math.cos( this.angleSMH[i] );
			y = this.y + radius * Math.sin( this.angleSMH[i] );

			rgd = c.createRadialGradient( x, y, this.sizeSMH[i], x, y, 0 );
			rgd.addColorStop( 1, gradientCenter );
			rgd.addColorStop( 0, gradientOutside );
			c.fillStyle = rgd;
			c.beginPath();
			c.arc( x, y, this.sizeSMH[i], 0, MATH_PI, false );
			c.fill();
			c.closePath();

		}

		// Draw num
		c.font = fontSizeNumbers + 'px Arial';

		for( var hn = 1; hn <= 60; hn++ ){
			x = this.x + radius * Math.cos( MATH_PI * hn / 60 );
			y = this.y + radius * Math.sin( MATH_PI * hn / 60 );
			xNum = this.x + radius * Math.cos( MATH_PI * ( hn - 15 ) / 60 );
			yNum = this.y + radius * Math.sin( MATH_PI * ( hn - 15 ) / 60 );

			getNum = hn / 5;
			if( isInteger( getNum ) ){
				c.fillStyle = colorNumbers;
				c.fillText( hn / 5, xNum - ( fontSizeNumbers / 2.2 ) , yNum + ( fontSizeNumbers / 2.2 ) );
			} else{
				c.fillStyle = colorSecondsDots;
				c.beginPath();
				c.arc( x, y, sizeSecondsDots, 0, MATH_PI, false );
				c.fill();
				c.closePath();
			}					
		}

	}

	var clock = new PaintClock( sizeClock / 2, sizeClock / 2 );

	setInterval( function(){
		c.clearRect( 0, 0, canvas.width, canvas.height );
		c.fillStyle = backgroundColor;
		c.beginPath();
		c.arc( canvas.width / 2, canvas.height / 2, canvas.width / 2,  0, MATH_PI, false );
		c.fill();
		c.closePath();

		c.fillStyle = colorCenterCircle;
		c.beginPath();
		c.arc( canvas.width / 2, canvas.height / 2, centerCircle,  0, MATH_PI, false );
		c.fill();
		c.closePath();

		clock.draw();
	},1000 );
}

var settings = {};