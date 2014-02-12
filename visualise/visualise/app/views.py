from flask import render_template, redirect, url_for, request
from app import app


@app.route('/visualise', methods=['GET', 'POST'])
def visualise():
    index = "RDSB"
    if request.method == 'POST':
        index = request.form['index']
    return render_template('visualise.html',
                           index=index)


@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    return redirect(url_for('visualise'))
