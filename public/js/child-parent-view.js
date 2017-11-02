
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
  $('.chore-edit').click(function(ev){
    let choreId = $(ev.target).attr('choreid');
    let row = $(ev.target).parent().parent();
    let choreTitle =row.find('.chore-title').text();
    let choreDescription = row.find('.chore-description').text();
    let choreValue= row.find('.chore-value').text();
    console.log(choreTitle);

    $('#form-edit').attr('action','/family/chores/edit/' + choreId);
    $('#edit-title').attr('value', choreTitle)
    $('#edit-description').attr('value', choreDescription)
    $('#edit-value').attr('value', choreValue)

  })
});
