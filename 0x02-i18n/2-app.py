#!/usr/bin/env python3
"""
Module: 2-app.py

This module contains a basic FLASK APP
"""


from flask import Flask, render_template
from flask_babel import Babel

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


@babel.localeselector
def get_locale():
    """
    Thie method determines the best match to supported languages
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """
    This method returns the htmls template
    """
    return render_template('2-index.html')


if __name__ == "__main__":
    app.run()
