const HT_question_template = document.getElementById("node_template");
const HT_question_container = document.getElementById("mystery_container");
const HT_parrot = document.getElementById("parrot");
const HT_parrot_bubble_S = document.getElementById("touch_area");
const HT_judge = document.getElementById("gray_fade");
const HT_parrot_bubble_L = document.getElementById("gray_fade_2");
const HT_header = document.getElementById("header_logo");
const HT_title = document.getElementById("home_logo");
const HT_ad = document.getElementById("ad");


var question_data = [];
var correct_counter = 0;

var questions = [];
class QUESTION_NODE{
    constructor(number,path,difficulty,answer,hint,explanation){
        this.number = number;
        this.path = path;
        this.difficulty = difficulty;
        this.answer = [...answer];
        this.hint = hint;
        this.explanation = explanation;
        this.element = null;
        this.correct = false;
    }
    load(){
        const clone = HT_question_template.content.cloneNode(true);
        const node = clone.querySelector(".mystery_node");
        const num = clone.querySelector(".num");
        const diff = clone.querySelector(".diff");
        const img = clone.querySelector(".mystery_img");
        const button = clone.querySelector(".answer_button");
        const input = clone.querySelector(".answer_input");
        node.id = "mystery_node_" + this.number;
        num.textContent = this.number + 1 + "問目";
        diff.textContent = "難易度　" + this.difficulty;
        img.src = this.path;
        button.addEventListener("click",()=>{
            this.answer_check();
        })
        input.addEventListener("focusin",(e)=>{
            e.stopImmediatePropagation() 	
        })
        
        HT_question_container.appendChild(clone);
        this.element = document.getElementById("mystery_node_" + this.number);
    }
    answer_check(){
        const input = this.element.querySelector(".answer_input");
        if(input.value == ""){
            return;
        }
        var correct_f = false;
        for(var i = 0;i < this.answer.length;i++){
            if(input.value == this.answer[i]){
                correct_f = true;
                break;
            }
        }
        if(correct_f == true){
            HT_judge.querySelector("#judge_img").src = "./img/Mr.Parrot_win.png"
            HT_parrot.style.display = "none";
            if(this.correct == false){
                this.correct = true;
                correct_counter++;
            }
            // HT_parrot_bubble_L.classList.add("dis");
            // HT_parrot_bubble_L.querySelector("#con").querySelector("#h").textContent = "正解";
            // HT_parrot_bubble_L.querySelector("#exa").textContent = this.explanation;
            // HT_parrot.src = "./img/Mr.Parrot_speaking.png"
            // HT_parrot.style.width = "33%"
        }
        else{
            HT_judge.querySelector("#judge_img").src = "./img/Mr.Parrot_lose.png"
            HT_parrot.style.display = "none";
            // HT_parrot_bubble_L.classList.add("dis");
            // HT_parrot_bubble_L.querySelector("#con").querySelector("#h").textContent = "不正解";
            // HT_parrot_bubble_L.querySelector("#exa").textContent = encouragement();
            // HT_parrot.src = "./img/Mr.Parrot_speaking.png"
            // HT_parrot.style.width = "33%"
        }
        setTimeout(()=>{
            HT_judge.classList.add("dis");
        },10)
    }
}



HT_judge.addEventListener("click",()=>{
    HT_judge.classList.remove("dis");
    HT_parrot.style.display = "block";
    HT_parrot.style.width = "30%"
    HT_parrot.src = "./img/Mr.Parrot.png";
    if(correct_counter == 20){
        HT_parrot_bubble_L.classList.add("dis");
        HT_parrot_bubble_L.querySelector("#img").src = "./img/Mr.Parrot_win.png";
         HT_parrot_bubble_L.querySelector("#h").innerHTML = '全問正解！';       
        HT_parrot_bubble_L.querySelector("#exa").innerHTML = '全問正解おめでとうございます！<br>もしよければアンケートにご協力いただけると幸いです。<a href="https://docs.google.com/forms/d/e/1FAIpQLSeG1JIPUhUZcvCnZ2ePFrePjofC8xCWs0rGiqOWs6DuwjpmWQ/viewform?usp=publish-editor">アンケート</a>';
        HT_parrot.src = "./img/Mr.Parrot_happy.png"
        HT_parrot.style.width = "33%"
        correct_counter++;
    }
    event.preventDefault();
})



async function loadJSON() {
    const response = await fetch('./myst.json');
    question_data = await response.json();
    var i = 0;
    question_data.forEach(ele => {
        questions.push(new QUESTION_NODE(i,ele.img_path,ele.difficulty,ele.answer,ele.hint,ele.explanation));
        questions[i].load();
        i++;
    });
}

loadJSON();





var parrot_state = -10;
var parrot_dialogue = 0;

const NiceToMeetYou = ['こんにちハ！こんな森にきてどうしたんダイ？<br><span id="span" style="color : #777777">吹き出しをタップでテキストを送る</span>',
    'そうカ！君は名探偵ナノカ！',
    '僕はこの森の案内人。<br>「謎のインコ」サ！',
    'そうそう、ここにはたくさんの謎が潜んでいるんダ。',
    '遺跡調査の前のウォーミングとして活用してみてネ！',
    '謎で詰まったら、僕をタップしてみてネ！<br>少しならヒントを出してあげるヨ！',
    'でもどうしてもわからない時は、僕をたくさんタップしてネ！答えを教えてあげるヨ<br><span id="span" style="color : #777777">出来たら自力で解いてほしいケド...</span>',
    'それジャ!頑張ってネ!'
];

HT_parrot_bubble_S.classList.add("dis");
HT_parrot_bubble_S.style.backgroundColor = "#00000084";
HT_parrot.src = "./img/Mr.Parrot_speaking.png"
HT_parrot.style.width = "33%"
HT_parrot_bubble_S.querySelector("#speech_bubble_S").querySelector(".bubble_S_p").innerHTML = NiceToMeetYou[parrot_dialogue];


let closest_question = 0;

let Interval;
let int_timer = 0;
let touch_count = 0;

HT_parrot.addEventListener("click",(event)=>{
    const screen_centerY = window.innerHeight / 2;
    closest_question = 0;
    let min_distance = Infinity;

    for(let i = 0;i < questions.length;i++){
        const rect = questions[i].element.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;

        const dy = Math.abs(centerY - screen_centerY);
        if(dy < min_distance){
            min_distance = dy;
            closest_question = i;
        }
    }
    HT_parrot.src = "./img/Mr.Parrot_speaking.png"
    HT_parrot.style.width = "33%"
    if(min_distance > 400 && parrot_state > -5){
        HT_parrot_bubble_S.querySelector("#speech_bubble_S").querySelector(".bubble_S_p").textContent = "ようこそ！名探偵！";
        parrot_state = 0;
        HT_parrot_bubble_S.classList.add("dis");
    }else if(parrot_state == 0 || parrot_state == 1){
        HT_parrot_bubble_S.querySelector("#speech_bubble_S").querySelector(".bubble_S_p").textContent = closest_question + 1 + "問目のヒントを見るカイ？"
        parrot_state = 1;
        int_timer = 200;
        touch_count++;
        if(touch_count == 5){
            clearInterval(Interval);
            touch_count = 0;
            parrot_state = 2;
            setTimeout(()=>{
                HT_parrot_bubble_S.classList.remove("dis");
                HT_parrot_bubble_L.classList.add("dis");
                HT_parrot_bubble_L.querySelector("#img").src = questions[closest_question].path;
                HT_parrot_bubble_L.querySelector("#exa").innerHTML = questions[closest_question].explanation;
                HT_parrot.src = "./img/Mr.Parrot_speaking.png"
                HT_parrot.style.width = "33%"
            },1)
        }
        if(touch_count == 1){
            Interval = setInterval(()=>{
                int_timer--;
                if(int_timer < 1){

                    touch_count = 0;
                    clearInterval(Interval);
                    Interval = null;
                }
            },1);

        }
        HT_parrot_bubble_S.classList.add("dis");
    }
    

    event.preventDefault();


})

HT_parrot_bubble_L.addEventListener("click",(event)=>{
    HT_parrot_bubble_L.classList.remove("dis");
    HT_parrot.style.display = "block";
    HT_parrot.style.width = "30%"
    HT_parrot.src = "./img/Mr.Parrot.png";
    parrot_state = 0;
    event.preventDefault();
})

// HT_parrot_bubble_S.querySelector("#speech_bubble_S").addEventListener("click",(e)=>{
//     HT_parrot.src = "./img/Mr.Parrot_happy.png"
//     e.cancelable = true;
// })


HT_parrot_bubble_S.addEventListener("click",(e)=>{
    if((e.target.id == "speech_bubble_S" || e.target.id == "bubble_S_p") && parrot_state == 1){
        HT_parrot_bubble_S.querySelector("#speech_bubble_S").querySelector(".bubble_S_p").textContent = questions[closest_question].hint;
        parrot_state = 0;
    }
    else if(((e.target.id == "speech_bubble_S" || e.target.id == "bubble_S_p" || e.target.id == "span") && parrot_state < -5)){
        parrot_dialogue++;
        if(parrot_dialogue == NiceToMeetYou.length){
            parrot_state = 0;
            HT_header.classList.add("dis");
            HT_title.classList.add("dis");
            HT_ad.classList.add("dis");
            HT_parrot_bubble_S.classList.remove("dis");
            HT_parrot.style.width = "30%"
            HT_parrot.src = "./img/Mr.Parrot.png";    
            HT_parrot_bubble_S.style.backgroundColor = "transparent";
        }
        HT_parrot_bubble_S.querySelector("#speech_bubble_S").querySelector(".bubble_S_p").innerHTML = NiceToMeetYou[parrot_dialogue];
    }
    else if(parrot_state > -5){
        HT_parrot_bubble_S.classList.remove("dis");
        HT_parrot.style.width = "30%"
        HT_parrot.src = "./img/Mr.Parrot.png";    
    }
    e.preventDefault();
})

/*

  曩謨　三満哆　母駄喃　阿盋囉底　賀多舎　娑曩喃　怛姪他
  唵　佉佉　佉呬佉呬　吽吽  入嚩囉　入嚩囉　鉢囉入嚩囉　鉢囉入嚩囉
  底瑟姹　底瑟姹　瑟致哩　瑟致哩
  娑発吒　娑発吒
  扇底迦　室哩曳　娑嚩訶

*/
