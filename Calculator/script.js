// Simple Calculator Logic
let string = "";
let memory = 0;
let input = document.querySelector('input');
let buttons = document.querySelectorAll('.button');

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    let val = e.target.innerHTML;

    if (val === '=') {
      try {
        string = eval(string);
        input.value = string;
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (val === 'C') {
      string = "";
      input.value = "";
    } else if (val === 'M+') {
      try {
        memory += eval(string || "0");
        input.value = memory;
        string = memory.toString();
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (val === 'M-') {
      try {
        memory -= eval(string || "0");
        input.value = memory;
        string = memory.toString();
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (val === '%') {
      try {
        string = (eval(string) / 100).toString();
        input.value = string;
      } catch {
        input.value = "Error";
        string = "";
      }
    } else {
      string += val;
      input.value = string;
    }
  });
});
