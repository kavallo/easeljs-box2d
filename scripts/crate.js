(function(window){

	function Crate(xPos, yPos) {

		// Create a new EaselJS display object (bitmap)

		this.view = new createjs.Bitmap("/img/crate.png");	
		this.view.regX = 40;
		this.view.regY = 40;

		// Create the Box2D body

		var fixtureDef = new box2d.b2FixtureDef();
		fixtureDef.density = 5.0;

		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = xPos / SCALE;
		bodyDef.position.y = yPos / SCALE;

		fixtureDef.shape = new box2d.b2PolygonShape();
		fixtureDef.shape.SetAsBox(40 / SCALE, 40 / SCALE);

		this.view.body = world.CreateBody(bodyDef);
		this.view.body.CreateFixture(fixtureDef);

		// Object update function

		this.view.on("tick", function(e){
		
			// Align display object with Box2D body

			this.x = this.body.GetPosition().x * SCALE;
			this.y = this.body.GetPosition().y * SCALE;
			this.rotation = this.body.GetAngle() * ( 180 / Math.PI ); // Radians to degrees

		});

	}

	window.Crate = Crate;

})(window);
