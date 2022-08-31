/* この辺、リファクタリングで配列型にする */
const circle = [0,document.getElementById('bar1'), document.getElementById('bar2')];
const num = document.getElementById('num');
// const percent = document.getElementById('percent');
const r = circle[1].getAttribute('r');  //円の半径。1と2が同じ半径なので１つでいい
const c = Math.PI*(r*2);  //円周

function UpdateTimerCircleDisplay(Nowtime, buttonType){
    // const val = numCheck(parseInt(percent.value));  //入力値の取得
    Nowtime--;  //バーの追従の調整
    var val = Nowtime / CountTime[buttonType] * 100;  //現在のタイマー残り時間の%
    const pct = ((val)/100)*c;  //円周に対する割合。もとは(100-val)
    // console.log(Nowtime);
    circle[buttonType].setAttributeNS(null, 'stroke-dashoffset', pct);
}

//ゲージを満タンにする
function MaxTimerCircle(buttonType){
  circle[buttonType].setAttributeNS(null, 'stroke-dashoffset', c );
}
MaxTimerCircle(1);
MaxTimerCircle(2);


//start、stop、resetの色を変える処理。ボタンが使用不可の状態かどうかを切り替える
function setDisable(buttonType, buttonName, HideOrShow){
  var disableColor = 'rgba(239, 239, 239, 0.3)';
  var originalColor = 'rgb(255, 255, 255)';  //もっと明るくてもいいかも
  var HS = originalColor;
  if(HideOrShow == "hide"){
    HS = disableColor;
  }else if(HideOrShow == "show"){
    HS = originalColor;
  }
  var buttonToggle = 1;
  if(buttonType == 1){
    buttonToggle = 2;
  }
  /*
  if(buttonName == "start"){
    // $('.StartDisplay' + buttonType).css('color', disableColor);
    $('.StartDisplay' + buttonToggle).css('color', disableColor);
    $('.ResetDisplay' + buttonType).css('color', disableColor);
  }else if(buttonName == "stop"){
    // $('.StartDisplay' + buttonType).css('color', originalColor);
    $('.StartDisplay' + buttonToggle).css('color', originalColor);
    $('.ResetDisplay' + buttonType).css('color', originalColor);  //バグ？よくない？
    $('.StopDisplay' + buttonType).css('color', disableColor);
    // console.log("a");
  }*/
  /*
  else if(buttonName == "reset"){
    $('.ResetDisplay' + buttonType).css('color', HS);
  }else if(buttonName == "hide"){
    $('.StartDisplay' + buttonType).css('color', HS);
  }else if(buttonName == "show"){
    $('.StartDisplay' + buttonType).css('color', HS);
  }*/
  $('.' + buttonName + 'Display' + buttonType).css('color', HS);
  // console.log('.' + buttonName + 'Display' + buttonType);

}


// percent.addEventListener('change', function(){
//   const val = numCheck(parseInt(percent.value));  //入力値の取得
//     const pct = ((100-val)/100)*c;  //円周に対する割合
//     circle.setAttributeNS(null, 'stroke-dashoffset', pct);

//     num.firstChild.nodeValue = val + '%';   //%を含んで数値を表示
// });

// //数値で無い場合、数値に置き換える
// function numCheck(val){
//     if (isNaN(val)) {
//       val = 100;
//     }else{
//       if (val < 0) { val = 0;}
//       if (val > 100) { val = 100;}
//   }
//   return val;
// }

$('.StopDisplay1').hide();
$('.StopDisplay2').hide();

//カウント中の画面はデフォルトでは非表示
$('.CountDisplay1').hide();
$('.CountDisplay2').hide();

//jQuery　画面フェード
function FadeTimerDisplay(buttonType, SetOrCount){
  var SetDisplay = '.SetDisplay' +  buttonType;
  var CountDisplay = '.CountDisplay' +  buttonType;
  //ストップボタンを押した際のセット画面への切り替え
  if(SetOrCount == "Set"){
    // $('.SetDisplay').fadeIn(300);
    // $('.CountDisplay').fadeOut(300);
    $(SetDisplay).fadeIn(300);
    $(CountDisplay).fadeOut(300);

    //スタートボタンを押した際のカウント画面への切り替え
  }else if(SetOrCount == "Count"){
    $(SetDisplay).fadeOut(300);
    $(CountDisplay).fadeIn(300);
  }
}


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

// var id = urlData[0].split('v=')[1];

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
        'onReady': onPlayerReady
      },
      //ループ再生用
      playerVars: {
        loop: 1, //ループをオン
        playlist: urlData[i]['url'].split('v=')[1],  //ループさせるYoutubeのidを指定
      },
    });
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

//テキストエリアをワンクリックするだけで文章を全選択する
// function selectAll(target) {
//   target.select();
// }


// const hour = document.getElementById("hour");
// const min = document.getElementById("min");
// const sec = document.getElementById("sec");


// function countdown(){
//     const now = new Date(); // 現在時刻を取得
//     const tomorrow = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1); // 明日の0:00を取得
//     const diff = tomorrow.getTime() - now.getTime(); // 時間の差を取得（ミリ秒）
  
//     // ミリ秒から単位を修正
//     const calcHour = Math.floor(diff / 1000 / 60 / 60);
//     const calcMin = Math.floor(diff / 1000 / 60) % 60;
//     const calcSec = Math.floor(diff / 1000) % 60;
  
//     // 取得した時間を表示（2桁表示）
//     hour.innerHTML = calcHour < 10 ? '0' + calcHour : calcHour;
//     min.innerHTML = calcMin < 10 ? '0' + calcMin : calcMin;
//     sec.innerHTML = calcSec < 10 ? '0' + calcSec : calcSec;
// }

// countdown();
// setInterval(countdown, 1000);


// https://novicengineering.com/javascript_timer_3/
  //1時間を3600秒、1分を60秒、にして合計の秒数を返す
  function timeAll(buttonType){
    var hour_all = document.getElementById("hour" + buttonType).value;
    var minute_all = document.getElementById("minute" + buttonType).value;
    var second_all = document.getElementById("second" + buttonType).value;
    var all = Number(hour_all*3600) + Number(minute_all*60) + Number(second_all); //経過時間
    return all;
}

//timeとクラスに付くものを全て取得しているので配列型になる？
var time = document.getElementsByClassName('time');
var time_display = document.getElementsByClassName("time_display");
// var time_display2 = document.getElementsByClassName("time_display2");


//タイマーが動いているとTrue
var CountNow = [false, false, false];
// var CountNow2 = false;
//スタートを押したのち、タイム計測中にストップしているとTrue。リファクタリングで配列型にしたい
var ontheway1 = false;
var ontheway2 = false;
//入力された合計の秒数。タイマーを途中で止めた際の処理に使用してるが、リファクタリングで消せそう
var onthewayallsec1 = 0;
var onthewayallsec2 = 0;
//計る時間
var CountTime = [0, 0, 0];
//タイマーセットができるかどうか
var CanCountTimeSet = [true, true, true];

var lh = [0, largehour1, largehour2];
var lm = [0, largeminute1, largeminute2];
var ls = [0, largesecond1,  largesecond2];

var YoutubeVolume = [0, 0 ,0];

var allsec = [0,0,0]; //ここは初期値30（要素1，2）だが、柔軟性を持たせるためにメソッドでループしてタグからセットする。また、バーに触れるたびにallsecの値も変わるように配列にセット。トータル時間、ボタン全て二分化させる


//Youtubeが再生、停止される際、音量をフェードする
//フェード中に再度呼び出されると、動画が再生されない状態になるので、３秒以下のタイムで実行されている場合はフェードなしの分岐
function VolumeFade(buttonType, TargetVolume, InOut){
if(InOut == "In"){
  // alert(YoutubeVolume);
  YoutubeVolume[buttonType] = -5; //再生が先になるとクリップノイズが乗ることがあるので、マイナスから始める
  player[buttonType].setVolume(0);
  play(buttonType);  //セットしてあるビデオの再生
  const Vfi = setInterval(() => {
    YoutubeVolume[buttonType]++;
    player[buttonType].setVolume(YoutubeVolume[buttonType]);

    if(YoutubeVolume[buttonType] >= TargetVolume){
      clearInterval(Vfi);
    }
  }, 20)
}
else if(InOut == "Out"){
  const Vfo = setInterval(() => {
    YoutubeVolume[buttonType]--;
    player[buttonType].setVolume(YoutubeVolume[buttonType]);

    if(YoutubeVolume[buttonType] <= 0){
      player[buttonType].pauseVideo();
      player[buttonType].setVolume(TargetVolume);
      clearInterval(Vfo);
    }
  }, 20)
}
}

//なぜか動かない
// function SetLargeVar(buttonType){
//   lh = "largehour" + buttonType;
//   lm = "largeminute" + buttonType;
//   ls = "largesecond" + buttonType;
// }

//タイマーをデジタル表記にする。二桁より小さい値の時に、10の位に0を付け加える処理
function NormalizeTimerDisplay(Asec, hour, buttonType){
    // SetLargeVar(buttonType);
    // alert(ls);

  allsec[buttonType] = Asec;

  if(hour < 10){
    lh[buttonType].innerHTML = "0" + hour;
       }else{
        lh[buttonType].innerHTML = hour;
       }
    hour_remainder = Math.floor(allsec[buttonType] % 3600);  //もとはallsec
    minute = Math.floor(hour_remainder/60);
    if(minute < 10){
      lm[buttonType].innerHTML = "0" + minute;
       }else{
       lm[buttonType].innerHTML = minute;
       }
    sec = Math.floor(hour_remainder%60);
    if(sec < 10){
      ls[buttonType].innerHTML = "0" + sec;
       }else{
      ls[buttonType].innerHTML = sec;
      }
}

function getRuleBySelector(sele){
  var i, j, sheets, rules, rule = null;

  // stylesheetのリストを取得
  sheets = document.styleSheets;
  for(i=0; i<sheets.length; i++){
      // そのstylesheetが持つCSSルールのリストを取得
      rules = sheets[i].cssRules;
      for(j=0; j<rules.length; j++){
          // セレクタが一致するか調べる
          if(sele === rules[j].selectorText){
              rule = rules[j];
              break;
          }
      }
  }
  return rule;
}

var bar = document.getElementsByClassName('barBox2').item(0);
var style = document.createElement("style");
var wid = '.barBox2{width: 0%}';
var rule = document.createTextNode(wid);
style.media = 'screen';
style.type = 'text/css';
// style.appendChild(rule);
// bar.appendChild(style);

//スライダーの値によって、スライダーの満ちている部分の長さを変更する関数。
function SliderWidthControl(time, TargetSlider){
  var barMaxValue = document.getElementsByClassName("time")[TargetSlider].getElementsByTagName("input")[0].max;
  // alert(barMaxValue);
  var widthPer = time * 100 / barMaxValue;

  TargetSlider += 1
  bar = document.getElementsByClassName('barBox' + TargetSlider).item(0);
  // alert(bar.className);

  parseFloat(widthPer);
  widthPer = Math.round(widthPer);
  if(time < 16 && time != 0){
    widthPer += 2;  //値が低いとスライダーの白線が短いときがあるので調整
  }
  wid = widthPer + "%";
  bar.style.width = wid;
}

// SliderWidthControl(0, 1);

/*
  var Slider = getRuleBySelector('.barBox3');


function SliderWidthControl(time, TargetSlider){
  var widthPer = time.value * 100 / 60;  // x:100 = y:60  => 100y = 60x => x = 10/6 * y

  if(time.value < 16 && time.value != 0){
    widthPer += 2;  //値が低いとスライダーの白線が短いときがあるので調整
  }
  Slider.style.width = widthPer + "%";
}
*/

function rangeValue(time, target, target2, target3, targetLength) {
  return function(){
    
    SliderWidthControl(time.value, targetLength);

      //ボタンがタスクか休憩か判別する変数bt
      var bt = time.id.indexOf('1');
      bt = time.id.charAt(bt);
      
    if(bt == 1){

      if(CountNow[1] == false && CountNow[2] == false){
        //タスクのスライダー操作時、設定時間が合計0のときにスタートボタンを隠し、ボタン無効
      if(timeAll(1) == 0){
        document.getElementById("start_button").disabled="disabled";
        // setDisable(bt, "hide");
        setDisable(bt, "Start", "hide");
      //設定時間が0秒より大きいとき、スタートボタンを再表示
      }else if(timeAll(1) > 0){
        document.getElementById("start_button").disabled="";
        // setDisable(bt, "show");
        setDisable(bt, "Start", "show");
      }
      }
    }else{
      bt = time.id.indexOf('2');
      bt = time.id.charAt(bt);
      // if(bt == 2){

        if(CountNow[1] == false && CountNow[2] == false){
          //休憩のスライダー操作時、設定時間が合計0のときにスタートボタンを隠す
        if(timeAll(2) == 0){
          document.getElementById("start_button2").disabled="disabled";
          // setDisable(bt, "hide");
          setDisable(bt, "Start", "hide");
        }else if(timeAll(2) > 0){
          document.getElementById("start_button2").disabled="";
          // setDisable(bt, "show");
          setDisable(bt, "Start", "show");
        }
      }
      // }
    }

    target.innerHTML = time.value;

    if(time.value >= 10){
            target2.innerHTML = time.value;
          
    }else{  //9未満のときは大きい位に0を付けて表示
            target2.innerHTML = "0" + time.value;

    }
  }
}

//バーをクリックした際の処理。引数はタスクか休憩の識別。もしかしていらない
function BarClick(buttonType){
  otwas = "onthewayallsec" + buttonType;
  otwas = timeAll(buttonType);
  allsec[buttonType] = otwas;
  NormalizeTimerDisplay(otwas,  Math.floor(otwas/3600), buttonType);
  
}

//rangeValue関数を使ってtimeというクラス名を持つ要素の値を順に取り出す
//for文のループ条件はfor(var i in time)と書き換えもできる。
//変数timeはgetElementsByClassName()を使用しており、timeと書かれた全てのタグを拾うので配列型に見えるが、HTMLCollectionオブジェクトらしく、ブラウザによってはforEachみたいな配列メソッドが使用できないので注意
for(var i = 0; i<time.length; i++){
  bar = time[i].getElementsByTagName("input")[0];
  target = time[i].getElementsByTagName("span")[0];
  target2 = time_display[i].getElementsByTagName("span")[0];
  // target3 = time_display2[i].getElementsByTagName("span")[0];

//Input要素の値が変化するたびにrangeValueを実行することで値を表示
  bar.addEventListener("input",rangeValue(bar,target,target2,"target3", i));
  
  SliderWidthControl(bar.value, i);
}




//スタートボタンを押したときの処理
function start(buttonType){
  if(CanCountTimeSet[buttonType] == true){
    CountTime[buttonType] = timeAll(buttonType);
    CanCountTimeSet[buttonType] = false;
  }
  
  FadeTimerDisplay(buttonType, "Count");

  if(CountNow[buttonType] == false){
    $('.StartDisplay' + String(buttonType)).hide();
    $('.StopDisplay' + String(buttonType)).show();
  // if(timeAll(buttonType) > 0){
  // }
  
  // SetLargeVar(buttonType);
  // var allsecArray = buttonType;
  var  NoFade = false;

  //二つのタイマーのどちらかが4秒以下の場合は、音量フェードさせない
  if(timeAll(1) <= 4 || timeAll(2) <= 4){


    //ただし、どちらか片方が5秒以上の時間がある場合はフェードできる
    if(timeAll(1) >= 5 || timeAll(2) >= 5){
    }else{
      NoFade = true;
    }
  }
       //どちらかのタイマーが0のときはFadeさせない
       if(timeAll(1) <= 0 || timeAll(2) <= 0){
        NoFade = true;
      }


  //タスクタイマースタート時に起動
  if(buttonType == 1){
    backgroundColorChange("task");
    CountNow[buttonType] = true;
    lh[buttonType] = largehour1;  //関数にまとめるとなぜか動かない
    lm[buttonType] = largeminute1;
    ls[buttonType] = largesecond1;
    //visibilityプロパティを使用してスライダーを隠し、disabled属性でスタートボタン、リセットボタンも押せなくしている
    //リファクタリングで関数にまとめたい。getElementByIdなのでテキストの連結できる(変数も使用可)
    document.getElementById("bargroup"+buttonType).style.visibility ="hidden";
    // document.getElementById("start_button").disabled="disabled";
    // document.getElementById("start_button").value = "stop"; //startをstopに書き換え
    
  

    document.getElementById("start_button2").disabled="disabled";
    document.getElementById("reset_button").disabled="disabled";
    setDisable(2, "Start", "hide");
    setDisable(1, "Reset", "hide");
    // setDisable(buttonType, "start");
    // document.getElementById("stop_button").disabled = "";
    play(buttonType);  //セットしてあるビデオの再生

    if(ontheway1 == false){
      // var allsec = [0,0,0];
      allsec[buttonType] = timeAll(buttonType); 
      }else{
      // var allsec = [];
      // allsec[buttonType] = onthewayallsec1;
      }
      ontheway1 = false;
      var dt = new Date();
      var endDt = new Date(dt.getTime() + allsec[buttonType] * 1000);
      hour = Math.floor(allsec[buttonType]/3600);  // ()内の計算結果を小数点切り捨て。
  }
  //休憩のタイマーのスタートボタンを押した際に起動
  else if(buttonType == 2){
    backgroundColorChange("break");
    CountNow[2] = true;
    lh[buttonType] = largehour2;
    lm[buttonType] = largeminute2;
    ls[buttonType] = largesecond2;
    document.getElementById("bargroup2").style.visibility ="hidden";
    document.getElementById("start_button").disabled="disabled";
    setDisable(1, "Start", "hide");
    // document.getElementById("start_button2").disabled="disabled";
    // document.getElementById("start_button2").value = "stop"; //startをstopに書き換え
    document.getElementById("reset_button2").disabled="disabled";
    setDisable(2, "Reset", "hide");
    // setDisable(buttonType, "start");
    // document.getElementById("stop_button2").disabled = "";
    play(buttonType);  //セットしてあるビデオの再生

    //リファクタリングできそうなところ多いな…オブジェクトを配列にして格納すればint型で扱えるな
    if(ontheway2 == false){
      // var allsec = [0,0,0];
      allsec[buttonType] = timeAll(buttonType); 
      }else{
        // var allsec = [];
        // allsec[buttonType] = onthewayallsec2;
      }
      ontheway2 = false;
      var dt = new Date();
      var endDt = new Date(dt.getTime() + allsec[buttonType] * 1000);
      hour = Math.floor(allsec[buttonType]/3600);  // ()内の計算結果を小数点切り捨て。
  }
    // alert(allsec[buttonType]);
    // console.log(allsec[buttonType]); //デバッグ
    NormalizeTimerDisplay(allsec[buttonType], hour, buttonType); //関数呼び出し

//処理間隔は0.1秒にしている、1秒だとストップする際にラグを感じる
var count_down = setInterval(function(){
  if(timeAll(buttonType) > 0){
    allsec[buttonType] = allsec[buttonType] -0.1;
  }
  
  dt = new Date();
    hour = Math.floor(allsec[buttonType]/3600);
    if(hour < 10){
      lh[buttonType].innerHTML = "0" + hour;
       }else{
        lh[buttonType].innerHTML = hour;
       }
    hour_remainder = Math.floor(allsec[buttonType]%3600);
    minute = Math.floor(hour_remainder/60);
    if(minute < 10){
      lm[buttonType].innerHTML = "0" + minute;
       }else{
        lm[buttonType].innerHTML = minute;
       }
    sec = Math.floor(hour_remainder%60);
if(sec < 10){
  ls[buttonType].innerHTML = "0" + sec;
       }else{
        ls[buttonType].innerHTML = sec;
}

// console.log(allsec[buttonType] + "::" + CountTime[buttonType]);
UpdateTimerCircleDisplay(allsec[buttonType], buttonType);

if(dt.getTime() >= endDt.getTime()){
  clearInterval(count_down);
  ("largeminute" + buttonType).innerHTML = minute;
  ("largesecond" + buttonType).innerHTML = "00";
  ("largeminute" + buttonType).innerHTML = "00";
  ("largesecond" + buttonType).innerHTML = "00";
}

  //タイマー終了時に起動。タスク、休憩両方で起動してしまうのでbuttonTypeで識別
  if(hour <= 0 && minute <= 0 && sec <= 0){
    MaxTimerCircle(buttonType);
    allsec[buttonType] = timeAll(buttonType);  //元々設定していた時間を再度セット
    NormalizeTimerDisplay(allsec[buttonType], hour, buttonType);  //セットした時間を再度表示
    stop(buttonType, false);
    ontheway1 = false;
    onthewayallsec1 = 100;
    clearInterval(count_down);
    // setDisable(buttonType, "stop");  //1、２のスタートボタンを非表示
    setDisable(1, "Start", "hide");
    setDisable(2, "Start", "hide");
    $('.StartDisplay' + String(buttonType)).show();
    $('.StopDisplay' + String(buttonType)).hide();
    //数秒後に実行(1000で1秒)
    setTimeout(() => {
      if(buttonType == 1){
        ToBreak();  //画面を休憩へスクロール
        document.getElementById("bargroup1").style.visibility ="";
        document.getElementById("start_button2").click();  //スタート2を起動
        
        if(NoFade == false){
          YoutubeVolume[1] = player[1].getVolume();
          YoutubeVolume[2] = player[2].getVolume();
          VolumeFade(1, YoutubeVolume[buttonType], "Out");
          VolumeFade(2, YoutubeVolume[2], "In");
        }else{
          player[1].pauseVideo(); //タスクの動画一時停止
        }
        
      }else if(buttonType == 2){
        ToTask();
        document.getElementById("bargroup2").style.visibility ="";
        document.getElementById("start_button").click();  //スタート2を起動
        
        if(NoFade == false){
          YoutubeVolume[1] = player[1].getVolume();
          YoutubeVolume[2] = player[2].getVolume();
          VolumeFade(2, YoutubeVolume[buttonType], "Out");
          VolumeFade(1, YoutubeVolume[1], "In");
        }else{
          player[2].pauseVideo(); //休憩の動画一時停止
        }
      } 
    }, 100)
  }

if(buttonType == 1){
  if(ontheway1 == true){
    clearInterval(count_down);
    onthewayallsec1 = allsec[buttonType];
    //document.getElementById("start_button2").click();  //スタート2を起動
    }
}else if(buttonType == 2){
  if(ontheway2 == true){
    clearInterval(count_down);
    onthewayallsec2 = allsec[buttonType];
    //document.getElementById("start_button").click();  //スタート1を起動
    }
}
}, 100);

}else if(CountNow[buttonType] == true){
  stop(buttonType, true);
  if(buttonType == 1){
    // document.getElementById("start_button").value = "start"; //startをstopに書き換え
    $('.StartDisplay' + String(buttonType)).show();
    $('.StopDisplay' + String(buttonType)).hide();
  }else if(buttonType == 2){
    // document.getElementById("start_button2").value = "start"; //startをstopに書き換え
    // document.getElementsByClassName("StartDisplay" + String(buttonType)).visibility = ""
    // document.getElementsByClassName("StopDisplay" + String(buttonType)).visibility = "disable"
    $('.StartDisplay' + String(buttonType)).show();
    $('.StopDisplay' + String(buttonType)).hide();
  }
  
}

}



function stop(buttonType, OnButton){
  // setDisable(buttonType, "stop");

  if(buttonType == 1){
    CountNow[1] = false;
    ontheway1 = true;
    
    document.getElementById("reset_button").disabled="";
    setDisable(buttonType, "Reset", "show");
    // document.getElementById("stop_button").disabled="disabled"

    if(CountNow[1] == false && CountNow[2] == false){
      document.getElementById("start_button").disabled="";
      document.getElementById("start_button2").disabled="";
      setDisable(1, "Start", "show");
      setDisable(2, "Start", "show");
    }

    // if(OnButton == true){
    // }

  }
  //休憩のstopボタンを押した際。
  else if(buttonType == 2){
    CountNow[2] = false;
    ontheway2 = true;
    
    document.getElementById("reset_button2").disabled="";
    setDisable(2, "Reset", "show");
    // document.getElementById("stop_button2").disabled="disabled"

    if(CountNow[1] == false && CountNow[2] == false){
      document.getElementById("start_button2").disabled="";
      document.getElementById("start_button").disabled="";
      setDisable(2, "Start", "show");
      setDisable(1, "Start", "show");
    }

    // if(OnButton == true){
    // player[2].pauseVideo(); //一時停止
    // }

  }

  if(OnButton == true){
    player[buttonType].pauseVideo(); //一時停止
  }
    
}

//リセットボタン
function reset(buttonType){
  MaxTimerCircle(buttonType);
  CanCountTimeSet[buttonType] = true;
  FadeTimerDisplay(buttonType, "Set");
  // setDisable(buttonType, "reset");

    // var allsecArray = 1 + buttonType;

    // var allsec = [];
    allsec[buttonType] = timeAll(buttonType);  //元々設定していた時間を再度セット
    var hour = Math.floor(allsec[buttonType]/3600);

    if(buttonType == 1){
      if([1] == false && CountNow[2] == false){
        document.getElementById("start_button2").disabled="";
        setDisable(buttonType, "Start", "show");
      }
      document.getElementById("reset_button").disabled="disabled";
      setDisable(buttonType, "Reset", "hide");
      document.getElementById("bargroup1").style.visibility ="";
      onthewayallsec1 = allsec[buttonType];
      ontheway1 = false;

    }else if(buttonType == 2){
      if(CountNow[1] == false && CountNow[2] == false){
        document.getElementById("start_button").disabled="";
        setDisable(buttonType, "Start", "show");
      }
      document.getElementById("reset_button2").disabled="disabled";
      setDisable(buttonType, "Reset", "hide");
      document.getElementById("bargroup2").style.visibility ="";
      onthewayallsec2 = allsec[buttonType];
      ontheway2 = false;
    }

    NormalizeTimerDisplay(allsec[buttonType], hour, buttonType);  //セットした時間を再度表示
    
    
}
