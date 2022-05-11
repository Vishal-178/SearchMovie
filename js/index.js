//---------------------working on search input on home page-------------------------- 
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const dis = document.getElementById('carouselExampleControls');
// when search button is click carousel will remove.
searchInput.onclick = ()=>{
    document.getElementById('heading-recommend').style.display = "block";
    document.getElementById('search-bar-home').style.position = "relative";
    const recommdHeading = document.getElementById('heading-recommend');
    dis.remove();
}
// store typed search keyword
var moviename = "";
var unwantedKey = "";
// when search button is clicked
searchButton.onclick = () => {
    const search = searchInput.value;
    moviename = search;
    callFindMovie()
};

// searching inside search box on each key press it search for movie and recommend.
searchInput.onkeydown = function(evt){
    evt = evt || window.event;
    var charCode = evt.keyCode;
    console.log(charCode);
    if(charCode > 41 && charCode < 91){
        var charStr = String.fromCharCode(charCode);
        moviename = searchInput.value + charStr;
        moviename = moviename.toLowerCase();
        console.log(moviename);
        callFindMovie()
    }else if(charCode==8){
        if(unwantedKey==""){
            moviename = moviename.slice(0, -1)
            callFindMovie()
        }else{
            unwantedKey = unwantedKey.slice(0,-1);
        }
    }else if(charCode==32){
        if(moviename.charAt(moviename.length - 1)!=" "){
            moviename = moviename + " ";
            callFindMovie()
        }
    }else{
        unwantedKey = unwantedKey + String.fromCharCode(charCode).toLowerCase();
    }
}
function callFindMovie(){
    if(moviename.length>2){
        findmovie(moviename);
    }
}
// record response of searched movie it help to pass all movie data to other function,
var responseJSON = "";
// sending request to find movie and display while searching.
function findmovie(name){
    var http =new XMLHttpRequest();
    const showMovie = document.getElementById("showMovieSearched");
    showMovie.innerHTML = "";
    http.onload = function(){
        responseJSON = JSON.parse(http.response);
        // when error or no response 
        if(responseJSON.Response=="False"){
            console.log('there is some error response is false');
            return;
        }
        for(var i=0;i<10;i++){
            // if thumbnail/ image avilable then it save else 
            if(responseJSON.Search[i].Poster!="N/A"){
                showMovie.innerHTML += `
                <div class="movie-container">
                    <div class="movie-Card">
                      <div class="movie-card-image" onclick="moviepage(${i})">
                        <a href="#">
                            <img src="${responseJSON.Search[i].Poster}" alt="" style="height: 100%; width: 100%; border-radius: 10px;">
                        </a>
                      </div>
                      
                      <div class="movie-card-content" >
                          <div class="movie-card-fav-button">
                            <a href="#" onclick="addFavorite(${i})">
                                <i class="fa-solid fa-heart"></i>
                            </a>
                          </div>
                          <p class="h5" style="display: flex; justify-content: center;">${responseJSON.Search[i].Title}</p>
                          
                      </div>
                    </div>
                    </div>
                `;
               
            }else{
                delete responseJSON.Search[i];
            }
            
        }
        console.log(responseJSON);
    }
    http.open('get',`https://www.omdbapi.com/?apikey=123600e6&page=1&s=${name}`)
    http.send();
}
// creating local storage arr -- for favorite movie and obj for sending clicked movie data
if(localStorage.getItem('textValues') == null){
    var arr =[];
}else{
    arr =  JSON.parse(localStorage.getItem('textValues'));
}
if(localStorage.getItem('movie') == null){
    var obj ={};
}else{
    obj =  JSON.parse(localStorage.getItem('movie'));
}


// display number of favorite on button
const navFav = document.getElementById('favorite-nav');
navFav.innerHTML = arr.length;

// when addFavorite is called by favorite button on each movie card.
function addFavorite(props){
    let ll = JSON.parse(localStorage.getItem('textValues'));
    var isMoviePresent;
    if(ll === null){
        isMoviePresent = false;
    }else{
        console.log("her is ==============");
        for(let i=0;i<ll.length;i++){
            if(ll[i].imdbID == responseJSON.Search[props].imdbID){
                isMoviePresent = true;
                break;
            }
        }
        
    }
    if(isMoviePresent){
        window.alert('alredy added in favroit');
    }else{
        arr.unshift(responseJSON.Search[props])
        localStorage.setItem('textValues', JSON.stringify(arr));
        navFav.innerHTML = arr.length;
    }
}


function moviepage(props){
    // getting props as index of responseJSON object.
    var http =new XMLHttpRequest();
    
    http.onload = function(){
        var movieDetail = JSON.parse(http.response);
        obj["movieJSON"] = movieDetail;
        localStorage.setItem('movie', JSON.stringify(obj));
        window.location.href = "/movie.html";
    }
    http.open('get',`https://www.omdbapi.com/?apikey=123600e6&t=${responseJSON.Search[props].Title}&plot=full`)
    http.send();
}

