FROM node:11

WORKDIR /usr/src/smartApi

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]