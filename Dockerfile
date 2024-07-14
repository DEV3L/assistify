FROM python:3.12-slim

WORKDIR /app

COPY . /app

RUN pip install hatch
RUN hatch env create

EXPOSE 8000

# Define environment variable
ENV NAME FastChatAPI

CMD ["hatch", "run", "start-app"]