define(["dojo/_base/kernel", "../../main"], function(dojo, dojox){

var primitive = dojo.getObject("charting.scaler.primitive", true, dojox);

return dojo.mixin(primitive, {
	buildScaler: function(/*Number*/ min, /*Number*/ max, /*Number*/ span, /*Object*/ kwArgs){
		if(min == max){
			// artificially extend bounds
			min -= 0.5;
			max += 0.5;
			// now the line will be centered
		}
		return {
			bounds: {
				lower: min,
				upper: max,
				from:  min,
				to:    max,
				scale: span / (max - min),
				span:  span
			},
			scaler: primitive
		};
	},
	buildTicks: function(/*Object*/ scaler, /*Object*/ kwArgs){
		return {major: [], minor: [], micro: []};	// Object
	},
	getTransformerFromModel: function(/*Object*/ scaler){
		var offset = scaler.bounds.from, scale = scaler.bounds.scale;
		return function(x){ return (x - offset) * scale; };	// Function
	},
	getTransformerFromPlot: function(/*Object*/ scaler){
		var offset = scaler.bounds.from, scale = scaler.bounds.scale;
		return function(x){ return x / scale + offset; };	// Function
	}
});
});
