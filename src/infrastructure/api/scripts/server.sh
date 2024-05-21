 test -d build && rm -rf build && yarn tsc && \
    node build/infrastructure/api/server.js || \
    yarn tsc && node build/infrastructure/api/server.js

