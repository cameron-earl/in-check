$(document).ready(() => {
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
  $('.modal').modal();
  $('.chore-edit').click(function(ev) {
    let choreId = $(ev.target).attr('choreid');
    let row = $(ev.target).parent().parent();
    let choreTitle = row.find('.chore-title').text();
    let choreDescription = row.find('.chore-description').text();
    let choreValue = row.find('.chore-value').text();
    console.log(choreTitle);

    $('#form-edit').attr('action', '/family/chores/edit/' + choreId);
    $('#edit-title').attr('value', choreTitle)
    $('#edit-description').attr('value', choreDescription)
    $('#edit-value').attr('value', choreValue)

  })
  $('input.autocomplete').autocomplete({
    data: {
      "Dust surfaces": '/images/icons/duster.svg',
      "Sweep": '/images/icons/sweeper.svg',
      "Vacuum": '/images/icons/vacuum.svg',
      "Mop": '/images/icons/mop.svg',
      "Wash Dishes": '/images/icons.svg',
      "Clean room": '/images/icons/cleanbedroom.svg',
      "Put things in place": '/images/icons/putthingsinplace.svg',
      "Clean windows": '/images/icons/cleanwindows.svg',
      "Clean mirrors": '/images/icons/cleanmirrors.svg',
      "Organize closet": '/images/icons/organizecloset.svg',
      "Clean blinds": '/images/icons/cleanblinds.svg',
      "Clean curtains": '/images/icons/cleancurtains.svg',
      "Clean TV screens": '/images/icons/cleantv.svg',
      "Fold clothes": '/images/icons/foldclothes.svg',
      "Hang Clothes": '/images/icons/hangclothes.svg',
      "Load Washer": '/images/icons/loadwaher.svg',
      "Unload Washer": '/images/icons/unloadwasher.svg',
      "Put in Dryer": '/images/icons/dryer.svg',
      "Prepare table": '/images/icons/settable.svg',
      "Take trash out": '/images/icons/trash.svg',
      "Clean kitchen counter": '/images/icons/cleankitchen.svg',
      "Load Dishwasher": '/images/icons/loaddishwasher.svg',
      "Unload Dishwasher": '/images/icons/unloaddishwasher.svg',
      "Walk pet": '/images/icons/walkpet.svg',
      "Feed pet": '/images/icons/feedpet.svg',
      "Shower pet": '/images/icons/showerpet.svg',
      "Water plants": '/images/icons/waterplants.svg',
      "Mow the lawn": '/images/icons/mow.svg',
      "Pull weeds": '/images/icons/pullweeds.svg',
      "Wash car": '/images/icons/washcar.svg',
      "Homework": '/images/icons/homework.svg'
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
});
