dependencies = {
	packages:[{
		name:"dojo",
		location: "./lib/dojo",
		lib:".",
		main:"main"
	},{
		name:"dijit",
		location: "./lib/dijit",
		lib:".",
		main:"main"
	},{
		name:"dojox",
		location:"./lib/dojox",
		lib:".",
		main:"main"
	}],
	optimize:"shrinksafe",
    cssOptimize:"comments",
    mini:true,
    profile:"standard",
    internStrings:true
	
}
