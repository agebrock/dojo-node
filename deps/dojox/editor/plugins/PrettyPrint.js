define("dojox/editor/plugins/PrettyPrint", ["dojo", "dijit", "dojox", "dijit/_editor/_Plugin", "dojox/html/format"], function(dojo, dijit, dojox) {

dojo.declare("dojox.editor.plugins.PrettyPrint",dijit._editor._Plugin,{
	// summary:
	//		This plugin provides a mechanism by which to 'beautify HTML'
	//		generated by the editor.  It is by no means perfect.

	// indentBy [public] Integer
	//		The indentBy property configures if the plugin should use a 
	//		set number of spaces for indent (between 1-5), or just tab.
	//		The default value is -1, which means tab.
	indentBy: -1,

	// lineLength [public] Integer
	//		The lineLength property configures if the plugin should break up long
	//		text lines into N lines of 'lineLength' length.  This parameter does not 
	//		take into account indention depth, only text line length.  The default is -1
	//		which means unlimited line length.
	lineLength: -1,

	//	useDefaultCommand [protected]
	//		Over-ride indicating that the command processing is done all by this plugin.
	useDefaultCommand: false,
	
	// map [public] Array
	//		An array of arrays that define out entity character to encoding mappings.
	//		see the dojox.html.entities definitions for more details.  The default is
	//		HTML + cent, pound, yen, ellipsis, copyright, registered trademark.
	entityMap: null,

	// xhtml: [public] boolean
	//		Flag to denote that the PrettyPrint plugin try to generate XHTML compliant 
	//		markup.

	_initButton: function(){
		// summary:
		//		Over-ride for creation of the resize button.
		delete this.command; 
	},

	setToolbar: function(toolbar){
		// summary:
		//		Over-ride to do nothing.  
		//		We don't want to append a button, we take over getValue.
	},

	setEditor: function(editor){
		// summary:
		//		Over-ride to take over getValue of editor so that
		//		we can 'pretty' the output.
		this.inherited(arguments);
		var self = this;
		this.editor.onLoadDeferred.addCallback(function(){
			self.editor._prettyprint_getValue = self.editor.getValue;
			self.editor.getValue = function(){
				var val = self.editor._prettyprint_getValue(arguments);
				return dojox.html.format.prettyPrint(val, self.indentBy, self.lineLength, self.entityMap, self.xhtml);
			};

			// The following are implemented as 'performance' functions.  Don't prettyprint
			// content on internal state changes, just on calls to actually get values.
			self.editor._prettyprint_endEditing = self.editor._endEditing;
			self.editor._prettyprint_onBlur = self.editor._onBlur;
			self.editor._endEditing = function(ignore_caret){
				var v = self.editor._prettyprint_getValue(true);
				self.editor._undoedSteps=[];//clear undoed steps
				self.editor._steps.push({text: v, bookmark: self.editor._getBookmark()});
			}
			self.editor._onBlur = function(e){
				this.inherited("_onBlur", arguments);
				var _c=self.editor._prettyprint_getValue(true);
				if(_c!=self.editor.savedContent){
					self.editor.onChange(_c);
					self.editor.savedContent=_c;
				}
			}
		});
	}
});

// Register this plugin.
dojo.subscribe(dijit._scopeName + ".Editor.getPlugin",null,function(o){
	if(o.plugin){ return; }
	var name = o.args.name.toLowerCase();
	if(name === "prettyprint"){
		o.plugin = new dojox.editor.plugins.PrettyPrint({
			indentBy: ("indentBy" in o.args)?o.args.indentBy:-1,
			lineLength: ("lineLength" in o.args)?o.args.lineLength:-1,
			entityMap: ("entityMap" in o.args)?o.args.entityMap:dojox.html.entities.html.concat([
				["\u00A2","cent"],["\u00A3","pound"],["\u20AC","euro"],
				["\u00A5","yen"],["\u00A9","copy"],["\u00A7","sect"],
				["\u2026","hellip"],["\u00AE","reg"]
			]),
			xhtml: ("xhtml" in o.args)?o.args.xhtml:false
		});
	}
});

});
