dependencies = {
	packages:[{
		name:"dojo",
		location:"lib/dojo",
		lib:".",
		main:"lib/main-browser"
	},{
		name:"dijit",
		location:"lib/dijit",
		lib:".",
		main:"lib/main"
	}],

	deps:["main"],

	prefixes: [
		[ "dijit", "lib/dijit" ],
		[ "dojox", "lib/dojox" ]
	]
}
