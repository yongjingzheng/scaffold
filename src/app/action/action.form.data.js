export var k8sServiceAdvancedData = {
  "metadata": {
    "deletionTimestamp": "",
    "deletionGracePeriodSeconds": 0
  },
  "spec": {
    "type": "",
    "sessionAffinity": "",
    "loadBalancerIP": ""
  }
};

export var k8sPodAdvancedData = {
  "metadata": {
    "deletionTimestamp": "",
    "deletionGracePeriodSeconds": 0
  },
  "spec": {
    "containers": [
      {
        "name": "",
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



