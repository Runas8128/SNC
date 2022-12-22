from flask import (
    Blueprint, flash, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from math import ceil

from .db import get_db, row2dict

bp = Blueprint('blog', __name__, url_prefix='/blog')


@bp.route('/')
def index():
    db = get_db()
    posts = db.execute(
        'SELECT id, title, body, created, author'
        ' FROM post'
        ' ORDER BY id DESC'
    ).fetchall()

    page_id = int(request.args.get('page_id', '0'))
    starting_index = 25 * page_id
    return render_template(
        'blog/index.html',
        page_id=page_id,
        page_count=ceil(len(posts) / 25),
        posts=posts[starting_index:starting_index+25]
    )


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
                'INSERT INTO post (title, body, author, password)'
                ' VALUES (?, ?, ?, ?)',
                (title, body, user_id, user_pw)
            )
            db.commit()
            return redirect(url_for('blog.page', post_id=cursor.lastrowid))

    return render_template('blog/create.html')


def get_post(post_id):
    post = get_db().execute(
        'SELECT id, title, body, created, author, password'
        ' FROM post'
        ' WHERE id = ?',
        (post_id,)
    ).fetchone()

    if post is None:
        abort(404, f"Post id {post_id} doesn't exist.")

    return post


@bp.route('/<int:post_id>/update', methods=('GET', 'POST'))
def update(post_id):
    if request.method == 'POST':
        title = request.form['title']
        body = request.form['body']
        error = None

        if not title:
            error = 'Title is required.'

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                'UPDATE post SET title = ?, body = ?'
                ' WHERE id = ?',
                (title, body, post_id)
            )
            db.commit()
            return redirect(url_for('blog.page', post_id=post_id))

    post = get_post(post_id)
    return render_template('blog/update.html', post=post)


@bp.route('/<int:post_id>/delete', methods=('GET',))
def delete(post_id):
    get_post(post_id)
    db = get_db()
    db.execute('DELETE FROM post WHERE id = ?', (post_id,))
    db.commit()
    return redirect(url_for('blog.index'))


@bp.route('/<int:post_id>/page', methods=('GET',))
def page(post_id):
    post = get_post(post_id)

    nextPost = get_db().execute(
        'SELECT id, title, body, created, author, password'
        ' FROM post'
        ' WHERE id > ?'
        ' ORDER BY id'
        ' LIMIT 1',
        (post_id,)
    ).fetchone()

    prevPost = get_db().execute(
        'SELECT id, title, body, created, author, password'
        ' FROM post'
        ' WHERE id < ?'
        ' ORDER BY id DESC'
        ' LIMIT 1',
        (post_id,)
    ).fetchone()

    return render_template(
        'blog/page.html',
        post=post,
        next=row2dict(nextPost), prev=row2dict(prevPost),
    )


@bp.route('/<int:post_id>/check_edit', methods=('GET', ))
def check_edit(post_id):
    post = get_post(post_id)

    return render_template(
        'popup/check.html',
        post=post,
        fallback='blog.page',
        callback='blog.update'
    )


@bp.route('/<int:post_id>/check_delete', methods=('GET', 'POST'))
def check_delete(post_id):
    post = get_post(post_id)

    return render_template(
        'popup/check.html',
        post=post,
        fallback='blog.page',
        callback='blog.delete'
    )
