//  Sacar todos os videos duma página youtube.

/*

    Protocolo:
    
    * Obtem o objecto de lista para os videos todos mais butões.
    * Procura todos os <a> a lista.
    * Retorna os links não repetidos.
    

    
*/

var controlwindow_code = "<div id='control_window' class='master'> </div>";
var tagname = "ytd-grid-renderer";

var grid, control_window;
var links = [];

function getChildFromTagName(node, tag){
    for(var i = 0; i < node.children.length; i++){
        var v = getChildFromTagName(node.children[i], tag);
        if(v)return v;
    }
    
    if(node.tagName == tag.toUpperCase())return node;
    return undefined;
}

function addStyles(){
    document.write("<link rel='stylesheet' type='text/css' href='tds.css''>");
}

function getGrid(tag){
   grid = getChildFromTagName(document.getElementById("content"), tag);
    grid.style.backgroundColor = "red";
}

function addWindow(){
    grid.innerHTML += controlwindow_code;
    control_window = grid.children[grid.children.length-1];
}

function getLinks(){
    
    //  FIRST get all the links, SECOND flush them into a list (removing duplicates)
    //  this is made this way so it doesn't depend on the call stack
    var is = [0];    //  iterator/counter list
    var parent = grid; //  parent element
    var done = false;   //  procedure state
    var count = 0;
    
    while(!done){
        var i_index = is.length-1;
        var fetch = true;
        var child = parent;
        
        for(var a = 0; a < is.length;a++){
            if((a+1>=is.length) && (is[is.length-1] >= child.children.length)){
                is.pop();
                is[is.length-1]++;
                fetch=false;
                break;
            }
            child = child.children[is[a]];
        }
        
        
        if(fetch){
            if(child.href)links.push(child.href);
            count++;
            
            if(child.children.length>0){
                is.push(0);
            }
            else{   //  child has no children
                is[i_index]++;
            }
        }
        
        
        if(child==parent)done=true;
    }
    
    
    
    
    
    
    alert("Element count: "+count);
    var code = "<div>";
    var link_count=0;
    for(var i = 0; i < links.length; i++){
        var unique = true;
        var l = links[i];
        
        for(var a = 0; a < i; a++){
            if(links[a] == l){unique=false;break;}
        }
        
        if(unique){
            link_count++;
            code+="\""+links[i]+"\" ";
        }
    }
    code+="</div>";
    control_window.innerHTML += code;
    alert("Links:"+link_count);
}




//  Protocol

addStyles();
getGrid(tagname);
addWindow();
getLinks();





