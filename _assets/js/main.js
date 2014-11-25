(function($) {

	//
	// Debounced resize event
	//
	function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,200)};return c};

	//
	// Set up slick.js
	//
	$("#projects-slider").slick({
		arrows: false,
		speed: 500,
		autoplay: true,
		slide: "article",
		autoplaySpeed: 2000,
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		lazyLoad: "progressive",
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	// Set up custom next and previous buttons
	$(".slider-nav").click(function(e) {
		e.preventDefault();
	});
	$(".slider-nav--previous").click(function() {
		$(this).closest(".slider").slickPrev();
	});
	$(".slider-nav--next").click(function() {
		$(this).closest(".slider").slickNext();
	});


	//
	// Set up fancybox
	//

	$(".popup").fancybox({
		closeBtn: false,
		openEffect: "fade",
		closeEffect: "fade",
		padding: 0,
		maxWidth: "90%",
		maxHeight: "90%",
		helpers: {
			overlay: {
				locked: false
			}
		}
	});

	//
	// Parallax background images
	//

	$(".parallax").scrolly({
		bgParallax: true
	});	



	//
	// Fade out project overlay as page is scrolled
	//
	function fadeOverlay() {
		var fadeStart = 0,
		fadeEnd = 200,
		fading = $(".project__fade");

		$(window).bind("scroll", function() {
			var offset = $(document).scrollTop(), opacity = 0;

			if (offset <= fadeStart) {
				opacity = 0.75;
			} else if (offset <= fadeEnd) {
				opacity=0.75-offset/fadeEnd;
			}
			fading.css("opacity", opacity);
		});
	}
	$(window).load(fadeOverlay);



	//
	// Resize the hero area based on the current window size
	//
	var heroResize = function() {
		var pageHeight = $(window).height(),
		topHeight  = $("#page-head").height(),
		heroHeight = pageHeight - topHeight,
		postTitleHeight = $(".post__title").outerHeight(),
		blogImageHeight = pageHeight - topHeight - postTitleHeight,
		$projectImage = $(".post--project .post__img");

		$(".hero--fullheight").css("height", heroHeight);
		$(".post--blog .post__img").css("height", blogImageHeight);

		if ($projectImage.css("background-attachment") == "fixed") {
			$projectImage.css("height", pageHeight);
			$projectImage.closest("img").addClass("accessibility");
		} else {
			$projectImage.css("height", "auto");
			$projectImage.closest("img").removeClass("accessibility");
		}

	};

	$(document).ready(heroResize);
	$(window).resize(heroResize);


	//
	// Make post grid items clickable based on the href attribute of the link inside
	//
	function clickPostGrid() {
		var isDragging = false,
		$postGridPost = $(".post-grid__post");

		$postGridPost.mousedown(function(event) {
			switch (event.which) {
				case 1:	$(window).mousemove(function() {
							// If mouse is moving when item is clicked, make sure it lets you
							// drag the slider rather than click
							isDragging = true;
							$(window).unbind("mousemove");
						});	
			}	
		});

		$postGridPost.mouseup(function(event) {
			switch (event.which) {
				case 1: // Find out if item was being dragged, then reset variable
						var wasDragging = isDragging;
						isDragging = false;
						$(window).unbind("mousemove");
						if (!wasDragging) {
							// If user wasn't dragging, find the appropriate URL and go there
							window.location = $(this).find(".post__title a").attr("href");
						}
			}
		});
	}
	$(window).load(clickPostGrid);


	//
	// Keep post grid items square by making height always equal width
	//
	var postGridResize = function() {
		$(".post-grid").each(function() {
			var post = $(this).find(".post-grid__post"),
			firstPost = post.first(),
			postWidth = firstPost.width();

			post.each(function() {
				$(this).height(postWidth);
			});
		});
	}
	$(document).ready(postGridResize);
	on_resize(postGridResize);


	//
	// Get latest tweets for footer
	//
	$(function() {
		var twitterConfig = {
		  "id": '533700189861593088',
		  "domId": '',
		  "maxTweets": 2,
		  "enableLinks": true,
		  "showRetweet": false,
		  "showTime": true,
		  "showUser": false,
		  "showImages": false,
		  "dateFunction": '',
		  "showInteraction": false,
		  "customCallback": tweetHandler
		};

		function tweetHandler(tweets) {
		    var x = tweets.length;
		    var n = 0;
		    var element = document.getElementById('tweets');
		    var html = '<div class="grid">';

		    while(n < x) {
		      html += '<div class="grid__item desk--one-half">'
		      	    + '<blockquote class="quote quote--tweet">'
		      	    + tweets[n]
		      	    + '</blockquote>'
		      	    + '</div>';
		      n++;
		    }
		    html += '</div>';

		    element.innerHTML = html;
		}

		twitterFetcher.fetch(twitterConfig);
	});
	


	//
    // Static site search
    //
	$(function() {
		SimpleJekyllSearch.init({
	      searchInput: document.getElementById('search-input'),
	      resultsContainer: document.getElementById('search-results-list'),
	      dataSource: '/search.json',
	      noResultsText: '<li class="no-results">Looks like nothing&rsquo;s here.</li>',
	      searchResultTemplate: 
	      	'<li class="results__item flag flag--middle">' +
			'<div class="flag__img">' +
			'<img src="{image}" alt="" class="results__img">' +
			'</div>' +
			'<div class="flag__body">' +
			'<a class="results__title" href="{url}">{title}</a>' +
			'</div>' +
			'</li>'
	    });

	    // Show results when user is typing in search input
	    var searchInput = $("#search-input"),
	    	searchResults = $("#search-results");

	    	searchInput.val('');

		function showSearchResults() {
			$(".btn--search").addClass("faded");
			$(searchResults).addClass("results--visible");
		}

		searchInput.focus(function() {
			if (searchInput.val()) {
				showSearchResults();
			} else {
				$(searchInput).keypress(showSearchResults);
			}	
		});

		// If input is unclicked and results box is not being clicked, hide the results box
	    $(searchInput).focusout(function() {
	    	if (!$(searchResults).is(":hover")) {
				$(searchResults).removeClass("results--visible");
		    	$(".btn--search").removeClass("faded");
	    	}
	    });

	    $(searchResults).click(function() {
	    	$(searchInput).focus();
	    });

		// Hide results area to start
	   	$(document).ready(function() {
	   		$(searchResults).removeClass("results--visible");
	   	});
	});
   


	//
	// Infinite scroll
	//
	$(function() {
		function jScrollCallback() {
			setTimeout(function() {
				$('.jscroll-added > .post').each(function() {
					$(this).addClass('jscroll-visible');
				});
			}, 200);
			
			postGridResize();
			clickPostGrid();
		}

		$('#posts').jscroll({
			nextSelector: '#load-more',
			contentSelector: 'article',
			autoTrigger: false,
			callback: jScrollCallback,
			loadingHtml: '<div id="posts-loader" class="spinner posts-loader">' +
						 '<div class="bounce1"></div>' +
						 '<div class="bounce2"></div>' +
						 '<div class="bounce3"></div>' +
						 '</div>'
		});
	});



	//
	// Smooth scroll to anchor
	// Thanks Chris Coyier!
	//
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});


})(jQuery);






