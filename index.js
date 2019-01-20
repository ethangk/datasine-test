// function loadScript(url, callback, type='text/javascript') {
//     // Adding the script tag to the head as suggested before
//     var head = document.head;
//     var script = document.createElement('script');

//     script.setAttribute("crossorigin", true)
//     script.type = type;
//     script.src = url;

//     // Then bind the event to the callback function.
//     // There are several events for cross browser compatibility.
//     script.onreadystatechange = callback;
//     script.onload = callback;

//     // Fire the loading
//     head.appendChild(script);
// }

// loadScript('https://unpkg.com/babel-standalone@6.24.0/babel.min.js', () => {
//     loadScript('/app.js', () => {
//     }, 'text/babel');
// });

function retrieveCustomers() {
    return fetch('/api').then(r => r.json()).then(customers => getCustomers(customers));
}

function getParameterByName(name) {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getCustomers(customers) {
    const gender = getParameterByName("gender");
    return gender ? customers.filter(c => c.gender === gender) : customers;
}

function customerRow(customer) {
    return React.createElement(
        'tr',
        { key: customer.id },
        [
            React.createElement('td', null, customer.first_name),
            React.createElement('td', null, customer.last_name),
            React.createElement('td', null, customer.age),
            React.createElement('td', null, customer.company),
            React.createElement('td', null, customer.profession),
            React.createElement('td', null, customer.date_of_birth),
            React.createElement('td', null, customer.gender),
            React.createElement('td', null, customer.dominant_traits[0].level + " " + customer.dominant_traits[0].primary_trait),
        ]
    )
}

function createTable(data = []) {
    return React.createElement(
        'table',
        null,
        data
    )
}

// // This is the entrypoint into the file
// function main() {
//     console.log('creating table');
//     const root = document.getElementById('root');
//     let customerCache = [];
//     let table = createTable([]);
//     retrieveCustomers().then(customers => {
//         console.log(`Fetched ${customers.length} customers`);
//         customerCache = customers.slice(0);
//         ReactDOM.render(table, root);
//     });
// }

// main();