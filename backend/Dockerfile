FROM python:3.12-slim-bookworm

# Install Astral uv package manager
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Enable bytecode compilation and use copy mode
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV PYTHONUNBUFFERED=1

# Install dependencies first for better caching
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

# Copy application source code
COPY . .
RUN uv sync --frozen --no-dev

# Put virtual environment in PATH
ENV PATH="/app/.venv/bin:$PATH"

# Render provides the PORT env var dynamically
ENV PORT=8000
EXPOSE 8000

# Run migrations automatically then start Uvicorn
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
