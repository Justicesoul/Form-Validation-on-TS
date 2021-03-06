const button = document.querySelector(".js-button");
const dropDownButton = document.querySelector(
  ".js-dropdown-button"
) as HTMLElement;
const dropDownMenu = document.querySelector(".js-dropdown-menu");
const form: HTMLFormElement = document.querySelector(".js-form");
const selectedMenu = document.querySelectorAll(".js-text");
const successCard = document.querySelector(".js-card") as HTMLElement;
const errorText = document.querySelector(".error-text");
const error = document.createElement("span");
const errorIcon = document.createElement("span");
const checkbox = document.querySelector(".checkbox__form") as HTMLInputElement;
const formTextInput = document.querySelector(".form__input");
const minCharacter = 4;
const maxCharacter = 12;

const validationRules = {
  username: (value: string) => {
    if (value.length < minCharacter) {
      return false;
    } else if (value.length > maxCharacter) {
      return false;
    } else if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
      return false;
    } else if (/\s/.test(value)) {
      return false;
    }
    return true;
  },
  password: (value: string) => {
    if (value.length < minCharacter) {
      return false;
    } else if (value.length > maxCharacter) {
      return false;
    }
    return true;
  },
  confirmation: (value: string) => {
    // @ts-ignore
    const password = document.querySelector("#password").value;
    if (password !== value) {
      return false;
    }
    return true;
  },
  email: (value: string) => {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(value)) {
      return false;
    }
    return true;
  },
  checkbox: (value: string) => {
    if (value === "disabled") {
      return false;
    }
    return true;
  },
};

type InputNames = keyof typeof validationRules;

dropDownButton.addEventListener("click", () => {
  dropDownMenu.classList.toggle("disabled");
});

selectedMenu.forEach((item) => {
  item.addEventListener("click", function () {
    //@ts-ignore
    dropDownButton.innerText = this.innerText;
    dropDownMenu.classList.add("disabled");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;
  const formData = new FormData(form);

  if (!formData.get("checkbox")) {
    formData.append("checkbox", "disabled");
  }

  for (const pair of formData.entries()) {
    if (!isFormValid) {
      break;
    }
    const key = pair[0] as InputNames;
    const value = pair[1] as any;
    const validationFunction = validationRules[key];

    isFormValid = validationFunction(value);

    const elementWithError = form.querySelector(".error__text");
    const borderWithError = form.querySelector(".error__border");
    const dropDown = form.querySelector(".dropdown");

    if (elementWithError) {
      elementWithError.remove();
      borderWithError.classList.remove("error__border");
      errorIcon.classList.remove("error__icon");
    }

    if (isFormValid && dropDownButton.innerText === "- Select your option -") {
      dropDownButton.classList.add("error__border");
      dropDownButton.appendChild(errorIcon);
      dropDown.appendChild(error);
      error.innerText = `Please choose your option`;
      error.classList.add("error__text");
    }

    if (!isFormValid) {
      const label = form.querySelector(`input[name=${key}]`).parentElement;
      const input = form.querySelector(`input[name=${key}]`);
      errorIcon.classList.add("error__icon");
      error.classList.add("error__text");
      input.classList.add("error__border");
      error.innerText = `Error in ${key} field`;
      label.appendChild(errorIcon);
      label.appendChild(error);
    } else if (
      isFormValid &&
      dropDownButton.innerText !== "- Select your option -"
    ) {
      form.classList.add("disabled");
      successCard.classList.remove("disabled");
    }
  }
});
