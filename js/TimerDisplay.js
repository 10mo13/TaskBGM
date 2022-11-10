//タイマーをデジタル表記にする。二桁より小さい値の時に、10の位に0を付け加える処理
function NormalizeTimerDisplay(Asec, hour, buttonType){

  allsec[buttonType] = Asec;

  if(hour < 10){
    lh[buttonType].innerHTML = "0" + hour;
       }else{
        lh[buttonType].innerHTML = hour;
       }
    hour_remainder = Math.floor(allsec[buttonType] % 3600);
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