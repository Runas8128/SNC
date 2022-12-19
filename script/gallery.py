from flask import (
    Blueprint, flash, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from .db import get_db, row2dict

bp = Blueprint('gallery', __name__, url_prefix='/gallery')


@bp.route('/')
def index():
    db = get_db()
    posts = db.execute(
        'SELECT id, title, body, created, author'
        ' FROM gallery'
        ' ORDER BY created DESC'
    ).fetchall()
    return render_template('gallery/index.html', posts=posts)


@bp.route('/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        user_id = request.form['user_id']
        user_pw = request.form['user_pw']

        if not title:
            flash('제목을 입력해주세요.')
        elif not body:
            flash('본문을 입력해주세요.')
        elif not user_id:
            flash('ID를 입력해주세요.')
        elif not user_pw:
            flash('비밀번호를 입력해주세요.')
        else:
            db = get_db()
            cursor = db.execute(
                'INSERT INTO gallery (title, body, author, password)'
                ' VALUES (?, ?, ?, ?)',
                (title, body, user_id, user_pw)
            )
            db.commit()
            return redirect(url_for('gallery.page', post_id=cursor.lastrowid))

    return render_template('gallery/create.html')


def get_post(post_id):
    post = get_db().execute(
        'SELECT id, title, body, created, author, password'
        ' FROM gallery'
        ' WHERE id = ?',
        (post_id,)
    ).fetchone()

    if post is None:
        abort(404, f"Post id {post_id} doesn't exist.")

    return post


@bp.route('/<int:post_id>/delete', methods=('GET',))
def delete(post_id):
    get_post(post_id)
    db = get_db()
    db.execute('DELETE FROM post WHERE id = ?', (post_id,))
    db.commit()
    return redirect(url_for('gallery.index'))


@bp.route('/<int:post_id>/page', methods=('GET',))
def page(post_id):
    post = get_post(post_id)

    nextPost = get_db().execute(
        'SELECT id, title, body, created, author, password'
        ' FROM gallery'
        ' WHERE id > ?'
        ' ORDER BY id'
        ' LIMIT 1',
        (post_id,)
    ).fetchone()

    prevPost = get_db().execute(
        'SELECT id, title, body, created, author, password'
        ' FROM gallery'
        ' WHERE id < ?'
        ' ORDER BY id DESC'
        ' LIMIT 1',
        (post_id,)
    ).fetchone()

    return render_template(
        'gallery/page.html',
        post=post,
        next=row2dict(nextPost), prev=row2dict(prevPost),
    )


@bp.route('/<int:post_id>/check_delete', methods=('GET', 'POST'))
def check_delete(post_id):
    post = get_post(post_id)

    return render_template(
        'popup/check.html',
        post=post,
        fallback='gallery.page',
        callback='gallery.delete'
    )
