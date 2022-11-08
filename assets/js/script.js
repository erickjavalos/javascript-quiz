// *********************************************************
// Global Variables 
// *********************************************************
var timeHTML = $('#time')
var question = $('#question')
var state = "DEFAULT"
var isDisplayed = false
var examStarted = false; // used to start the exam
var quizTime = 5; // 75s for quiz
var currentQuestion = 1;
var score = 0;
var answeredCorrectly = false;
var scoreNum = 0;
var scores = {
    'ea': 100,
    'ja': 20,
    'asdf': 2
}
var quiz = {
    "questions": [
        "Commonly used datatypes DO Not <br>Include:",
        "The condition used in an if / else statement is enclosed with ______.",
        "Arrays in Javascript can be used to store ______.",
        "String values must be enclosed within ______ when being assigned to variables.",
        "A very useful tool used during development and debugging for printing content to the debugger is:",
    ],
    "answers": {
        1 : [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers",
        ],
        2: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets",
        ],
        3 : [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        4 : [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis",
        ],
        5 : [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ]
    },
    "answer": [
        "3. alerts",
        "2. curly brackets",
        "4. all of the above",
        "4. parenthesis",
        "4. console.log",
    ]
}

// *********************************************************
// Functions
// *********************************************************

// Updates time on user interface
function updateTime(time) 
{
    timeHTML.html("<h5>Time: " + time + "</h5>");
    return;
}

// prompts user to start exam
function promptExam() 
{
    var prompt = $(
        '<div class="text-center">'
    );
    prompt.append(
        '<h3>Coding Quiz Challenge</h3>'
    );
    prompt.append(
        '<p>Try to answer the following code-related questions within the time limit. <br>Keep in mind that incorrect \
         answers will penalize your score/time by <br>ten seconds</p>'
    );

    // add delete button to remove shopping list item
    prompt.append(
        '<button class="btn-var delete-start-prompt">Start Quiz</button>'
    );

    // print to the page
    question.append(prompt);
}

// prompt user question
function promptQuestion(questionNum)
{
    var prompt = $(
        '<div>'
    );
    // append the question
    prompt.append(
        '<h1 class="questions-h1">' + quiz['questions'][questionNum-1] + '</h1>'
    );

    // append all answers
    console.log(questionNum)
    for (var i = 0; i < quiz['answers'][questionNum].length; i++) 
    {
        prompt.append( 
            '<button class="btn-var-questions question-remove">' + quiz['answers'][questionNum][i] + '</button>'
        );
    }

    console.log("testing")
    if (questionNum > 1)
    {
        var divVar = $('<div>')
        if (answeredCorrectly)
        {
            divVar.append('<h3 class="solution">___________________________________________________<br>Correct!</h3>')
        }
        else
        {
            divVar.append('<h3 class="solution">___________________________________________________<br>Wrong!</h3>')
        }
        prompt.append(divVar)
    }

    // append html to question div
    question.append(prompt);
}

// conduct exam
function processExam() 
{
    // begin timer for duration of time 
    var examTimer = setInterval(() => 
    {
        // update time dynamically
        updateTime(quizTime)
        if (quizTime <= 0 || currentQuestion > quiz['answer'].length)
        {
            // end exam
            clearInterval(examTimer)
            // remove children
            question.children().remove()
            displayResults()
        }
        // prompt normal exam
        else 
        {
            if (!isDisplayed)
            {
                promptQuestion(currentQuestion)
                isDisplayed = true
            }
        }
        quizTime--;
    }, 1000)

    
}

function displayResults() 
{
    var prompt = $(
        '<div>'
    );
    // append the question
    prompt.append(
        '<h1> <b>All Done! </h1>'
    );
    // calculate score in 100
    scoreNum = (score/quiz['answer'].length) * 100
    prompt.append(
        '<h2>Your current score is ' + scoreNum + '.</h2>'
    )
    prompt.append(
        '<h2>Enter initials: <input type="text" id="fname" name="fname"> <t> <button class="btn-var-submit">Submit</button>'
    )
    question.append(prompt)
}

function displayScores()
{
    // console.log("display the scores")
    var prompt = $(
        '<div>'
    );
    // append the question
    prompt.append(
        '<h1> <b>High scores </h1>'
    );
    
    //sort array
    // Step - 1
    // Create the array of key-value pairs
    var items = Object.keys(scores).map(
        (key) => { return [key, scores[key]] });


    // Step - 2
    // Sort the array based on the second element (i.e. the value)
    items.sort(
        (first, second) => { return first[1] - second[1] }
    );

    // Step - 3
    // Obtain the list of keys in sorted order of the values.
    var keys = items.map(
        (e) => { return e[0] });
    
  
    // append scores in sorted order from high to low
    for (var i = 0; i < items.length; i++) 
    {
        prompt.append('<h3 class="display-score">'+ (i+1) + ". " + items[items.length - (i+1)][0] + " - " +  items[items.length - (i+1)][1])
    }

    // append button to go back
    prompt.append(
        '<button class="btn-var-display go-back">Go back</button>'
    )

    // append button to clear high score
    prompt.append(
        '<button class="btn-var-display clear-high-score">Clear high score</button>'
    )

    question.append(prompt)

}

// *********************************************************
// Event handler callbacks 
// *********************************************************

function deleteStartPrompt(event) 
{
    // removes prompt
    $(this).parent().remove()
    processExam();
}

function verifyRemove(event)
{
    // grab answer selected 
    var textSelected = $(this).text();
    // delete div class
    $(this).parent().remove();
    // check selected with correct answer
    if (textSelected === quiz['answer'][currentQuestion-1])
    {
        // increase score
        score++;
        // answered correctly
        answeredCorrectly = true;
    }
    // do nothing
    else 
    {
        answeredCorrectly = false;
        quizTime -= 10;
        if (quizTime < 0)
        {
            quizTime = 0;
        }
    }

    isDisplayed = false;
    currentQuestion ++;

}

function removeRW(event)
{
    // remove div
    $(this).parent().children().remove('div')
}

function loadMemory(event)
{
    var initials = $(question).children('div').children(2).children('input').val();
    // console.log(initials)
    scores[initials] = scoreNum;
    $(question).children().remove()
    displayScores()
}

function goBack()
{
    currentQuestion = 1;
    score = 0;
    quizTime = 75;
    isDisplayed = false;
    $(question).children().remove()
    updateTime(0)
    promptExam()
}

function clearHigh()
{
    currentQuestion = 1;
    score = 0;
    quizTime = 75;
    isDisplayed = false;
    scores = {};
    $(question).children().remove()
    updateTime(0)
    promptExam()
}

// *********************************************************
// Main
// *********************************************************

// starts in default state here
if (!examStarted) 
{
    updateTime(0)
    promptExam()
}

// *********************************************************
// Event Handlers
// *********************************************************
question.on('click', '.delete-start-prompt', deleteStartPrompt)
question.on('click', '.question-remove', verifyRemove)
question.on('mouseover',  '.question-remove', removeRW)
question.on('click', '.btn-var-submit', loadMemory)
question.on('click', '.go-back', goBack)
question.on('click', '.clear-high-score', clearHigh)



