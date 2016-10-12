import {getActionSetupData,saveActionSetupData} from "./action.setup.data";

let k8sServiceAdvancedEditor,k8sPodAdvancedEditor;
let k8sServiceAdvancedContainer,k8sPodAdvancedContainer;

let k8sSAD,k8sPAD;

let actionSetupData;

export function initActionSetup(action){
    // should be promise here after real api invocation

    actionSetupData = getActionSetupData(action);

    // action part
    $("#action-id").val(actionSetupData.action.id);
    $("#action-name").val(actionSetupData.action.name);
    $("#action-timeout").val(actionSetupData.action.timeout);

    // k8s service part
    $("#k8s-service-name").val(actionSetupData.k8s_service.metadata.name);
    $("#k8s-service-ip").val(actionSetupData.k8s_service.spec.clusterIP);
    $("#k8s-service-protocol").val(actionSetupData.k8s_service.spec.ports[0].protocol);
    $("#k8s-service-port").val(actionSetupData.k8s_service.spec.ports[0].port);
    $("#k8s-service-targetport").val(actionSetupData.k8s_service.spec.ports[0].targetPort);
    $("#k8s-service-nodeport").val(actionSetupData.k8s_service.spec.ports[0].nodePort);

    k8sSAD = $.extend(true,{},actionSetupData.k8s_service);
    delete k8sSAD.metadata.name;
    delete k8sSAD.spec.clusterIP;
    delete k8sSAD.spec.ports;

    // k8s pod part
    $("#k8s-pod-name").val(actionSetupData.k8s_pod.metadata.name);
    $("#k8s-pod-image").val(actionSetupData.k8s_pod.spec.containers[0].image);

    k8sPAD = $.extend(true,{},actionSetupData.k8s_pod);
    delete k8sPAD.metadata.name;
    delete k8sPAD.spec.containers[0].image;

    initK8sForm();

    // action form
    $("#saveAction").on('click',function(){
        // action part
        actionSetupData.action.id = $("#action-id").val();
        actionSetupData.action.name = $("#action-name").val();
        actionSetupData.action.timeout = $("#action-timeout").val();

        // k8s service part
        var k8s_service_ad = k8sServiceAdvancedEditor.get();
        k8s_service_ad.metadata.name = $("#k8s-service-name").val();
        k8s_service_ad.spec.clusterIP = $("#k8s-service-ip").val();
        var ports = [{
          "protocol": $("#k8s-service-protocol").val(),
          "port": $("#k8s-service-port").val(),
          "targetPort": $("#k8s-service-targetport").val(),
          "nodePort": $("#k8s-service-nodeport").val()
        }]
        k8s_service_ad.spec.ports = ports; 
        actionSetupData.k8s_service = k8s_service_ad;

        // k8s pod part
        var k8s_pod_ad = k8sPodAdvancedEditor.get();
        k8s_pod_ad.metadata.name = $("#k8s-pod-name").val();
        k8s_pod_ad.spec.containers[0].image = $("#k8s-pod-image").val();
        actionSetupData.k8s_pod = k8s_pod_ad;

        saveActionSetupData(action,actionSetupData);
    })

    $("#k8s-service-advanced").on("click",function(){
        $("#k8s-service-advanced").hide();
        $("#close-k8s-service-advanced").show();
        $("#service-advanced").parent().show();
    })

    $("#close-k8s-service-advanced").on("click",function(){
        $("#k8s-service-advanced").show();
        $("#close-k8s-service-advanced").hide();
        $("#service-advanced").parent().hide();
    })

    $("#k8s-pod-advanced").on("click",function(){
        $("#k8s-pod-advanced").hide();
        $("#close-k8s-pod-advanced").show();
        $("#pod-advanced").parent().show();
    })

    $("#close-k8s-pod-advanced").on("click",function(){
        $("#k8s-pod-advanced").show();
        $("#close-k8s-pod-advanced").hide();
        $("#pod-advanced").parent().hide();
    })
}

function initK8sForm(){
    k8sServiceAdvancedContainer = $("#service-advanced")[0];
    k8sPodAdvancedContainer = $("#pod-advanced")[0];
    initK8sServiceAdvanced();
    initK8sPodAdvanced();
}

function initK8sServiceAdvanced(){
    if(k8sServiceAdvancedEditor){
        k8sServiceAdvancedEditor.destroy();
    }

    var treeOptions = {
        "mode": "tree",
        "search": true
    };

    k8sServiceAdvancedEditor = new JSONEditor(k8sServiceAdvancedContainer, treeOptions);
    k8sServiceAdvancedEditor.set(k8sSAD);
    
    k8sServiceAdvancedEditor.expandAll();
}

function initK8sPodAdvanced(){
    if(k8sPodAdvancedEditor){
        k8sPodAdvancedEditor.destroy();
    }

    var treeOptions = {
        "mode": "tree",
        "search": true
    };

    k8sPodAdvancedEditor = new JSONEditor(k8sPodAdvancedContainer, treeOptions);
    k8sPodAdvancedEditor.set(k8sPAD);
    
    k8sPodAdvancedEditor.expandAll();
}