const choreIcons = {
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
