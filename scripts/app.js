(function () {
  wireHandlers();
})();

function wireHandlers() {
  document.addEventListener("keydown", playAudio);
  document.addEventListener("keydown", animateHTMLKey);
  document.addEventListener("click", playAudio);
}

function playAudio(e) {
  let dataCode;
  let validClick = e.target.parentElement.attributes.length;

  if (e.type === "click" && validClick) {
    dataCode = Number(e.target.parentElement.attributes[1].value);
  }

  if (e.type === "keydown") {
    dataCode = e.keyCode;
  }

  const audio = document.querySelector(`audio[data-key="${dataCode}"]`);

  if (!audio) return; // stops the function if a non binding key is pressed

  audio.currentTime = 0;
  audio.play();
}

function animateHTMLKey(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const keys = document.querySelectorAll(".key");

  if (!key) return;

  key.classList.add("playing");
  keys.forEach((key) =>
    key.addEventListener("transitionend", removeTransition)
  );
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;

  this.classList.remove("playing");
}
