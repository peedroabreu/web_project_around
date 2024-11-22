export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.querySelector(".overlay").style.display = "block";
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.querySelector(".overlay").style.display = "none";
}

export function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

export function closePopupByClickOnOverlay(evt) {
  const openPopup = document.querySelector(".popup_opened");
  if (openPopup && evt.target === document.querySelector(".overlay")) {
    closePopup(openPopup);
  }
}
