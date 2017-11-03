const choreIcons = {
  "Shovel Snow": '/images/icons/shovel.svg',
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
};

const autoCompleteObj = {
  data: choreIcons,
  limit: 20
};

const datePickerObj = {
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 15, // Creates a dropdown of 15 years to control year,
  today: 'Today',
  clear: 'Clear',
  close: 'Ok',
  closeOnSelect: false // Close upon selecting a date,
};

$(document).ready(() => {
  $('.datepicker').pickadate(datePickerObj);
  $('input.autocomplete').autocomplete(autoCompleteObj);
  $('.modal').modal();
  $('select').material_select();

  $('.chore-edit').click(prepareChoreEditForm);

  $('.chore-delete').click(prepareChoreDeleteForm);

  $('.nav-wrapper > ul').prepend('<li><a href="/family" class="black-text">BACK</a></li>');

  addChoreIcons();
});

function prepareChoreEditForm(ev) {
  let btn = $(ev.target).parent();
  let choreId = btn.attr('choreid');
  let row = btn.parent().parent();
  let choreTitle = row.find('.chore-title').text();
  let choreDescription = row.find('.chore-description').text();
  let choreValue = row.find('.chore-value').text();

  $('#form-edit').attr('action', `/family/${childId}/chores/edit/${choreId}`);
  $('#edit-title').attr('value', choreTitle);
  $('#edit-description').attr('value', choreDescription);
  $('#edit-value').attr('value', choreValue);
}

function prepareChoreDeleteForm(ev) {
  let btn = $(ev.target).parent()
  let choreId = btn.attr('choreid');
  let row = btn.parent().parent();
  let choreTitle = row.find('.chore-title').text();
  let confirmDeleteBtn = $('#confirm-delete-btn');

  confirmDeleteBtn.text(`Delete "${choreTitle}"`);
  confirmDeleteBtn.attr('href',`/family/${childId}/chores/delete/${choreId}`);
}

function addChoreIcons() {
  let choreTitles = $('td.chore-title');
  for (let titleElement of choreTitles) {
    let title = $(titleElement).text();
    if (choreIcons[title]) {
      let iconCell = $(titleElement).parent().find('td.chore-icon');
      iconCell.append(`<img src="${choreIcons[title]}">`);
    }
  }
}
