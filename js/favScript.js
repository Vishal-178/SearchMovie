// getting data from local storage, arr -list of all favorite movie.
var arr=JSON.parse(localStorage.getItem('textValues'));
// movie data on which click while searching.
var obj=JSON.parse(localStorage.getItem('movie'));;

// display number of favorite on button
const navFav = document.getElementById('favorite-nav');
navFav.innerHTML = arr.length;


// getting element from favMovie page and add new data with element for all arr element. 
const showMoviefav = document.getElementById("showMovieSearched");
// looping through the arr to all favorite movie.
for(var i=0;i<arr.length;i++){
    showMoviefav.innerHTML += `
                <div class="movie-container">
                    <div class="movie-Card">
                      <div class="movie-card-image" onclick="favmoviepage(${i})">
                        <a href="#">
                          <img src="${arr[i].Poster}" alt="" style="height: 100%; width: 100%; border-radius: 10px;">
                        </a>
                      </div>
                      
                      <div class="movie-card-content" >
                          <div class="movie-card-fav-button">
                          <a href="" onclick="deleteFav(${i})"">
                            <i class="fa-solid fa-trash-can"></i>
                          </a>
                          </div>
                          <p class="h5" style="display: flex; justify-content: center;">${arr[i].Title}</p>
                      </div>
                    </div>
                    </div>`;

}

// deleting element when click delete button.
function deleteFav(removeIndex){
  // removing movie from the local storage arr.
  arr.splice(removeIndex,1);
  localStorage.setItem('textValues', JSON.stringify(arr));
}

function favmoviepage(props){
  // getting props as index of responseJSON object.
  console.log(props);
  var http =new XMLHttpRequest();
  
  http.onload = function(){
      var movieDetail = JSON.parse(http.response);
      obj["movieJSON"] = movieDetail;
      localStorage.setItem('movie', JSON.stringify(obj));
      window.location.href = "/movie.html";
  }
  http.open('get',`https://www.omdbapi.com/?apikey=123600e6&i=${arr[props].imdbID}&plot=full`)
  http.send();
}