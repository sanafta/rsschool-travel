"use strict";

//МЕНЮ БУРГЕР
const burgerMenu = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');
const blackScreen = document.querySelector('.black-screen');

const menuToggle = () => [document.body, burgerMenu, menuBody, blackScreen].forEach(el => el.classList.toggle('active'));



//СЛАЙДЕР
//переменные хтмл элементов
const sliderBody = document.querySelector('.slider__body'),
	slider = document.querySelector('.destinations__slider '),
	bulletsArr = Array.from(document.querySelectorAll('.slider__bullet')),
	prevBtn = document.querySelector('.prev'),
	nextBtn = document.querySelector('.next');

//переменные слайдера
let picPos = 1;//текущая картинка(по умолчанию 1 т.к. при инициализации слайдер показывает второе изображение)

//Функция просчета размера шага передвижения слайдера в пикселях
const getPicSize = () => {
	const picWidth = sliderBody.children[0].getBoundingClientRect().width,//получаем размер общей длины ленты с картинками
		borders = (sliderBody.scrollWidth - picWidth * 3) / 2;//вычисляем размер отступов между картинками в ленте ((длина ленты - размер картинки * количество картинок) / колиество отступов в ленте )
	return picWidth + borders / 2 + 15; //возвращаем шаг в пикселях (размер картинки + её отступы) 
}

//Функция по индексу устанавливающая активному буллету класс актив
const bulletActive = index => {
	//перебераем массив хтмл элементов буллетов и на каждом элементе в тернарнике решаем какой метод вызвать (если он не равен получаемому индексу то удаляем , если равен добовляем класс active)
	bulletsArr.forEach((el, i) => el.classList[i !== index ? 'remove' : 'add']('active'));
}

//Функция смены картинки 
//Принимает в себя два типа значений. 
const changePic = type => {
	typeof type === 'number'
		? (picPos = type)//если это число, значит используем его как индекс картинки 
		: (type === 'next' ? picPos < 2 && picPos++ : picPos > 0 && picPos--);//если не число, работаем как со строкой. Тернарником проверяем совпадение с 'next', если да, то наращиваем переменную с индексом картинки, если нет уменьшаем (при этом проверям, что бы не выходить за рамки)
	//сдвигаем ленту с картинками по новым значениям (умножая позицию в ленте на текущий шаг(просчитаный функцией) и умножаем на -1)
	sliderBody.style.transform = `translateX(${picPos * getPicSize() * -1}px)`;
	bulletActive(picPos);
}
//Запускаем функию перехода к картинке , что бы сдвинуть ленту при первом запуске скрипта на странице (что бы с первой , а не с нулевой показывало)
changePic(picPos);

//Отслеживаем изменение размеров страницы, что бы выполнялся перерасчет сдвигаемого шага. Вызываем колбэк с функцией смены картинки (т.к там проискходит необходимый просчет )
window.addEventListener('resize', () => changePic(picPos));

//Создааем массив из детей ленты с картинками (сами картинки) и вешаем на них функцию смены картинки по  индексу с цикла (тоесть индекс 0 = переход на нулевое извображение)
Array.from(sliderBody.children).map((pic, index) => {
	pic.addEventListener('click', e => {
		changePic(index);
	})
});
//Функция добавления\удаления класса active на иконках стрелок ( адаптиа 390пх)
const isBtnActive = () => {
	//на кнопке в класслисте тернарником возвращаем нужное название вызываемого метода remove\add
	prevBtn.classList[picPos == 0 ? 'remove' : 'add']('active');
	nextBtn.classList[picPos == 2 ? 'remove' : 'add']('active');
}

//Вешаем на иконку стрелку функцию смены изображения 
prevBtn.addEventListener('click', e => {
	picPos > 0 && changePic(--picPos);//если изображение не крайнее вызываем смену изображения
	isBtnActive();//вызываем функцию для перепроверки класса active на стрелках
})
nextBtn.addEventListener('click', e => {
	picPos < 2 && changePic(++picPos);
	isBtnActive();
})

//Функция для смены активной картинки при нажатии на булет
bulletsArr.forEach((el, index) => {//перебераем все буллеты и  вешаем переход по индексу
	el.addEventListener('click', () => {
		changePic(index);//смена картинки по текущему индексу
		bulletActive(index);//смена активного класса в булетах
	});
});


//POPUP
const login = document.querySelector('.header__button');
const popupReg = document.querySelector('.popup');
const signUp = document.querySelector('.sign-up');
const logIn = document.querySelector('.log-in');

//по получаемой строке формируем поведение попапа 
const popup = (type) => {
	if (type == 'open') {
		popupReg.classList.add('active');
		logIn.classList.add('active');
	}
	if (type == 'close') {
		[popupReg, signUp, logIn].forEach(el => el.classList.remove('active'));
	}
	if (type == 'Register') {
		logIn.classList.remove('active');
		signUp.classList.add('active');
	}
	if (type == 'Log in') {
		logIn.classList.add('active');
		signUp.classList.remove('active');
	}
}

login.addEventListener('click', popup.bind(null, 'logIn'));

//Функция Сабмита для Формы
const onSubmitHandle = (event) => {
	//сбрасываем стандартное поведение элемента (тут это отключит перезагрузку страницы)
	event.preventDefault();
	//Выводим алер , где отображаем данные собранные с формы (FormData получает данные с формы , мы ее переводим в объект, а с объекта чере JSON формируем строку с пробелами для вывода)
	alert(JSON.stringify(Object.fromEntries(new FormData(event.target)), null, 2));

	popup('close');
}


//----------ДЕЛЕГИРОВАНИЕ КЛИКА НА СТРАНИЦЕ
//МЕНЮ
const onMenuToggle = ({ target }) => {

	(target.closest('.menu__burger') //если клик на кнопку меню
		|| (target.classList.contains('menu__link') && blackScreen.classList.contains('active'))//если клик на пункт меню
		|| (burgerMenu.classList.contains('active') && !target.closest('.menu__body'))// если открытое меню И нажатие на элемент без класса меню
	) && menuToggle();// если да то тогл

	//POPUP

	//поле innerText возвращает текст который внутри элемента (по нему и выполняем проверку нажатия)
	(target.innerText == 'Login' || target.innerText == 'Account') && popup('open');
	target.classList.contains('popup') && popup('close');
	//если текст 'Registr' или 'Log in' то вызываем функцию попапа и в нее передаем этот текст
	target.innerText == 'Register' && popup(target.innerText);
	target.innerText == 'Log in' && popup(target.innerText);

	//FORMS
	target.innerText == 'Sign in' && onSubmitHandle(target.parentElement);
}

//Вешаем глобальный обработчик клика на страницу (делегирование)
document.documentElement.addEventListener('click', onMenuToggle);
//Submit на формы
registr.addEventListener('submit', onSubmitHandle);
create.addEventListener('submit', onSubmitHandle);

