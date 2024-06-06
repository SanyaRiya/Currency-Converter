
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button"); 
const output = document.querySelector(".msg");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");



for(let select of dropdowns){
    for(currCode in countryList){
        let newOption =  document.createElement("option");
        newOption.innerText = currCode;
        newOption.value =  currCode;
        if(select.name==='from' && currCode=== "USD"){
            newOption.selected="selected";
        }
        else if(select.name==='to' && currCode=== "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target)
    })
}


const updateFlag = (element)=>{
    let currCode=element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    await convertCurrency(); 
})

async function convertCurrency() {
    const fromCurrency = document.querySelector('.from select').value;
    const toCurrency = document.querySelector('.to select').value;
    const amount = document.querySelector('.amount input').value;
    const apiKey = '27466d1e400c34ca1adc234d'; 
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = amount * rate;
        output.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`; // Updated selector
    } catch (error) {
        console.error('Error fetching the exchange rate:', error);
    }
}
