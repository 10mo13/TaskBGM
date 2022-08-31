var canSelectAll = false;

//文章をワンクリックで全選択。テキストエリアにホバーしてから１回しか動かない。一度離してから、再度ホバーさせると再度効く
function selectAll(target){
    if(canSelectAll == true){
        target.select();
        canSelectAll = false;
    }

}

function hoverNow(){
    canSelectAll = true;
}

function hoverEnd(){
    canSelectAll = false;
}