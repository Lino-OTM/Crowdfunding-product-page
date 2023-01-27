const backThisProjectBtn = document.querySelector(".top-container__project-btn"),
      selectRewardBtns   = document.querySelectorAll(".options-container__option-card-btn"),
      totalMoney         = document.querySelector(".goal-container__amount"),
      totalBackers       = document.querySelector(".goal-container__backers"),
      progressBar        = document.querySelector(".goal-container__progress-bar-fill"),
// Bookmark btn properties
      bookmarkBtn        = document.querySelector(".top-container__bookmark-btn"),
      bookmarkCircle     = document.querySelector(".top-container__bookmark-circle"),
      bookmarkIcon       = document.querySelector(".top-container__bookmark-icon"),
      bookmarkText       = document.querySelector(".top-container__bookmark-text"),
// Modal controls and properties
      overlay            = document.querySelector(".overlay"),
      modal              = document.querySelector(".modal-container"),
      closeModalBtn      = document.querySelector(".modal-container__close-btn"),
// Options container controls
      modalOptionCards   = document.querySelectorAll(".modal-container__option-card"),
      optionCardTitle    = document.querySelectorAll(".modal-container__option-card-title"),
      pledgeSections     = document.querySelectorAll(".modal-container__option-card-pledge-section"),
      rangeInputs        = document.querySelectorAll(".modal-container__option-card-radio-input"),
      pledgeInputs       = document.querySelectorAll(".modal-container__option-card-pledge-input"),
      pledgeBtns         = document.querySelectorAll(".modal-container__option-card-pledge-btn"),
  // Thank you modal
      thanksBtn          = document.querySelector(".success-modal__btn"),
      successModal       = document.querySelector(".success-modal");

// Show and hide modal
const showModal = () => {
  modal.style.display = "block";
  overlay.style.display = "block";
};
const hideModal = () => {
  modal.style.display = "none";
  successModal.style.display = "none";
  overlay.style.display = "none";
};

backThisProjectBtn.addEventListener("click", showModal);
selectRewardBtns.forEach((btn) => {
  btn.addEventListener("click", showModal);
});

closeModalBtn.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);
thanksBtn.addEventListener("click", hideModal);

// End of show and hide modal logic.

// Change bookmark-btn color and text when clicked.
bookmarkBtn.addEventListener("click", () => {
  if (bookmarkText.innerHTML == "Bookmarked") {
    bookmarkCircle.style.fill = "#2F2F2F";
    bookmarkText.style.color = "#777777";
    bookmarkIcon.style.fill = "#B1B1B1";
    bookmarkText.innerHTML = "Bookmark";
  } else {
    bookmarkCircle.style.fill = "hsl(176, 72%, 28%)";
    bookmarkText.style.color = "hsl(176, 72%, 28%)";
    bookmarkIcon.style.fill = "#fff";
    bookmarkText.innerHTML = "Bookmarked";
  }
});

// Set option-card border green when selected.
rangeInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    rangeInputs.forEach((input) => {
      input.parentElement.parentElement.parentElement.parentElement.style.outline =
        "";
    });
    if (event.target.checked) {
      event.target.parentElement.parentElement.parentElement.parentElement.style.outline =
        "2px solid hsl(176, 50%, 47%)";
    }
    // Show pledge-section when selected.
    pledgeSections.forEach((pledge) => {
      pledge.style.display = "none";
    });
    if (event.target.checked) {
      event.target.parentElement.parentElement.parentElement.nextElementSibling.style.display =
        "flex";
    }
  });
});

let money = 89914,
  backers = 5007;

// Arguments en-US is to show the comma instead of a dot.
const setMoneyAndBackers = () => {
  totalMoney.innerHTML = `$${money.toLocaleString("en-US")}`;
  totalBackers.innerHTML = backers.toLocaleString("en-US");
};
setMoneyAndBackers();

// Increase the number of backers when pledge-btn is clicked and hide modal to show thank you.
// Also increase the money raised.
pledgeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    backers += 1;
    totalBackers.innerHTML = backers.toLocaleString("en-US");
    modal.style.display = "none";
    successModal.style.display = "flex";

    let pledgeInputValue = btn.previousElementSibling.value;
    money += parseInt(pledgeInputValue);
    setMoneyAndBackers();
    setProgressBar();
  });
});
// Make progress bar equal to the percentage of money raised.
const setProgressBar = () => {
  let percentage = (money / 100000) * 100;
  progressBar.style.width = `${percentage}%`;
};
setProgressBar();

// If the input value is less than its minimum value, disable the pledge-btn.
pledgeInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value < input.min) {
      input.nextElementSibling.disabled = true;
      input.nextElementSibling.style.backgroundColor = "hsl(0, 0%, 48%)";
    } else {
      input.nextElementSibling.disabled = false;
      input.nextElementSibling.style.backgroundColor = "hsl(176, 50%, 47%)";
    }
  });
});

// Change border of input-range when hover on title.
optionCardTitle.forEach((title) => {
  title.addEventListener("mouseover", (e) => {
    e.target.previousElementSibling.style.border =
      "1px solid hsl(176, 50%, 47%)";
  });
  title.addEventListener("mouseout", (e) => {
    e.target.previousElementSibling.style.border = "1px solid #ededed";
  });
});
