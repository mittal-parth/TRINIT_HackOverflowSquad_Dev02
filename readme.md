# TRINIT_HackOverflowSquad_Dev02 - Bug Tracker System
PPT- https://docs.google.com/presentation/d/1RiBjRxTcjMEcbi8Sdi8CqayNF9EpRYpMZAKCs2sIYlo/edit#slide=id.p
Demo - https://drive.google.com/file/d/1grRKmIVe_TMKpHQ1ZIUTmAOCt5HNYX9t/view?usp=sharing

<br>
<h2>Setting up the project:</h2>
<br>
<h3>Installing and using a Virtual Environment</h3>

`pip install virtualenvwrapper-win`<br>
`mkvirtualenv test` &nbsp; _test = name of virtual env_

<br>

<h3>Install required packages:</h3>

`pip install -r requirements.txt`<br>

<h3>To run project:</h3>

_After ensuring that we are in a virtual environment (If not, use `workon test`)_

`python manage.py makemigrations` <br>
`python manage.py migrate` <br>
`python manage.py runserver`<br>
<p>Visit development server http://127.0.0.1:8000/ </p>
<br>

<h3>Admin Site:</h3>

http://127.0.0.1:8000/admin

<br>