$(document).ready(() => {
  addChoreIcons();
});

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
