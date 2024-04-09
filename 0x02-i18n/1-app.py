#!/usr/bin/env python3
"""
Module: 1-app.py

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


app.config.fromobject(Config)
babel = Babel(app)
