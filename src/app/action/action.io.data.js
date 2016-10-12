export function getActionIOData(action){
    // real api invocation here , get action setupdata by action.id
    // return ajax promise

    // to be removed below
    var data = {
        "inputJson" : {},
        "outputJson" : {}
    };
    if(!_.isUndefined(action.inputJson)){
      data.inputJson = action.inputJson;
    } 

    if(!_.isUndefined(action.outputJson)){
      data.outputJson = action.outputJson;
    } 

    return data;
}

export function saveActionIOData(action,data){
    // real api invocation here , set action setupdata by action.id
    // send data as request body

    // to be removed soon
    action.inputJson = data.inputJson;
    action.outputJson = data.outputJson;
    alert("Saved Action IO.")
}