/* This file is responsible for connecting starting a network speed test once
* the client clicks the button. Makes an ajax post request and gives confirmation
* to the client once ajax returns.
*/

// Attempts to add the user's current location and internet speed to database
function addSpeed() {
  toggleLoading();
  let network = document.getElementById("choose-network");
  let id = (network.options[network.selectedIndex]).value;

  checkForCurrentLocation(
    //call this fuction if we get location successfully
    (position) => {
      doAjaxPost('/add', {pos: position, network: id}, (response) => {
        //pass into giveConfirmation method
        toggleLoading();
        giveConfirmation(response.success, response.speed, '');
      });
    },
    // call this function if failed to get location
    () => {
      toggleLoading();
      giveConfirmation(false, 0, 'Unable to retrieve your location.')
    });
}

// closes the add speed popup, opens the confirmation popup and populates text accordingly
function giveConfirmation(successful, speed, errorMessage) {
  $('#add-speed-container').hide();
  $('#confirmation-container').show();
  if (successful) {
    $('#confirmation-title').text('Success!');
    $('#confirmation-text').text('You data has been added to our map. ' +
      'Your internet speed is currently ' + speed + ' Mbps. Thank you for your help!');
  } else {
    $('#confirmation-title').text('Failed to add your internet speed');
    $('#confirmation-text').text('Error: ' + errorMessage);
  }
}
