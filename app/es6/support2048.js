//移动端相关尺寸定义
let documentWidth = window.screen.availWidth;
let gridContainerWidth= 0.92 * documentWidth;
let cellSideLength = 0.18 * documentWidth;
let cellSpace = 0.04 * documentWidth;

let getPosTop = ( i , j ) =>{
    return cellSpace + i*(cellSpace+cellSideLength);
};

let getPosLeft= ( i , j )=> {
    return cellSpace + j*(cellSpace+cellSideLength);
};

//不同数字格对应颜色
let getNumberBackgroundColor=( number )=>{
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "#000";
};

//不同数字对应的字符串
let getTextValue= (number)=>{
    switch(number){
        case 2: return "小白"; break;
        case 4: return "实习僧"; break;
        case 8: return "码农"; break;
        case 16: return "程序猿"; break;
        case 32: return "攻城狮"; break;
        case 64: return "项目经理"; break;
        case 128: return "部门主管"; break;
        case 256: return "经理秘书"; break;
        case 512: return "总经理"; break;
        case 1024: return "执行官"; break;
        case 2048: return "董事长"; break;
        case 4096: return "嘉诚女婿"; break;
        case 8192: return "盖茨基友"; break;
        default:
            break;
    }
    return "小白";
};

//2，4对应的颜色
let getNumberColor = (number) =>{
    if(number <= 4){
        return "#776e65";
    }
    return "white";
};


//判断所有方格中是否还有空位
let nospace = (board) => {
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
};


//判断是否可以向左移动
let canMoveLeft = ( board ) =>{

    for( let i = 0 ; i < 4 ; i ++ )
        for( let j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
};

//判断是否可以向右移动
let canMoveRight = ( board ) =>{

    for( let i = 0 ; i < 4 ; i ++ )
        for( let j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;

    return false;
};


//判断是否可以向上移动
let canMoveUp = ( board ) =>{

    for( let j = 0 ; j < 4 ; j ++ )
        for( let i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
};

//判断是否可以向下移动
let canMoveDown = ( board ) =>{

    for( let j = 0 ; j < 4 ; j ++ )
        for( let i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
};

//判断两个水平数字方格之间是否有阻碍物
let noBlockHorizontal= ( row , col1 , col2 , board ) => {
    for( let i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
};

//判断两个竖直数字方格之间是否有阻碍物
let noBlockVertical= ( col , row1 , row2 , board ) =>{
    for( let i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
};

//判断是否可以移动
let nomove = ( board ) => {
    if( canMoveLeft( board ) ||
        canMoveRight( board ) ||
        canMoveUp( board ) ||
        canMoveDown( board ) )
        return false;

    return true;
};

