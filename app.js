  //タイマーの時間を求める関数。1時間を3600秒、1分を60秒、にして合計の秒数を返す
  function timeAll(buttonType){
    var hour_all = document.getElementById("hour" + buttonType).value;
    var minute_all = document.getElementById("minute" + buttonType).value;
    var second_all = document.getElementById("second" + buttonType).value;
    var all = Number(hour_all*3600) + Number(minute_all*60) + Number(second_all); //経過時間
    return all;
}

//timeとクラスに付くものを全て取得しているので配列型になる
var time = document.getElementsByClassName('time');
var time_display = document.getElementsByClassName("time_display");
// var time_display2 = document.getElementsByClassName("time_display2");


//タイマーが動いているとTrue。[0]は空。[1]はタスク。[2]は休憩を格納
var CountNow = [false, false, false];

//スタートを押したのち、タイム計測中にストップしているとTrue。リファクタリングで配列型にしたい
var ontheway1 = false;
var ontheway2 = false;

//入力された合計の秒数。タイマーを途中で止めた際の処理に使用してるが、リファクタリングで消せそう
var onthewayallsec1 = 0;
var onthewayallsec2 = 0;

//計る時間を格納
var CountTime = [0, 0, 0];
//タイマーセットができるかどうか
var CanCountTimeSet = [true, true, true];

var lh = [0, largehour1, largehour2];
var lm = [0, largeminute1, largeminute2];
var ls = [0, largesecond1,  largesecond2];

var YoutubeVolume = [0, 0 ,0];

var allsec = [0,0,0]; //ここは初期値30（要素1，2）だが、柔軟性を持たせるためにメソッドでループしてタグからセットする。また、バーに触れるたびにallsecの値も変わるように配列にセット。トータル時間、ボタン全て二分化させる


//ボタンの初期セットアップ関数
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

    //リファクタリングで関数にまとめたい。getElementByIdなのでテキストの連結できる(変数も使用可)
    document.getElementById("bargroup"+buttonType).style.visibility ="hidden";

    document.getElementById("start_button2").disabled="disabled";
    document.getElementById("reset_button").disabled="disabled";
    setDisable(2, "Start", "hide");
    setDisable(1, "Reset", "hide");

    play(buttonType);  //セットしてあるビデオの再生

    if(ontheway1 == false){
      // var allsec = [0,0,0];
      allsec[buttonType] = timeAll(buttonType); 
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
    document.getElementById("reset_button2").disabled="disabled";
    setDisable(2, "Reset", "hide");
    play(buttonType);  //セットしてあるビデオの再生

    //リファクタリングできそうなところ多いな…オブジェクトを配列にして格納すればint型で扱えるな
    if(ontheway2 == false){
      // var allsec = [0,0,0];
      allsec[buttonType] = timeAll(buttonType); 
      }
      ontheway2 = false;
      var dt = new Date();
      var endDt = new Date(dt.getTime() + allsec[buttonType] * 1000);
      hour = Math.floor(allsec[buttonType]/3600);  // ()内の計算結果を小数点切り捨て。
  }

    NormalizeTimerDisplay(allsec[buttonType], hour, buttonType); //関数呼び出し

//処理間隔は0.1秒にしている、1秒だとストップする際にラグがあるため0.1秒づつ
var count_down = setInterval(function(){
  if(timeAll(buttonType) > 0){
    allsec[buttonType] = allsec[buttonType] -0.1;
  }
  
  //リファクタリングしてTimerDispaly.jsに入れる
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

    //1、２のスタートボタンを非表示
    setDisable(1, "Start", "hide");
    setDisable(2, "Start", "hide");
    $('.StartDisplay' + String(buttonType)).show();
    $('.StopDisplay' + String(buttonType)).hide();

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
    }, 100)  //指定した時間の感覚で{}内を繰り返し実行(1000で1秒なので0.1秒)
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
    $('.StartDisplay' + String(buttonType)).show();
    $('.StopDisplay' + String(buttonType)).hide();
  }else if(buttonType == 2){
    $('.StartDisplay' + String(buttonType)).show();
    $('.StopDisplay' + String(buttonType)).hide();
  }
  
}
}


//stopボタンを押した際の処理
function stop(buttonType, OnButton){

  if(buttonType == 1){
    CountNow[1] = false;
    ontheway1 = true;
    
    document.getElementById("reset_button").disabled="";
    setDisable(buttonType, "Reset", "show");

    if(CountNow[1] == false && CountNow[2] == false){
      document.getElementById("start_button").disabled="";
      document.getElementById("start_button2").disabled="";
      setDisable(1, "Start", "show");
      setDisable(2, "Start", "show");
    }
  }

  else if(buttonType == 2){
    CountNow[2] = false;
    ontheway2 = true;
    
    document.getElementById("reset_button2").disabled="";
    setDisable(2, "Reset", "show");

    if(CountNow[1] == false && CountNow[2] == false){
      document.getElementById("start_button2").disabled="";
      document.getElementById("start_button").disabled="";
      setDisable(2, "Start", "show");
      setDisable(1, "Start", "show");
    }
  }

  if(OnButton == true){
    player[buttonType].pauseVideo(); //一時停止
  }
    
}


//リセットボタンを押した際の処理
function reset(buttonType){
  MaxTimerCircle(buttonType);
  CanCountTimeSet[buttonType] = true;
  FadeTimerDisplay(buttonType, "Set");

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
