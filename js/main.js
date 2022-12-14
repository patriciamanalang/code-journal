var $photoUrl = document.querySelector('#photourl');
var $img = document.querySelector('.img');
var $newEntryForm = document.querySelector('#new-entry-form');
var $entriesView = document.querySelector('.entries');
var $formView = document.querySelector('.form');
var $ul = document.querySelector('ul');
var $entriesHeader = document.querySelector('.entries-page-header');
var $newButton = document.querySelector('.new-btn');
var $entriesList = document.querySelector('#entries-list');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $newEntry = document.querySelector('.new-entry');
var $delete = document.querySelector('.delete');
var $modalBackground = document.querySelector('.container-modal');
var $cancelButton = document.querySelector('.cancel-btn');
var $entriesPlaceholder = document.querySelector('.row entries-placeholder');
var $confirmButton = document.querySelector('.confirm-btn');

function updateImage(event) {
  if ($photoUrl.value === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else $img.setAttribute('src', event.target.value);
}

function newButtonHandler(event) {
  data.view = 'entry-form';
  $formView.className = 'view data-view';
  $entriesView.className = 'hidden entries container';
}

function entriesHeader(event) {
  $entriesView.className = 'entries container';
  $formView.className = 'view data-view hidden';
}

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
  data.view = 'entries';
  $entriesView.className = 'entries container';
  $formView.className = 'view data-view hidden';
  $ul.prepend(renderEntry(dataEntry));
  $newEntryForm.reset();
}

/*
<ul>
  <li>
    <div class="row">
      <div class="column-half">
        <div>
          <img class="entry-image" src="images/placeholder-image-square.jpg">
        </div>
      </div>
      <div class="column-half">
        <div class="entry-image-text">
          <h2>Ada Lovelace</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dolorem ratione vel quisquam labore aperiam nesciunt asperiores totam, officiis eum neque nam. Voluptas ipsam magnam sequi expedita porro quas fugiat.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iste illo repudiandae, dolor vero quaerat a eius odio, dolorum veritatis voluptas corrupti eaque, vitae facere asperiores adipisci cupiditate! Quis, at.</p>
        </div>
      </div>
    </div>
  </li>
</ul>
*/

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);
  var $rowDiv = document.createElement('div');
  $rowDiv.setAttribute('class', 'row');
  $li.appendChild($rowDiv);
  var $columnHalfDiv = document.createElement('div');
  $columnHalfDiv.setAttribute('class', 'column-half');
  $rowDiv.appendChild($columnHalfDiv);
  var $imgDiv = document.createElement('div');
  $columnHalfDiv.appendChild($imgDiv);
  var $img = document.createElement('img');
  $img.setAttribute('class', 'entry-image');
  $img.src = entry.url;
  $imgDiv.appendChild($img);
  var $secondColumnHalfDiv = document.createElement('div');
  $secondColumnHalfDiv.setAttribute('class', 'column-half');
  $rowDiv.appendChild($secondColumnHalfDiv);
  var $entryImageTextDiv = document.createElement('div');
  $entryImageTextDiv.setAttribute('class', 'entry-image-text');
  $secondColumnHalfDiv.appendChild($entryImageTextDiv);
  var $entryTitlePenDiv = document.createElement('div');
  $entryTitlePenDiv.setAttribute('class', 'entry-title-pen');
  $entryImageTextDiv.appendChild($entryTitlePenDiv);
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $entryTitlePenDiv.appendChild($h2);
  var $penIcon = document.createElement('i');
  $penIcon.setAttribute('class', 'edit-button fa fa-pencil');
  $entryTitlePenDiv.appendChild($penIcon);
  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $entryImageTextDiv.appendChild($p);
  return $li;
}

function handleDOMContentLoaded(event) {

  var $ul = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    var appendUl = renderEntry(data.entries[i]);
    $ul.appendChild(appendUl);
  }

  var $dataView = data.view;
  if ($dataView === 'entry-form') {
    $formView.className = 'view data-view';
    $entriesView.className = 'entries container hidden';
  } else if ($dataView === 'entries') {
    $entriesView.className = 'entries container';
    $formView.className = 'view data-view hidden';
  }

}

function handleEdit(event) {
  if (event.target.matches('.edit-button')) {
    $formView.className = 'view data-view';
    $entriesView.className = 'hidden entries container';
    $newEntry.textContent = 'Edit Entry';
    if (event.target.tagName === 'I') {
      var closestItem = event.target.closest('li');
    }
    var dataEntryId = closestItem.getAttribute('data-entry-id');
    dataEntryId = parseInt(dataEntryId);

    for (var i = 0; i < data.entries.length; i++) {
      if (dataEntryId === data.entries[i].entryId) {
        data.editing = data.entries[i];
      }
      if (data.editing !== null) {
        $title.value = data.editing.title;
        $photoUrl.value = data.editing.url;
        $notes.value = data.editing.notes;
        $img.setAttribute('src', data.editing.url);
      }
    }
    $delete.className = 'delete inline';
  }
}

function handleDeleteClick(event) {
  $modalBackground.className = 'container-modal';
}

function handleCancelButtonClick(event) {
  $modalBackground.className = 'container-modal hidden';
}

function handleConfirmButtonClick(event) {
  var $li = document.querySelectorAll('li');

  for (var b = 0; b < data.entries.length; b++) {
    if (data.editing.entryId === data.entries[b].entryId) {
      data.entries.splice(b, 1);
      break;
    }
  }
  for (var i = 0; i < $li.length; i++) {
    var liDataEntryId = $li[i].getAttribute('data-entry-id');
    liDataEntryId = parseInt(liDataEntryId);
    if (liDataEntryId === data.editing.entryId) {
      $li[i].remove();
    }
  }
  data.editing = null;
  $entriesView.className = 'entries container';
  $formView.className = 'view data-view hidden';
  if (data.entries.length === 0) {
    $entriesPlaceholder.className = 'row entries-placeholder';
  }
  $modalBackground.className = 'container-modal hidden';
}

$confirmButton.addEventListener('click', handleConfirmButtonClick);
$photoUrl.addEventListener('input', updateImage);
$newButton.addEventListener('click', newButtonHandler);
$entriesHeader.addEventListener('click', entriesHeader);
$newEntryForm.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
$entriesList.addEventListener('click', handleEdit);
$delete.addEventListener('click', handleDeleteClick);
$cancelButton.addEventListener('click', handleCancelButtonClick);
