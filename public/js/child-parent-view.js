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
