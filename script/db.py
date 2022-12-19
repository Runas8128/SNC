import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext


def row2dict(row):
    if row:
        return dict(zip(row.keys(), row))
    return {}


def init_app(app):
    """
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


def get_db():
    """Get sqlite3 connection for using database

    if db not in `g`(kind of cache?), make new connection and store it in `g`
    """
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row  # This enables to access columns by dict-style

    return g.db


def init_db():
    db = get_db()

    with current_app.open_resource('script/schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')


def close_db(e=None):
    """close sqlite3 connection safely"""
    db = g.pop('db', None)

    if db is not None:
        db.close()
