function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function cb() {
    console.log('callback');
}

loadScript('https://unpkg.com/babel-standalone@6.15.0/babel.min.js', () => {
    console.log('time to start playing with React2');
});


function getParameterByName(name) {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getCustomers(customers) {
    const gender = getParameterByName("gender");
    return gender ? customers.filter(c => c.gender === gender) : customers;
}

function retrieveCustomers() {
    return fetch('/api').then(r => r.json()).then(customers => getCustomers(customers));
}
