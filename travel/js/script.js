"use strict"

//Меню Бургер
const burgerMenu = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');
const blackScreen = document.querySelector('.black-screen');

const menuToggle = () => [document.body, burgerMenu, menuBody, blackScreen].forEach(el => el.classList.toggle('active'));

const onMenuToggle = ({ target }) => (
	target.closest('.menu__burger')//если клик на кнопку меню
	|| target.classList.contains('menu__link')//если клик на пункт меню
	|| (burgerMenu.classList.contains('active') && !target.closest('.menu__body'))// если открытое меню И нажатие на элемент без класса меню
) && menuToggle();// если да то тогл

//Вешаем глобальный обработчик клика на страницу (делегирование)
document.documentElement.addEventListener('click', onMenuToggle);


