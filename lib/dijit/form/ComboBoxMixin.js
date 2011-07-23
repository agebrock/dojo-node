define([
	"dojo/_base/kernel", // lang.mixin
	"..",
	"dojo/_base/lang", // lang.mixin
	"dojo/text!./templates/DropDownBox.html",
	"./_AutoCompleterMixin",
	"./_ComboBoxMenu",
	"../_HasDropDown",
	"dojo/store/util/QueryResults",	// dojo.store.util.QueryResults
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit, lang, template){

	// module:
	//		dijit/form/ComboBoxMixin
	// summary:
	//		Provides main functionality of ComboBox widget

	dojo.declare("dijit.form.ComboBoxMixin", [dijit._HasDropDown, dijit.form._AutoCompleterMixin], {
		// summary:
		//		Provides main functionality of ComboBox widget

		// dropDownClass: [protected extension] String
		//		Name of the dropdown widget class used to select a date/time.
		//		Subclasses should specify this.
		dropDownClass: "dijit.form._ComboBoxMenu",

		// hasDownArrow: Boolean
		//		Set this textbox to have a down arrow button, to display the drop down list.
		//		Defaults to true.
		hasDownArrow: true,

		templateString: template,

		baseClass: "dijitTextBox dijitComboBox",

		/*=====
		// store: [const] dojo.store.api.Store || dojo.data.api.Read
		//		Reference to data provider object used by this ComboBox.
		//
		//		Should be dojo.store.api.Store, but dojo.data.api.Read supported
		//		for backwards compatibility.
		store: null,
		=====*/

		// Set classes like dijitDownArrowButtonHover depending on
		// mouse action over button node
		cssStateNodes: {
			"_buttonNode": "dijitDownArrowButton"
		},

		_setHasDownArrowAttr: function(/*Boolean*/ val){
			this._set("hasDownArrow", val);
			this._buttonNode.style.display = val ? "" : "none";
		},

		_showResultList: function(){
			// hide the tooltip
			this.displayMessage("");
			this.inherited(arguments);
		},

		postMixInProperties: function(){
			// For backwards-compatibility, accept dojo.data store in addition to dojo.store.store.  Remove in 2.0
			if(this.store && !this.store.get){
				lang.mixin(this.store, {
					_oldAPI: true,
					get: function(id, options){
						// summary:
						//		Retrieves an object by it's identity. This will trigger a fetchItemByIdentity.
						//		Like dojo.store.DataStore.get() except returns native item.
						var deferred = new dojo.Deferred();
						this.fetchItemByIdentity({
							identity: id,
							onItem: function(object){
								deferred.resolve(object);
							},
							onError: function(error){
								deferred.reject(error);
							}
						});
						return deferred.promise;
					},
					query: function(query, options){
						// summary:
						//		Queries the store for objects.   Like dojo.store.DataStore.query()
						//		except returned Deferred contains array of native items.
						var deferred = new dojo.Deferred(function(){ fetchHandle.abort && fetchHandle.abort(); });
						var fetchHandle = this.fetch(lang.mixin({
							query: query,
							onBegin: function(count){
								deferred.total = count;
							},
							onComplete: function(results){
								deferred.resolve(results);
							},
							onError: function(error){
								deferred.reject(error);
							}
						}, options));
						return dojo.store.util.QueryResults(deferred);
					}
				});
			}
			this.inherited(arguments);

			// User may try to access this.store.getValue() etc.  in a custom labelFunc() function.
			// It's not available with the new data store for handling inline <option> tags, so add it.
			if(!this.params.store){
				var clazz = this.declaredClass;
				lang.mixin(this.store, {
					getValue: function(item, attr){
						dojo.deprecated(clazz + ".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly", "", "2.0");
						return item[attr];
					},
					getLabel: function(item){
						dojo.deprecated(clazz + ".store.getLabel(item) is deprecated for builtin store.  Use item.label directly", "", "2.0");
						return item.name;
					},
					fetch: function(args){
						dojo.deprecated(clazz + ".store.fetch() is deprecated for builtin store.", "Use store.query()", "2.0");
						var shim = ["dojo/data/ObjectStore"];	// indirection so it doesn't get rolled into a build
						require(shim, dojo.hitch(this, function(ObjectStore){
							new ObjectStore({objectStore: this}).fetch(args);
						}));
					}
				});
			}
		}
	});

	return dijit.form.ComboBoxMixin;
});
