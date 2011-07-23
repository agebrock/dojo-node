define(["dojo/_base/kernel",
				"dojo/_base/declare",
				"dojox/geo/openlayers/tests/ecr/EcrRenderer",
				"dojox/geo/openlayers/GeometryFeature",
				"dojox/geo/openlayers/Point"], function(dojo, declare){

	return dojo.declare("dojox.geo.openlayers.tests.ecr.PortRenderer", [dojox.geo.openlayers.tests.ecr.EcrRenderer], {

		constructor : function(opts, context){},

		_renderItem : function(o, item){
			var gf = null;
			if (o.type == "circle") {
				var coords = this.getCoordinates(item);
				var g = new dojox.geo.openlayers.Point({
					x : coords[0],
					y : coords[1]
				});
				gf = new dojox.geo.openlayers.GeometryFeature(g);
				gf.setShapeProperties({
					r : o.radius
				});
			}
			return gf;
		}
	});
});
