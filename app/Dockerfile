FROM oven/bun:1.4.4-slim
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --production
COPY src ./src
ENV PORT=3000
EXPOSE 3000
# Exec form so SIGTERM reaches bun directly, not a shell.
CMD ["bun", "src/index.ts"]
