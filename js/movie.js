//  getting data from local storage. 
// arr store list of favorite movie it help in this page to display favorite badge count.
var arr=JSON.parse(localStorage.getItem('textValues'));
// movie data on which click while searching.
var obj=JSON.parse(localStorage.getItem('movie'));;

console.log(obj);
// display number of favorite on button
const navFav = document.getElementById('favorite-nav');
navFav.innerHTML = arr.length;


// extracting data from the movie obj and display in html.
document.getElementById('movie-image').src = obj.movieJSON.Poster;
document.getElementById('sel-movie-title').innerHTML = obj.movieJSON.Title;
document.getElementById('movie-plot').innerHTML = obj.movieJSON.Plot;
document.getElementById('movie-genre').innerHTML = obj.movieJSON.Genre;
document.getElementById('release').innerHTML = obj.movieJSON.Year;

// checking rather rating available or not if available then show the data else show N/A

var imdbchecker = true;
var tomatochecker = true;
for(var i=0;i<obj.movieJSON.Ratings.length;i++){
    if(imdbchecker && obj.movieJSON.Ratings[i].Source=="Internet Movie Database"){
        document.getElementById('imdb').innerHTML = obj.movieJSON.Ratings[i].Value;
        imdbchecker = false;
    }
    if(tomatochecker && obj.movieJSON.Ratings[i].Source=="Rotten Tomatoes"){
        document.getElementById('tomato').innerHTML = obj.movieJSON.Ratings[i].Value;
        tomatochecker = false;
    }
}
if(imdbchecker === true){
    document.getElementById('imdb').innerHTML = "N/A";
}
if(tomatochecker === true){
    document.getElementById('tomato').innerHTML = "N/A";
}
console.log(obj.movieJSON.Ratings.length);


document.getElementById('cast').innerHTML = obj.movieJSON.Actors;
