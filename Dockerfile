# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY next.config.js ./

RUN npm install

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app

ARG ADMIN_VERSION="0.0.0"
ARG API_URL="https://api.gympapmt.de"
ARG RASA_DASHBOARD_URL="https://rasa.gympapmt.de"
ARG COLAB_URL="https://colab.research.google.com/drive/1X8YKIAhbsw2R-t01dVgXa1zO0xWmB2gF?usp=sharing"

ENV NEXT_PUBLIC_API_URL ${API_URL}
ENV NEXT_PUBLIC_ADMIN_VERSION ${ADMIN_VERSION}
ENV NEXT_PUBLIC_RASA_DASHBOARD_URL ${RASA_DASHBOARD_URL}
ENV NEXT_PUBLIC_COLAB_URL ${COLAB_URL}

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build && npm install --only=production

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
