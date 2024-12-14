//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
//Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "Как звали мужика из Ривии, ну такой с мечом, магия всякая у него была, весь такой любовник,?",
    options: ["Гриша", "Геральт", "Герман", "Костян"],
    correct: "Геральт",
  },
  {
    id: "1",
    question: "Был короче крутой вампир, ну типа прям вааааще и он спас девчину выдав свою сущность перед Геральтом, че он утворил?",
    options: ["Встал перед зеркалом", "Вытащил раскаленную подкову из огня", "Улыбнулся, показав свои зубки", "Убежал при виде креста"],
    correct: "Вытащил раскаленную подкову из огня",
  },
  {
    id: "2",
    question: "Какие валыны носят ведьмаки?",
    options: ["Стальной и серебряный мечи", "С пистолетом гонял ", "Настоящему войну не нужно оружие", "Нунчаки"],
    correct: "Стальной и серебряный мечи",
  },
  {
    id: "3",
    question: "Типа дочка там какого-то князя, родилась кажись в Скеллиге, стала принцессей, за ней еще охотились чудаки на конях, как ее звали?",
    options: ["Цирилла", "Курила", "Косяк ", "Львенок Диснея"],
    correct: "Цирилла",
  },
  {
    id: "4",
    question: "Какие ювелирные украшения носит Геральт?",
    options: ["Браслет pandora", "Медальон школы волка", "Блатные перстни", "Православный Крестик"],
    correct: "Медальон школы волка",
  },
  {
    id: "5",
    question: "Лучший друг геральта, толстый такой, маленький бородач?",
    options: ["Фунтик", "Хобитс", "Золтан", "Гендальф"],
    correct: "Золтан",
  },
  {
    id: "6",
    question: "В книге «Башня ласточки» Геральт получил одно из самых серьезных ранений — он лишился уха. Как?",
    options: ["Любовница откусила", "Неудачно достал меч", "Просроченный элексир попался", "Ухо оторвало арбалетным болтом"],
    correct: "Ухо оторвало арбалетным болтом",
  },
  {
    id: "7",
    question: "Главный злодей дополнения Кровь и вино?",
    options: ["Блейд", "Детлафф", "Эдвард Каллен", "Дракула"],
    correct: "Детлафф",
  },
  {
    id: "8",
    question: "Кто написал серию книг про Ведьмака?",
    options: ["Какие книги, это игра", "Толкин", "Сапковский", "Мартин"],
    correct: "Сапковский",
  },
  {
    id: "9",
    question: "Кто созадл игру Ведьмич?",
    options: ["Какой-то чел", "CD Projekt RED", "Bethesda", "FromSoftware"],
    correct: "Какой-то чел",
  },

  
 
];
//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
      "Правильных ответов " + scoreCount + " из " + questionCount + " Но это не имеет значения, воспользуйтесь легким способом";
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " из " + quizArray.length + " Вопросов";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);
//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " из " + quizArray.length + " Вопросов ";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");
  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}
//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});
//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};