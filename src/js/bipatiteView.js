import {getPathData} from "./setPath";
import {isObject,isArray,isBoolean,isNumber,isString} from "./util";

var demoJson = {
	 "action": "created",
	 "comment": {
	 	"id": 11056394,
    	"user": {
    		"login": "baxterthehacker"
    	},
    	"urls":[
    		{
    			"html_url" : "",
    			"events_url":"",
    			"events" : {
    				"click" : ""
    			}
    		},
    		{
    			"html_url" : "",
    			"events_url":"",
    			"events" : {
    				"change" : ""
    			}
    		}
    	]
	}
}





var importJson = [
  {
    "key":"action",
    "type":"string",
    "path":".action"
  },
  {
    "key":"number",
    "type":"number",
    "path":".number"
  },
  {
    "key":"pull_request",
    "type":"object",
    "path":".pull_request",
    "child_node":[
      {
        "key":"url",
        "type":"string",
        "path":".pull_request.url"
      },{
        "key":"id",
        "type":"number",
        "path":".pull_request.id"
      },{
        "key":"user",
        "type":"object",
        "path":".pull_request.user",
        "child_node":[
          {
            "key":"login",
            "type":"string",
            "path":".pull_request.login"
          }
        ]
      }
    ]
  }
];

var outputJson = [
  {
    "key":"action",
    "type":"string",
    "path":".action"
  },
  {
    "key":"pull_request",
    "type":"object",
    "path":".pull_request",
    "child_node":[
      {
        "key":"url",
        "type":"string",
        "path":".pull_request.url"
      },{
        "key":"id",
        "type":"number",
        "path":".pull_request.id"
      }
    ]

  },{
    "key":"user",
    "type":"object",
    "path":".user",
    "child_node":[
      {
        "key":"login",
        "type":"string",
        "path":".user.login"
      }
    ]
}
];



var relationJson = {
  "relation": [
    {
      "from": ".action",
      "from_show": ".action",

      "to": ".action",
      "to_show": ".action",

      "is_from_equal": true,
      "is_to_equal": true

    },
    {
      "to": ".pull_request",
      "to_show": ".pull_request",
      "is_to_equal": true,
      "from": ".pull_request",
      "from_show": ".pull_request",
      "is_from_equal": true,
      "child": [
        {
          "to": ".pull_request.url",
          "to_show": ".pull_request",
          "is_to_equal": false,
          "from": ".pull_request.url",
          "from_show": ".pull_request",
          "is_from_equal": false
        },
        {
          "to": ".pull_request.id",
          "to_show": ".pull_request",
          "is_to_equal": false,
          "from": ".pull_request.id",
          "from_show": ".pull_request",
          "is_from_equal": false
        },
        {
          "to": ".user",
          "to_show": ".user",
          "is_to_equal": true,
          "from": ".pull_request.user",
          "from_show": ".pull_request",
          "is_from_equal": false,
          "child": [
            {
              "to": ".user.login",
              "to_show": ".user",
              "is_to_equal": false,
              "from": ".pull_request.login",
              "from_show": ".pull_request",
              "is_from_equal": false
            }
          ]
        }
      ]
    }
  ]
}





export function bipatiteView(){
	$.ajax({
        url: "./templates/bipatiteView.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));
            initView();
        }
    });  
}





function initView(){

	construct($("#importDiv"),importJson);

	// construct($("#importDiv"),jsonTransformation(demoJson));
	construct($("#outputDiv"),outputJson);

	relationLineInit(relationJson.relation);

	dragDropRelation();

	$("#removeLine").click(function(){
		var path = $("#bipatiteLineSvg path.active");
		var depthArray = path.attr("data-depth").split(".");

		var demoJson = relationJson.relation;
		for(var i=0;i<depthArray.length-1;i++){
			if(i >0){
				demoJson = demoJson.child[depthArray[i]];
			}else{
				demoJson = demoJson[depthArray[i]];
			}
			
		}
		
		if(isObject(demoJson)){
			demoJson.child.splice(depthArray[depthArray.length-1],1);
		}else{
			demoJson.splice(depthArray[depthArray.length-1],1);
		}
		relationLineInit(relationJson.relation);
	});
}


function construct(root,json){
	for(var i=0;i<json.length;i++){

		var item     = $('<div>',   { 'class': 'item row '+json[i].type, 'data-path': replacePoint(json[i].path) }),
			property =   $('<span>', { 'class': 'property' });

		property.text(json[i].key).attr("title",json[i].key);
		item.append(property);
		root.append(item);

		if(json[i].child_node){
			addExpander(item);
			construct(item,json[i].child_node);
		}
	}	
}


function addExpander(item){
	if (item.children('.expander').length == 0) {
        var expander =   $('<span>',  { 'class': 'expander' });
        expander.bind('click', function() {
            var item = $(this).parent();
            item.toggleClass('expanded');
            relationLineInit(relationJson.relation);
        });
        item.prepend(expander);
    }
}

function relationLineInit(ary){
	d3.select("#bipatiteLineSvg").selectAll("path").remove();
	relationLine(ary);
}

function relationLine(ary,depth){
	
	var rootImport = $("#importDiv"),
		rootOutput = $("#outputDiv");
		
	for(var i=0;i<ary.length;i++){
		var fromPath = replacePoint(ary[i].from),
			toPath = replacePoint(ary[i].to),
			fromDom = rootImport.find("div[data-path="+fromPath+"]"),
			toDom = rootOutput.find("div[data-path="+toPath+"]"),
			parentDom;

		
		if(fromDom.is(":visible") && toDom.is(":visible")){
			settingOut([
				fromDom.offset().left,
				fromDom.offset().top,
				toDom.offset().left,
				toDom.offset().top	
			],depth == undefined ? i : depth+"."+i);	
		}


		if(fromDom.is(":visible") && toDom.is(":hidden")){
			
		  	parentDom = getVisibleParent(toDom);
		  	settingOut([
				fromDom.offset().left,
				fromDom.offset().top,
				parentDom.offset().left,
				parentDom.offset().top	
			],depth == undefined ? i : depth+"."+i);	
		}

		if(fromDom.is(":hidden") && toDom.is(":visible")){

		  	parentDom = getVisibleParent(fromDom);
		  	settingOut([
				parentDom.offset().left,
				parentDom.offset().top,
				toDom.offset().left,
				toDom.offset().top	
			],depth == undefined ? i : depth+"."+i);	
		}



		if(ary[i].child){
			if(depth == undefined){
				depth = i;
			}else{
				depth = depth+"."+i
			}
			relationLine(ary[i].child,depth);
		}
	

	}
}

function jsonTransformation(json){
	var newJsonArray=[];

	for(var key in json){
		newJsonArray.push({
			"key" : key,
			"type" : JsonType(json[key]),
			"path" : "."+key
		});
		if(isObject(json[key]) || isArray(json[key])){
			var child = newJsonArray[newJsonArray.length-1].child_node = [];
			jsonChange(child,json[key],newJsonArray[newJsonArray.length-1].path);
		}
		
	}
	return newJsonArray;

}

function jsonChange(child,json,path){
	
	if(isObject(json)){
		for(var key in json){
			child.push({
				"key" : key,
				"type" : JsonType(json[key]),
				"path" : path+"."+key
			})
			if(isObject(json[key]) || isArray(json[key])){
				var childNode = child[child.length-1].child_node = [];
				jsonChange(childNode,json[key],child[child.length-1].path);
			}
		}
	}else if(isArray(json)){
		for(var i =0;i<json.length;i++){
			if(isObject(json[i])){
				for(var key in json[i]){
					child.push({
						"key" : key,
						"type" : JsonType(json[i][key]),
						"path" : path+"."+i+"."+key
					})
					if(isObject(json[i][key]) || isArray(json[i][key])){
						var childNode = child[child.length-1].child_node = [];
						jsonChange(childNode,json[i][key],child[child.length-1].path);
					}
				}
			}
		}
	}
}

function settingOut(point,depth){
	var offsetTop = $("#bipatiteLineSvg").offset().top;
	var offsetLeft = $("#bipatiteLineSvg").offset().left;
	var x1 = point[0]-offsetLeft+51;
	var y1 = point[1]-offsetTop;
	var x2 = point[2]-offsetLeft+5
	var y2 = point[3]-offsetTop;
	var d = getPathData({x:x1,y:y1},{x:x2,y:y2});

	d3.select("#bipatiteLineSvg")
	.append("path")
	.attr("d",d)
	.attr("stroke", "green")
    .attr("stroke-width", 3)
    .attr("fill","none")
    .attr("stroke-opacity", "0.8")
    .attr("class","cursor")
    .attr("data-depth",depth)
    .on("click",function(d,i){
    	$("#bipatiteLineSvg path").attr("stroke","green").removeClass("active");
    	$(this).attr("stroke","red").addClass("active");
    });

}



function replacePoint(str){
	str = ("start"+str).replace(/\./g,'-');
	return str;
}

function getVisibleParent(dom){

	var parent = dom.parent();

	if(parent.is(":visible")){
		return parent;
	}else{
		getVisibleParent(parent);
	}
}

function JsonType(json){
	if(isObject(json)){
		return "object";
	}else if(isArray(json)){
		return "array";
	}else if(isBoolean(json)){
		return "boolean";
	}else if(isString(json)){
		return "string";
	}else if(isNumber(json)){
		return "number";
	}else {
		return "null";
	}
}

function dragDropRelation(){



	$("span.property").mousedown(function(event){
		var _startX = $(event.target).offset().left,
	        _startY = $(event.target).offset().top;
	     console.log(_startX);
	    document.onmousemove = function(event){
	    	event.pageX
	    	event.pageY
	    	dragDropLine([_startX,_startY,event.pageX,event.pageY]);
	    }

	    document.onmouseup = function(event){
	    	document.onmousemove = null;   
        	document.onmouseup = null; 
        	
	    	var endX = $(event.target).offset().left,
	    		endY = $(event.target).offset().top;
	    	
	    	$("#bipatiteLineSvg .drag-drop-line").remove();
	    }
	})


}


function dragDropLine(point){

	var offsetTop = $("#bipatiteLineSvg").offset().top;
	var offsetLeft = $("#bipatiteLineSvg").offset().left;
	var x1 = point[0]-offsetLeft+51;
	var y1 = point[1]-offsetTop;
	var x2 = point[2]-offsetLeft+5
	var y2 = point[3]-offsetTop;
	var d = getPathData({x:x1,y:y1},{x:x2,y:y2});

	if($("#bipatiteLineSvg .drag-drop-line").length == 0){
		d3.select("#bipatiteLineSvg")
		.append("path")
		.attr("d",d)
		.attr("stroke", "red")
	    .attr("stroke-width", 3)
	    .attr("fill","none")
	    .attr("stroke-opacity", "0.8")
	    .attr("class","drag-drop-line");
	}else{
		d3.select(".drag-drop-line")
		.attr("d",d);
	}

}

