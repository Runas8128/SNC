from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from .auth import login_required
from script.db import get_db

bp = Blueprint('blog', __name__)

@bp.route('/')
def index():
    db = get_db()
    posts = db.execute(
        'SELECT id, title, content, author, PW, created'
        ' FROM post'
        ' ORDER BY created DESC'
    ).fetchall()
    return render_template('blog/index.html', posts=posts)

@bp.route('/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        ID = request.form['ID']
        print(f'{ID = }')
        PW = request.form['PW']
        print(f'{PW = }')

        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'INSERT INTO post (title, content, author, PW)'
                ' VALUES (?, ?, ?, ?)',
                (title, content, ID, PW)
            )
            db.commit()
            return redirect(url_for('blog.index'))

    return render_template('blog/create.html')

def get_post(id):
    post = get_db().execute(
        'SELECT id, title, content, author, PW, created'
        ' FROM post'
        ' WHERE id = ?',
        (id,)
    ).fetchone()

    if post is None:
        abort(404, f"Post id {id} doesn't exist.")

    return post

@bp.route('/<int:id>/update', methods=('GET', 'POST'))
def update(id):
    post = get_post(id)

    if request.method == 'POST':
        print(request.form['value'])
        content = request.form['content']
        PW = request.form['PW']

        error = None

        if post['PW'] != PW:
            error = 'Wrong Password'
        
        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE post SET content = ?'
                ' WHERE id = ?',
                (content, id)
            )
            db.commit()
            return redirect(url_for('blog.index'))

    return render_template('blog/update.html', post=post)

@bp.route('/<int:id>/delete', methods=('POST',))
def delete(id):
    post = get_post(id)
    PW = request.form['PW']

    error = None

    if post['PW'] != PW:
        error = 'Wrong Password'

    if error is not None:
        flash(error)
    else:
        db = get_db()
        db.execute('DELETE FROM post WHERE id = ?', (id,))
        db.commit()
    return redirect(url_for('blog.index'))
