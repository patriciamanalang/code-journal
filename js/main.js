var $photoUrl = document.querySelector('#photo-url');
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
  dataEntry.image = $newEntryForm.elements.image.value;
  dataEntry.notes = $newEntryForm.elements.notes.value;
  $newEntryForm.reset();
}

$newEntryForm.addEventListener('submit', handleSubmit);
