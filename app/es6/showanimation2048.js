
//数字格显示动画
let showNumberWithAnimation= ( i , j , randNumber )=>{

    let numberCell = $('#number-cell-' + i + "-" + j );

    numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
    numberCell.css('color',getNumberColor( randNumber ) );
    numberCell.text( getTextValue(randNumber) );

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },40);
};


//数字格移动动画
let showMoveAnimation= ( fromx , fromy , tox, toy ) => {

    let numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top:getPosTop( tox , toy ),
        left:getPosLeft( tox , toy )
    },130);
};


//得分更新
let  updateScore= ( score ) =>{
    $('#score').text( score );
};
