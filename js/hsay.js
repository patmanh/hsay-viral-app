$(document).ready(function(){

  var questions = {
    "data": [
        {   "id":0,
            "question": "What is the capital of Thailand?",
            "answers": [
                {
                    "id":0,
                    "text": "Bangkok",
                    "isCorrect": 1
                },
                {
                    "id":1,
                    "text": "Mumbai",
                },
                {
                    "id":2,
                    "text": "Phuket",
                },
                {
                    "id":3,
                    "text": "Jakarta",
                }
            ]
        },
        {   "id":2,
            "question": "What is the next number in this sequence: 1, 1, 2, 3, 5, 8...?",
            "answers": [
                {
                    "id":0,
                    "text": "10",
                },
                {
                    "id":1,
                    "text": "13",
                    "isCorrect": 1
                },
                {
                    "id":2,
                    "text": "15",
                },
                {
                    "id":3,
                    "text": "20",
                }
            ]
        },
        {   "id":3,
            "question": "How many legs do two ducks and two dogs have?",
            "answers": [
                {
                    "id":0,
                    "text": "6",
                },
                {
                    "id":1,
                    "text": "10",
                },
                {
                    "id":2,
                    "text": "12",
                    "isCorrect": 1
                },
                {
                    "id":3,
                    "text": "16",
                }
            ]
        },
        {   "id":6,
            "question": "Fill in the blank: \"I wanna rock and roll all night, and _______ every day\"",
            "answers": [
                {
                    "id":0,
                    "text": "sleep in",
                },
                {
                    "id":1,
                    "text": "smile",
                },
                {
                    "id":2,
                    "text": "work out",
                },
                {
                    "id":3,
                    "text": "party",
                    "isCorrect": 1                    
                }
            ]
        },
        {   "id":4,
            "question": "How many letters are in this sentence?",
            "answers": [
                {
                    "id":0,
                    "text": "7",
                },
                {
                    "id":1,
                    "text": "30",
                },
                {
                    "id":2,
                    "text": "31",
                    "isCorrect": 1
                },
                {
                    "id":3,
                    "text": "38",
                }
            ]
        },
        {   "id":1,
            "question": "What is the primary language spoken in Mexico?",
            "answers": [
                {
                    "id":0,
                    "text": "Latin",
                },
                {
                    "id":1,
                    "text": "Mexican",
                },
                {
                    "id":2,
                    "text": "Spanish",
                    "isCorrect": 1
                },
                {
                    "id":3,
                    "text": "Portugese",
                }
            ]
        },
        {   "id":5,
            "question": "\"One thousand, eight hundred, six\" written backwards is:",
            "answers": [
                {
                    "id":0,
                    "text": "6801",
                },
                {
                    "id":1,
                    "text": "6081",
                    "isCorrect": 1                    
                },
                {
                    "id":2,
                    "text": "0681",
                },
                {
                    "id":3,
                    "text": "None of the above",
                }
            ]
        },
        {   "id":7,
            "question": "What weighs the most in this list:",
            "answers": [
                {
                    "id":0,
                    "text": "1,000 lbs. of feathers",
                },
                {
                    "id":1,
                    "text": "1,000 lbs. of bricks",
                },
                {
                    "id":2,
                    "text": "1,000 lbs. of dirt",
                },
                {
                    "id":3,
                    "text": "All of the above",
                    "isCorrect": 1                    
                }
            ]
        },
        {   "id":8,
            "question": "What shape does Italy look like on a map?",
            "answers": [
                {
                    "id":0,
                    "text": "A man waving",
                },
                {
                    "id":1,
                    "text": "A cloud",
                },
                {
                    "id":2,
                    "text": "A boot",
                    "isCorrect": 1                    
                },
                {
                    "id":3,
                    "text": "A hat",
                }
            ]
        },
        {   "id":9,
            "question": "How many sides does a cube have?",
            "answers": [
                {
                    "id":0,
                    "text": "4",
                },
                {
                    "id":1,
                    "text": "6",
                    "isCorrect": 1                    
                },
                {
                    "id":2,
                    "text": "9",
                },
                {
                    "id":3,
                    "text": "12",
                }
            ]
        }
      ]
    };
    
  var totalQuestions = 0;
  var correctAnswers = 0;
  var totalAnswered = 0;
  var myId;
  
  function updateScoreUI(){
    //update progress bar
    var progressWrapper = $(".progress-wrapper");
    progressWrapper.find(".progress-bar").css("width", parseInt(totalAnswered/totalQuestions*100,10) + "%");
    progressWrapper.find(".remaining").html(totalAnswered + 1);
    
    //update dial
    var scoreDec = correctAnswers/totalAnswered;
    var needleVal = scoreDec * 240 - 120;
    $("#needle").rotate({animateTo:needleVal});
    
    //update score on dial
    $("#quiz .score span").html(parseInt(scoreDec*100,10));
  }
  
  function advanceQuestion(){
    var currQuestion = $("#quiz .question:visible");
    var nextQuestion = currQuestion.next();
    
    if (totalAnswered != totalQuestions){
      currQuestion.hide();
      nextQuestion.fadeIn();
    }
    else {
      goToReport();
    }
  }
  
  function goToReport(){
    mixpanel.track("Report Shown");

    $("#infographic").css("background-image", "url(img/infographics/" + correctAnswers + ".png)");

    $("#quiz").hide();
    $("#report").fadeIn();
    
    $("#report .continue-btn").click(function(e){
      e.preventDefault();
      goToConvert();
      
      var options = [
        "",
        "a Dumb Blonde",
        "a Dumb Blonde",
        "a Dumb Blonde",
        "a Dumb Blonde",
        "Below-average Brains",
        "Below-average Brains",
        "Sexy and Smart",
        "Totally Nerdy",
        "an Ultimate Nerd"
      ];
       
      var postMessage = "I took this smartness quiz and scored " + correctAnswers + "/" + totalQuestions + ", making me \"" + options[correctAnswers].toUpperCase() + "\". \r\n\r\n Can you beat my score? \r\n\r\nwww.HowSmartAreYou.ca/?tid=" + new Date().getTime();
      
      FB.api('/'+ myId +'/photos', 'post', {
        url: 'http://www.howsmartareyou.ca/img/infographics/' + correctAnswers + '.png',
        message: postMessage
      }, function(response){
        if (response && response.id){
          mixpanel.track("IG posted");
        }
        else {
          //
        }
      });
    });
  }
  
  function goToConvert(){
    mixpanel.track("Conversion Quiz Shown");

    $("#report").hide();
    $("#convert").fadeIn();
    
    $("#convert .continue-btn").click(function(e){
      e.preventDefault();
      mixpanel.track("CTA Clicked", {}, function(){debugger;
        window.location = "http://light-bot.com/flash-lite.html?r=hsay"
      });
    });
    
    $("#convert input[type=radio]").change(function(e){
      $(this).closest(".question").find(".answer-wrapper, >img").hide();
      $(this).closest(".question").find(".cta").fadeIn();
      mixpanel.track("Conversion Buttons Shown");
    });
  }
  
  function goToQuiz(){ 
    mixpanel.track("Quiz Shown");
 
    $("#login").hide();
    $("body").addClass("blur");
    $("#quiz").fadeIn();
    
    $.each(questions.data, function(k,v){
      questionDIV = $.tmpl("question_div", { data: v });
      $("#quiz .content").append(questionDIV)
    });
    totalQuestions = questions.data.length;    
    
    $("#quiz .question").eq(0).fadeIn();
    
    $("#needle").rotate({animateTo:-120});
    $(".progress-bar").css("width", 10);
  
    $("input[type=radio]").change(function(e){
      totalAnswered ++;
      
      if ($(e.currentTarget).data("is-correct") == 1){
        correctAnswers ++;
      }

      updateScoreUI();
      advanceQuestion();
    });
  }
  
  function captureFBData(){
    FB.api('/me', function(response) {
      myId = response.id;
      mixpanel.people.set({
        "$email": response.email,
        "$created": new Date(),
        "$last_login": new Date(),
        "gender": response.gender,
        "$first_name": response.first_name,
        "$last_name": response.last_name,
        "fbid": response.id,
        "fburl": response.link,
        "username": response.username
      });
    });
  }

  window.FBReady.done(function(response){
    captureFBData();
    mixpanel.track("Logged In (Existing)");
    goToQuiz(); //already logged in
  }).fail(function(response){
    $("#fb-login").click(function(e){
      e.preventDefault();
      mixpanel.track("Launched Auth");
      FB.login(function(response) {
       if (response.authResponse) {
          //sucessful auth
          captureFBData();
          mixpanel.track("Logged In (New)");
          goToQuiz();
       } else {
         //User cancelled login or did not fully authorize.
       }
      }, {scope:'publish_actions, publish_stream, email'});      
    });
  });

});
