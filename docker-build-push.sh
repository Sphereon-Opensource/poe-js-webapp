docker build -t poe-webapp-js .
docker tag poe-webapp-js:latest 718258401100.dkr.ecr.eu-west-1.amazonaws.com/sphereon-sites/poe-webapp-js
docker login -u AWS -p $(aws ecr get-login-password --region eu-west-1) 718258401100.dkr.ecr.eu-west-1.amazonaws.com
docker push 718258401100.dkr.ecr.eu-west-1.amazonaws.com/sphereon-sites/poe-webapp-js
