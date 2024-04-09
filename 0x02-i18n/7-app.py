#!/usr/bin/env python3
"""
Module: 7-app.py

This module contains a basic FLASK APP
"""


import pytz
from flask import Flask, render_template, request, g
from flask_babel import Babel, gettext

app = Flask(__name__)


@babel.timezoneselector
def get_timezone():
    """
    Retrieve timezone from URL parameters
    """
    url_tz = requests.args.get('timezone')
    if url_tz:
        try:
            pytz.timezone(url_tz)
            return url_tz
        except pytz.excetions.UnknownTimeZoneError:
            pass

    user = getattr(g, 'user', None)
    if user and 'timezone' in user:
        try:
            pytz.timezone(user['timezone'])
            return user['timezone']
        except pytz.exceptions.UnknownTimeZoneError:
            pass

    return 'UTC'


@app.route('/')
def index():
    """
    This method returns the htmls template
    """
    return render_template('7-index.html')


if __name__ == "__main__":
    app.run()
