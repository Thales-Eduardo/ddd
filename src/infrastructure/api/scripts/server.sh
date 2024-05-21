 test -d dist && rm -rf dist && yarn tsc && \
    node dist/infrastructure/api/server.js || \
    yarn tsc && node dist/infrastructure/api/server.js

