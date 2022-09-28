// Burger-menu
const burger = document.querySelector('.burger__menu');
const btn = document.querySelector('.header__connect');
const menu = document.querySelector('.dropdown__menu');
const overlay = document.querySelector('.overlay');
const mobileConnect = document.querySelector('.header__mobile-connection')

burger.addEventListener('click', () => {
	burger.classList.toggle('close');
	menu.classList.toggle('show')
	overlay.classList.toggle('show-overlay')
	mobileConnect.classList.toggle('header__mobile-connection--active')
})




$('.banner-slider__items').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: true,
	fade: true,
	arrows: false
});


$('.partners__slider-items').slick({
	infinite: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	nextArrow: document.querySelector('#my-arrow-next'),
	prevArrow: document.querySelector('#my-arrow-prev'),
	responsive: [
		{
		  breakpoint: 850,
		  settings: {
			slidesToShow: 3,
		  }
		},
		{
			breakpoint: 700,
			settings: {
			  slidesToShow: 2,
			}
		  },
		  {
			breakpoint: 500,
			settings: {
			  slidesToShow: 1,
			}
		  },
	]
});

// Modal

const modalTrigger = document.querySelectorAll('.js-open-modal');
// modal = document.querySelector('#modal-history');

modalTrigger.forEach(btn => {
	btn.addEventListener('click', (e) => {
		console.log(e.target);
		let modalTarget = e.target.dataset.modal;
		console.log(modalTarget);
		let modal = document.getElementById(modalTarget);
		console.log(modal);
		openModal(modal);
		modal.addEventListener('click', (e) => {
			if (e.target === modal || e.target.getAttribute('data-close') == "") {
				closeModal(modal);
			}
		});
	});
});

function closeModal(modal) {
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

function openModal(modal) {
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	// clearInterval(modalTimerId);
}

document.addEventListener('keydown', (e) => {
	if (e.code === "Escape" && modal.classList.contains('show')) {
		closeModal(modal);
	}
});


// Validate

try {
	function validateForms(form) {
		$(form).validate({
			rules: {
				email: {
					required: true,
					email: true,
				},
				password: 'required',
				repeatpass: 'required',
				name: 'required',
				phone: 'required',
			},
			messages: {
				email: {
					required: "Введите свой e-mail",
					email: "Неправильно введен адрес почты name@domain.com"
				},
				name: {
					required: "Введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов!")
				},
				password: 'Введите пароль',
				repeatpass: 'Пароль не совпадает',
				phone: 'Введите свой телефон',
			}
		});
	}

	validateForms('#modal-small-form');
	validateForms('#modal-big-form');
	//   validateForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");
} catch (e) {

}

//  CURSOR

function cursor() {
    let customCursorBlock = document.querySelectorAll('.custom-cursor-js') || false;

    if (customCursorBlock) {
        let cursor = createCursorElement(),
            cursorScale = document.querySelectorAll('.cursor-scale'),
            mouseX = 0,
            mouseY = 0;

        gsap.to({}, 0.016, {
            repeat: -1,

            onRepeat: function () {
                gsap.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                })
            }
        });

        customCursorBlock.forEach(block => {
            block.addEventListener('mousemove', function (e) {
                cursor.classList.add('visible');
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            block.addEventListener('mouseleave', function (e) {
                cursor.classList.remove('visible');
            });
        })

        cursorScale.forEach(item => {
            item.addEventListener('mouseleave', function () {
                cursor.classList.remove('grow');
            });

            item.addEventListener('mousemove', function () {
                cursor.classList.add('grow');
            });
        });
    }

    function createCursorElement() {
        let cursor = document.createElement("div");
        cursor.classList.add("cursor");
        document.querySelector('main').appendChild(cursor);

        return cursor;
    }

}

cursor();


//  BORDER-btn

const roundedBtn = document.querySelectorAll(".js-rounded-btn");

const initAnimation = (btn) => {
    const hit = btn.querySelector(".rounded-btn__hit");
    const border = btn.querySelector(".rounded-btn__border");
    const text = btn.querySelector(".rounded-btn__text");

    let initialBorderRadius = getComputedStyle(border).getPropertyValue("border-top-left-radius");

    let hitWidth = hit.offsetWidth;
    let width = border.offsetHeight;
    let widthDiff = Math.abs((btn.offsetWidth - hitWidth) / 2);
    let center = hitWidth / 2;

    hit.addEventListener("mousemove", (e) => {

        let offset = e.target.getBoundingClientRect();
        let x = e.pageX - offset.left;

        let moveTextX = ((x - center) / 10);

        let moveX;
        const sideOffset = Math.abs(((x - center) / 10) * 1.4);
        const isRightSide = x > center;

        moveX = isRightSide
            ? x - (width / 2 + widthDiff + sideOffset)
            : x - (width / 2 + widthDiff - sideOffset);


        gsap.to(border, { width: width + "px", x: moveX + "px", borderRadius: "50%", duration: 0.3 });
        gsap.to(text, { x: moveTextX + "px" });
    });

    hit.addEventListener("mouseleave", () => {
        gsap.to(border, { width: "100%", x: 0, borderRadius: initialBorderRadius });
        gsap.to(text, { x: 0 });
    });
};

Array.from(roundedBtn).forEach(item => {
    initAnimation(item);
});

// Aos

AOS.init();
