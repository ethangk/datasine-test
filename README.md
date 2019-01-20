
# Pecan
Pecan is toy web application for browsing customer data.  

## Installation
Pecan is built using Python 3. You will need to install the Flask framework:

```
pip3 install flask
```

## Starting the app
Run Pecan like this:

```
FLASK_APP=main.py flask run
```

You can then access the web front end at [http://localhost:5000/]() and the API endpoint at [http://localhost:5000/api]().


# Submission
## Features Implemented
	- Filtering Based on gender
	- Sorting based on first and last name
	- Filtering based on company and profession
		- The contents of those boxes is generated from the list of  professions and companies found in the customers list and cached until the customer list changes
	- A small amount of styling using Bootstrap

## Technical decisions
The instructions encouraged against editing the `index.htm` file. I originally attempted to inject babel and the `app.js` file into the `index.hml` DOM after the page has loaded. I've left the code to do this in the `index.js` file, but also placed it below. It's based on a script found [here](http://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file).

```
function  loadScript(url, callback, type='text/javascript') {
	// Adding the script tag to the head as suggested before
	var  head  =  document.head;
	var  script  =  document.createElement('script');

	script.setAttribute("crossorigin", true)
	script.type  =  type;
	script.src  =  url;

	// Then bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange  =  callback;
	script.onload  =  callback;

	// Fire the loading
	head.appendChild(script);
}

  

loadScript('https://unpkg.com/babel-standalone@6.24.0/babel.min.js', () => {
	loadScript('/app.js', () => {
	}, 'text/babel');
});
```

I was having some trouble getting this working, so decided to just manually add the two scripts to the `index.htm`, as it was distracting me from actually building out the coding test.

I opted to add Babel as it allows JSX to be included in the project, which I feel creates more easily understandable code.

Given more time, I would have added Redux and a build step, which would have let me break out some of the state logic from the components and split the code into a single file per class. Standalone Babel doesn't support class imports.

The `app.js` file overwrites the original `root` DOM object, with the `table` and `customerRow` being rewritten as JSX components.

Some of the professions are empty but filtering for empty professions currently isn't supported.

My ideal UI would have been something like [this](https://github.com/olahol/react-tagsinput#demo) for filtering based on 'tags', but it would have meant additional files being added to `index.htm`.

I've omitted tests in this project due to time limitations. My preference for writing React components is Stateless functional components, with state being handled by a library such as Redux. Pure functional components are extremely easy to test, as internal state doesn't need to be modified and considered when testing. I'd use Enzyme to write tests for the components.