// var clipboard = new Clipboard('.copy', {
//   target: function(trigger) {
//       return trigger.nextElementSibling;
//   }
// });
// clipboard.on('success', function(e) {
//     console.log(e);
// });
// clipboard.on('error', function(e) {
//     console.log(e);
// });


$(document).ready(function() {
  $('.owl-carousel').owlCarousel({
      loop: false,
      dots: false,
      margin: 10,
      responsive: {
          0: {
              items: 1,
              nav: true,
              loop: false,
              mouseDrag: false,
              touchDrag: true
          },
          600: {
              items: 2,
              nav: true,
              loop: false
          },
          1200: {
              items: 3,
              nav: true,
              loop: false
          }
      }
  })
});

// download button
$(".btn-circle-download").click(function() {
  $(this).addClass("load");
  setTimeout(function() {
    $(".btn-circle-download").addClass("done");
  }, 1000);
  setTimeout(function() {
    $(".btn-circle-download").removeClass("load done");
  }, 5000);
});

//get random number
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//call api using url
async function callApi(url,options){
  const response = await fetch(url,options);
  const data = await response.json();
  console.log(data);
  return data;
}


// advice api calls
async function getAdvice() {
  const url = "https://api.adviceslip.com/advice";
  const data = await callApi(url);
  const advice = data.slip.advice; 
  return advice;
}

async function renderAdvice(advice){
  const adviceContainer = document.querySelector('.advice-container')
  const adviceImage = document.querySelector('.advice-image')
  adviceContainer.textContent= "- " + advice;
  // adviceImage.src="https://source.unsplash.com/random/500×200/?advice";
}

async function refreshAdvice(){
  const apiAdvice = await getAdvice();
  renderAdvice(apiAdvice);
}


//yes no  api calls
async function getYesNo(){
  const url="https://yesno.wtf/api";
  const data = await callApi(url);
  return data;
}
async function renderYesNO(yesNoData){
  const{ answer,image}= yesNoData
  const yesNoContainer = document.querySelector('.yes-no-container')
  const yesNoImage = document.querySelector('.yes-no-image')
  yesNoImage.src=image;
  yesNoContainer.textContent= answer;
}

async function refreshYesNO(){
  const apiYesNo = await getYesNo();
  renderYesNO(apiYesNo);
}



//chuck norris joke api call
async function getCuckNorisJoke(){
  const url="https://api.chucknorris.io/jokes/random?category=religion,explicit,animal";
  const data = await callApi(url);
  return {joke:data.value, category:data.categories[0]};
}
// getCuckNorisJoke()
async function renderCuckNorisJoke(jokeInfo){
  const {joke,category} = jokeInfo
  const jokeContainer = document.querySelector('.joke-container')
  const jokeCategoryContainer = document.querySelector('.joke-category-container')
  const jokeImage = document.querySelector('.joke-image')
  const imageEndPints=[
    'sensual',
    'sex',
    'lingerie',
    'sensual-woman',
    'sensual-couple',
    'body',
    'semi-nude',
    'nude',
    'sexual',
    'female-body',
    'porn',
    'boobs',
    '#nude',
    'nude××',
    'bikini-girl',
    'bikini',
    'Swimwear',
    'Bikini-photography',
    'bikini-girls',
    'bikinis',
    'undress',
    'underwear',
    'thong',
    'thongs',


  ]
  let index = randomIntFromInterval(0,imageEndPints.length - 1)
  console.log(index)
  jokeImage.src="https://source.unsplash.com/random/500×200/?" + imageEndPints[index] ;
  jokeCategoryContainer.textContent=category;
  jokeContainer.textContent= joke;
}

async function refreshChuckNorisJoke(){
  const apiChuckNorisJoke = await getCuckNorisJoke();
  renderCuckNorisJoke(apiChuckNorisJoke);
}


// activity api calls
async function getGroupActivity(){
  const url= [ 
    "http://www.boredapi.com/api/activity?participants=4",
    "http://www.boredapi.com/api/activity?participants=1",
    "http://www.boredapi.com/api/activity?participants=2",
    "http://www.boredapi.com/api/activity?participants=3",
  ]
  // ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
  const index=randomIntFromInterval(0, 2);
  const data = await callApi(url[index]);
  return data;
}

async function renderGroupActivity(activityData){
  const {activity,type,accessibility,price,participants}= activityData
  let container= document.querySelector(".group-activity-container")
  const activityImage = document.querySelector('.group-activity-image')
  if(type =="busywork"){
    activityImage.src= "https://source.unsplash.com/random/500×200/?activity";
  }else{
    activityImage.src= "https://source.unsplash.com/random/500×200/?"+type;
  }
  let details= document.querySelector(".group-activity-details-container")
  container.textContent=activity;
  details.textContent =`Type : ${type}`;
  details.innerHTML +=`<br> Accessibility : ${accessibility} <br> Price : ${price} <br> participants : ${participants}`;
};

async function refreshGroupActivity(){
  const activityData = await getGroupActivity()
  renderGroupActivity(activityData);
}


//simple joke api call
async function getSimpleJoke(){
  const url="https://icanhazdadjoke.com/";
  const options = { headers: {"Accept": "application/json",},}
  const data = await callApi(url,options);
  return data;
}

async function renderSimpleJoke(jokeData){
  const {joke}= jokeData
  let container= document.querySelector(".simple-joke-container")
  container.textContent="- " + joke;
  
};

async function refreshSimpleJoke(){
  const jokeData = await getSimpleJoke()
  await renderSimpleJoke(jokeData);
}


//animal fact api call
async function getFact(type){
  if(type=="dog"|| type=="cat"){
    //doNothing
  }else{
      const types = [ "dog" , "cat" ]
      const index=randomIntFromInterval(0, 1);
      type = types[index];
  }
  if(type=="dog"){
    const factUrl = "https://dogapi.dog/api/v2/facts?limit=1"
    const imageUrl = "https://dog.ceo/api/breeds/image/random"
    const options = { headers: {"Accept": "application/json",},}
    const factData = await callApi(factUrl,options);
    const imageData = await callApi(imageUrl,options);
    const fact= factData.data[0].attributes.body;
    const image = imageData.message
    return {type,fact,image};
  }else if(type= "cat"){
    const factUrl = 'https://catfact.ninja/fact'
    const options = { headers: {'accept': 'application/json'},}
    const imageUrl = "https://cataas.com/cat/gif?json=true"
    const imageOptions = { headers: {"accept": "*/*",},}
    const factData = await callApi(factUrl,options);
    const imageData = await callApi(imageUrl,imageOptions);
    const fact= factData.fact
    const image= "https://cataas.com/" + imageData.url
    return {type,fact,image};
  }  
}

async function renderFact(factData){
  const {type,fact,image}= factData
  let container= document.querySelector(".animal-fact-container")
  let category= document.querySelector(".animal-fact-category-container")
  const factImage = document.querySelector('.animal-fact-image')
  factImage.src=image;
  container.textContent="- " + fact;
  category.textContent=type;
};

async function refreshFact(type){
  const factData = await getFact(type)
  await renderFact(factData);
}


// async function getGender() {
//     const response = await fetch("https://api.genderize.io?name=mridul");
//     const gender = await response.json();
//     console.log(gender);
//   }
//   getGender();




//  dark joke hide using local Storage
if(localStorage.getItem('Chuck') == 'Hide') {
  const cNCard = document.querySelector(".chuck-norris-card")
  const cNHideBtn = document.querySelector(".chuck-norris-hide")
  cNCard.classList.add('hidden')
  cNHideBtn.textContent='Show'
} else {
  const cNCard = document.querySelector(".chuck-norris-card")
  const cNHideBtn = document.querySelector(".chuck-norris-hide")
  cNCard.classList.remove('hidden')
  cNHideBtn.textContent='Hide'
}


// all data api calls
async function refreshAll(){
  await refreshGroupActivity();
  await refreshAdvice();
  await refreshYesNO();
  await refreshChuckNorisJoke();
  await refreshSimpleJoke();
  await refreshFact();
}
refreshAll();


// click functionality
const universalRefresh = document.querySelector(".universal-owl-refresh")
universalRefresh.addEventListener('click', async()=>{
  universalRefresh.classList.add('rotate-slow')
  await refreshAll();
  universalRefresh.classList.remove('rotate-slow')
})

const gARefreshBtn = document.querySelector(".group-activity-refresh")
gARefreshBtn.addEventListener('click', async()=>{
  gARefreshBtn.classList.add('rotate')
   await refreshGroupActivity();
   gARefreshBtn.classList.remove('rotate')
})

const adviceRefreshBtn = document.querySelector(".advice-refresh")
adviceRefreshBtn.addEventListener("click",async()=>{
   adviceRefreshBtn.classList.add('rotate')
   await refreshAdvice();
   adviceRefreshBtn.classList.remove('rotate')
})

const yNRefreshBtn = document.querySelector(".yes-no-refresh")
yNRefreshBtn.addEventListener("click",async()=>{
   yNRefreshBtn.classList.add('rotate')
   await refreshYesNO();
   yNRefreshBtn.classList.remove('rotate')
})

const cNRefreshBtn = document.querySelector(".chuck-norris-refresh")
cNRefreshBtn.addEventListener("click",async()=>{
   cNRefreshBtn.classList.add('rotate')
   await refreshChuckNorisJoke();
   cNRefreshBtn.classList.remove('rotate')
})

const cNHideBtn = document.querySelector(".chuck-norris-hide")
cNHideBtn.addEventListener("click",async()=>{
  const cNCard = document.querySelector(".chuck-norris-card")
  cNCard.classList.toggle('hidden')
  if(cNCard.classList.contains("hidden")){
    cNHideBtn.textContent='Show'
    localStorage.setItem("Chuck", "Hide")
  }
  else{
    cNHideBtn.textContent='Hide'
    localStorage.setItem("Chuck", "Show")
  }
})

const sJRefreshBtn = document.querySelector(".simple-joke-refresh")
sJRefreshBtn.addEventListener("click",async()=>{
  sJRefreshBtn.classList.add('rotate')
   await refreshSimpleJoke();
   sJRefreshBtn.classList.remove('rotate')
})

const cFRefrshBtn = document.querySelector(".animal-fact-refresh.cat")
cFRefrshBtn.addEventListener("click",async()=>{
  cFRefrshBtn.classList.add('rotate')
   await refreshFact("cat");
   cFRefrshBtn.classList.remove('rotate')
})

const dFRefrshBtn = document.querySelector(".animal-fact-refresh.dog")
dFRefrshBtn.addEventListener("click",async()=>{
  dFRefrshBtn.classList.add('rotate')
   await refreshFact("dog");
   dFRefrshBtn.classList.remove('rotate')
})


//secret text hide
const toggler = document.querySelector(".show-more");
const toggleBox = document.querySelector(".secret");
const isHidden = () => toggleBox.classList.contains("box-hidden");

toggleBox.addEventListener("transitionend", function () {
  if (isHidden()) {
    toggleBox.style.display = "none";
  }
});

toggler.addEventListener("click", function () {
  if (isHidden()) {
    let code = prompt("You need Code to enter");
    if (code == 'moles') {
      toggleBox.style.removeProperty("display");
      toggler.textContent='Show less..'
      setTimeout(() => toggleBox.classList.remove("box-hidden"), 300);
    }else{

    }
  } else {
    toggler.textContent='Show more..'

    toggleBox.classList.add("box-hidden");
  }
});
