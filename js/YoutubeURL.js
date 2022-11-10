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

//YoutubeのURL変更のsetボタンを押した際の処理
function changeURL(buttonType){
    var text = document.getElementsByClassName("YoutubeURL")[buttonType].value;
    urlData[buttonType]['url'] = text;
    id = urlData[buttonType]['url'].split('v=')[1];
    // alert(buttonType);
  
    videoId = id;
    // 正しいurlの形式だったとき
    if (videoId) {
      // &=クエリパラーメターがついていることがあるので取り除く
      const ampersandPosition = videoId.indexOf('&');
      if(ampersandPosition != -1) {
          videoId = videoId.substring(0, ampersandPosition);
      }
    }
    // 指定された動画IDのサムネイルを読み込み、動画を再生する準備をする。
    buttonType++; //ボタンは1始まりなので、1増やす
    player[buttonType].cueVideoById({videoId: videoId});
  }
  