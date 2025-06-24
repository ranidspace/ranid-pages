function enableSubmit() {
  var input;
  const button = document.getElementById("submit_button");
  for (let i = 0; i < 2; i++) {
    input = document.getElementById(`opt${i}`);
    input.removeEventListener("change", enableSubmit);
  }
  button.disabled = false;
}
async function get_data() {
  const response = await fetch("https://test.wii.gay/", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  display(data);
}

async function post_data() {
  const p = document.getElementById("message");
  const button = document.getElementById("submit_button");

  const formdata = new URLSearchParams(
    new FormData(document.forms.form),
  ).toString();

  const response = await fetch("https://test.wii.gay/", {
    method: "POST",
    body: formdata,
    credentials: "include",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  if (response.ok) {
    button.disabled = true;
    p.innerHTML = "Voted!";
    setTimeout(window.location.reload.bind(window.location), 1000);
  } else {
    p.innerHTML = await response.json();
  }
}

function display(data) {
  const main = document.getElementById("main");
  const form = document.createElement("form");
  const button = document.createElement("button");
  var div = document.createElement("div");
  var label;
  var input;
  var id;

  form.id = "form";
  form.setAttribute("onSubmit", "return false");
  button.setAttribute("onClick", "return post_data()");

  form.append(div);

  for (let i = 0; i < 2; i++) {
    id = `opt${i}`;


    input = document.createElement("input");
    input.addEventListener("change", enableSubmit, { once: true });
    input.id = id;
    input.setAttribute("required", "");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "song");
    input.setAttribute("value", data.options[i]);
    div.append(input);

    label = document.createElement("label");
    label.classList.add("option_button");
    label.setAttribute("for", id);
    label.innerHTML = `${data.options[i]}`;
    div.append(label);
  }

  input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "token");
  input.setAttribute("value", data.token);
  form.append(input);

  div = document.createElement("div");
  form.append(div)

  button.setAttribute("type", "submit");
  button.innerHTML = "Submit";
  button.id = "submit_button";
  button.disabled = true;
  div.append(button);

  main.append(form);
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    get_data();
  },
  false,
);
