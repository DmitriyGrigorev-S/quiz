var colorsContainer = document.querySelector('.colorsSelector');
var colorItem = colorsContainer.querySelectorAll('.colorItem');
var imgCar = document.querySelector('.imgHolder img');

// Вариант 1. Слушаем клик по контейнеру

colorsContainer.addEventListener('click', function (e) {
  var target = e.target;
  var colorElem = target.closest('.colorItem');
  var getImgElem = colorElem.dataset.img;

  if (!colorElem) {
    return false;
  }

  imgCar.setAttribute('src', getImgElem);

  if (target.classList.contains('colorItem')) {
    var active = colorsContainer.querySelector('.colorItem--active');

    active.classList.remove('colorItem--active');
    target.classList.add('colorItem--active');
  }
});

// Вариант 2. перебираем коллекцию элементов forEach

// colorItem.forEach(function (elem) {
//     elem.addEventListener('click', function (e) {
//         var tagret = e.target;

//         if (tagret.classList.contains('colorBlue')) {
//             imgCar.setAttribute('src', 'https://webcademy.ru/files/js2020/solaris/blue.png');
//         } else if (tagret.classList.contains('colorWhite')) {
//             imgCar.setAttribute('src', 'https://webcademy.ru/files/js2020/solaris/white.png');
//         } else if (tagret.classList.contains('colorRed')) {
//             imgCar.setAttribute('src', 'https://webcademy.ru/files/js2020/solaris/red.png');
//         } else if (tagret.classList.contains('colorBlack')) {
//             imgCar.setAttribute('src', 'https://webcademy.ru/files/js2020/solaris/black.png');
//         } else if (tagret.classList.contains('colorWhitePure')) {
//             imgCar.setAttribute('src', 'https://webcademy.ru/files/js2020/solaris/white-pure.png');
//         } else if (tagret.classList.contains('colorOrange')) {
//             imgCar.setAttribute('src', 'https://webcademy.ru/files/js2020/solaris/orange.png');
//         } else if (tagret.classList.contains('colorGraphite')) {
//             imgCar.setAttribute('src', 'https://webcademy.ru/files/js2020/solaris/graphite.png');
//         }
//     });
// });
