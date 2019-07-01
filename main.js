const el = document.querySelector(".selection");
const container = document.querySelector(".container");
const addImage = document.querySelector("button");
const img = document.querySelector("#img");
const overlay = document.querySelector(".img__overlay");

/* global */

let shots = 0;
let resizeable = false;

(function draggable() {
  el.addEventListener("mousedown", mousedown);

  let mmX = 0;
  let mmY = 0;

  function mousedown(e) {
    mmX = e.clientX;
    mmY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }

    function mousemove(e) {
      e.preventDefault();
      if (!resizeable) {
        let newX = mmX - e.clientX;
        let newY = mmY - e.clientY;

        // new mouse location
        mmX = e.clientX;
        mmY = e.clientY;

        const rect = el.getBoundingClientRect();

        drawOverlay(rect);

        el.style.left = rect.left - newX + "px";
        el.style.top = rect.top - newY + "px";
      }
    }
  }
})();

const resizers = document.querySelectorAll(".resizer");

let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  let mmX = 0;
  let mmY = 0;

  function mousedown(e) {
    currentResizer = e.target;
    resizeable = true;

    mmX = e.clientX;
    mmY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = el.getBoundingClientRect();

      drawOverlay(rect);

      // south east
      if (currentResizer.classList.contains("se")) {
        el.style.width = rect.width - (mmX - e.clientX) + "px";
        el.style.height = rect.height - (mmY - e.clientY) + "px";
      }
      // south west
      else if (currentResizer.classList.contains("sw")) {
        el.style.width = rect.width + (mmX - e.clientX) + "px";
        el.style.height = rect.height - (mmY - e.clientY) + "px";
        el.style.left = rect.left - (mmX - e.clientX) + "px";
      }
      // north east
      else if (currentResizer.classList.contains("ne")) {
        el.style.width = rect.width - (mmX - e.clientX) + "px";
        el.style.height = rect.height + (mmY - e.clientY) + "px";
        el.style.top = rect.top - (mmY - e.clientY) + "px";
      }
      // north west
      else {
        el.style.width = rect.width + (mmX - e.clientX) + "px";
        el.style.height = rect.height + (mmY - e.clientY) + "px";
        el.style.top = rect.top - (mmY - e.clientY) + "px";
        el.style.left = rect.left - (mmX - e.clientX) + "px";
      }
      mmX = e.clientX;
      mmY = e.clientY;
    }

    function mouseup() {
      resizeable = false;
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }
}

function drawOverlay(rect) {
  const top = document.querySelector(".overlay.top");
  const bottom = document.querySelector(".overlay.bottom");
  const right = document.querySelector(".overlay.right");
  const left = document.querySelector(".overlay.left");

  top.style.right = 0;
  top.style.left = 0;
  top.style.top = 0;
  top.style.height = rect.top + "px";

  bottom.style.bottom = 0;
  bottom.style.top = rect.bottom + "px";
  bottom.style.left = 0;
  bottom.style.right = 0;

  right.style.top = rect.top + "px";
  right.style.height = rect.height + "px";
  right.style.left = rect.right + "px";
  right.style.right = 0;

  left.style.top = rect.top + "px";
  left.style.left = 0;
  left.style.width = rect.left + "px";
  left.style.height = rect.height + "px";
}

addImage.addEventListener("click", function() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const rect = el.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;

  // height 200, width 300
  ctx.drawImage(img, rect.left, rect.top, rect.width, rect.height, 0, 0, rect.width, rect.height);

  const shotsDiv = document.querySelector(".shots");

  const containerDiv = document.createElement("div");
  containerDiv.classList.add("shot");
  containerDiv.appendChild(canvas);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  const infoP = document.createElement("p");
  shots++;
  infoP.textContent = "Shot " + shots;
  infoDiv.appendChild(infoP);

  const infoSpan = document.createElement("span");
  infoSpan.textContent = Math.round(rect.width) + " x " + Math.round(rect.height);
  infoDiv.appendChild(infoSpan);

  containerDiv.appendChild(infoDiv);

  shotsDiv.appendChild(containerDiv);

  shotsDiv.scrollTo({ top: shotsDiv.scrollHeight });
});
