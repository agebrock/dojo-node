define([
	"dojo/_base/kernel",
	"dojo/_base/array",
	"dojo/_base/connect",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom",
	"dojo/dom-class",
	"dojo/dom-construct",
//	"dojo/hash", // optionally prereq'ed
	"dojo/on",
	"dojo/ready",
	"dijit/registry",	// registry.byId
	"./ProgressIndicator",
	"./TransitionEvent"
], function(dojo, array, connect, declare, lang, win, dom, domClass, domConstruct, on, ready, registry, ProgressIndicator, TransitionEvent){

	var dm = lang.getObject("dojox.mobile", true);

	var Controller = declare(null, {
		constructor: function(){
			this.viewMap={};
			this.currentView=null;
			this.defaultView=null;
			ready(lang.hitch(this, function(){
				on(win.body(), "startTransition", lang.hitch(this, "onStartTransition"));
			}));
		},

		findCurrentView: function(moveTo,src){
			if(moveTo){
				var w = registry.byId(moveTo);
				if(w && w.getShowingView){ return w.getShowingView(); }
			}
			if(dm.currentView){
				return dm.currentView; //TODO:1.8 may not return an expected result especially when views are nested
			}
			w = src;
			while(true){
				w = w.getParent();
				if(!w){ return null; }
				if(domClass.contains(w.domNode, "mblView")){ break; }
			}
			return w;
		},

		onStartTransition: function(evt){
			//console.log("onStartTransition:", evt.detail, evt.detail.moveTo, evt.detail.href, evt.detail.scene, evt);
			evt.preventDefault();
			if(!evt.detail || (evt.detail && !evt.detail.moveTo && !evt.detail.href && !evt.detail.url && !evt.detail.scene)){ return; }
			var w = this.findCurrentView(evt.detail.moveTo, (evt.target && evt.target.id)?registry.byId(evt.target.id):registry.byId(evt.target)); // the current view widget
			if(!w || (evt.detail && evt.detail.moveTo && w === registry.byId(evt.detail.moveTo))){ return; }
			if(evt.detail.href){
				var t = registry.byId(evt.target.id).hrefTarget;
				if(t){
					dm.openWindow(evt.detail.href, t);
				}else{
					w.performTransition(null, evt.detail.transitionDir, evt.detail.transition, evt.target, function(){location.href = evt.detail.href;});
				}
				return;
			} else if(evt.detail.scene){
				connect.publish("/dojox/mobile/app/pushScene", [evt.detail.scene]);
				return;
			}
			var moveTo = evt.detail.moveTo;
			if(evt.detail.url){
				var id;
				if(dm._viewMap && dm._viewMap[evt.detail.url]){
					// external view has already been loaded
					id = dm._viewMap[evt.detail.url];
				}else{
					// get the specified external view and append it to the <body>
					var text = this._text;
					if(!text){
						if(registry.byId(evt.target.id).sync){
							// We do not add explicit dependency on dojo/_base/xhr to this module
							// to be able to create a build that does not contain dojo/_base/xhr.
							// User applications that do sync loading here need to explicitly
							// require dojo/_base/xhr up front.
							dojo.xhrGet({url:evt.detail.url, sync:true, load:function(result){
								text = lang.trim(result);
							}});
						}else{
							require(["dojo/_base/xhr"], lang.hitch(this, function(xhr){
								var prog = ProgressIndicator.getInstance();
								win.body().appendChild(prog.domNode);
								prog.start();
								var obj = xhr.get({
									url: evt.detail.url,
									handleAs: "text"
								});
								obj.addCallback(lang.hitch(this, function(response, ioArgs){
									prog.stop();
									if(response){
										this._text = response;
										new TransitionEvent(evt.target, {
												transition: evt.detail.transition,
											 	transitionDir: evt.detail.transitionDir,
											 	moveTo: moveTo,
											 	href: evt.detail.href,
											 	url: evt.detail.url,
											 	scene: evt.detail.scene},
											 		evt.detail)
											 			.dispatch();
									}
								}));
								obj.addErrback(function(error){
									prog.stop();
									console.log("Failed to load "+evt.detail.url+"\n"+(error.description||error));
								});
							}));
							return;
						}
					}
					this._text = null;
					id = this._parse(text, registry.byId(evt.target.id).urlTarget);
					if(!dm._viewMap){
						dm._viewMap = [];
					}
					dm._viewMap[evt.detail.url] = id;
				}
				moveTo = id;
				w = this.findCurrentView(moveTo,registry.byId(evt.target.id)) || w; // the current view widget
			}
			w.performTransition(moveTo, evt.detail.transitionDir, evt.detail.transition, null, null);
		},

		_parse: function(text, id){
			var container, view, i, j, len;
			var currentView	 = this.findCurrentView();
			var target = registry.byId(id) && registry.byId(id).containerNode
						|| dom.byId(id)
						|| currentView && currentView.domNode.parentNode
						|| win.body();
			// if a fixed bottom bar exists, a new view should be placed before it.
			var refNode = null;
			for(j = target.childNodes.length - 1; j >= 0; j--){
				var c = target.childNodes[j];
				if(c.nodeType === 1){
					if(c.getAttribute("fixed") === "bottom"){
						refNode = c;
					}
					break;
				}
			}
			if(text.charAt(0) === "<"){ // html markup
				container = domConstruct.create("DIV", {innerHTML: text});
				for(i = 0; i < container.childNodes.length; i++){
					var n = container.childNodes[i];
					if(n.nodeType === 1){
						view = n; // expecting <div dojoType="dojox.mobile.View">
						break;
					}
				}
				if(!view){
					console.log("dojox.mobile.ViewController#_parse: invalid view content");
					return;
				}
				view.style.visibility = "hidden";
				target.insertBefore(container, refNode);
				var ws = dojo.parser.parse(container);
				array.forEach(ws, function(w){
					if(w && !w._started && w.startup){
						w.startup();
					}
				});

				// allows multiple root nodes in the fragment,
				// but transition will be performed to the 1st view.
				for(i = 0, len = container.childNodes.length; i < len; i++){
					target.insertBefore(container.firstChild, refNode); // reparent
				}
				target.removeChild(container);

				registry.byNode(view)._visible = true;
			}else if(text.charAt(0) === "{"){ // json
				container = domConstruct.create("DIV");
				target.insertBefore(container, refNode);
				this._ws = [];
				view = this._instantiate(eval('('+text+')'), container);
				for(i = 0; i < this._ws.length; i++){
					var w = this._ws[i];
					w.startup && !w._started && (!w.getParent || !w.getParent()) && w.startup();
				}
				this._ws = null;
			}
			view.style.display = "none";
			view.style.visibility = "visible";
			return dojo.hash ? "#" + view.id : view.id;
		},

		_instantiate: function(/*Object*/obj, /*DomNode*/node, /*Widget*/parent){
			var widget;
			for(var key in obj){
				if(key.charAt(0) == "@"){ continue; }
				var cls = lang.getObject(key);
				if(!cls){ continue; }
				var params = {};
				var proto = cls.prototype;
				var objs = lang.isArray(obj[key]) ? obj[key] : [obj[key]];
				for(var i = 0; i < objs.length; i++){
					for(var prop in objs[i]){
						if(prop.charAt(0) == "@"){
							var val = objs[i][prop];
							prop = prop.substring(1);
							if(typeof proto[prop] == "string"){
								params[prop] = val;
							}else if(typeof proto[prop] == "number"){
								params[prop] = val - 0;
							}else if(typeof proto[prop] == "boolean"){
							params[prop] = (val != "false");
							}else if(typeof proto[prop] == "object"){
								params[prop] = eval("(" + val + ")");
							}
						}
					}
					widget = new cls(params, node);
					if(node){ // to call View's startup()
						widget._visible = true;
						this._ws.push(widget);
					}
					if(parent && parent.addChild){
						parent.addChild(widget);
					}
					this._instantiate(objs[i], null, widget);
				}
			}
			return widget && widget.domNode;
		}
	});
	new Controller(); // singleton
	return Controller;
});

