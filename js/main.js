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
