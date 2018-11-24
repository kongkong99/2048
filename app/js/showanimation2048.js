'use strict';

//数字格显示动画
var showNumberWithAnimation = function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $('#number-cell-' + i + "-" + j);

    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(getTextValue(randNumber));

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 40);
};

//数字格移动动画
var showMoveAnimation = function showMoveAnimation(fromx, fromy, tox, toy) {

    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 130);
};

//得分更新
var updateScore = function updateScore(score) {
    $('#score').text(score);
};