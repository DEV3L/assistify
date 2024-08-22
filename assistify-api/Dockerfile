FROM python:3.12-slim

WORKDIR /app
COPY . /app

RUN apt-get update && apt-get install -y libssl-dev
RUN pip install hatch
RUN hatch env create

EXPOSE 8000

# Define environment variable
ENV NAME AssistifyAPI

CMD ["hatch", "run", "start-app"]