FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
# Note: In development with docker-compose, we mount the volume, 
# but this is good for a standalone build.
COPY src/ .

CMD ["python", "server.py"]
