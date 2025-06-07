const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');

// open request modal
requestLink.addEventListener('click', () => {
    console.log("Opening request modal...");
    requestModal.classList.add('open');
});

// close request modal
requestModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('new-request')) {
        requestModal.classList.remove('open');
    }
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

