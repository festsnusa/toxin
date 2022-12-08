// import { calculateCost } from '../../cards/__booking-form/__booking-form.js'
import moment from "https://cdn.skypack.dev/moment@2.29.4"

let daysOfTheWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]

let months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
let sep = ".";
// let currentDate = new Date();
//let placeholder = "ДД.ММ.ГГГГ";
let currentDate = new Date();

class DatePicker {
  constructor(element) {
    this.now = new Date();
    this.today = new Date();
    this.firstClick = true;
    this.startDate;
    this.endDate;
    this.element = element;
    this.year = () => this.now.getFullYear();
    this.month = () => months[this.now.getMonth()];
  }
  render() {
    //calendar
    let calendar = document.createElement("div");
    calendar.classList.add("calendar");

    //calendar header
    let calendarHeader = document.createElement("div");
    calendarHeader.classList.add("calendar__header");

    let calendarHeaderBack = document.createElement("button");
    calendarHeaderBack.classList.add("calendar__header_back", "material-symbols-outlined");
    calendarHeaderBack.innerText = "arrow_back";

    if (this.now.getMonth() == currentDate.getMonth()
      && this.now.getYear() == currentDate.getYear()) {
      calendarHeaderBack.classList.add("calendar__header_back_invisible")
    }

    calendarHeaderBack.onclick = () => this.backBtn();

    let calendarHeaderFwd = document.createElement("button");
    calendarHeaderFwd.classList.add("calendar__header_fwd", "material-symbols-outlined");
    calendarHeaderFwd.innerText = "arrow_forward";
    calendarHeaderFwd.onclick = () => this.fwdBtn();

    let calendarHeaderContent = document.createElement("div");
    calendarHeaderContent.classList.add("calendar__header_content");
    calendarHeaderContent.innerText = this.month() + " " + this.year();

    //calendar content
    let calendarContent = document.createElement("div");
    calendarContent.classList.add("calendar__content");

    //calendar content header
    let calendarContentHeader = document.createElement("div");
    calendarContentHeader.classList.add("calendar__content__header");
    daysOfTheWeek.forEach(day => {
      let element = document.createElement("div");
      element.classList.add("calendar__content__header__daysOfTheWeek");
      element.innerText = day;
      calendarContentHeader.appendChild(element);
    });

    //calendar content dates
    let calendarContentDates = document.createElement("div");
    calendarContentDates.classList.add("calendar__content__dates");
    this.createCalendarDates().forEach(week => {
      let weekElement = document.createElement("div");
      weekElement.classList.add("calendar__content__week");
      week.forEach(day => {
        let dayElement = document.createElement("div");
        day.classes.forEach(classItem => dayElement.classList.add(classItem));
        dayElement.innerText = day.day;
        dayElement.onclick = () => this.dayClick(day.date);
        weekElement.appendChild(dayElement);
      });
      calendarContentDates.appendChild(weekElement);
    });

    //calendar content footer
    let calendarContentFooter = document.createElement("div");
    calendarContentFooter.classList.add("calendar__content__footer");

    let calendarContentFooterClear = document.createElement("button");
    calendarContentFooterClear.classList.add("calendar__content__footer__clear");
    calendarContentFooterClear.innerText = "Очистить";
    calendarContentFooterClear.onclick = () => this.clearClick();
    calendarContentFooter.appendChild(calendarContentFooterClear);

    let calendarContentFooterApply = document.createElement("button");
    calendarContentFooterApply.classList.add("calendar__content__footer__apply");
    calendarContentFooterApply.innerText = "Применить";
    calendarContentFooterApply.onclick = () => this.applyClick();
    calendarContentFooter.appendChild(calendarContentFooterApply);

    //collect blocks
    calendarHeader.appendChild(calendarHeaderBack);
    calendarHeader.appendChild(calendarHeaderContent);
    calendarHeader.appendChild(calendarHeaderFwd);

    calendarContent.appendChild(calendarContentHeader);
    calendarContent.appendChild(calendarContentDates);
    calendarContent.appendChild(calendarContentFooter);

    calendar.appendChild(calendarHeader);
    calendar.appendChild(calendarContent);
    this.element.appendChild(calendar);
  }
  createCalendarDates() {
    let firstDay = new Date(this.now.getTime());
    firstDay.setDate(1);
    //Воскресенье нулевой день
    let day = firstDay.getDay();
    day === 0 ? (day = 6) : (day = day - 1);
    firstDay.setDate(firstDay.getDate() - day);

    let lastDay = new Date(this.now.getTime());
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(1);
    lastDay.setDate(lastDay.getDate() - 1);

    let dateArray = [];
    while (firstDay < lastDay) {
      let week = [];
      for (let i = 0; i < 7; i++) {
        let day = {};
        day.day = firstDay.getDate();
        day.date = new Date(firstDay.getTime());
        day.classes = ["calendar__content__day"];
        if (this.startDate) {
          if (this.startDate.getTime() === day.date.getTime()) {
            day.classes.push("calendar__content__day__selected");
            //Не добавлять класс если в одной точке или не заполнена конечная дата
            if (this.endDate) {
              if (this.startDate.getTime() !== this.endDate.getTime()) {
                day.classes.push("calendar__content__day__start");
              }
            }
          }
        }
        if (this.endDate) {
          if (this.endDate.getTime() === day.date.getTime()) {
            day.classes.push("calendar__content__day__selected");
            if (this.startDate.getTime() !== this.endDate.getTime()) {
              day.classes.push("calendar__content__day__end");
            }
          }
        }
        if (this.endDate && this.startDate) {
          if (this.startDate < day.date && day.date < this.endDate) {
            day.classes.push("calendar__content__day__between");
          }
        }
        if (day.date.getMonth() !== this.now.getMonth()) {
          day.classes.push("calendar__content__day__another");
        }

        if (day.date.getMonth() < currentDate.getMonth() && day.date.getYear() == currentDate.getYear()) {
          day.classes.push("calendar__content__day__another_past");
        }

        if (day.date.getMonth() == currentDate.getMonth() && day.date.getYear() == currentDate.getYear()) {
          if (day.date.getDate() < currentDate.getDate()) {
            day.classes.push("calendar__content__day__another_past");
          }
        }

        if (day.date.getTime() === this.today.getTime()) {
          day.classes.push("calendar__content__day__current");
        }
        week.push(day);
        firstDay.setDate(firstDay.getDate() + 1);
      }
      dateArray.push(week);
    }
    return dateArray;
  }
  update() {
    let calendar = this.element.querySelector(".calendar");
    calendar.outerHTML = "";
    this.render();
  }
  backBtn() {
    this.now.setMonth(this.now.getMonth() - 1);
    this.update();
  }
  fwdBtn() {
    this.now.setMonth(this.now.getMonth() + 1);
    this.update();
  }
  dayClick(date) {
    if (date.getMonth() < this.now.getMonth()) {
      this.putDate(date);
      this.backBtn();
    }
    if (date.getMonth() > this.now.getMonth()) {
      this.putDate(date);
      this.fwdBtn();
    } else {
      this.putDate(date);
      this.update();
    }
  }
  putDate(date) {
    if (this.firstClick) {
      if (this.endDate) {
        if (date < this.endDate) {
          this.startDate = date;
        } else {
          this.startDate = this.endDate;
          this.endDate = date;
        }
      } else {
        this.startDate = date;
      }
    } else {
      if (this.endDate) {
        if (date > this.startDate) {
          this.endDate = date;
        } else {
          this.endDate = this.startDate;
          this.startDate = date;
          this.firstClick = !this.firstClick;
        }
      } else {
        if (date > this.startDate) {
          this.endDate = date;
        } else {
          this.endDate = this.startDate;
          this.startDate = date;
          this.firstClick = !this.firstClick;
        }
      }
    }
    this.firstClick = !this.firstClick;
  }
  clearClick() {
    // let startInput = this.element.querySelector(".date-picker-start");
    let startInput = this.element.parentElement.querySelector(".date-picker-start")
    // let endInput = this.element.querySelector(".date-picker-end");
    let endInput = this.element.parentElement.querySelector(".date-picker-end");

    startInput.value = "";
    endInput.value = "";
    this.startDate = null;
    this.endDate = null;
    this.now = new Date(this.today.getTime());
    this.firstClick = true;
    this.update();
  }
  applyClick() {

    // let startInput = this.element.querySelector(".date-picker-start");
    let startInput = this.element.parentElement.querySelector(".date-picker-start")
    // startInput.value = this.dateToString(this.startDate);

    if (this.startDate != undefined)
      startInput.value = this.dateToString(this.startDate);

    // let endInput = this.element.querySelector(".date-picker-end");
    let endInput = this.element.parentElement.querySelector(".date-picker-end");

    if (this.endDate != undefined && endInput != null)
      endInput.value = this.dateToString(this.endDate);

    if (endInput == null) {
      startInput.value += ` — ${this.dateToString(this.endDate)}`
    }

    let bookingForm = document.querySelector('.booking-form')

    if (bookingForm != null) {
      calculateCost()
    }

    const datePickers = document.querySelectorAll('.date-picker')

    datePickers.forEach(e => {
      e.classList.remove('date-picker__active')
    })

  }
  dateToString(date) {
    let string =
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      sep +
      (date.getMonth() < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      sep +
      date.getFullYear();
    return string;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let elements = document.querySelectorAll(".date-picker");
  elements.forEach(element => {
    let datepicker = new DatePicker(element);
    datepicker.render();
  });
});

const inputsFrom = document.querySelectorAll('.date-picker-start')
const inputsTo = document.querySelectorAll('.date-picker-end')

const dateDropdownIcons = document.querySelectorAll('.date-dropdown__icon')

dateDropdownIcons.forEach((icon) => {
  icon.addEventListener('click', showCalendar.bind(null, 0))
})

inputsFrom.forEach((input, index) => {
  input.addEventListener('click', showCalendar.bind(null, index))
})

inputsTo.forEach((input, index) => {
  input.addEventListener('click', showCalendar.bind(null, index))
})

function showCalendar(i) {
  const datePicker = document.querySelectorAll('.date-picker')[i]
  datePicker.classList.toggle('date-picker__active')
}

function hideCalendar() {
  const datePickers = document.querySelectorAll('.date-picker')

  datePickers.forEach(datePicker => {
    datePicker.classList.remove('date-picker__active')
  })

}

function calculateCost() {

  let bookingForm = document.querySelector('.booking-form')

  if (bookingForm == null) {
    return
  }

  let inputFrom = bookingForm.getElementsByClassName('date-picker-start')[0]
  let inputTo = bookingForm.getElementsByClassName('date-picker-end')[0]
  let multipliedPrice = document.querySelector('.booking-form__multiplied')

  let price = convertToNumber(document.querySelector('.booking-form__price').innerText)
  let multipliedResult = document.querySelector('.booking-form__multiplied-result')

  let total = document.querySelector('.booking-form__result')

  if (inputFrom.value == '' || inputTo.value == '') {
    multipliedPrice.textContent = `${price.toLocaleString('ru-RU')}₽ x 0 суток`
    multipliedResult.textContent = `0₽`
    total.textContent = calculateTotalSection(0)
    return
  }

  let firstDate = moment(inputFrom.value, 'D/M/YYYY')
  let secondDate = moment(inputTo.value, 'D/M/YYYY')
  let diffDays = secondDate.diff(firstDate, 'days')

  let nightsWord = (diffDays == 1) ? 'сутка' : 'суток'

  multipliedPrice.textContent = `${price.toLocaleString('ru-RU')}₽ x ${diffDays} ${nightsWord}`
  multipliedResult.textContent = `${price * diffDays.toLocaleString('ru-RU')}₽`

  console.log(multipliedPrice.value)

  total.textContent = calculateTotalSection(price * diffDays)

}

function calculateTotalSection(multipliedResult) {

  if (multipliedResult == 0) return `0₽`

  let serviceAmount = document.querySelectorAll('.booking-form__amount')
  let result = multipliedResult

  serviceAmount.forEach(e => {
    console.log(e)
    result += +e.textContent.match(/\d/g).join('')
  })

  return `${result.toLocaleString('ru-RU')}₽`

}

function convertToNumber(str) {
  return +str.match(/\d/g).join('')
}