const BASEURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdown){
    for(currCode in countryList ){
let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name==="from" && currCode==="USD")
     newOption.selected="selected";
    else if(select.name==="to" && currCode==="INR")
     newOption.selected="selected";
    select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate= async ()=>{
    let amt=document.querySelector(".amount input");
    let amtval=amt.value;
    if(amtval==="" || amtval<0) {
        amtval=1;
     amt.value="1";}
     const URL=`${BASEURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let response=await fetch(URL);
     let data=await response.json();
     let rate=data[toCurr.value.toLowerCase()];
     let finalAmt=amtval*rate;
     msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newsrc;
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
    
});