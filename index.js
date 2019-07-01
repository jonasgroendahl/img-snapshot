const selection = document.querySelector(".selection");
const resizers = document.querySelectorAll(".resize");
const container = document.querySelector(".container");

let cursorX = 0;
let cursorY = 0;

let x = 0;
let y = 0;

let active = false;
let resizable = false;

console.log(selection);

resizers.forEach(resizer => {
  console.log(resizer);
  resizer.addEventListener("mousedown", function(e) {
    resizable = true;
    console.log("Mouse down");
    resizer.addEventListener("mousemove", function(e) {
      if (resizable) {
        const width = selection.getBoundingClientRect().width;
        const len = width + e.offsetX;
        console.log(width, len);
        selection.style.width = `${len}px`;
      }
    });
  });

  resizer.addEventListener("mouseup", function() {
    resizable = false;
  });
});

container.addEventListener("mousemove", function(e) {
  if (active) {
    x = e.clientX - cursorX;
    y = e.clientY - cursorY;

    console.log("DragMove coords", e.clientX, e.clientY, x, y);

    selection.style.transform = `translate3d(${x}px,${y}px, 0)`;
  } else if (resizable) {
    const rect = selection.getBoundingClientRect();
    console.log(rect.left);

    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

    console.log("DragMove coords", e.clientX, e.clientY, x, y);

    selection.style.width = x + "px";
    selection.style.height = y + "px";

    x = e.clientX - cursorX;
    y = e.clientY - cursorY;
  }
});

selection.addEventListener("mousedown", function(e) {
  console.log("DragStart", e.clientX, e.clientY, e.offsetX);
  cursorX = e.clientX - x;
  cursorY = e.clientY - y;

  const rect = selection.getBoundingClientRect();

  if (e.offsetX >= (rect.width / 100) * 90) {
    resizable = true;
    return;
  }

  if (e.target === selection) {
    active = true;
  }
});

container.addEventListener("mouseup", function(e) {
  console.log("Drag ended", x, y);
  active = false;
  resizable = false;
});
