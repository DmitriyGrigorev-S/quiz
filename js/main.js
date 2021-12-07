let answers = {
  2: null,
  3: null,
  4: null,
  5: null,
};

const btnNext = document.querySelectorAll('[data-nav="next"]');
btnNext.forEach(function (button) {
  button.addEventListener('click', function () {
    const thisCard = this.closest('[data-card]');
    const numberCard = parseInt(thisCard.dataset.card);

    if (thisCard.dataset.validate == 'novalidate') {
      console.log('novalidate');
      navigate('next', thisCard);
      updateProgressBar('next', numberCard);
    } else {
      console.log('validate');

      saveAnswer(numberCard, gatherCardDate(numberCard));

      if (isFilled(numberCard) && checkOnRequired(numberCard)) {
        navigate('next', thisCard);
        updateProgressBar('next', numberCard);
      } else {
        alert('Выберите ответ, прежде чем переходить далее!');
      }
    }
  });
});

const btnPrev = document.querySelectorAll('[data-nav="prev"]');
btnPrev.forEach(function (button) {
  button.addEventListener('click', function () {
    const thisCard = this.closest('[data-card]');
    const numberCard = parseInt(thisCard.dataset.card);

    navigate('prev', thisCard);
    updateProgressBar('prev', numberCard);
  });
});

function navigate(direction, thisCard) {
  const thisCardNumber = parseInt(thisCard.dataset.card);
  let nextCard;

  if (direction == 'next') {
    nextCard = thisCardNumber + 1;
  } else if (direction == 'prev') {
    nextCard = thisCardNumber - 1;
  }

  const card = document.querySelector(`[data-card="${nextCard}"]`);
  thisCard.classList.add('hidden');
  card.classList.remove('hidden');
}

function gatherCardDate(number) {
  let question;
  let result = [];
  let currentCard = document.querySelector(`[data-card="${number}"]`);

  question = currentCard.querySelector('[data-question]').innerText;

  let radioValues = currentCard.querySelectorAll('[type="radio"]');
  radioValues.forEach(function (item) {
    if (item.checked) {
      result.push({
        name: item.name,
        value: item.value,
      });
    }
  });

  let chackBoxValues = currentCard.querySelectorAll('[type="checkbox"]');
  chackBoxValues.forEach(function (item) {
    if (item.checked) {
      result.push({
        name: item.name,
        value: item.value,
      });
    }
  });

  let inputValues = currentCard.querySelectorAll(
    '[type="text"], [type="email"], [type="number]'
  );

  inputValues.forEach(function (item) {
    itemValue = item.value;

    if (itemValue.trim() != '') {
      result.push({
        name: item.name,
        value: item.value,
      });
    }
  });

  let data = {
    question: question,
    answer: result,
  };

  return data;
}

function saveAnswer(number, data) {
  answers[number] = data;
}

function isFilled(number) {
  if (answers[number].answer.length > 0) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  let pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

  return pattern.test(email);
}

function checkOnRequired(number) {
  let currentCard = document.querySelector(`[data-card="${number}"]`);
  let requiredFields = currentCard.querySelectorAll('[required]');

  let isValidArray = [];

  requiredFields.forEach(function (item) {
    if (item.type == 'checkbox' && item.checked == false) {
      isValidArray.push(false);
    } else if (item.type == 'email') {
      if (validateEmail(item.value)) {
        isValidArray.push(true);
      } else {
        isValidArray.push(false);
      }
    }
  });

  if (isValidArray.indexOf(false) == -1) {
    return true;
  } else {
    return false;
  }
}

document.querySelectorAll('.radio-group').forEach(function (elem) {
  elem.addEventListener('click', function (evt) {
    const target = evt.target;
    const label = target.closest('.radio-block');
    const labelAll = elem.querySelectorAll('.radio-block');

    if (!label) {
      return false;
    }

    labelAll.forEach(function (item) {
      item.classList.remove('radio-block--active');
    });

    label.classList.add('radio-block--active');
  });
});

document.querySelectorAll('.checkbox-group').forEach(function (elem) {
  elem.addEventListener('click', function (evt) {
    const target = evt.target;
    const checkbox = target.closest('.checkbox-block');
    const input = checkbox.querySelector('input');

    if (input.checked) {
      checkbox.classList.add('checkbox-block--active');
    } else {
      checkbox.classList.remove('checkbox-block--active');
    }
  });
});

function updateProgressBar(direction, cardNumber) {
  const cardsTotalNumber = document.querySelectorAll('[data-card]').length;

  if (direction == 'next') {
    cardNumber = cardNumber + 1;
  } else if (direction == 'prev') {
    cardNumber = cardNumber - 1;
  }

  let progress = ((cardNumber * 100) / cardsTotalNumber).toFixed(0);

  const progressBar = document.querySelector(`[data-card="${cardNumber}"]`);
  const value = progressBar.querySelector('.progress__label strong');
  const valueLine = progressBar.querySelector(
    '.progress__line-wrapper .progress__line-bar'
  );

  if (!value) {
    return false;
  }

  if (!valueLine) {
    return false;
  }
  value.innerText = progress + '%';
  valueLine.style.width = `${progress}%`;
}
