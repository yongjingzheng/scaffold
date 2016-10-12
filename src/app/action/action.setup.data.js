export function getActionSetupData(action){
    // real api invocation here , get action setupdata by action.id
    // return ajax promise

    // to be removed below
    var data;
    if(!_.isUndefined(action.setupData) && !_.isEmpty(action.setupData)){
      data = action.setupData;
    }else{
      data = $.extend(true,{},actionSetupData_fakedata);
    }  
    return data;
}

export function saveActionSetupData(action,data){
    if(!$('#action-form').parsley().validate()){
        return;
    }

    // real api invocation here , set action setupdata by action.id
    // send data as request body

    // to be removed soon
    action.setupData = data;
    alert("Saved Action Setup Data.")
}

// fake data, to be removed
export var actionSetupData_fakedata = {
  "action" : {
    "id" : "",
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



