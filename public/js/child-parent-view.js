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

    $('#form-edit').attr('action', '/family/chores/edit/' + choreId);
    $('#edit-title').attr('value', choreTitle)
    $('#edit-description').attr('value', choreDescription)
    $('#edit-value').attr('value', choreValue)

  });

  $('.chore-delete').click(function(ev) {
    let choreId = $(ev.target).attr('choreid');
    let row = $(ev.target).parent().parent();
    let choreTitle = row.find('.chore-title').text();
    let confirmDeleteBtn = $('#confirm-delete-btn');

    confirmDeleteBtn.text(`Delete "${choreTitle}"`);
    confirmDeleteBtn.attr('href','/family/chores/delete/' + choreId);
  });

  $('input.autocomplete').autocomplete({
    data: {
      "Dust Surfaces": '/images/icons/duster.svg',
      "Sweep": '/images/icons/sweeper.svg',
      "Vacuum": '/images/icons/vacuum.svg',
      "Mop": '/images/icons/mop.svg',
      "Wash Dishes": '/images/icons/washdishes.svg',
      "Clean Bedroom": '/images/icons/cleanbedroom.svg',
      "Put Things in Place": '/images/icons/putthingsinplace.svg',
      "Clean Windows": '/images/icons/cleanwindows.svg',
      "Clean Mirrors": '/images/icons/cleanmirrors.svg',
      "Organize Closet": '/images/icons/organizecloset.svg',
      "Clean Blinds": '/images/icons/cleanblinds.svg',
      "Clean Curtains": '/images/icons/cleancurtains.svg',
      "Clean TV Screens": '/images/icons/cleantv.svg',
      "Fold Clothes": '/images/icons/foldclothes.svg',
      "Hang Clothes": '/images/icons/hangclothes.svg',
      "Load Washer": '/images/icons/loadwasher.svg',
      "Unload Washer": '/images/icons/unloadwasher.svg',
      "Set Table": '/images/icons/settable.svg',
      "Take Trash Out": '/images/icons/trash.svg',
      "Clean Kitchen": '/images/icons/cleankitchen.svg',
      "Load Dishwasher": '/images/icons/loaddishwasher.svg',
      "Unload Dishwasher": '/images/icons/unloaddishwasher.svg',
      "Walk Pet": '/images/icons/walkpet.svg',
      "Feed Pet": '/images/icons/feedpet.svg',
      "Shower Pet": '/images/icons/showerpet.svg',
      "Water Plants": '/images/icons/waterplants.svg',
      "Mow the Lawn": '/images/icons/mow.svg',
      "Pull Weeds": '/images/icons/pullweeds.svg',
      "Wash Car": '/images/icons/washcar.svg',
      "Homework": '/images/icons/homework.svg'
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
});
