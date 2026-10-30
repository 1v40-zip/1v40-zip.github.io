const HT_question_node = document.getElementById("questions_node")
const HT_question_node_container = document.getElementById("question_node_container")
const HT_question_img = document.getElementById("question_img");
const HT_answer_input = document.getElementById("answer_input");
const HT_answer_input_text = document.getElementById("answer_input_text");
const HT_answer_button = document.getElementById("answer_button");
const HT_answer_img = document.getElementById("answer_img");
const HT_judge_space = document.getElementById("judge_space");
const HT_judge_img = document.getElementById("judge_img");
const HT_memo = document.getElementById("memo");
const HT_notes_space = document.getElementById("notes_space");
const HT_cong = document.getElementById("cong");
const HT_all = docment.getElementById("all");
const HT_back = docment.getElementById("back");

/*
ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
                            問題処理
ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
*/

const Number_of_questions = 9;
var current_question = 0;
var correct_count = 0;

HT_answer_input.value = "";
class QUESTION{
  /**
   * 問題用コンストラクト
   * @param {String} imageS
   * @param {Array} answer
   */
  constructor(ques_image,answer,ans_img){
    this.ques_img = ques_image;
    this.ans = [...answer];
    this.input_value = "";
    this.memo_value = "";
    this.ans_img = ans_img;
    this.right = false;
  }
  load(){
    HT_question_img.src = this.ques_img;
    if(this.right == true){
      HT_answer_img.src = this.ans_img;
      HT_answer_img.classList.add("true");
      HT_answer_img.style.display = "block";
    }
    else{
      HT_answer_img.classList.remove("true");
    }

  }
  correct(){

    this.right = true;
    HT_answer_img.src = this.ans_img;
    setTimeout(()=>{
      HT_answer_img.style.display = "block";
      setTimeout(()=>{
        HT_answer_img.classList.add("true");
      },20)
    },20)
    if(correct_count == 9){
      HT_all.clasList.add("bye");
      HT_back.classList.add("dis");
  }
}

const questions = [];

questions.push(new QUESTION("./question_img/1.png",["まじん","魔人"],"./question_img/ans_1.png"));
questions.push(new QUESTION("./question_img/2.png",["にし","西"],"./question_img/ans_2.jpeg"));
questions.push(new QUESTION("./question_img/3.png",["いたち","イタチ"],"./question_img/ans_3.png"));
questions.push(new QUESTION("./question_img/4.png",["みみ","耳"],"./question_img/ans_4.png"));
questions.push(new QUESTION("./question_img/5.png",["ねがい","願い"],"./question_img/ans_5.png"));
questions.push(new QUESTION("./question_img/6.png",["チャット","ちゃっと"],"./question_img/ans_6.jpeg"));
questions.push(new QUESTION("./question_img/7.png",["てぬい","手縫い"],"./question_img/ans_7.jpeg"));
questions.push(new QUESTION("./question_img/8.png",["しょうたい","正体"],"./question_img/ans_8.png"));
questions.push(new QUESTION("./question_img/9.png",["てんたい","天体"],"./question_img/ans_9.png"));




for(var i = 0;i < Number_of_questions;i++){
  const questions_node = HT_question_node.content.cloneNode(true);
  const node = questions_node.querySelector(".question");
  const text = questions_node.querySelector(".questions_node_text");

  node.id = "question_node_" + (i + 1);
  text.id = "question_node_text_" + (i + 1);
  text.textContent = "問" + (i + 1);

  node.addEventListener("click",()=>{
    change_question(Number(node.id.split("_")[2])-1);
  })
  
  HT_question_node_container.appendChild(questions_node);
}

change_question(current_question);

function change_question(number){
  const input_originalTransition = HT_answer_input_text.style.transitionProperty;
  const image_originalTransition = HT_answer_img.style.transitionProperty;

  
  questions[current_question].input_value = HT_answer_input.value;
  questions[current_question].memo_value = HT_memo.value;
  HT_answer_input.value = questions[number].input_value;
  HT_memo.value = questions[number].memo_value;

  questions[number].load();
  current_question = number;

  HT_answer_input_text.style.transitionProperty = 'none';
  HT_answer_img.style.transitionProperty = 'none';
  setTimeout(()=>{
    HT_answer_input_text.style.transitionProperty = input_originalTransition;
    HT_answer_img.style.transitionProperty = image_originalTransition;
  },10)
}

function check_answer(){
  var correct_flag = false;
  for(const answer of questions[current_question].ans){
    if(answer == HT_answer_input.value){
      correct_flag = true;
      break;
    }
  }
  if(correct_flag){
    const text = document.getElementById("question_node_text_" + (current_question + 1));
    if(questions[current_question].right == false){
      correct_count++;
      HT_judge_img.src = "./question_img/judge_true.png";
      HT_judge_space.classList.add("display");
    }
    questions[current_question].correct()
    text.style.color = "#f00"
    text.style.textDecorationLine = "underline"
    text.style.textDecorationColor = "#f00"
    text.style.textDecorationThickness = "1.5px"
  }
  else{
    if(HT_answer_input.value){
      HT_judge_img.src = "./question_img/judge_false.png";
      HT_judge_space.classList.add("display");
    }
  }
}

HT_judge_space.addEventListener("click",()=>{
  HT_judge_space.classList.remove("display");
  if(correct_count == 5){
    HT_notes_space.querySelector("#notes").querySelector("#title").textContent = "全問正解";
    HT_notes_space.querySelector("#notes").querySelector("#string").textContent = "おめでとうございます";
  }
  else if(correct_count == 9){
    HT_notes_space.classList.remove("OK");
  }
})

function close_note(){
  HT_notes_space.classList.add("OK");
  if(correct_count == 9){
    HT_cong.classList.add("dis");
  }
}




/*

  曩謨　三満哆　母駄喃　阿盋囉底　賀多舎　娑曩喃　怛姪他
  唵　佉佉　佉呬佉呬　吽吽  入嚩囉　入嚩囉　鉢囉入嚩囉　鉢囉入嚩囉
  底瑟姹　底瑟姹　瑟致哩　瑟致哩
  娑発吒　娑発吒
  扇底迦　室哩曳　娑嚩訶

*/
