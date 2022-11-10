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