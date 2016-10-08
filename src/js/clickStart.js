import {resizeWidget} from "./theme/widget";
import {initActionIO,initTreeEdit,initFromEdit,initFromView} from "./action.io";

var pipelineType = "";

export function clickStart(sd, si) {
    //show git form
    $.ajax({
        url: "./templates/startEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            // start output
            initActionIO(sd);

            // pipeline type
            pipelineType = $("#type-select").val();
            outputBaseOnType();
            $("#type-select").on('change',function(){
                pipelineType = $("#type-select").val();
                outputBaseOnType();
            })
            
            //output from edit
            $("#tree-edit-tab").on('click',function(){
                initTreeEdit();
            })

            $("#output-from-edit-tab").on('click',function(){
                initFromEdit("output");
            });

            $.each(sd.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

            resizeWidget();
        }
    });
}

function outputBaseOnType(){
    if(pipelineType == "github" || pipelineType == "gitlab"){
        $("#outputTreeViewer").show();
        $("#outputTreeDesigner").hide();
        initFromView();
    }else{
        $("#outputTreeViewer").hide();
        $("#outputTreeDesigner").show();
        initTreeEdit();
        initFromEdit("output");
    }
}