define([
	"dojo/_base/declare", // declare
	"dojo/query", // query
	"../registry",	// registry.byNode
	"../popup",		// dijit.popup2.hide
	"./Button",
	"../_Container",
	"../_HasDropDown",
	"dojo/text!./templates/DropDownButton.html"
], function(declare, query, registry, popup, Button, _Container, _HasDropDown, template){

/*=====
	Button = dijit.form.Button;
	_Container = dijit._Container;
	_HasDropDown = dijit._HasDropDown;
=====*/

// module:
//		dijit/form/DropDownButton
// summary:
//		A button with a drop down


return declare("dijit.form.DropDownButton", [Button, _Container, _HasDropDown], {
	// summary:
	//		A button with a drop down
	//
	// example:
	// |	<button data-dojo-type="dijit.form.DropDownButton">
	// |		Hello world
	// |		<div data-dojo-type="dijit.Menu">...</div>
	// |	</button>
	//
	// example:
	// |	var button1 = new dijit.form.DropDownButton({ label: "hi", dropDown: new dijit.Menu(...) });
	// |	win.body().appendChild(button1);
	//

	baseClass : "dijitDropDownButton",

	templateString: template,

	_fillContent: function(){
		// Overrides Button._fillContent().
		//
		// My inner HTML contains both the button contents and a drop down widget, like
		// <DropDownButton>  <span>push me</span>  <Menu> ... </Menu> </DropDownButton>
		// The first node is assumed to be the button content. The widget is the popup.

		if(this.srcNodeRef){ // programatically created buttons might not define srcNodeRef
			//FIXME: figure out how to filter out the widget and use all remaining nodes as button
			//	content, not just nodes[0]
			var nodes = query("*", this.srcNodeRef);
			this.inherited(arguments, [nodes[0]]);

			// save pointer to srcNode so we can grab the drop down widget after it's instantiated
			this.dropDownContainer = this.srcNodeRef;
		}
	},

	startup: function(){
		if(this._started){ return; }

		// the child widget from srcNodeRef is the dropdown widget.  Insert it in the page DOM,
		// make it invisible, and store a reference to pass to the popup code.
		if(!this.dropDown && this.dropDownContainer){
			var dropDownNode = query("[widgetId]", this.dropDownContainer)[0];
			this.dropDown = registry.byNode(dropDownNode);
			delete this.dropDownContainer;
		}
		if(this.dropDown){
			popup.hide(this.dropDown);
		}

		this.inherited(arguments);
	},

	isLoaded: function(){
		// Returns whether or not we are loaded - if our dropdown has an href,
		// then we want to check that.
		var dropDown = this.dropDown;
		return (!!dropDown && (!dropDown.href || dropDown.isLoaded));
	},

	loadDropDown: function(){
		// Loads our dropdown
		var dropDown = this.dropDown;
		if(!dropDown){ return; }
		if(!this.isLoaded()){
			var handler = dropDown.on("load", this, function(){
				handler.remove();
				this.openDropDown();
			});
			dropDown.refresh();
		}else{
			this.openDropDown();
		}
	},

	isFocusable: function(){
		// Overridden so that focus is handled by the _HasDropDown mixin, not by
		// the _FormWidget mixin.
		return this.inherited(arguments) && !this._mouseDown;
	}
});

});
