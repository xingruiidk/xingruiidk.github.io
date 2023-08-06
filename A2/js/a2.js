//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");
const page6btn=document.querySelector("#page6btn");
const page7btn=document.querySelector("#page7btn");
const page8btn=document.querySelector("#page8btn");
const closeBtn = document.querySelector("#closeBtn");
const direcBtn = document.querySelector("#direc");
const menubtn = document.querySelector("#menu");
const footer = document.querySelector("#footer");
const topContainer = document.querySelector(".top");
const menulist = document.querySelector("nav");
const loadingScreen = document.getElementById("loadingScreen");
const Loading = document.querySelector(".loading")
const questions = [
  {
    question: "What is the founder of Dior's full name?",
    answers: [
      { text: "Christ Dior", correct: false},
      { text: "Jésus Dior", correct: false},
      { text: "Christian Dior", correct: true},
      { text: "Bible Dior", correct: false},
    ]
  },
  {
    question: "Who is the ambassador for Yves Saint Laurent from K-Pop group NewJeans?",
    answers: [
      { text: "Danielle Marsh", correct: true},
      { text: "Lee Hye-In", correct: false},
      { text: "Kang Hae-Rin", correct: false},
      { text: "Hanni Pham", correct: false},
    ]
  },
  {
    question: "What is Rick Owens' wife's name?",
    answers: [
      { text: "Michel Lamier", correct: false},
      { text: "Michelle Lame", correct: false},
      { text: "Michèle Lamy", correct: true},
      { text: "Mich Lamey", correct: false},
    ]
  },
  {
    question: "Who was the one wearing Balenciaga X Adidas collab Shirt in the Balenciaga page?",
    answers: [
      { text: "Lil Uzi Vert", correct: false},
      { text: "Playboi Carti", correct: true},
      { text: "Travis Scott", correct: false},
      { text: "Destroy Lonely", correct: false},
    ]
  },
  {
    question: "What type of goods did the founders of Chrome Hearts handle?",
    answers: [
      { text: "Silver", correct: false},
      { text: "Gold", correct: false},
      { text: "Iron", correct: false},
      { text: "Leather", correct: true},
    ]
  },
  {
    question: "Which other brand did ex-artistic director of Louis Vuitton, Virgil Abloh, find?",
    answers: [
      { text: "OFF-WHITE", correct: true},
      { text: "Supreme", correct: false},
      { text: "COMME des GARÇONS", correct: false},
      { text: "Stüssy", correct: false},
    ]
  }
];
const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("ansbtns");
const nextBtn = document.getElementById("nextbtn");
var allpages=document.querySelectorAll(".page");
var isMenuOpen = false;
//select all subtopic pages
console.log(allpages);
function hideall() {
  for (let onepage of allpages) {
    onepage.style.display = "none";
  }
}
hideall();
show(8);
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
//show the page
onepage.style.display="block";
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", show1);
page2btn.addEventListener("click", show2);
page3btn.addEventListener("click", show3);
page4btn.addEventListener("click", show4);
page5btn.addEventListener("click", show5);
page6btn.addEventListener("click", show6);
page7btn.addEventListener("click", show7);
page8btn.addEventListener("click", show8);
//closeBtn.addEventListener("click", closeAllPages);
menubtn.addEventListener("click", toggleMenus);
direcBtn.addEventListener("click", toggleDirec);

function show1()
{
    show(1);
}
function show2()
{
    show(2);
}
function show3()
{
    show(3);
}
function show4()
{
    show(4);
}
function show5()
{
    show(5);
}
function show6()
{
    show(6);
}
function show7()
{
    show(7);
}
function show8()
{
    show(8);
}
// function closeAllPages() 
// {
//     hideall();
// }
// fade in loading
function showLoadingScreen() {
  loadingScreen.style.opacity = "1"; // Set opacity to 1 to make it visible
  loadingScreen.style.pointerEvents = "auto"; //enable
}
// fade out loading
function hideLoadingScreen() {
  loadingScreen.style.opacity = "0"; // Set opacity to 0 to make it invisible
  Loading.style.display = "none";
  loadingScreen.style.pointerEvents = "none"; //disable
}
// delay
function simulateLoading() {
  showLoadingScreen();
  setTimeout(() => {
      hideLoadingScreen();
  }, 1500); //time in ms
}
simulateLoading();
/*for hamMenu */
const hamBtn=document.querySelector("#direc");
hamBtn.addEventListener("click",toggleDirec);
const menuItemsList=document.querySelector("nav ul");
function toggleDirec()
{ /*open and close menu*/
if(menuItemsList.style.display=="block")
menuItemsList.style.display="none";
else menuItemsList.style.display="block";

}//can optimize using toggle class with css transitions



function toggleMenus() 
{
    if (!isMenuOpen) 
    {
      topContainer.style.left = "-15%";
      for (let i = 0; i < allpages.length; i++)
      {
        allpages[i].style.width = "86%"
      }
      footer.style.left = "-15%"; 
    } 
    else 
    {
      topContainer.style.left = "0";
      footer.style.left = "0";
      for (let i = 0; i < allpages.length; i++)
      {
        allpages[i].style.width = "80%"
      }
      menulist.style.display = "block";
    }
    isMenuOpen= !isMenuOpen;
}
  
  document.addEventListener("mousedown", (event) => {
    if (
      !event.target.closest(".top") &&
      topContainer.style.left === "0" &&
      event.target !== menubtn &&
      footer.style.left === "0" && 
      !event.target.closest("#footer")
    ) {
      topContainer.style.left = "-15%";
      footer.style.left = "-15%"; 
    }

    
    if (!event.target.closest(".page") && !isMenuOpen) {
      for (let i = 0; i < allpages.length; i++)
      {
        allpages[i].style.width = "80%"
      }
    }
  });

  let currentQuestionIndex = 0;
  let score = 0;
  function StartQuiz()
  {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestions();
  }
  function showQuestions()
  {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +   currentQuestion.
    question;
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      ansBtn.appendChild(button);
      if(answer.correct)
      {
        button.dataset.correct = answer.correct
      }
      button.addEventListener("click", selectAns);
    });
  }
function resetState()
{
  nextBtn.style.display = "none";
  while(ansBtn.firstChild)
  {
    ansBtn.removeChild(ansBtn.firstChild)
  }
}
function selectAns(e)
{
 const selectedBtn = e.target;
 const isCorrect = selectedBtn.dataset.correct === "true";
 if(isCorrect)
 {
  selectedBtn.classList.add("correct");
  score++;
 }
 else
 {
  selectedBtn.classList.add("incorrect")
 }
 Array.from(ansBtn.children).forEach(button=>
  {
    if(button.dataset.correct === "true")
    {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}
function handleNextButton()
{
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length)
  {
    showQuestions();
  }
  else
  {
    showScore();
  }
}
function showScore()
{
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Try Again";
  nextBtn.style.display = "block";
}
nextBtn.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length)
  {
    handleNextButton();
  }
  else{
    StartQuiz();
  }
});

StartQuiz();
