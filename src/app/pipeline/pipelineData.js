
import {PIPELINE_START , PIPELINE_END, PIPELINE_ADD_STAGE, PIPELINE_ADD_ACTION,PIPELINE_STAGE,PIPELINE_ACTION} from "../common/constant";
import {initDesigner} from "../pipeline/initDesigner";
import {initPipeline} from "../pipeline/initPipeline";
import {initAction} from "../pipeline/initAction";

export var pipelineData;

export var newPipelineData = [
    {
        id: "pipeline-start" + "-" + uuid.v1(),
        type: PIPELINE_START,
        setupData: {}
    },
    
    {
        id: "pipeline-add-stage" + "-" + uuid.v1(),
        type: PIPELINE_ADD_STAGE
    },
    {
        id: "pipeline-end" + "-" + uuid.v1(),
        type: PIPELINE_END,
        setupData: {}
    }
]

// event binding
$(".newpipeline").on('click',function(){
    showNewPipeline();
})

$(".newpipelineversion").on('click',function(){
    showNewPipelineVersion();
})

$("#newppBtn").on('click',function(){
    addPipeline();
})
$("#cancelNewppBtn").on('click',function(){
    getPipeLine();
})

$("#newppVersionBtn").on('click',function(){
    addPipelineVersion();
})
$("#cancelNewppVersionBtn").on('click',function(){
    getPipeLine();
})

$("#pipeline-select").on('change',function(){
    showVersionList();
})
$("#version-select").on('change',function(){
    showPipeline();
})

// pipeline data management
export var allPipelines = [];
var versions_shown;

export function getPipeLine(){
    // real api invocation here

    // init designer after get data from backend
    if(allPipelines.length > 0){
        showPipelineDesigner();
    }else{
        showNoPipeline();
    }
}

function showNoPipeline(){
    $("#content").hide();
    $("#nopipeline").show("slow");
    $("#newpipeline").hide(); 
    $("#newpipelineversion").hide();
}

function showPipelineDesigner(){ 
    $("#content").show("slow");
    $("#nopipeline").hide();
    $("#newpipeline").hide();  
    $("#newpipelineversion").hide();       

    initDesigner();
    showPipelineList();
}

function showNewPipeline(){
    $("#content").hide();
    $("#nopipeline").hide();
    $("#newpipeline").show("slow");
    $("#newpipelineversion").hide();
}

function showNewPipelineVersion(){
    var currentPipeline = $("#pipeline-select").val();
    $("#pp-name-newversion").val(currentPipeline);
    $("#content").hide();
    $("#nopipeline").hide();
    $("#newpipeline").hide();
    $("#newpipelineversion").show("slow");
}

function showPipelineList(){
    $("#pipeline-select").empty();
    d3.select("#pipeline-select")
        .selectAll("option")
        .data(allPipelines)
        .enter()
        .append("option")
        .attr("value",function(d,i){
            return d.name;
        })
        .text(function(d,i){
            return d.name;
        }); 
     $("#pipeline-select").select2({
       minimumResultsForSearch: Infinity
     });   
    showVersionList();
}

function showVersionList(){
    var pipeline = $("#pipeline-select").val();
    var versions = _.find(allPipelines,function(item){
        return item.name == pipeline;
    }).versions;

    $("#version-select").empty();
    d3.select("#version-select")
        .selectAll("option")
        .data(versions)
        .enter()
        .append("option")
        .attr("value",function(d,i){
            return d.version;
        })
        .text(function(d,i){
            return d.version;
        }); 
    $("#version-select").select2({
       minimumResultsForSearch: Infinity
     });
    
    versions_shown = versions;

    showPipeline(); 
}

function showPipeline(){
    var data = _.find(versions_shown,function(item){
        return item.version == $("#version-select").val();
    }).data;

    // pipelineData = [].concat(data);
     pipelineData = data;

    $("#pipeline-info-edit").empty();
    
    initPipeline();
    initAction();
}

export function addPipeline(){
    if(!$('#newpp-form').parsley().validate()){
        return;
    }
    var name = $("#pp-name").val();
    var version = $("#pp-version").val();
    var pipeline = {
        "name" : name,
        "versions" : [
            {
                "version" : version,
                "data" : [].concat(newPipelineData)
            }
        ]
    }
    allPipelines.push(pipeline);
    getPipeLine();
}

export function addPipelineVersion(){
    if(!$('#newpp-version-form').parsley().validate()){
        return;
    }
    var name = $("#pp-name-newversion").val();
    var version = $("#pp-newversion").val();
    var versions = _.find(allPipelines,function(item){
        return item.name == name;
    }).versions;

    var newversion = {
        "version" : version,
        "data" : [].concat(pipelineData)
    }
    versions.push(newversion);
    getPipeLine();
}