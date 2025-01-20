@echo off
start cmd /k "cd api && venv\Scripts\activate && python app.py"
start cmd /k "cd client && npm start"
