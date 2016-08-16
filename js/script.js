/**
 * Created by ChoihaLam on 2016/8/15.
 */
var chessBoard = [];
var me = true;
//赢法数组
var wins = [];

for(var i=0; i<15; i++){
    chessBoard[i] = [];
    for(var j=0; j<15; j++){
        chessBoard[i][j] = 0;
    }
}

for(var i=0; i<15; i++){
    wins[i] = [];
    for(var j=0; j<15; j++){
        wins[i][j] = [];
    }
}

var count = 0;
//所有的横线
for(var i=0; i<15; i++){
    for(var j=0; j<11; j++){
        // wins[0][0][0] = true;
        // wins[0][1][0] = true;
        // wins[0][2][0] = true;
        // wins[0][3][0] = true;
        // wins[0][4][0] = true;

        // wins[0][1][1] = true;
        // wins[0][2][1] = true;
        // wins[0][3][1] = true;
        // wins[0][4][1] = true;
        // wins[0][5][1] = true;
        for(var k=0; k<5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
//所有的竖线
for(var i=0; i<15; i++){
    for(var j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
//所有的斜线
for(var i=0; i<11; i++){
    for(var j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
//所有的反斜线  写到这里---------------------------
for(var i=0; i<11; i++){
    for(var j=14; j>3; j--){
        for(var k=0; k<5; k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

var logo = new Image();
logo.src = "images/logo.png";
logo.onload = function(){
    context.drawImage(logo, 0, 0, 450, 450);  // 画背景图片
    drawChessBoard();  //调用棋板函数
}



var drawChessBoard = function(){
    for(var i=0; i<15; i++){
        context.moveTo(15+i*30,15);    //画竖线
        context.lineTo(15+i*30,435);
        context.stroke();
        context.moveTo(15,15+i*30);     //画横线
        context.lineTo(435,15+i*30);
        context.stroke();

    }
}

var oneStep = function(i,j,me){
    context.beginPath();  //画棋子
    context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15+ i*30+2, 15 + j*30-2, 13, 15+i*30+2, 15+j*30-2, 0);
    if(me){
        gradient.addColorStop(0,"#0A0A0A");
        gradient.addColorStop(1,"#636766");
    }else{
        gradient.addColorStop(0,"#D1D1D1");
        gradient.addColorStop(1,"#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}

chess.onclick = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j] == 0){
    oneStep(i,j,me);
        if(me){
            chessBoard[i][j] = 1;
        }else{
            chessBoard[i][j] = 2;
        }
        me = !me;
    }
}




