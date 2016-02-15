(function(){
    $(init);
    // here the html content is still not loaded. so dont assign dom objects to vars here.
    var $movieTitleTxt;
    var $searchMovieBtn;
    var $tbody;
    var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";
    var detailsUrl = "http://www.omdbapi.com/?i=IMDBID";
    var $detailsPoster;
    var $detailsDirector;
    var $detailsPlot;
    var $detailsActors;
    var $detailsTitle;

    function init(){
        // init is called after the page is loaded.
        // good naming convention to start with $ for dom objects. Just to tell that they are not normal js variables.
        $movieTitleTxt=$("#movieTitleTxt");
        $searchMovieBtn=$("#searchMovieBtn");
        $tbody = $("#searchResultsTbl tbody");
        $searchMovieBtn.click(searchMovie);
        $detailsPoster=$("#detailsPoster");
        $detailsDirector=$("#detailsDirector");
        $detailsPlot=$("#detailsPlot");
        $detailsActors=$("#detailsActors");
        $detailsTitle=$("#detailsTitle");
    }

    function searchMovie(){
        var movieTitle = $movieTitleTxt.val();
        var url = searchUrl
            .replace("TITLE", movieTitle)
            .replace("PAGE", 1);
        $.ajax({
            url: url,
            success: renderMovieList
        })
    }

    function renderMovieList(response){
        //console.log(response);
        $tbody.empty();
        var totalResults = response.totalResults;
        var movies =  response.Search;

        for(var i=0; i<movies.length; i++){
            var movie = movies[i];

            var title = movie.Title;
            var imdbID = movie.imdbID;
            var poster = movie.Poster;
            var $img = $("<img>")
                .attr("src", poster)
                .addClass("poster")
                .attr("id", imdbID)
                .click(searchMovieDetails);
            var $tr = $("<tr>");

            var $td = $("<td>");
            $td.append($img);
            $tr.append($td);

            $td = $("<td>");
            $td.append(title);
            $tr.append($td);

            $td = $("<td>");
            $td.append(imdbID);
            $tr.append($td);

            $tbody.append($tr);
            //console.log(title);
        }
    }

    function searchMovieDetails(event){

        var $img = $(event.currentTarget);
        var imdbId = $img.attr("id");
        var url = detailsUrl
            .replace("IMDBID", imdbId);
        $.ajax({
            url: url,
            success: renderMovieDetails
        })
    }

    function renderMovieDetails(movie){
        var actors = movie.Actors;
        var director = movie.Director;
        var plot =  movie.Plot;
        var poster = movie.Poster;
        var title = movie.Title;

        $detailsPoster.attr("src",poster);
        $detailsPlot.html(plot);
        $detailsTitle.html(title);
        $detailsDirector.html(director);

        var actorsArray = actors.split(",");
        $detailsActors.empty();
        for(var a in actorsArray){
            var actor = actorsArray[a];
            var li = $("<li>")
                .append(actor)
                .appendTo($detailsActors);
        }
    }
})();
