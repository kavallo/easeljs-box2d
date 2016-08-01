var box2d = {

	b2Vec2 					: Box2D.Common.Math.b2Vec2,
	b2BodyDef 			: Box2D.Dynamics.b2BodyDef,
	b2Body 					: Box2D.Dynamics.b2Body,
	b2FixtureDef 		: Box2D.Dynamics.b2FixtureDef,
	b2Fixture 			: Box2D.Dynamics.b2Fixture,
	b2World 				: Box2D.Dynamics.b2World,
	b2MassData 			: Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape 	: Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape 	: Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw 		: Box2D.Dynamics.b2DebugDraw

};

const SCALE = 30;

var stage;
var world;

function init() {

	stage = new createjs.Stage(document.getElementById("canvas")); // Initiate the stage

	initWorld(); // Create Box2D world

	draw();

	createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.useRAF = true; // Use request animation frame if available

}

function initWorld() {

	world = new box2d.b2World( new box2d.b2Vec2(0,50), true );

	// Set debug draw

	var debugDraw = new box2d.b2DebugDraw();
	debugDraw.SetSprite(stage.canvas.getContext('2d'));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointDraw);

	world.SetDebugDraw(debugDraw);

	// Create the ground

	var fixtureDef 			= new box2d.b2FixtureDef();
	fixtureDef.density 	= 1;
	fixtureDef.friction = 0.5;

	var bodyDef = new box2d.b2BodyDef();
	bodyDef.type = box2d.b2Body.b2_staticBody;
	bodyDef.position.x = 400 / SCALE;
	bodyDef.position.y = 600 / SCALE;

	fixtureDef.shape = new box2d.b2PolygonShape();
	fixtureDef.shape.SetAsBox(400 / SCALE, 0 / SCALE);

	world.CreateBody(bodyDef).CreateFixture(fixtureDef);

}

function draw() {

	stage.on("stagemousedown", function(e){

		var crate = new Crate(e.stageX, e.stageY);

		stage.addChild(crate.view);

	});

}

function update() {
	
	stage.update();
	//world.DrawDebugData();
	world.Step(1/60, 10, 10);
	world.ClearForces();

}
