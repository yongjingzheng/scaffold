export let data;

export function getActionSetupData(action){
    if(!_.isUndefined(action.setupData) && !_.isEmpty(action.setupData)){
      data = action.setupData;
    }else{
      data = $.extend(true,{},metadata);
      action.setupData = data;
    } 
}

export function setActionType(){
    data.action.type = $("#action-component-select").val();
}

export function setActionName(){
    data.action.name = $("#action-name").val();
}

export function setActionTimeout(){
    data.action.timeout = $("#action-timeout").val();
}

export function setK8sService(k8sServiceAdvancedEditor){
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
    data.k8s_service = k8s_service_ad;
}

export function setK8sPod(k8sPodAdvancedEditor){
    var k8s_pod_ad = k8sPodAdvancedEditor.get();
    k8s_pod_ad.metadata.name = $("#k8s-pod-name").val();
    k8s_pod_ad.spec.containers[0].image = $("#k8s-pod-image").val();        
    data.k8s_pod = k8s_pod_ad;
}

var metadata = {
  "action" : {
    "type" : "Kubernetes",
    "name" : "",
    "timeout" : ""
  },
  "k8s_service" : {
    "metadata": {
      "name": "",
      "deletionTimestamp": "",
      "deletionGracePeriodSeconds": 0
    },
    "spec": {
      "ports": [
        {
          "protocol": "tcp",
          "port": 0,
          "targetPort": "",
          "nodePort": 0
        }
      ],
      "clusterIP": "",
      "type": "",
      "sessionAffinity": "",
      "loadBalancerIP": ""
    }
  },
  "k8s_pod" : {
    "metadata": {
      "name" : "",
      "deletionTimestamp": "",
      "deletionGracePeriodSeconds": 0
    },
    "spec": {
      "containers": [
        {
          "name": "",
          "image" : "",
          "command": [],
          "args": [],
          "workingDir": "",
          "ports": [
            {
              "name": "",
              "hostPort": 0,
              "containerPort": 0,
              "protocol": "",
              "hostIP": ""
            }
          ],
          "env": [
            {
              "name": "",
              "value": ""
            }
          ],
          "resources": {
            "limits":[ {"cpu": 4.0, "memory": "99Mi"} ],
            "requests ":[ {"cpu": 4.0, "memory": "99Mi"} ]
          },
          "livenessProbe": {
            "exec": {
              "command": []
            },
            "httpGet": {
              "path": "",
              "port": "",
              "host": "",
              "scheme": ""
            },
            "tcpSocket": {
              "port": ""
            },
            "initialDelaySeconds": 0,
            "timeoutSeconds": 0,
            "periodSeconds": 0,
            "successThreshold": 0,
            "failureThreshold": 0
          },
          "readinessProbe": {
            "exec": {
              "command": [
                "string"
              ]
            },
            "httpGet": {
              "path": "",
              "port": "",
              "host": "",
              "scheme": ""
            },
            "tcpSocket": {
              "port": ""
            },
            "initialDelaySeconds": 0,
            "timeoutSeconds": 0,
            "periodSeconds": 0,
            "successThreshold": 0,
            "failureThreshold": 0
          },
          "lifecycle": {
            "postStart": {
              "exec": {
                "command": []
              },
              "httpGet": {
                "path": "",
                "port": "",
                "host": "",
                "scheme": ""
              },
              "tcpSocket": {
                "port": ""
              }
            },
            "preStop": {
              "exec": {
                "command": [
                  "string"
                ]
              },
              "httpGet": {
                "path": "",
                "port": "",
                "host": "",
                "scheme": ""
              },
              "tcpSocket": {
                "port": ""
              }
            }
          },
          "terminationMessagePath": "",
          "imagePullPolicy": "", 
          "securityContext": {
            "capabilities": {
              "add": [
                {}
              ],
              "drop": [
                {}
              ]
            },
            "privileged": true,
            "seLinuxOptions": {
              "user": "",
              "role": "",
              "type": "",
              "level": ""
            },
            "runAsUser": 0,
            "runAsNonRoot": true
          },
          "stdin": true,
          "stdinOnce": true, 
          "tty": true
        }
      ],
      "restartPolicy": "",
      "terminationGracePeriodSeconds": 0,
      "activeDeadlineSeconds": 0,
      "dnsPolicy": "",
      "nodeSelector":"",
      "serviceAccountName": "",
      "nodeName": "",
      "hostNetwork": true,
      "hostPID": true,
      "hostIPC": true,
      "securityContext": {
        "seLinuxOptions": {
          "user": "",
          "role": "",
          "type": "",
          "level": ""
        },
        "runAsUser": 0,
        "runAsNonRoot": true,
        "supplementalGroups": [
          {}
        ],
        "fsGroup": 0
      },
      "imagePullSecrets": [
        {
          "name": ""
        }
      ]
    }
   }
}



