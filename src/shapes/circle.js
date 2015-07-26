/*
* A circle collision shape
* Author: Ronen Ness, 2015
*/


// set namespace
var SSCD = SSCD || {};

// define the circle shape
// position - starting position (vector)
// radius - circle radius (integer)
SSCD.Circle = function (position, radius)
{
	// call init chain
	this.init();
	
	// set radius and size
	this.__radius = radius;
	this.__size = new SSCD.Vector(radius, radius).multiply_scalar_self(2);

	// set starting position
	this.set_position(position);
};

// set circle methods
SSCD.Circle.prototype = {
	
	__type: "circle",
	
	// render (for debug purposes)
	render: function (ctx, camera_pos)
	{
		// apply camera on position
		var position = this.get_position().sub(camera_pos);
					
		// draw the circle
		ctx.beginPath();
		ctx.arc(position.x, position.y, this.__radius, 0, 2 * Math.PI, false);
		
		// draw stroke
		ctx.lineWidth = "7";
		ctx.strokeStyle = this.__get_render_stroke_color(0.75);
		ctx.stroke();
		
		// draw fill
		ctx.fillStyle = this.__get_render_fill_color(0.35);
		ctx.fill();
	},
	
	// return circle radius
	get_radius: function ()
	{
		return this.__radius;
	},
	
	// return axis-aligned-bounding-box
	build_aabb: function ()
	{
		return new SSCD.AABB(this.get_position().sub_scalar(this.__radius), this.__size);
	},
	
};

// inherit from basic shape class.
// this will fill the missing functions from parent, but will not replace functions existing in child.
SSCD.extend(SSCD.Shape.prototype, SSCD.Circle.prototype);