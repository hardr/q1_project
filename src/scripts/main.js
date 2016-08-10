$(document).ready(function() {
  console.log('Insanity, check.');

  var modal = document.getElementById('welcomeModal');
  var span = document.getElementById('modalClose');

  //open modal on page load
  $(window).load(function() {
    $('#welcomeModal').show();
    //sets character screen as default view
    $('#map').show();
    google.maps.event.trigger(map, "resize");
  });

  $(window).resize(function() {
    google.maps.event.trigger(map, "resize");
  });

  var warriorClass, warriorName, warriorColor;

  //indicates selection and grabs value
  $('form').on('click', '.warClass', function() {
    $('.warClass').removeClass('classSelect');
    $(this).addClass('classSelect');
    warriorClass = $(this).attr('id');
    console.log(warriorClass);
  });

  //returns image to normal size, but keeps selection
  $('form').on('click', '.warName', function() {
    $('.classSelect').css('transform', 'scale(1)');
  });

  //close modal on 'x' button click and assign input values, send to char tab
  $('form').on('click', '#modalClose', function(e) {
    e.preventDefault();
    //assign inputs
    warriorName = $('#warName').val();
    warriorColor = $('#warColor').val();
    console.log(warriorName);
    console.log(warriorColor);
    //check inputs are selected
    if (warriorClass === undefined || warriorName === undefined || warriorColor === undefined) {
      //error message if incomplete
      $('.incomplete').text('Complete your warrior');
      $('.incomplete').fadeIn(500).delay(2000).fadeOut(1000);
    } else {
      $('#charImage').append('<img src="images/' + warriorClass + '.jpeg"</img>');
      //hide modal if complete
      $('#charModal').hide();
    }
  });

  //close modal when clicking outside window
  // $(window).on('click', function(e) {
  //   if (e.target === modal) {
  //     $('#charModal').hide();
  //   }
  // });

  $('.nav').on('click', '.nav-tab', function() {
    $('.tabContent').hide();
    $('.nav-tab').removeClass('navSelect');
    $(this).addClass('navSelect');
    var tabContent = $(this).attr('data-tab');
    $('#' + tabContent).show();
  });

});
