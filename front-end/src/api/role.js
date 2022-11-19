import {doAuthPost} from './AxoisUtils'

export let doRoleList =  function(){
    return doAuthPost("/role/roleList");
}