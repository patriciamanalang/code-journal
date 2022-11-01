var $photoUrl = document.querySelector('#photo-url');
var $img = document.querySelector('.img');

function updateImage(event) {
  if ($photoUrl.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else $img.setAttribute('src', event.target.value);
}
$photoUrl.addEventListener('input', updateImage);
