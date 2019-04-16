// window.addEventListener('load')//ждет пока загрузится всё (и картинки)

window.addEventListener('DOMContentLoaded', () => {

	const cartWrapper = document.querySelector('.cart__wrapper'),
		cart = document.querySelector('.cart'),
		close = document.querySelector('.cart__close'),
		open = document.querySelector('#cart'),
		goodsBtn = document.querySelectorAll('.goods__btn'),
		products = document.querySelectorAll('.goods__item'),
		confirm = document.querySelector('.confirm'),
		badge = document.querySelector('.nav__badge'),
		totalCost = document.querySelector('.cart__total > span'),
		titles = document.querySelectorAll('.goods__title');

	function openCart() {
		cart.style.display = 'block';
		document.body.style.overflow = 'hidden';
	}

	function closeCart() {
		cart.style.display = 'none';
		document.body.style.overflow = '';
	}

	open.addEventListener('click', openCart);
	close.addEventListener('click', closeCart);

	goodsBtn.forEach(function (btn, i) {
		btn.addEventListener('click', () => {
			let item = products[i].cloneNode(true),
				trigger = item.querySelector('button'),
				removeBtn = document.createElement('div'),
				empty = cartWrapper.querySelector('.empty');

			trigger.remove();

			showConfirm();
			calcGoods(1);

			removeBtn.classList.add('goods__item-remove');
			removeBtn.innerHTML = '&times'; //вставит html код
			// removeBtn.textContent = '&times'; //вставит обычный текст
			item.appendChild(removeBtn);

			cartWrapper.appendChild(item);
			if (empty) {
				// empty.remove();// удаляем надпись корзина пуста
				empty.style.display = 'none';
			}

			calcTotal(); //подсчитываем общую сумму
			removeFromCart(); //подвязываем событие на крестик
		});
	});

	function sliceTitle(item, number) {
		if (item.textContent.length < number) {
			return;
		} else {
			const str = item.textContent.slice(0, number + 1) + "...";
			// const str = `${item.textContent.slice(0, 71)} ...`;
			item.textContent = str;
		}
	}

	titles.forEach((title) => {
		sliceTitle(title, 70);
	});

	function showConfirm() {//делает анимацию
		confirm.style.display = 'block';
		let counter = 100;
		//[1223434]
		const id = setInterval(frame, 10);
		function frame() {
			if (counter == 10) { //если 0 сломается opacity
				clearInterval(id);
				confirm.style.display = 'none';
			} else {
				counter--;
				confirm.style.transform = `translateY(-${counter}px)`;
				confirm.style.opacity = '.' + counter;
			}
		
		}
	}

	function calcGoods(i) { //количество товара на иконке
		const items = cartWrapper.querySelectorAll('.goods__item');
		badge.textContent = i + items.length;
	}

	function calcTotal() { //подсчет общей суммы в корзине
		const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
		let total = 0;
		prices.forEach(function(item) {
			total += +item.textContent; //+ для приведения к числу
		});
		totalCost.textContent = total;
	}

	function removeFromCart() {
		const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
		const empty = cartWrapper.querySelector('.empty');

		removeBtn.forEach(function(btn) {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				calcGoods(0);
				calcTotal();
				if (cartWrapper.childElementCount-1 == 0) {
					empty.style.display = 'block';
				}
			});
		});
	}

});