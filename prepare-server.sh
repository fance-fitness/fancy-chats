
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
apt-get install npm
git config credential.helper store

sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
sudo apt install docker-ce


docker run -d --publish=7474:7474 --publish=7687:7687 -v=/root/lexy/lexy-database:/data neo4j


sudo apt-get update
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
apt install certbot

sudo certbot certonly --standalone --preferred-challenges http --cert-name server-certificate -d dance-planner.com
npm run pm2-start


mkdir the-thing
mkdir info
cd info
nano Spengi.json
nano src/default-name.ts
cd ..
nano dynamic-index.html

cd homo-digitalis-server
git pull
tsc
pm2 restart homo-digitalis-server