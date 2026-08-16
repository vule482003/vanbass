[README.md](https://github.com/user-attachments/files/31111001/README.md)
# VanBass Music Center

E-commerce platform for a music store, including products, cart, orders, payments, rentals, customer accounts and admin management.

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- Redis
- Pydantic
- Uvicorn
- uv
- JWT Bearer Authentication

### Frontend
- TypeScript
- React
- Next.js
- pnpm

## Languages

```text
Python      Backend
TypeScript  Frontend
SQL         Database / migrations
JavaScript  Node.js / Next.js ecosystem
```

## Prerequisites

Install:

- Git
- Python
- uv
- Node.js
- pnpm
- PostgreSQL
- Redis

## 1. Clone

```powershell
git clone https://github.com/vule482003/vanbass.git
cd vanbass
```

## 2. Backend Setup

```powershell
cd backend
uv sync
```

Create:

```text
backend/.env
```

Required:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
REDIS_URL=redis://<host>:<port>/<database>
```

Never commit `.env` or secrets.

### Database

```powershell
uv run alembic upgrade head
```

Check migrations:

```powershell
uv run alembic check
```

### Run Backend

```powershell
uv run uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

Health:

```text
GET /health
GET /health/db
```

## 3. Frontend Setup

Open another terminal:

```powershell
cd frontend
pnpm install
pnpm dev
```

Frontend:

```text
http://localhost:3000
```

## 4. Authentication

Current auth endpoints:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Authentication uses JWT Bearer tokens:

```http
Authorization: Bearer <access_token>
```

Swagger supports authentication through **Authorize**.

## 5. Roles

```text
admin
customer
```

`customer`:
- Own profile
- Own cart
- Own orders
- Own payments

`admin`:
- Category management
- Product management
- Product image management
- Store settings
- Order management
- Payment management

## 6. Main API Areas

```text
Auth
Customer Profile
Category
Product
Product Image
Store Settings
Cart
Order
Payment
Rental Request
```

Main flow:

```text
Product → Cart → Order → Payment
```

Rental functionality uses:

```text
RentalRequest → RentalRequestItem → Payment
```

## 7. Development Workflow

Create a feature branch from `dev`:

```powershell
git switch dev
git pull origin dev
git switch -c feat/<feature-name>
```

Before committing:

```powershell
git status
git add .
git status
```

Commit and push:

```powershell
git commit -m "feat(<scope>): <description>"
git push --set-upstream origin feat/<feature-name>
```

Create a Pull Request:

```text
feat/<feature-name> → dev
```

After merge:

```powershell
git switch dev
git pull origin dev
```

## 8. Before Pull Request

Run:

```powershell
uv run python -m compileall app
uv run alembic check
```

Then test the affected API in Swagger.

## 9. Important

Do not commit:

```text
.env
credentials
passwords
JWT secrets
API keys
private tokens
temporary/debug files
```

For backend commands, run them from:

```text
backend/
```

If running `compileall` from the project root:

```powershell
uv run python -m compileall backend/app
```
