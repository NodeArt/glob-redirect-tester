FROM node:14
COPY package.json ./
COPY functions/package.json ./functions/
RUN npm ci && npm ci --prefix functions
COPY . .
ARG firebasekey
RUN npm run build
RUN FIREBASE_TOKEN=$firebasekey npm run deploy --non-interactive
