import os

from flask import Flask, render_template


def create_app(test_config=None):
    # create and configure the app
    app = Flask("Songnae Community", instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def root():
        return render_template('index.html')

    app.add_url_rule('/', endpoint='index')

    from script import db
    db.init_app(app)

    from script import blog
    app.register_blueprint(blog.bp)

    from script import gallery
    app.register_blueprint(gallery.bp)

    return app
