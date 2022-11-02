var $photoUrl = document.querySelector('#photourl');
var $img = document.querySelector('.img');
var $newEntryForm = document.querySelector('#new-entry-form');

function updateImage(event) {
  if ($photoUrl.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else $img.setAttribute('src', event.target.value);
}
$photoUrl.addEventListener('input', updateImage);

function handleSubmit(event) {
  event.preventDefault();
  var dataEntry = {};
  dataEntry.title = $newEntryForm.elements.title.value;
  dataEntry.url = $newEntryForm.elements.photourl.value;
  dataEntry.notes = $newEntryForm.elements.notes.value;
  dataEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(dataEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
}
$newEntryForm.addEventListener('submit', handleSubmit);

// function renderJournalEntry(entry) {
//   var $li = document.createElement('li');
//   var $rowDiv = document.createElement('div');
//   $rowDiv.setAttribute('class', 'row');
//   $li.appendChild($rowDiv);
//   var $columnHalfDiv = document.createElement('div');
//   $columnHalfDiv.setAttribute('class', 'column-half');
//   $rowDiv.appendChild($columnHalfDiv);
//   var $imgDiv = document.createElement('div');
//   $columnHalfDiv.appendChild($imgDiv);
//   var $img = document.createElement('img');
//   $img.setAttribute('class', 'entry-image');
//   $img.src = entry.url;
//   $imgDiv.appendChild($img);
//   var $secondColumnHalfDiv = document.createElement('div');
//   $secondColumnHalfDiv.setAttribute('class', 'column-half');
//   $rowDiv.appendChild($secondColumnHalfDiv);
//   var $entryImageTextDiv = document.createElement('div');
//   $entryImageTextDiv.setAttribute('class', 'entry-image-text');
//   $secondColumnHalfDiv.appendChild($entryImageTextDiv);
//   var $h2 = document.createElement('h2');
//   $h2.textContent = entry.title;
//   $entryImageTextDiv.appendChild($h2);
//   var $p = document.createElement('p');
//   $p.textContent = entry.notes;
//   $entryImageTextDiv.appendChild($p);
//   return $li;
// }
