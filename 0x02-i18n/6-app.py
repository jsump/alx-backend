#!/usr/bin/env python3
"""
Module: 6-app.py

This module contains a basic FLASK APP
"""


from flask import Flask, render_template, request
from flask_babel import Babel, gettext

app = Flask(__name__)


def get_locale():
    """
    This method gets locale from the URL parameters
    """
    url_locale = request.args.get('locale')
    if url_locale:
        return url_locale

    if hasattr(request, 'user') and request.user and 'locale' in request.user:
        user_locale = request.user['locale']
        if user.locale:
            return user_locale

    header_locale = request.headers.get('Accept-language')
    if header_locale:
        return header_locale.split(',')[0]

    return 'en'


@app.route('/')
def index():
    """
    This method returns the htmls template
    """
    return render_template('6-index.html')


if __name__ == "__main__":
    app.run()
