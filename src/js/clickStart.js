import {resizeWidget} from "./theme/widget";

export function clickStart(sd, si) {
    //show git form
    $.ajax({
        url: "./templates/gitEdit.html",
        type: "GET",
        cache: false,
        success: function (data) {
            $("#pipeline-info-edit").html($(data));

            $.each(sd.setupData, function (name, value) {
                console.log($("#" + name));
                $("#" + name).attr("value", value);
            });

            $("#uuid").attr("value", sd.id);

            resizeWidget();
        }
    });
}