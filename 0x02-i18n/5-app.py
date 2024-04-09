#!/usr/bin/env python3
"""
Module: 4-app.py

This module contains a basic FLASK APP
"""


from flask import Flask, render_template, g, request
from flask_babel import Babel, gettext

app = Flask(__name__)


users = {
        1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
        2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
        3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
        4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
        }


def get_user(user_id):
    """
    This method reurns a user dictionary or None if ID
    canno be found or of login_as was not passed
    """
    return users.get(user_id)


@app.before_request
def before_request():
    """
    This method used get_user to find a user if any and set it
    as a global on flask.g.user
    """
    user_id = request.args.get('login_as')
    g.user = get_user(int(user_id)) if user_id else None


@app.route('/')
def index():
    """
    This method returns the htmls template
    """
    return render_template('5-index.html')


if __name__ == "__main__":
    app.run()
