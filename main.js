//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 <유저번호 down!!
//랜덤번호 > 유저번호 up!!
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측불가, 버튼이 disable)
// reset 버튼 누르면 게임 리셋
// 유효성검사 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다 (기회는 깍이지 않는다)
// 유효성검사 유저가 이미 입력한 숫자를 입력하면 알려준다 (기회는 깎지않는다)
// 인풋박스에 포커스를 두면 숫자가 지워진다
// 찬스가 남았는데 정답을 맞추면 플레이버튼 디스에이블드


let computerNum = 0;
let userInput = document.getElementById("user-input")
let playButton = document.getElementById("play-button")
let resultArea = document.getElementById("result-area")
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area")
let resetButton = document.getElementById("reset-button")
let history = [];
let imgArea = document.getElementById("img-area")



playButton.addEventListener("click",play)
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){
    userInput.value = "";
})


function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
   
    console.log(computerNum)
}
function play(){
    let userValue = userInput.value;

    if(userValue <1 || userValue >100){
        resultArea.textContent="1과 100사이 숫자를 입력하세요"
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 값입니다"
        return;
    }
    
    chances --;
    chanceArea.textContent=`남은 기회 : ${chances}번`
    history.push(userValue)
    console.log(history)

    if(userValue > computerNum){
        resultArea.textContent ="Down!!!"
        imgArea.src = "./asset/down.gif"
    }else if(userValue < computerNum){
        resultArea.textContent ="Up!!!"
        imgArea.src = "./asset/up.gif"
    }else{
        resultArea.textContent ="정답입니다!!!"
        gameOver = true;
        imgArea.src = "./asset/answer.gif"
    }
        
    if(chances <1){
        gameOver = true;
    }
    if(gameOver){
        playButton.disabled = true ;
    }

    
}

function reset(){
    userInput.value = "";
    pickRandomNum()
    chances = 5;
    gameOver = false;
    playButton.disabled = false;
    chanceArea.textContent =`남은 기회 : ${chances}번`
    resultArea.textContent ="맞춰보쟛!!"
    history = [];
    imgArea.src = "./asset/zombee.gif"
}


pickRandomNum();