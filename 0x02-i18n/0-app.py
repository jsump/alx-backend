#!/usr/bin/env python3
"""
Module: 0-app.py

This module contains a basic FLASK APP
"""


from flask import Flask, render_template

app = Flask(__app__)


@app.route('/')
def index():
    return render_template('0-index.html')


if __name__ == "__main__":
    app.run()
