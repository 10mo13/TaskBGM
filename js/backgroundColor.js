//バックグラウンドのグラデーションと、カウント中のサークルの色が変わる
function backgroundColorChange(color){
    //タスク時の色をセット
    if(color == "task"){
        $('head').append('<style>.main::before{ content: ""; background: linear-gradient(to right, rgb(216, 72, 146), rgb(214, 173, 106)); width: 100vw; height: 100%; margin:0 auto; position: absolute; left: 0; min-width: 600px; z-index: -1; opacity: 1; transition: opacity 0.5s; } </style>');
        //カウント中のサークル背景色の変更
        $('#bar1').css('stroke', '#ff27274b');
        $('#bar2').css('stroke', '#ff27274b');
        //ヘッダーのリストのホバー時の色をセット
        $('head').append('<style>nav ul li a:hover{ color: rgb(74, 192, 255); }</style>');
    }
    //休憩時の色をセット
    else  if(color == "break"){
        $('head').append('<style>.main::before{ content: ""; background: linear-gradient(to right, rgb(216, 72, 146), rgb(214, 173, 106)); width: 100vw; height: 100%; margin:0 auto; position: absolute; left: 0; min-width: 600px; z-index: -1; opacity: 0; transition: opacity 0.5s; } </style>');
        $('#bar1').css('stroke', '#33c4914b');
        $('#bar2').css('stroke', '#33c4914b');
        
        $('head').append('<style>nav ul li a:hover{ color: rgb(247, 143, 57); }</style>');
    }
}

//jQuery　画面フェード
function FadeTimerDisplay(buttonType, SetOrCount){
    var SetDisplay = '.SetDisplay' +  buttonType;
    var CountDisplay = '.CountDisplay' +  buttonType;
    //ストップボタンを押した際のセット画面への切り替え
    if(SetOrCount == "Set"){
      $(SetDisplay).fadeIn(300);
      $(CountDisplay).fadeOut(300);
  
      //スタートボタンを押した際のカウント画面への切り替え
    }else if(SetOrCount == "Count"){
      $(SetDisplay).fadeOut(300);
      $(CountDisplay).fadeIn(300);
    }
  }