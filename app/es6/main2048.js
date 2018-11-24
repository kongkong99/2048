let board =[];
let score = 0;
let hasConflicted = [];

let startx = 0;
let starty =0;
let endx =0;
let endy = 0;
$(document).ready(()=>{
    document.body.addEventListener('touchmove',e=>{
        e.preventDefault();
    },{passive:false})

    prepareForMobile();
    newgame();
})

//移动端自适应
let prepareForMobile = () =>{
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css({
        'width': gridContainerWidth - 2 * cellSpace,
        'height': gridContainerWidth - 2 * cellSpace,
        'padding': cellSpace,
        'border-radius': 0.02 * gridContainerWidth
    });

    $('.grid-cell').css({
        'width': cellSideLength,
        'height': cellSideLength,
        'border-radius': 0.02 * cellSideLength
    })
};


//开始新游戏
let newgame = ()=> {
    $('#gameover span').css('font-size',0.21*gridContainerWidth+'px');
    $('#grid-container').css('display', 'block');
    $('#gameover').css('display', 'none');
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();

};

//初始化棋盘格
let init = () => {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {

            let gridCell = $('#grid-cell-' + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }

    for (let i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
};

//重绘2048数字格内容
let updateBoardView = () =>{
    let $job = $('#job');
    let max = 0;
    $(".number-cell").remove();
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
            if (max < board[i][j]) {
                max = board[i][j];
            }
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            let theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength / 2);
                theNumberCell.css('left', getPosLeft(i, j) + cellSideLength / 2);
            }
            else {
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height', cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(getTextValue(board[i][j]));
            }

            hasConflicted[i][j] = false;
        }
    $('.number-cell').css('line-height', cellSideLength + 'px');
    $('.number-cell').css('font-size', 0.2 * cellSideLength + 'px');
    $job.text(getTextValue(parseInt(max)));
};


//在随机一个格子生成数字
let generateOneNumber= () => {

    if (nospace(board))
        return false;

    //随机一个位置
    let randx = parseInt(Math.floor(Math.random() * 4));
    let randy = parseInt(Math.floor(Math.random() * 4));

    let times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0)
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }
    if (times == 50) {
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
    }

    //随机一个数字
    let randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字

    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
};

//键盘按下事件
$(document).keydown(event =>{
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
            break;
        default: //default
            break;
    }
});

//移动端 监听触摸事件
document.addEventListener('touchstart',  (event)=> {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;

});

//移动端 监听触摸移动事件，可以防止下滑时，浏览器滚动条也下滑
document.addEventListener('touchmove', event=> {
    event.preventDefault();
    event.stopPropagation();
},{ passive: false });

//移动端 监听触摸离开事件
document.addEventListener('touchend', event=> {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    let delx = endx - startx;
    let dely = endy - starty;
    if (Math.abs(delx) < 0.2 * documentWidth && Math.abs(dely) < 0.2 * documentWidth) {
        return;
    }

    //x
    if (Math.abs(delx) > Math.abs(dely)) {
        if (delx > 0) {
            //right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
        } else {
            //left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
        }
    }//y
    else {
        if (dely > 0) {
            //down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
        }
        else {
            //up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 130);
                setTimeout("isgameover()", 150);
            }
        }
    }

});

//判断游戏是否结束
let isgameover= ()=> {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
};

//游戏结束执行函数
let gameover = ()=> {
    setTimeout(()=> {
        $('#grid-container').css('display', 'none');
        $('#gameover').css('display', 'block');
    }, 800)

};

//向左移动事件
let moveLeft = ()=> {

    if (!canMoveLeft(board))
        return false;

    //moveLeft
    for (let i = 0; i < 4; i++)
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {

                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 120);
    return true;
}

//向右移动事件
let moveRight = ()=> {
    if (!canMoveRight(board))
        return false;

    //moveRight
    for (let i = 0; i < 4; i++)
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > j; k--) {

                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 120);
    return true;
}



//向上移动事件
let moveUp= ()=> {

    if (!canMoveUp(board))
        return false;

    //moveUp
    for (let j = 0; j < 4; j++)
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {

                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 120);
    return true;
}


//向下移动事件
let moveDown = () => {
    if (!canMoveDown(board))
        return false;

    //moveDown
    for (let j = 0; j < 4; j++)
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {

                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 120);
    return true;
}
