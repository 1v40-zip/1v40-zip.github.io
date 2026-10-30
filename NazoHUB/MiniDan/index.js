const HT_Q_nodes = document.querySelectorAll(".Q_node");
const HT_img_container = document.getElementById("img_container");
const HT_img_zoom = document.getElementById("img_zoom");
const HT_input = document.getElementById("input");
const HT_note = document.getElementById("notes_space");
const HT_Q_containet = document.getElementById("q_container");
const HT_hidden_q = document.getElementById("hidden_q");
const HT_cong = document.getElementById("cong");


const true_answer = [
    ["めかくし","目隠し"],
    ["もやし","モヤシ"],
    ["かまめし","釜飯","かま飯","釜めし"],
    ["あくとう","悪党","アクトウ"],
    ["あかし","証し","証"]
];



let correct_toggle = [false,false,false,false,false];
let correct_count = 0;

var last_tap = [0,0,0,0];

HT_Q_nodes.forEach((e) => {
    console.log(e.id[1]);
    e.addEventListener("touchend",(event)=>{
        const current_time = new Date().getTime();
        const tap_length = current_time - last_tap[e.id[1]];

        if(tap_length < 300 && tap_length > 0){
            if(e.id[1] < 4){
                img_zoom(e.querySelector(".Q_img").src);
            }
            else if(e.id[1] > 3 && correct_count > 3){
                img_zoom(e.querySelector(".Q_img").src);
            }

            event.preventDefault();
        }
        last_tap[e.id[1]] = current_time;
    })
})

function img_zoom(src){
    HT_img_zoom.querySelector("#zoom_img").src = src;
    HT_img_zoom.classList.add("dis");
}

HT_img_zoom.addEventListener("click",()=>{
    HT_img_zoom.classList.remove("dis");
})

HT_input.addEventListener("change",(e)=>{
    var correct_f = false;

    if(HT_input.value == "θ"){
        HT_img_container.classList.add("move");
        HT_hidden_q.classList.add("visible");
        return;
    }
    if(correct_count < 4){
        for(let i = 0;i < 4;i++){
            for(let j = 0;j < true_answer[i].length;j++){
                if(true_answer[i][j] == HT_input.value){
                    correct_f = true;
                    break;
                }
            }
            if(correct_f == true && correct_toggle[i] == false){
                correct_toggle[i] = true;
                correct_count++;
                document.getElementById("Q" + i).querySelector(".fade").querySelector(".answer").textContent = true_answer[i][0];
                document.getElementById("Q" + i).querySelector(".fade").classList.add("dis");
                HT_note.querySelector("#notes").querySelector("#title").textContent = i + 1 +"問目正解";
                HT_note.querySelector("#notes").querySelector("#string").textContent = "";
                HT_note.classList.remove("OK");

                console.log(correct_count);
                console.log(correct_toggle);
                break;
            }
        }
    }else{
        if((HT_input.value == "証し" || HT_input.value == "証" || HT_input.value == "あかし") && correct_toggle[4] == false){
            correct_f = true
            correct_toggle[4] = true;
            correct_count++;
            document.getElementById("Q" + 4).querySelector(".fade").querySelector(".answer").textContent = true_answer[4][0];
            document.getElementById("Q" + 4).querySelector(".fade").classList.add("dis");
            HT_note.querySelector("#notes").querySelector("#title").textContent = 5 +"問目正解";
            HT_note.querySelector("#notes").querySelector("#string").textContent = "";
            HT_note.classList.remove("OK");

            console.log(correct_count);
            console.log(correct_toggle);
            
        }
        
    }
    if(correct_f == false){
        HT_note.querySelector("#notes").querySelector("#title").textContent = "不正解";
        HT_note.querySelector("#notes").querySelector("#string").textContent = "";
        HT_note.classList.remove("OK");
    }
    HT_input.value = "";

})

function close_note(){
    HT_note.classList.add("OK");
    if(correct_count == 4){
        HT_img_container.classList.add("move");
        HT_hidden_q.classList.add("visible");
    }
    if(correct_count == 5){
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
