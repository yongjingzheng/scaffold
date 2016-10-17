import * as constant from "../common/constant";
import {initPipeline} from "../pipeline/initPipeline";
import {initAction} from "../pipeline/initAction";
import {initLine} from "../pipeline/initLine";
import {pipelineData} from "../pipeline/main";
import {resizeWidget} from "../theme/widget";
import {pipelineEdit} from "../relation/pipelineEdit";
import {removeLinkArray} from "../relation/removeLinkArray";
import {initActionIO} from "./actionIO";
import {initActionSetup} from "./actionSetup";
import {getAllComponents,getComponent} from "../component/componentData";
import {showNewComponent} from "../component/main";

export function clickAction(sd, si) {
    $.ajax({
        url: "../../templates/action/actionMain.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            $(".actionfromcomponent").on('click',function(){
                getComponents(sd);
            });

            $(".actionnocomponent").on('click',function(){
                showActionEditor(sd);
            });

            resizeWidget();       
        }
    });

    constant.buttonView.selectAll("image").remove();

    // show action del button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "../../assets/svg/actionDel.svg";
        })
        .attr("id", function (d, i) {
            return "button" + "-" + uuid.v1();
        })
        .attr("width", function (d, i) {
            return constant.svgButtonWidth;
        })
        .attr("height", function (d, i) {
            return constant.svgButtonHeight;
        })
        .attr("translateX", function (d, i) {
            return sd.translateX - (constant.svgButtonWidth * 2);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY;
        })
        .attr("transform", function (d, i) {
            return "translate(" + this.attributes["translateX"].value + "," + this.attributes["translateY"].value + ")";
        })
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + ","
                    + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + this.attributes["translateX"].value + ","
                    + this.attributes["translateY"].value + ") scale(1)");
        })
        .on("click", function (d, i) {
            constant.buttonView.selectAll("image").remove();
            $("#pipeline-info-edit").html("");
            for (var key in pipelineData) {
                if (pipelineData[key].type == constant.PIPELINE_STAGE && pipelineData[key].actions.length > 0) {
                    for (var actionKey in pipelineData[key].actions) {
                        if (pipelineData[key].actions[actionKey].id == sd.id) {
                            pipelineData[key].actions.splice(actionKey, 1);
                            
                        }

                    }
                }

            }
            removeLinkArray(sd);
            initPipeline();
            initAction();
            initLine();
           
        });


    //show close action pop button
    constant.buttonView.append("image")
        .attr("xlink:href", function (d, i) {
            return "../../assets/svg/stageClosePop.svg";
        })
        .attr("id", function (d, i) {
            return "button" + "-" + uuid.v1();
        })
        .attr("width", function (d, i) {
            return constant.svgButtonWidth;
        })
        .attr("height", function (d, i) {
            return constant.svgButtonHeight;
        })
        .attr("translateX", function (d, i) {
            return sd.translateX + (constant.svgButtonWidth * 2.6);
        })
        .attr("translateY", function (d, i) {
            return sd.translateY;
        })
        .attr("transform", function (d, i) {
            return "translate("
                + this.attributes["translateX"].value + ","
                + this.attributes["translateY"].value + ")";
        })
        .on("mouseover", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + (this.attributes["translateX"].value - constant.svgButtonWidth / 2) + ","
                    + (this.attributes["translateY"].value - constant.svgButtonHeight / 2) + ") scale(2)");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + this.attributes["translateX"].value + ","
                    + this.attributes["translateY"].value + ") scale(1)");
        })
        .on("click", function (d, i) {
            constant.buttonView.selectAll("image").remove();
        });

}

function showActionEditor(action){
    $.ajax({
        url: "../../templates/action/actionEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#actionMain").html($(data));

            initActionSetup(action);

            initActionIO(action);

            $("#uuid").attr("value", action.id);

            // view select init
            $("#action-component-select").select2({
                minimumResultsForSearch: Infinity
            });
            $("#k8s-service-protocol").select2({
                minimumResultsForSearch: Infinity
            });     
        }
    });
}

let allComponents;
function getComponents(action){
    allComponents = getAllComponents();

    if(allComponents.length > 0){
        $.ajax({
            url: "../../templates/action/actionComponentList.html",
            type: "GET",
            cache: false,
            success: function (data) {
                $("#actionMain").html($(data));    

                $(".newcomponent").on('click',function(){
                    $(".menu-component").parent().addClass("active");
                    $(".menu-pipeline").parent().removeClass("active");
                    showNewComponent(true);
                })

                $(".componentlist_body").empty();
                _.each(allComponents,function(item){
                    var pprow = '<tr style="height:50px"><td class="pptd">'
                    +'<span class="glyphicon glyphicon-menu-down treeclose" data-name="'+item.name+'"></span>&nbsp;'
                    +'<span class="glyphicon glyphicon-menu-right treeopen" data-name="'+item.name+'"></span>&nbsp;' 
                    + item.name + '</td><td></td><td></td></tr>';
                    $(".componentlist_body").append(pprow);
                    _.each(item.versions,function(version){
                        var vrow = '<tr data-pname="' + item.name + '" data-version="' + version.version + '" style="height:50px">'
                        +'<td></td><td class="pptd">' + version.version + '</td>'
                        +'<td><button type="button" class="btn btn-primary cload">Load</button></td></tr>';
                        $(".componentlist_body").append(vrow);
                    })
                }) ;

                $(".treeclose").on("click",function(event){
                    var target = $(event.currentTarget);
                    target.hide();
                    target.next().show();
                    var name = target.data("name");
                    $('*[data-pname='+name+']').hide();
                });

                $(".treeopen").on("click",function(event){
                    var target = $(event.currentTarget);
                    target.hide();
                    target.prev().show();
                    var name = target.data("name");
                    $('*[data-pname='+name+']').show();
                });

                $(".cload").on("click",function(event){
                    var target = $(event.currentTarget);
                    var componentName = target.parent().parent().data("pname");
                    var componentVersion = target.parent().parent().data("version");
                    LoadComponentToAction(componentName,componentVersion,action);
                })
            }
        });      
    }else{
        alert("You have no components to reuse, please go to 'Component' to create one.");
        showActionEditor(action);
    }
    
}

function LoadComponentToAction(componentName,componentVersion,action){
    var component = getComponent(componentName,componentVersion);
    action.setupData = $.extend(true,{},component.setupData);
    action.inputJson = $.extend(true,{},component.inputJson);
    action.outputJson = $.extend(true,{},component.outputJson);
    showActionEditor(action);
}

function jsonChanged(root,json){
    root.val(JSON.stringify(json));
}