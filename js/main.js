'use strict';

var X_MIN_COORDINATE = 0;
var X_MAX_COORDINATE = 1200;
var Y_MIN_COORDINATE = 130;
var Y_MAX_COORDINATE = 630;
var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 80;

// Функция генерации случайного целого числа из диапазона
function randomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

// Функция, возвращающая случайный элемент массива
var randomIndexOfArray = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// Массив со значениями для ключа type
var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

// Функция, создающая случайный комплект свойств
var createSimilarAds = function (index) {
  var similarAd = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      type: randomIndexOfArray(types),
    },
    location: {
      x: randomNumber(X_MIN_COORDINATE, X_MAX_COORDINATE),
      y: randomNumber(Y_MIN_COORDINATE, Y_MAX_COORDINATE)
    }
  };
  return similarAd;
};

// Создание массива из восьми объектов
var similarAds = [];
for (var i = 0; i < NUMBER_OF_PINS; i++) {
  similarAds.push(createSimilarAds(i));
}
// console.log(similarAds);

// Переключение карты в активное состояние
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarPinList = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Функция, создающая DOM-элементы (метки на карте) и заполнение их данными из массива
var renderPin = function (similarAd) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = similarAd.author.avatar;
  pinElement.querySelector('img').alt = similarAd.offer.type;
  return pinElement;
};

// Отрисовка шаблона в документ и вставка в блок
var fragment = document.createDocumentFragment();
for (var j = 0; j < similarAds.length; j++) {
  fragment.appendChild(renderPin(similarAds[j]));
}
similarPinList.appendChild(fragment);
