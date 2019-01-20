import json

from flask import Flask, jsonify, request
app = Flask(__name__)

customers = json.load(open('customers.json', 'r'))
html = open('index.html', 'r').read()
js_app = open('index.js', 'r').read()
app_js = open('app.js', 'r').read()


@app.route('/')
def root():
    return html


@app.route("/api")
def get_customers():
    if request.args.get('gender'):
        filtered_customers = [c for c in customers if c['gender'] == request.args['gender']]
    else:
        filtered_customers = customers
    return jsonify(filtered_customers)


@app.route('/index.js')
def webapp():
    return js_app

@app.route('/app.js')
def appjs():
    return app_js
