/* この辺、リファクタリングで配列型にする */
const circle = [0,document.getElementById('bar1'), document.getElementById('bar2')];
const num = document.getElementById('num');
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


$('.StopDisplay1').hide();
$('.StopDisplay2').hide();

//カウント中の画面はデフォルトでは非表示
$('.CountDisplay1').hide();
$('.CountDisplay2').hide();