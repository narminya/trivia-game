let boxes;
window.onload = () => {
    function Quiz(question, answer) {
        this.question = question,
            this.answer = answer
    }

    let questions = [];
    questions.push(new Quiz('What’s the capital of Canada? ', 'OTTAWA'))
    questions.push(new Quiz('Best football player of all time', 'MESSI'))
    questions.push(new Quiz('God of mischief in Norse mythology.', 'LOKI'))
    questions.push(new Quiz('What is the largest country in the world', 'RUSSIA'))
    questions.push(new Quiz('In football, which team has won the Champions League (formerly the European Cup) the most?', 'REALMADRID'))
    questions.push(new Quiz(' What is the chemical formula for Table Salt?', 'NACL'))
    questions.push(new Quiz(' What is the most famous Mexican beer?', 'CORONA'))
    questions.push(new Quiz('Who is the most popular Marvel superhero?', 'SPIDERMAN'))
    questions.push(new Quiz('Stars and Stripes” is the nickname of the flag of which country?', 'USA'))
    questions.push(new Quiz('fictional city appearing in American comic books published by DC Comics, best known as the home of Batman', 'GOTHAM'))
    questions.push(new Quiz('Name the best-selling book series of the 21st century?', 'HARRYPOTTER'))
    questions.push(new Quiz('What city do The Beatles come from?', 'LIVERPOOL'))
    questions.push(new Quiz('King of pop', 'MICHAELJACKSON'))
    questions.push(new Quiz('Google Chrome, Safari, Firefox, and Explorer are different types of what?', 'BROWSER'))
    questions.push(new Quiz('Which infinity stone was located on Vormir?', 'SOUL'))
    questions.push(new Quiz('Which company owns Bugatti, Lamborghini. Audi, Porsche, and Ducati?', 'VOLKSWAGEN'))
    questions.push(new Quiz('What is the tallest building in the world?', 'BURJKHALIFA'))

    //count of right answers
    let rightAnswers = 0;
    let wrongAnswers = 0;

    let attempt = 3;

    boxes = document.querySelectorAll('.box');
    //let s = b.replace(" ","").toUpperCase() 
    let getAnswer = '';
    let p = document.querySelector('.question-body');
    let boxContainer = document.querySelector('#xx');
    let letters = document.querySelectorAll('.letter')
    // get random object from array 
    let randomQuestionNum;
    // answer to the question
    let answer;

    let attempts = document.querySelector('.attempts');
    attempts.innerHTML = `Attempts left: ${attempt}`;
    //ask question
    let next = document.querySelector('#next');
    next.addEventListener('click', nextQuestion);

    function nextQuestion() {
        boxContainer.innerHTML = ''
        boxContainer.nextElementSibling.innerHTML = '';

        this.innerHTML = "Next";

        if (questions.length != 0) {
            randomQuestionNum = questions[getRandomInt(0, questions.length - 1)];
            answer = questions[questions.indexOf(randomQuestionNum)].answer;

            console.log(`questions length${questions.length - 1}`)
            p.innerHTML = randomQuestionNum.question;
        }
        next.setAttribute("disabled", true);
        setTimeout(() => {
            if (questions.length === 0 || p.innerHTML === '') {
                document.querySelector('.game-content').classList.add('used');
                document.querySelector('.result').innerHTML = `You aswered: ${rightAnswers} questions`;
                return;
            }
        }, 1000);

    }

    let check = document.querySelector('#check');
    check.addEventListener('click', checkAnswer);

    function checkAnswer(e) {
        e.preventDefault();

        if (questions.length === 0 || p.innerHTML === '') {
            return;
        }
        if (answer === getAnswer.toUpperCase()) {
            rightAnswers++;
            document.querySelector('#next').removeAttribute("disabled");
            questions.splice(questions.indexOf(randomQuestionNum), 1);
            boxContainer.nextElementSibling.innerHTML = 'Right!';
            boxContainer.nextElementSibling.classList.add('true');
            setTimeout(() => {
                nextQuestion();
            }, 5000);

        } else if (answer !== getAnswer.toUpperCase() && boxContainer.innerHTML.length != 0) {
            attempt--;

            boxContainer.innerHTML = ' ';
            boxContainer.nextElementSibling.innerHTML = 'Wrong!';
            boxContainer.nextElementSibling.classList.add('false');
            getAnswer = '';
            if (attempt === 0) {
                wrongAnswers++;
                attempt = 3;
                //delete asked questions from main array to prevent asking repeated questions
                questions.splice(questions.indexOf(randomQuestionNum), 1);
                nextQuestion();
            }
        }
        attempts.innerHTML = `Attempts left: ${attempt}`;
        let w = document.createElement('p');
        w.innerHTML = `Wrong: ${wrongAnswers}`;

        let r = document.createElement('p');
        r.innerHTML = `Right: ${rightAnswers}`;
        document.querySelector('.answers-count').innerHTML = '';
        document.querySelector('.answers-count').appendChild(w)
        document.querySelector('.answers-count').appendChild(r)
    }


    let clearBtn = document.querySelector('#clear');
    clearBtn.addEventListener('click', function (params) {
        boxContainer.innerHTML = '';
    })

    let quitBtn = document.querySelector('#quit');
    quitBtn.addEventListener('click', function (params) {
        questions.length = 0;
        console.log('b')
        nextQuestion();
    })

    //extra variable to save value;
    let s;
    letters.forEach((element, index) => {

        element.addEventListener("dragstart", function (e) {
            boxContainer.nextElementSibling.innerHTML = '';
            boxContainer.nextElementSibling.classList.remove('true');
            s = element

        })
    });
    boxContainer.addEventListener('drop', function () {

        let box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = s.innerHTML;
        boxContainer.append(box)
        getAnswer += s.innerHTML;
    })
    boxContainer.addEventListener('dragover', function (i) {
        i.preventDefault();
    })
}






function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


Number.prototype.dateTime =
    function (length) {
        let currentlength = this.toString().length;
        length = length - currentlength;
        return `${'0'.repeat(length)}${this.toString()}`;
    }