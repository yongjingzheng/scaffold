import * as componentSetupData from "./componentSetupData";

let k8sServiceAdvancedEditor,k8sPodAdvancedEditor;
let k8sServiceAdvancedContainer,k8sPodAdvancedContainer;

let k8sSAD,k8sPAD;

export function initComponentSetup(component){
    componentSetupData.getComponentSetupData(component);

    // action part
    $("#action-component-select").val(componentSetupData.data.action.type);
    $("#action-component-select").on('change',function(){
        componentSetupData.setActionType();    
    });

    $("#action-name").val(componentSetupData.data.action.name);
    $("#action-name").on("blur",function(){
        componentSetupData.setActionName();
    });

    $("#action-timeout").val(componentSetupData.data.action.timeout);
    $("#action-timeout").on("blur",function(){
        componentSetupData.setActionTimeout();
    });

    // k8s service part
    $("#k8s-service-name").val(componentSetupData.data.k8s_service.metadata.name);
    $("#k8s-service-name").on("blur",function(){
        componentSetupData.setK8sService(k8sServiceAdvancedEditor);
    });

    $("#k8s-service-ip").val(componentSetupData.data.k8s_service.spec.clusterIP);
    $("#k8s-service-ip").on("blur",function(){
        componentSetupData.setK8sService(k8sServiceAdvancedEditor);
    });

    $("#k8s-service-protocol").val(componentSetupData.data.k8s_service.spec.ports[0].protocol);
    $("#k8s-service-protocol").on("blur",function(){
        componentSetupData.setK8sService(k8sServiceAdvancedEditor);
    });

    $("#k8s-service-port").val(componentSetupData.data.k8s_service.spec.ports[0].port);
    $("#k8s-service-protocol").on("blur",function(){
        componentSetupData.setK8sService(k8sServiceAdvancedEditor);
    });

    $("#k8s-service-targetport").val(componentSetupData.data.k8s_service.spec.ports[0].targetPort);
    $("#k8s-service-targetport").on("blur",function(){
        componentSetupData.setK8sService(k8sServiceAdvancedEditor);
    });

    $("#k8s-service-nodeport").val(componentSetupData.data.k8s_service.spec.ports[0].nodePort);
    $("#k8s-service-nodeport").on("blur",function(){
        componentSetupData.setK8sService(k8sServiceAdvancedEditor);
    });

    k8sSAD = $.extend(true,{},componentSetupData.data.k8s_service);
    delete k8sSAD.metadata.name;
    delete k8sSAD.spec.clusterIP;
    delete k8sSAD.spec.ports;

    // k8s pod part
    $("#k8s-pod-name").val(componentSetupData.data.k8s_pod.metadata.name);
    $("#k8s-pod-name").on("blur",function(){
        componentSetupData.setK8sPod(k8sPodAdvancedEditor);
    });

    $("#k8s-pod-image").val(componentSetupData.data.k8s_pod.spec.containers[0].image);
    $("#k8s-pod-image").on("blur",function(){
        componentSetupData.setK8sPod(k8sPodAdvancedEditor);
    });

    k8sPAD = $.extend(true,{},componentSetupData.data.k8s_pod);
    delete k8sPAD.metadata.name;
    delete k8sPAD.spec.containers[0].image;

    initK8sForm();


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
        "search": true,
        "onChange" : function(){
            componentSetupData.setK8sService(k8sServiceAdvancedEditor);
        }
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
        "search": true,
        "onChange" : function(){
            componentSetupData.setK8sPod(k8sPodAdvancedEditor);
        }
    };

    k8sPodAdvancedEditor = new JSONEditor(k8sPodAdvancedContainer, treeOptions);
    k8sPodAdvancedEditor.set(k8sPAD);
    
    k8sPodAdvancedEditor.expandAll();
}