$(document).ready(function() {
  console.log('Insanity, check.');

  var modal = document.getElementById('welcomeModal');
  var span = document.getElementById('modalClose');

  //open modal on page load
  $(window).load(function() {
    $('#welcomeModal').show();
    //sets character screen as default view
    $('#map').show();
    google.maps.event.trigger(map, 'resize');
  });

  $(window).resize(function() {
    google.maps.event.trigger(map, 'resize');
  });

  var warriorClass, warriorName, warriorColor;

  //indicates selection and grabs value
  $('form').on('click', '.warClass', function() {
    $('.warClass').removeClass('classSelect');
    $(this).addClass('classSelect');
    warriorClass = $(this).attr('id');
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
    //check inputs are selected
    if (warriorClass !== undefined && warriorName !== null && warriorColor !== null) {
      $('#charImage').append('<img src="images/' + warriorClass + '.jpeg"</img>');
      //hide modal if complete
      $('#charModal').hide();
      $('#tavCombatModal').fadeIn(1);

      $('.intense').delay(10000).fadeOut(1000);
      $('.fatality').hide().delay(11000).fadeIn(1).delay(10000);
    } else {
      //error message if incomplete
      $('.incomplete').text('Complete your warrior');
      $('.incomplete').fadeIn(500).delay(2000).fadeOut(1000);
    }
  });

  $('.fatality').on('click', function(e) {
    e.preventDefault();
    $('#tavCombatModal').hide();
  });

  $('#tavern').on('click', '.tavBtn', function() {
    $(this).append('<div class="questAccept">I\'ll check it out!</div>');
  });

  // //Fight animation
  // $('#ryu').append('<img src="http://i.imgur.com/90Mmdcm.png">');
  //
  // // change the img src on hover to the animated gif of Ryu
  // // url: http://i.imgur.com/nTj3Fxx.gif
  // // when the user 'unhovers' change back to static Ryu
  // $('#ryu > img').hover(function() {
  //   this.src = 'http://i.imgur.com/nTj3Fxx.gif';
  // }, function() {
  //   this.src = 'http://i.imgur.com/90Mmdcm.png';
  // });
  //
  // // when a user clicks, change Ryu's stance
  // // url: http://i.imgur.com/Rfj0a80.png
  // $('#ryu > img').on('mousedown', function() {
  //   this.src = 'http://i.imgur.com/Rfj0a80.png';
  // });
  //
  // // add the Hadouken!
  // // url: http://i.imgur.com/oTyQRvX.gif
  // $('#ryu > img').on('mousedown', function() {
  //   $('#ryu').append('<img class="demo-hadouken" src="http://i.imgur.com/oTyQRvX.gif">');
  // });
  //
  // // animate that Hadouken
  // $('#ryu > img').on('mousedown', function() {
  //   $('.demo-hadouken').animate({
  //     'margin-left': '600px'
  //   }, 4000, 'swing', function() {
  //     this.remove();
  //   });
  // });
  //
  // // let Ryu relax
  // // url: http://i.imgur.com/90Mmdcm.png
  // $('#ryu > img').on('mouseup', function() {
  //   this.src = 'http://i.imgur.com/90Mmdcm.png';
  // });

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
