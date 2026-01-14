# for deploying this full stack on VM

# 1. Ssh into vm, secure it & ssl setup
# refer: https://docs.chaicode.com/youtube/chai-aur-devops/setup-vpc/

# 2. install deps:
sudo apt install nodejs
sudo apt install npm

npm install -g pm2

# frontend
cd frontend
npm run build

# add reverse proxy for frontend (domain.com)
sudo vim /etc/nginx/sites-available/default

# backend (api.domain.com)
cd backend
npm run dev

# reload nginx:
sudo nginx -t
sudo systemctl reload nginx