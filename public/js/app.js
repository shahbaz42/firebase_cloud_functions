const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');

// open request modal
requestLink.addEventListener('click', () => {
    requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-request')) {
        requestModal.classList.remove('open');
    }
});

// add a new request
requestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get region-specific function reference
    const functions = firebase.app().functions('asia-south1');

    // connect to local emulator
    functions.useEmulator('localhost', 5001);

    const addRequest = functions.httpsCallable('addRequest');
    addRequest({
        text: requestForm.request.value
    })
        .then(() => {
            requestForm.reset();
            requestForm.querySelector('.error').textContent = '';
            requestModal.classList.remove('open');
        })
        .catch(error => {
            requestForm.querySelector('.error').textContent = error.message;
        });
});

// say hello function call
const button = document.querySelector('.call');

button.addEventListener('click', () => {
    // get region-specific function reference
    const functions = firebase.app().functions('asia-south1');

    // connect to local emulator
    functions.useEmulator('localhost', 5001);

    const sayHello = functions.httpsCallable('sayHello');
    sayHello({
        name: "Shahbaz Ali"
    }).then((result) => {
        console.log(result.data);
        alert(result.data);
    }).catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error.message);
    });
});

// notification
const notification = document.querySelector('.notification');

const showNotification = (message) => {
  notification.textContent = message;
  notification.classList.add('active');
  setTimeout(() => {
    notification.classList.remove('active');
    notification.textContent = '';
  }, 4000);
};

