
import {initDesigner} from "./initDesigner";
import {initPipeline} from "./initPipeline";
import {initAction} from "./initAction";
import {getAllPipelines,getPipeline,addPipeline} from "./pipeline.data";

export let allPipelines;

export let pipelineData;
let pipelineName, pipelineVersion;

export function initPipelinePage(){
    // handle promise

    // to be removed
    allPipelines = getAllPipelines();
    if(allPipelines.length>0){
        // showPipelineList();
        showPipelineDesigner();
    }else{
        showNoPipeline();
    }
}

function showPipelineList(){

}

function showNoPipeline(){
    $.ajax({
        url: "../../templates/pipeline/noPipeline.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#main").html($(data));    
            $("#nopipeline").show("slow");
            $(".newpipeline").on('click',function(){
                showNewPipeline();
            })  
        }
    });
}

function showNewPipeline(){
    $.ajax({
        url: "../../templates/pipeline/newPipeline.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#main").children().hide();
            $("#main").append($(data));    
            $("#newpipeline").show("slow");
            $("#newppBtn").on('click',function(){
                addPipeline();
                // to be removed below
                initPipelinePage();
            })
            $("#cancelNewppBtn").on('click',function(){
                cancelNewPPPage();
            })
        }
    });
}

function showPipelineDesigner(){ 
    $.ajax({
        url: "../../templates/pipeline/pipelineDesign.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#main").html($(data));    
            $("#pipelinedesign").show("slow"); 

            // temp
            pipelineName = allPipelines[0].name;
            pipelineVersion = allPipelines[0].versions[0].version;
            pipelineData = allPipelines[0].versions[0].data;
            // temp end
            $("#selected_pipeline_name").val(pipelineName); 
            $("#selected_pipeline_version").val(pipelineVersion);

            initDesigner();
            drawPipeline();

            $(".newpipelineversion").on('click',function(){
                showNewPipelineVersion();
            })
        }
    }); 
}

function drawPipeline(){
    $("#pipeline-info-edit").empty();
    
    initPipeline();
    initAction();
}

function showNewPipelineVersion(){
    $.ajax({
        url: "../../templates/pipeline/newPipelineVersion.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#main").children().hide();
            $("#main").append($(data));    
            $("#newpipelineversion").show("slow"); 

            $("#pp-name-newversion").val(pipelineName);

            $("#newppVersionBtn").on('click',function(){
                addPipelineVersion(pipelineVersion);
                // to be removed below
                initPipelinePage();
            })
            $("#cancelNewppVersionBtn").on('click',function(){
                cancelNewPPVersionPage();
            })      
        }
    }); 
    
    $("#content").hide();
    $("#nopipeline").hide();
    $("#newpipeline").hide();
    $("#newpipelineversion").show("slow");
}

function cancelNewPPPage(){
    $("#newpipeline").remove();
    $("#main").children().show("slow");
}

function cancelNewPPVersionPage(){
    $("#newpipelineversion").remove();
    $("#main").children().show("slow");
}

// $("#pipeline-select").on('change',function(){
//     showVersionList();
// })
// $("#version-select").on('change',function(){
//     showPipeline();
// })

// function showPipelineList(){
//     $("#pipeline-select").empty();
//     d3.select("#pipeline-select")
//         .selectAll("option")
//         .data(allPipelines)
//         .enter()
//         .append("option")
//         .attr("value",function(d,i){
//             return d.name;
//         })
//         .text(function(d,i){
//             return d.name;
//         }); 
//      $("#pipeline-select").select2({
//        minimumResultsForSearch: Infinity
//      });   
//     showVersionList();
// }

// function showVersionList(){
//     var pipeline = $("#pipeline-select").val();
//     var versions = _.find(allPipelines,function(item){
//         return item.name == pipeline;
//     }).versions;

//     $("#version-select").empty();
//     d3.select("#version-select")
//         .selectAll("option")
//         .data(versions)
//         .enter()
//         .append("option")
//         .attr("value",function(d,i){
//             return d.version;
//         })
//         .text(function(d,i){
//             return d.version;
//         }); 
//     $("#version-select").select2({
//        minimumResultsForSearch: Infinity
//      });
    
//     versions_shown = versions;

//     showPipeline(); 
// }
