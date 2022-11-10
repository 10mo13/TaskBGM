//YoutubeAPIのセッティング1
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//YouTube playerの埋め込み
var player = [];
var urlData = [
  {
    url:'', // 配列0番目の要素を空にすることで、ボタン番号を1始めに合わせる
    area: 'sample00'
  },
  {
    url: 'https://www.youtube.com/watch?v=Rtt0u_dioi8',
    // id: urlData[0].split('v=')[1],
    area: 'sample01'
  },{
    url:'https://www.youtube.com/watch?v=zZQTJjOUk1k', // youtube動画のURL
    area: 'sample02'
  }
];

// プレーヤーの準備ができたとき
function onPlayerReady(event) {
  playerReady = true;
}

//Youtubeのセッティング2
function onYouTubeIframeAPIReady() {
  for(var i = 0; i < urlData.length; i++){
    player[i] = new YT.Player(urlData[i]['area'], { //もとはplayer
      // height: '360',
      // width: '640',
      // videoId: urlData[i]['id'], //もとはid
      videoId: urlData[i]['url'].split('v=')[1],
      // プレーヤーの準備ができたときに実行
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange  //ループ再生用
      },

    });
  }
}

//動画ループ用関数
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {  //動画が停止したら実行
      event.target.seekTo(0,true);  //動画の初めにシーク
      event.target.playVideo();  //動画を再生
  }
}
 
function play(buttonType){
    // 再生。playerReadyがtrueのときだけ実行
      if(playerReady) {

        //なぜか変数入れても反応しなかったのでブランチ…
        if(buttonType == 1){
          player[1].playVideo();
        }
        else if(buttonType == 2){
          player[2].playVideo();
        }
        
    }
}