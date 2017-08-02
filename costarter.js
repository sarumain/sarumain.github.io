$(function () {
    $("#load").hide();
    $(".results").hide();

	var actors = [];
    var filmography = [];


     $('#add').click(function(e){
         $( ".results p" ).empty();
         $("#load").show();
         $('.actor').each(function(i) {
            actors[i] = $(this).val();
            var encode = actors[i].split(' ').join('+');

            $.ajax({
                type: 'GET',
                url: 'http://www.theimdbapi.org/api/find/person?name=' + encode + '',
                dataType: 'json',
                success: function(resp) {
                    if (resp[0] == undefined) {
                        alert('You entered "' + actors[i] + '". Please enter a valid actor using spaces between names!');
                    } else {
                        if (resp[0].filmography.actor == undefined) {
                            filmography[i] = resp[0].filmography.actress;
                        } else {
                            filmography[i] = resp[0].filmography.actor;
                        }    
                    }
                }
            });
        });
        $(document).ajaxStop(function() {
            var titles = [];
            for (actor in filmography) {
                titles[actor] = [];
                for(i=0;i<filmography[actor].length;i++) {
                    titles[actor].push(filmography[actor][i].title);
                }
            };

  


            var both = intersect(titles[0], titles[1]);
            $("#load").hide();
            $(".results").show();

            if (both.length == 0) {
                $(".results p").append("...unfortunately, nothing! Try another pair!");
            } else {
                for(thing in both) {
                $(".results p").append("- " + both[thing] + "<br>");
                }
            }

            i = 0;
            filmography = [];
            actors = [];

            titles = [];
            both = [];

        });
    });

    function intersect(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        return a.filter(function (e) {
            if (b.indexOf(e) !== -1) return true;
        });
    }



});