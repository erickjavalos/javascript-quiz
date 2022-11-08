var timeHTML = $('#time')
var question = $('#question')
// global variables 
var quizTime = 75; // 75s for quiz
var quiz = {
    "questions": [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
    ],
    "answers": {
        "Answer 1" : [
            "a",
            "b",
            "c",
            "d",
        ],
        "Answer 2" : [
            "1",
            "2",
            "3",
            "4",
        ],
        "Answer 3" : [
            "1a",
            "2b",
            "3c",
            "4d",
        ],
        "Answer 4" : [
            "1aa",
            "2bb",
            "3cc",
            "4dd",
        ],
        "Answer 5" : [
            "1aaa",
            "2bbb",
            "3ccc",
            "4ddd",
        ]
    },
    "answer": [
        "Answer 1",
        "Answer 2",
        "Answer 3",
        "Answer 4",
        "Answer 5"
    ]
}
var currentQuestion = 0;
// set timer 
var globaltimer = setInterval(function() 
{
    timeHTML.html("<h5>Time: " + quizTime + "</h5>");
    // grab question
    var questionSelect = quiz['questions'][currentQuestion];
    var html = "<h3>" + questionSelect + "</h3> <button>" + quiz['answers']["Answer 1"] + "</bsutton>"
    question.html("<h3>" + questionSelect + "</h3> <button>" + quiz['answers']["Answer 1"] + "</bsutton>")
    // question.html("<button>" + quiz['answers']["Answer 1"] + "</button>")
    quizTime--;
    // currentQuestion++;

}, 1000); 
