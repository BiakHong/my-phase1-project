document.addEventListener('DOMContentLoaded', () => {



let direction = document.getElementById("direct")
let value = document.getElementById("textValue")
let submitBt = document.getElementById("enter")
let form =document.querySelector('form');
let theSentences = document.getElementById("theSentence")
let forms = document.getElementById("forms")
let button = document.getElementById("btns")
let likes = document.getElementById("urLikes")
let likeList = document.getElementById("likeList")


let btnInner = `<button class="btn" id="btn"> Play Again </button>`
let likeInner =`<button id="likeBtn"> Like </button>`


let wordForLike;
let imgForLike;

let directionWords = ["Enter an adjective:", "Enter an verb:", "Enter another adjective:", "Enter a noun:", "Enter a person name:", "Enter any food name:",""]
let theObject={
		"adjective": "",
		"verb": "",
        "adjective2":"",
		"noun": "",
        "name": "",
		"food": ""
}
function handleSubmit() {
    form.addEventListener("submit",(e)=> {
        e.preventDefault()
        let tvalue = e.target.textValue.value;
        direction.innerHTML = changeWord(direction.innerHTML , directionWords, tvalue)
        console.log(theObject);
        if(direction.innerHTML === directionWords[6]){
            postObj(theObject)
        let mytext =`A ${theObject.adjective} man ${theObject.verb} into the ${theObject.adjective2} building to visit a very nice ${theObject.noun}.
         Sit down Mr/Mrs ${theObject.name} can I interest you with any good ${theObject.food}.`
         wordForLike = mytext;
        console.log(mytext)
            randerSentence(mytext);
            renderCats();
            button.innerHTML=btnInner;
            likes.innerHTML=likeInner;            
           
            
            theObject={
                "adjective": "",
		"verb": "",
        "adjective2":"",
		"noun": "",
        "name": "",
		"food": ""
        }
        }
       
        
    
        form.reset();
        
    })
}
handleSubmit()

function changeWord(curWord, wordsArr, value){
    
    switch (curWord) {
        case wordsArr[0]:
            theObject.adjective=value;
          return  curWord = wordsArr[1];
          break;
        case wordsArr[1]:
            theObject.verb=value;
            return curWord = wordsArr[2];
          break;
        case wordsArr[2]:
            theObject.adjective2=value;
            return curWord = wordsArr[3];
          break;
          case wordsArr[3]:
            theObject.noun=value;
            return curWord = wordsArr[4];
          break;
          case wordsArr[4]:
            theObject.name=value;
            return curWord=wordsArr[5];
          break;
          case wordsArr[5]:
            theObject.food=value;
            return curWord = wordsArr[6];
          break;
          case wordsArr[6]:
            return curWord = wordsArr[0];
          break;
      }
}
function getAllData(){
    fetch("http://localhost:3000/sentences")
    .then(res => res.json())
    .then(dat => dat.forEach(dat => 
        console.log("Hallelujah")))
}



likes.addEventListener("click", handleLikes)

function handleLikes(){

    const newDiv = document.createElement("div");
    let something = `<li>
    <a>
      <img src=${imgForLike} />
    </a>
    <div class="content">
      <p>${wordForLike}</p>
    </div>
  </li>`
  newDiv.innerHTML=(something)
  likeList.appendChild(newDiv)

}


function renderCats(){
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(res => res.json())
        .then(data => {
            imageLink =data[0].url;
            imgForLike= data[0].url;
            forms.innerHTML = `
            <div class="container">
            <div id="catPic" class="cats">
            <img src = "${data[0].url}"/>
            
            </div>
            
            `

        })
}

function randerSentence(ws){
    // let list = document.createElement("ul")
    // list.className = "list"
    // let detail =`<li>A ${ws.adjective} man ${ws.verb} into a ${ws.place} and ${ws.verb2} his ${noun} away.</li>`;

    // list.innerHTML = detail
    // theSentences.appendChild(list)
    //let theSentences = document.getElementById("#theSentence")
  let li = document.createElement("ul");
  li.id = "theList"
  
  li.appendChild(document.createTextNode(ws));
  return theSentences.appendChild(li);
}

function postObj(wordStences){
    fetch("http://localhost:3000/sentences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(wordStences)
    })
    .then(res => res.json())
    .then(dat => console.log(dat))
}



getAllData()

button.addEventListener("click",(e)=>{
    forms.innerHTML=formsInnertext
    button.innerHTML =""
    theSentences.innerHTML=''
    console.log(e)
})


let formsInnertext = `
<form id="theBtn">
            <p id="direct">Enter an adjective:</p><br>
            <input type="text" id="textValue" name="verbs"><br><br>
            <input type="submit" id="enter" value="Enter">

        </form>
        `


            
        });