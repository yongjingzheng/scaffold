"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clickStart = clickStart;

var _widget = require("../theme/widget");

var _action = require("../action/action.io");

var pipelineType = "";

function clickStart(sd, si) {
    //show git form
    $.ajax({
        url: "../../templates/stage/startEdit.html",
        type: "GET",
        cache: false,
        success: function success(data) {
            $("#pipeline-info-edit").html($(data));

            // start output
            (0, _action.initActionIO)(sd);

            // pipeline type
            pipelineType = $("#type-select").val();
            outputBaseOnType();
            $("#type-select").on('change', function () {
                pipelineType = $("#type-select").val();
                outputBaseOnType();
            });

            //output from edit
            $("#tree-edit-tab").on('click', function () {
                (0, _action.initTreeEdit)();
            });

            $("#output-from-edit-tab").on('click', function () {
                (0, _action.initFromEdit)("output");
            });

            $.each(sd.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

            (0, _widget.resizeWidget)();
        }
    });
}

function outputBaseOnType() {
    if (pipelineType == "github" || pipelineType == "gitlab") {
        $("#outputTreeViewer").show();
        $("#outputTreeDesigner").hide();
        (0, _action.initFromView)();
    } else {
        $("#outputTreeViewer").hide();
        $("#outputTreeDesigner").show();
        (0, _action.initTreeEdit)();
        (0, _action.initFromEdit)("output");
    }
}