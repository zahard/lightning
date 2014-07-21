function Circle(cxt, x,y,r, strokeColor, fillColor ){
	this.x = x;
	this.y = y;
	this.radius = r;
	this.strokeColor = strokeColor || '#000000';	
	this.fillColor = fillColor || null;

	Circle.prototype.draw = function() {
		cxt.save();

		cxt.beginPath();
		cxt.arc(this.x, this.y, this.radius,  rad(0) , rad(360), false );
		
		//cxt.lineTo(this.x,this.y);

		cxt.strokeStyle = this.strokeColor;
		cxt.stroke();
		if ( this.fillColor ) {			
			cxt.lineWidth = 2;
			cxt.fillStyle = this.fillColor;
			cxt.fill();
		} 
		cxt.closePath();

		cxt.restore();
	}

	Circle.prototype.move = function(position) {
		this.x = position.x;
		this.y = position.y;
	}

	return this;
}


function Pacman(cxt, x,y,r, direction, strokeColor, fillColor ) {
	this.x = x;
	this.y = y;
	this.dir = direction;
	this.radius = r;
	this.strokeColor = strokeColor || '#000000';	
	this.fillColor = fillColor || null;

	this.openRatio = 60;
	this.closing = true;

	Pacman.prototype.draw = function() {

		cxt.save();

		cxt.beginPath();
		cxt.arc(this.x, this.y, this.radius,  rad(this.mouthLeft) , rad(this.mouthRight), false );
		cxt.lineTo(this.x,this.y);
		cxt.closePath();

		cxt.strokeStyle = this.strokeColor;
		cxt.lineWidth = 3;
		cxt.stroke();

		if ( this.fillColor ) {			
			cxt.fillStyle = this.fillColor;
			cxt.fill();
		} 
		
		cxt.restore();
	}

	Pacman.prototype.move = function(position) {
		this.x = position.x;
		this.y = position.y;
	}

	Pacman.prototype.update = function() {
		
		if( this.closing === true ) {
			this.openRatio -= 4;
			if( this.openRatio <= -1 ) {
				this.openRatio = 1;
				this.closing = false;
			}
		} else {
			this.openRatio += 4;
			if( this.openRatio >= 61 ) {
				this.openRatio = 59;
				this.closing = true;
			}
		}

		this.mouthLeft = this.openRatio;
		this.mouthRight = 360 - this.openRatio;

		switch( this.dir ) {
			case 'down':
				this.y += 2;
				this.mouthLeft += 180;
				this.mouthRight += 180;
				break;
			case 'up': 
				this.y -= 2;
				break;
				
			case 'left': 
				this.x -= 2;
				this.mouthLeft += 270;
				this.mouthRight += 270;
				break;

			case 'right': 
				this.x += 2;
				this.mouthLeft += 90;
				this.mouthRight += 90;
				break;
		}
	}

	return this;
}
