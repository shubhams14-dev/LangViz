FROM python:3.10-slim

WORKDIR /app

# Install R and necessary libraries
RUN apt-get update && \
    apt-get install -y r-base libcurl4-openssl-dev libssl-dev libxml2-dev && \
    apt-get clean

# Copy project files
COPY . .

# Install Python requirements
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Install R Libraries
RUN R -e "install.packages(c('ggplot2', 'plot3D', 'plotly'), repos='http://cran.rstudio.com/')"

CMD ["python", "app.py"]
