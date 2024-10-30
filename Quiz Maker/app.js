const questions = [
    {
        question: "National bird of India?",
        answers: [
            {text: "Peigon", correct:false},
            {text: "Peacock", correct:true},
            {text: "Sparrow", correct:false},
            {text: "Crow", correct:false}
        ]
    },
    {
        question: "National animal of India?",
        answers: [
            {text: "Tiger", correct:true},
            {text: "Lion", correct:false},
            {text: "Elephant", correct:false},
            {text: "Bear", correct:false}
        ]
    },
    {
        question: "National fruit of India?",
        answers: [
            {text: "Orange", correct:false},
            {text: "Mango", correct:true},
            {text: "Litchi", correct:false},
            {text: "Strawberry", correct:false}
        ]
    },
    {
        question: "National vegetable of India?",
        answers: [
            {text: "Onion", correct:false},
            {text: "Lady Finger", correct:false},
            {text: "Potato", correct:true},
            {text: "Tomato", correct:false}
        ]
    }
];

const question = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const next = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    question.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    next.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true"
    if(isCorrect){
        selectbtn.classList.add("correct")
        score++;
    }
    else{
        selectbtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    next.style.display = "block"
}

function showScore(){
    resetState();
    question.innerHTML = `You Scored ${score} out of ${questions.length}`;
    next.innerHTML = "Play Again"
    next.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

next.addEventListener("click", ()=> {
     if(currentQuestionIndex < questions.length){
        handleNextButton();
     }
     else{
        startQuiz();
     }
})

startQuiz();



