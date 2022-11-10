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

  