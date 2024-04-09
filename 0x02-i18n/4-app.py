#!/usr/bin/env python3
"""
Module: 3-app.py

This module contains a basic FLASK APP
"""


from flask import Flask, render_template
from flask_babel import Babel, gettext

app = Flask(__name__)


class Config:
    """
    This class contains language attributes
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)
babel = Babel(app)

app.config['LANGUAGES'] = ["en", "fr"]


supported_locales = ['fr', 'en']
@babel.localeselector
def get_locale():
    """
    Thie method determines the best match to supported languages
    """
    if 'locale' in request.args and request.args['locale'] in supported_locales:
        return request.args['locale']
    else:
        return app.config['BABEL_DEFAULT_LOCALE']


@app.route('/')
def index():
    """
    This method returns the htmls template
    """
    locale = get_locale()
    return f'Current locale: {locale}'


if __name__ == "__main__":
    app.run()
