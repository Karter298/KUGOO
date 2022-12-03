const mMenuToggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".mobile-menu");
const isFront = document.body.classList.contains("front-page");

const openMenu = (event) => {
  //функция открытия меню
  menu.classList.add("is-open"); //вешает класс is-open
  mMenuToggle.classList.add("close-menu");
  document.body.style.overflow = "hidden"; //запрещает прокрутку сайта под меню
};

const closeMenu = (event) => {
  //функция закрытия меню
  menu.classList.remove("is-open"); //убирает класс is-open
  mMenuToggle.classList.remove("close-menu");
  document.body.style.overflow = ""; //возвращает прокрутку сайта под меню
};
mMenuToggle.addEventListener("click", (event) => {
  event.preventDefault();
  menu.classList.contains("is-open") ? closeMenu() : openMenu();
});

let currentModal; //текущее модальное окно
let modalDialog; //белое диалоговое окно
let alertModal = document.querySelector("#alert-modal"); //окно с предупреждением
const modalButtons = document.querySelectorAll("[data-toggle=modal]"); // переключатели модальных окон
const mmClose = document.querySelector(".modal-close");
const thxClose = document.querySelector(".modal-thx-close");
modalButtons.forEach((button) => {
  /* клик по переключателю */
  button.addEventListener("click", (event) => {
    event.preventDefault();
    /* определяем текущее открытое окно */
    currentModal = document.querySelector(button.dataset.target);
    /* открываем текущее окно */
    currentModal.classList.toggle("is-open");
    document.body.classList.add("locked");
    /* назнчаем новое белое диалоговое окно */
    modalDialog = currentModal.querySelector(".modal-dialog");
    /* отслеживаем клик по окно и пустым областям */
    currentModal.addEventListener("click", (event) => {
      /* если клик в пустую область */
      if (!event.composedPath().includes(modalDialog)) {
        /* закрываем окно */
        currentModal.classList.remove("is-open");
        document.body.classList.remove("locked");
      }
    });
    mmClose.addEventListener("click", (event) => {
      document.body.classList.remove("locked");
    });
    thxClose.addEventListener("click", (event) => {
      document.body.classList.remove("locked");
    });
  });
});
/* Ловим событие нажатия на кнопки */
document.addEventListener("keyup", (event) => {
  /* проверяем, что это Escape и текущее окно открыто */
  if (event.key == "Escape" && currentModal.classList.contains("is-open")) {
    currentModal.classList.toggle("is-open");
    document.body.classList.remove("locked");
  }
});

const forms = document.querySelectorAll(".cta-form"); //собираем все формы
forms.forEach((form) => {
  const validation = new JustValidate(form, {
    errorFieldCssClass: "is-invalid",
  });
  validation
    .addField("[name=userphone]", [
      {
        rule: "required",
        errorMessage: "Укажите телефон",
      },
      {
        rule: "minLength",
        value: 18,
        errorMessage: "Не верно указан номер телефона",
      },
    ])
    .addField("[name=boxpolicy]", [
      {
        rule: "required",
        errorMessage: "Ознакомьтесь с политикой",
      },
    ])

    .onSuccess((event) => {
      const thisForm = event.target;
      const formData = new FormData(thisForm);
      const ajaxSend = (formData) => {
        fetch(thisForm.getAttribute("action"), {
          method: thisForm.getAttribute("method"),
          body: formData,
        }).then((response) => {
          if (response.ok) {
            thisForm.reset();
            alertModal.classList.add("is-open");
            document.body.classList.add("locked");
            currentModal.classList.remove("is-open");
            alertModal.classList.add("is-open");
            currentModal = alertModal;
            modalDialog = currentModal.querySelector(".modal-dialog");
            /* отслеживаем клик по окно и пустым областям */
            currentModal.addEventListener("click", (event) => {
              /* если клик в пустую область */
              if (!event.composedPath().includes(modalDialog)) {
                /* закрываем окно */
                currentModal.classList.remove("is-open");
                document.body.classList.remove("locked");
              }
            });
          } else {
            alert("Ошибка. Текст ошибки:".response.statusText);
          }
        });
      };
      ajaxSend(formData);
      document.body.classList.remove("locked");
    });
});

const formFoter = document.querySelectorAll(".form-footer"); //собираем все формы
formFoter.forEach((form) => {
  console.log(forms);
  const validation = new JustValidate(form, {
    errorFieldCssClass: "is-invalid",
  });
  validation
    .addField("[name=useremail]", [
      {
        rule: "email",
        errorMessage: "Не верно",
      },
    ])
    .onSuccess((event) => {
      const thisForm = event.target;
      const formData = new FormData(thisForm);
      const ajaxSend = (formData) => {
        fetch(thisForm.getAttribute("action"), {
          method: thisForm.getAttribute("method"),
          body: formData,
        }).then((response) => {
          if (response.ok) {
            thisForm.reset();
            alertModal.classList.add("is-open");
            document.body.classList.add("locked");
            currentModal.classList.remove("is-open");
            alertModal.classList.add("is-open");
            currentModal = alertModal;
            modalDialog = currentModal.querySelector(".modal-dialog");
            /* отслеживаем клик по окно и пустым областям */
            currentModal.addEventListener("click", (event) => {
              /* если клик в пустую область */
              if (!event.composedPath().includes(modalDialog)) {
                /* закрываем окно */
                currentModal.classList.remove("is-open");
                document.body.classList.remove("locked");
              }
            });
          } else {
            alert("Ошибка. Текст ошибки:".response.statusText);
          }
        });
      };
      ajaxSend(formData);
      document.body.classList.remove("locked");
    });
});

/* Создаем префикс +7, даже если вводят 8 или 9 */
const prefixNumber = (str) => {
  /* если вводят семерку, добавляем ей скобку */
  if (str === "7") {
    return "7 (";
  }
  /* если вводят восьмерку, ставим вместо нее +7 ( */
  if (str === "8") {
    return "+7 (";
  }
  /* если пишут девятку, заменяем на +7 (9  */
  if (str === "9") {
    return "7 (9";
  }
  /* в других случаях просто 7 (  */
  return "7 (";
}; /* профикс в любом раскладе будет +7 () */

/* Ловим события ввода в любом поле */
document.addEventListener("input", (e) => {
  /* Проверяем, что это поле имеет класс phone-mask */
  if (e.target.classList.contains("phone-mask")) {
    /* поле с телефоном помещаем в переменную input */
    const input = e.target;
    /* вставляем плюс в начале номера */
    const value = input.value.replace(/\D+/g, "");
    /* длинна номера 11 символов */
    const numberLength = 11;

    /* Создаем переменную, куда будем записывать номер */
    let result;
    /* Если пользователь ввел 8... */
    if (input.value.includes("+8") || input.value[0] === "8") {
      /* Стираем восьмерку */
      result = "";
    } else {
      /* Оставляем плюсик в поле */
      result = "+";
    }

    /* Запускаем цикл, где переберем каждую цифру от 0 до 11 */
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          /* в самом начале ставим префикс +7 ( */
          result += prefixNumber(value[i]);
          continue;
        case 4:
          /* добавляем после "+7 (" круглую скобку ")" */
          result += ") ";
          break;
        case 7:
          /* дефис после 7 символа */
          result += "-";
          break;
        case 9:
          /* еще дефис  */
          result += "-";
          break;
        default:
          break;
      }
      /* на каждом шаге цикла добавляем новую цифру к номеру */
      result += value[i];
    }
    /* итог: номер в формате +7 (999) 123-45-67 */
    input.value = result;
  }
});
