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
  
    $('.' + buttonName + 'Display' + buttonType).css('color', HS);
  
  }

  