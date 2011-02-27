define= function(name, deps, def){
		if(!def){
			// less than 3 args
			if(deps){
				// 2 args
				def = deps;
				deps = name;
			}else{
				// one arg
				def = name;
				deps = ["require", "exports", "module"];
			}
			name = currentModule ? currentModule.replace(/\./g,'/') : "anon";
		}
		var dottedName = name.replace(/\//g, ".");
		var exports = dojo.provide(dottedName);

		function resolvePath(relativeId){
			// do relative path resolution
			if(relativeId.charAt(0) === '.'){
				relativeId = name.substring(0, name.lastIndexOf('/') + 1) + relativeId;
				while(lastId !== relativeId){
					var lastId = relativeId;
					relativeId = relativeId.replace(/\/[^\/]*\/\.\.\//,'/');
				}
				relativeId = relativeId.replace(/\/\.\//g,'/');
			}
			return relativeId.replace(/\//g, ".");
		}
		if(typeof def == "function"){
			for(var args= [], depName, i= 0; i<deps.length; i++){
				depName= resolvePath(deps[i]);
				// look for i18n! followed by anything followed by "/nls/" followed by anything without "/" followed by eos.
				var exclamationIndex = depName.indexOf("!");
				if(exclamationIndex > -1){
					//fool the build system
					if(depName.substring(0, exclamationIndex) == "i18n"){
						var match = depName.match(/^i18n\!(.+)\.nls\.([^\.]+)$/);
						dojo["requireLocalization"](match[1], match[2]);
					}
					arg = null; 
				}else{
					var arg;
					switch(depName){
						case "require": 
							arg = function(relativeId){
								return dojo.require(resolvePath(relativeId));
							}; 
							break;
						case "exports": 
							arg = exports; 
							break;
						case "module": 
							var module = arg = {exports: exports};
							break;
						case "dojox": 
							arg = dojo.getObject(depName);
							break;
						case "dojo/lib/kernel": 
						case "dojo/lib/backCompat":
							arg = dojo;
							break;
						default: 
							arg = dojo.require(depName);
					}
				}
				args.push(arg);
			}
			var returned = def.apply(null, args);
		}else{
			returned = def;
		}
		
		if(returned){
			dojo._loadedModules[dottedName] = returned;
			dojo.setObject(dottedName, returned);
		}
		if(module){
			dojo._loadedModules[dottedName] = module.exports;
		}
		return returned;
		
	};
	define.vendor = "dojotoolkit.org";
	define.version = dojo.version;
	define("dojo/lib/kernel", [], dojo);
	define("dojo/lib/backCompat", [], dojo);
	define("dojo", [], dojo);
	define("dijit", [], this.dijit || (this.dijit = {}));
