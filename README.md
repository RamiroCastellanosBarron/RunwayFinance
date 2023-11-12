# Proyecto de Prácticas Profesionales Dirigidas PPD

## Equipo

- Ramiro Castellanos Barrón
- Hernán Patricio González Aguilera

## Beneficiario

Dr. Martin Lozano

## Nombre del proyecto

Riesgo de crédito de empresas públicas

# Code helpers

## Add new migration

```
/c/Projects/RunwayFinance

dotnet ef migrations add InitialCreate -p Infrastructure -s API -c DataContext -o Data/Migrations
```

## Compose docker container

-d = detach

```
docker compose up -d
```

## Remove docker container

```
docker compose down
```

git log --all --decorate --oneline --graph

ramiro@castellanosbarron.com `26429213e35973f5eb46a17e9a5bedf1a3bf4776`
ramiro.castellanos@udem.edu `17bfe3c07ce321045fa1d446b5cb79cf0f4cdaab`
rodrigo.cervantes.demo@gmail.com `a4b4af5a55d2488394cea111da075fb6bb14ceef`

ramiro.castellanos@udem.edu Alpha Vantage: `AQN19RN9Q6MAIH3X`
ramiro@castellanosbarron.com Alpha Vantage: `VFC89V2M7D9JC7S2`
hernan Alpha Vantage: `G62Y4QC0O494BPB1`
premium: `HHOSHHKRN2N05NEE`

# Deploy

sudo apt-get update -y
sudo apt-get install docker.io -y
sudo apt install docker-compose -y

docker build -f API/Dockerfile -t huaperros .

root@huaperros:~# ls
certs  dhparam  docker-compose.yml  html  snap  vhost
root@huaperros:~# rm -fR certs/ dhparam/ html/ vhost/

sudo apt update -y
sudo apt install ufw -y
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw allow 8081/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw status

docker-compose pull runwayfinance-api
docker-compose up -d --no-deps runwayfinance-api

docker-compose down -v
docker-compose up -d

docker-compose build runwayfinance-api && docker push ramirocaste/runwayfinance-api:latest

ssh -i .ssh/ssh-rsa.pem root@34.174.61.123

ng b && docker-compose build runwayfinance-api && docker push ramirocaste/runwayfinance-api:latest && ssh -i "/c/Projects/RunwayFinance/.ssh/ssh-rsa.pem" "root@34.174.61.123" "docker-compose pull runwayfinance-api && docker-compose up -d --no-deps runwayfinance-api"

http://34.174.61.123