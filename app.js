const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "from" && currCode === "USD") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
   select.addEventListener("change", (evt) => {
  updateflag(evt.target);
});
}

const updateflag = (element) => {
  let currCode = element.value;              // e.g. "USD"
  let countryCode = countryList[currCode];   // e.g. "US"
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};



btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = amtval * rate;
  msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});
