




export function addRelation(relation,needDel,fromPath,toPath,visibleFromNode,visibleToNode) {
    var finalRelation = [];
    if (needDel) {
        relation = delRelation(relation,fromPath,toPath);
    }

    if (fromPath.split(".").length == 2) {
        // 如果是根节点,则直接添加一个即可,
        finalRelation = relation.concat(calcPipelineInfo(fromPath,toPath,visibleFromNode,visibleToNode));
        return finalRelation;
    }

    for (var i = 0; i < relation.length; i ++ ) {
        var tempRelation = relation[i];
        if (tempRelation.from + "." + fromPath.split(".")[fromPath.split(".").length - 1] == fromPath) {
            // 如果当前点 + 目标点的最后一段 == 目标点 则代表找到了目标点的直接父节点,直接在当前点的child中加入指定的关系即可
            if (!tempRelation.child) {
                tempRelation.child = [];
            }

            tempRelation.child = tempRelation.child.concat(calcPipelineInfo(fromPath,toPath,visibleFromNode,visibleToNode));
        } else if (tempRelation.child && fromPath.indexOf(tempRelation.from + ".") == 0) {
            // 如果当前点存在子节点,并且是目标点的父节点,则进入寻找
            tempRelation.child = addRelation(tempRelation.child,false,fromPath,toPath,visibleFromNode,visibleToNode)
        }

        finalRelation = finalRelation.concat(tempRelation)
    }

    return finalRelation;
}

export function delRelation(relation,fromPath) {
    var finalRelation = [];
    for (var i = 0; i < relation.length; i ++ ) {
        var tempRelation = relation[i];

        if (tempRelation.from == fromPath) {
            // 如果开始路径相同,则直接删除即可
            continue;
        } else if (tempRelation.child && fromPath.indexOf(tempRelation.from+".") == 0) {
            // 如果当前起始路径含有子节点,则在子节点里找
            // 这里添加一个判断,只有当前节点是fromPath的父级时才进入判断,这样可以省略很多无用的子节点判断
            tempRelation.child = delRelation(tempRelation.child,fromPath);
        }

        // 如果当前路径不是要删除的,则保留下来当前路径
        finalRelation = finalRelation.concat(tempRelation);
    }

    return finalRelation;
}



function calcPipelineInfo(fromPath,toPath,visibleFromNode,visibleToNode) {
    var pipelineInfo = {};
    for (var i = 0; i < visibleToNode.length; i ++ ) {
        // 通过正则匹配当前路径可以匹配上的,
        // 因为已经进行过排序+倒序了,所以第一个匹配上的肯定是距离当前节点最近的可见节点
        var regx = new RegExp('^' + visibleToNode[i]);
        var rs = regx.exec(toPath);
        if (rs) {
            pipelineInfo['to'] = toPath;
            pipelineInfo['toShow'] = visibleToNode[i];

            if (toPath== visibleToNode[i]) {
                pipelineInfo["isToEqual"] = true;
            }else {
                pipelineInfo["isToEqual"] = false;
            }
            break;
        }
    }

    for (var i = 0; i < visibleFromNode.length; i ++ ) {
        var regx = new RegExp('^' + visibleFromNode[i]);
        var rs = regx.exec(fromPath);
        if (rs) {
            pipelineInfo['from'] = fromPath;
            pipelineInfo['fromShow'] = visibleFromNode[i];
            if (fromPath == visibleFromNode[i]) {
                pipelineInfo["isFromEqual"] = true;
            }else {
                pipelineInfo["isFromEqual"] = false;
            }
            break;
        }
    }

    return pipelineInfo;
}