How to run the app

1. Build API (backend) and APP (frontend) containers

   - APP: docker build -t mern_app .
   - API: docker build -f DockerfileAPI -t mern_api .

2. Run stack with:
   docker-compose up -d
