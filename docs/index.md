# Repostery

[![Build Status](https://travis-ci.org/squareflaw/repostery.svg?branch=master)](https://travis-ci.org/squareflaw/repostery)

Web app that displays data visualizations for github repositories. The fronted client is built with **ReactJS** and the backend API is built with **Django**. Check out the project's [documentation](http://squareflaw.github.io/repostery/).

# Prerequisites

⋅⋅* [Python](https://www.python.org/downloads/).
⋅⋅* [NodeJs](https://nodejs.org/en/download/).

# Local Development

```bash
virtualenv .venv

.venv/Scripts/Activate.ps1

pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py runserver

cd frontend

npm start
```

# Run tests

```bash
pytest --flake8
```

# Deployment

This project uses the CI/CD approach, a heroku instance can be linked directly to the github repository.
Any new push to the `origing/master` branch will trigger the travisCI test runner and if all tests pass successfuly
Heroku will deploy automaticaly