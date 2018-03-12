//These are global variables
var studentItems = $('.student-item');
const $studentSearch ='<div class="student-search"><input id="search" placeholder="Search for students..."><button>Search</button></div>';
var pagination ='<div class="pagination"><ul></ul></div>';
var studentList = setPages(studentItems);

// Appends the search option to the webpage
$('.page-header.cf').append($studentSearch);



// Generate an array of page list and set every element's length to 10 pages
function setPages(list) {
	var oldList = list.slice();
	var pagesArray = [];
	while (oldList.length) {
		pagesArray.push(oldList.splice(0,10));
	}
	return pagesArray;
}

// After generating the page array of students, only display the current page, hide the rest. 
function pageIndication(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
}

// Append buttons to different pages. The number of pages to show is found from the pageList.length.
function appendPages(pageList) {
	$('.page').append(pagination);
	var numPages = pageList.length;
	for (var i = 1; i <= numPages; i++) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');

	//Add click listeners
	  $(".pagination ul li a").on("click", function(e) {
	    var pageSelection = parseInt($(this)[0].text) - 1;
	    pageIndication(pageSelection, pageList);
	    $(".pagination ul li a").removeClass();
	    $(this).addClass("active");
	    e.preventDefault();
	  });
}

	
// Search function finds both name and/or email. If no results are found, change the header H2 to display No Matching Results, otherwise display default Students title.
function searchStudent() {	
	//convert all the input name to lowercase and remove the whitespace from the beginning and ending
    var searchTerm = $('#search').val().toLowerCase().trim();

        var filteredStudents = studentItems.filter(function(i) {
        	var studentEmail = $(this).find('.email').text();
            var studentNames = $(this).find('h3').text();
            //even part of text matches, it will still show the information of the studnet
            if (studentNames.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
                return true;
            }
            return false;
        });
        if (filteredStudents.length === 0 ) {
        	$('.page-header h2').text('No Matching Results');
        } else {
        	$('.page-header h2').text('STUDENTS');
        }
        var paginated_students = setPages(filteredStudents);
        $('.pagination').remove();
        if (filteredStudents.length >= 10) {
          appendPages(paginated_students);
        }
        pageIndication(0, paginated_students);
}

// Initiation
appendPages(studentList);
pageIndication(0, studentList);

// Event Handlers
$('.student-search').find('button').on('click', searchStudent);
$('.student-search').find('input').keyup(searchStudent);       