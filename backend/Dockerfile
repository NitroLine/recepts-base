FROM python:3.10-slim-buster
ADD requirements.txt .
RUN pip install -r requirements.txt
COPY src/ /var/recieptbase/src/
CMD [ "python3", "/var/recieptbase/src/main.py"]
