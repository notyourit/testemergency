// Data for contacts by category and location
let contactsData = {
  hospital: {
    manila: [{ name: "Manila Hospital", number: "123-4567" }],
    "quezon-city": [{ name: "Quezon City Hospital", number: "234-5678" }],
    pasig: [{ name: "Pasig Hospital", number: "345-6789" }],
  },
  firefighters: {
    manila: [{ name: "Manila Fire Department", number: "456-7890" }],
    "quezon-city": [{ name: "QC Fire Department", number: "567-8901" }],
    pasig: [{ name: "Pasig Fire Department", number: "678-9012" }],
  },
  police: {
    manila: [{ name: "Manila Police Station", number: "789-0123" }],
    "quezon-city": [{ name: "QC Police Station", number: "890-1234" }],
    pasig: [{ name: "Pasig Police Station", number: "901-2345" }],
  },
};

// Selected category
let selectedCategory = '';
let callTimer;
let timerInterval;

// Category selection function
function selectCategory(category) {
  selectedCategory = category;
  document.getElementById('location-select').classList.remove('hidden');
  document.getElementById('contacts').classList.add('hidden');
  document.getElementById('phone-screen').classList.add('hidden');
}

// Display contacts based on selected location
function showContacts() {
  let location = document.getElementById('location').value;
  let contacts = contactsData[selectedCategory][location];
  let contactList = document.getElementById('contact-list');

  if (contacts) {
    document.getElementById('contacts').classList.remove('hidden');
    document.getElementById('contact-title').textContent = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} in ${location.charAt(0).toUpperCase() + location.slice(1)}`;
    contactList.innerHTML = '';

    contacts.forEach(contact => {
      let listItem = document.createElement('li');
      listItem.innerHTML = `${contact.name}: ${contact.number} <button onclick="makeCall('${contact.name}', '${contact.number}')">Call</button>`;
      contactList.appendChild(listItem);
    });
  }
}

// Simulate calling a contact
function makeCall(name, number) {
  document.getElementById('phone-screen').classList.remove('hidden');
  document.getElementById('call-info').textContent = `${name} at ${number}...`;
document.getElementById('call-status').textContent = "Calling...";

  setTimeout(() => document.getElementById('call-status').textContent = "Connecting...", 2000);
  setTimeout(() => {
    document.getElementById('call-status').textContent = "Connected";
    document.getElementById('call-timer').classList.remove('hidden');
    startCallTimer();
    ringtone.pause();
    ringtone.currentTime = 0;
  }, 4000);

}

function startCallTimer() {
  let seconds = 0;
  callTimer = document.getElementById('call-timer');
  
  timerInterval = setInterval(() => {
    seconds++;
    let minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    let sec = (seconds % 60).toString().padStart(2, '0');
    callTimer.textContent = `${minutes}:${sec}`;
  }, 1000);
}

function startCallTimer() {
  let seconds = 0;
  callTimer = document.getElementById('call-timer');
  
  timerInterval = setInterval(() => {
    seconds++;
    let minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    let sec = (seconds % 60).toString().padStart(2, '0');
    callTimer.textContent = `${minutes}:${sec}`;
  }, 1000);
}


// End the call
function endCall() {
  clearInterval(timerInterval);
  document.getElementById('phone-screen').classList.add('hidden');
  document.getElementById('call-timer').classList.add('hidden');
  callTimer.textContent = "00:00";
}
