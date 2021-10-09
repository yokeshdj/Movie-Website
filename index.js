window.addEventListener("load", function () {
    var form = document.getElementById("form");
    form.addEventListener("submit", handleSearch)
})

function getMovie(title) {
    return fetch(`http://www.omdbapi.com/?t=${title}&apikey=18122219`)
        .then((res) => res.json())
        .catch((res)=>res)
}
const div = document.getElementById("movie");

function handleError() {
    div.innerHTML = "";
    const img = document.createElement("img");
    img.className = "errorImage"
    img.src = "https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif";
    div.append(img)
}

function handleSearch(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    getMovie(title)
        .then(function (res) {
            console.log(res);
            if(res.Response === "False"){
                handleError();
            }
            else{
                div.innerHTML = "";
                const img = document.createElement("img");
                const titleEle = document.createElement("h4");
                const releaseDate = document.createElement("p");
                const genre = document.createElement("p");
                const imdbRating = document.createElement("p");
                img.src = res.Poster;
                titleEle.textContent = "Movie Name : " + res.Title;
                releaseDate.textContent = "Release Date : " + res.Released;
                genre.textContent = "Genre : " + res.Genre;
                imdbRating.textContent = "IMDB Rating : " + res.imdbRating;
                const recEle = document.createElement("h1");
                if(res.imdbRating > 8.5){
                    recEle.textContent = "Recommended";
                }
                div.append(recEle,img,titleEle,releaseDate,genre,imdbRating)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
// handleSearch();