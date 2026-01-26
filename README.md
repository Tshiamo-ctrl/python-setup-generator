# Python Framework Setup Generator

A lightweight, browser-based tool to generate automated setup, database reset, and development server scripts for **70+ popular Python frameworks and projects** including Django, Flask, FastAPI, Frappe, and more.

## 🎯 Purpose

Setting up local development environments often involves repetitive terminal work. This tool automates the "nitty-gritty" so you can get straight to coding:

- **Environment Initialization**: `git clone`, venv creation, dependency installation
- **Smart Repository Catalog**: 70+ curated Python projects across 6 categories
- **Framework-Aware**: Optimized defaults for Django, Flask, FastAPI, Frappe, and generic Python
- **Custom Configuration**: Override any defaults when needed
- **One-Command Resets**: Wipe and recreate databases/migrations reliably
- **Modern Carousel UI**: Navigate through generated scripts with smooth animations
- **Danger Zone**: Integrated browser-based workspace cleanup using the File System Access API

## 🚀 Quick Start

1. **Open** the app: [Live Preview](https://tshiamo-ctrl.github.io/Horilla-setup-generator-app/preview/) or `index.html` locally
2. **Select** a repository from 70+ options organized by category:
   - Django Frameworks (Saleor, Wagtail, Zulip, NetBox, etc.)
   - FastAPI Frameworks (Full Stack Template, Litestar, Pydantic, etc.)
   - Flask Frameworks (Flask, SQLAlchemy, RESTful, etc.)
   - Data & ORM Libraries (Celery, Alembic, Redis, etc.)
   - Frappe & Specialized (ERPNext, Odoo, Prefect, Airflow)
   - CMS & E-Commerce (Django Oscar, Django CMS)
3. **Configure** (optional): Check "Enable Custom Configuration" to override smart defaults
4. **Generate**: Click "Continue to Scripts" to create your setup files
5. **Review**: Browse your configuration summary and quick actions
6. **Navigate**: Use the carousel arrows or indicators to view all 4 generated scripts
7. **Save**: Download individual scripts or use "Save All Scripts" for the entire workspace
8. **Run**: Execute `./setup.sh` to initialize everything!

## ✨ Features

### Smart Repository Selection
- **70+ Pre-Configured Repos**: Major Python projects with optimal defaults
- **Category Organization**: Find projects by framework type
- **Metadata-Rich**: Stars, complexity level, framework type for each repo
- **Custom URL Support**: Use any Git repository URL

### Intelligent Configuration
- **Auto-Detection**: Framework type automatically set based on repo
- **Smart Naming**: Project paths and venv names derived from repo name
- **Custom Override**: Optional checkbox to access advanced settings
- **State-Aware UI**: Only shows relevant options for selected framework

### Modern Carousel Interface
- **Smooth Navigation**: Arrow buttons and dot indicators
- **Visual Preview**: See adjacent scripts greyed out at 30% opacity
- **4 Essential Scripts**:
  - `setup.sh` - Complete environment initialization
  - `fresh-db.sh` - Database reset and cleanup
  - `dev-server.sh` - Development server launcher
  - `.env.example` - Environment variables template

### Quick Actions Panel
- **Save Workspace**: Download all 4 scripts to a folder (File System Access API)
- **Make Executable**: Copy `chmod +x` command
- **Run Setup**: Copy `./setup.sh` command
- **Start Server**: Copy `./dev-server.sh` command

### Framework Support
- **Django**: Migrations, superuser creation, static files, demo data
- **Flask**: FLASK_APP configuration, blueprints
- **FastAPI**: Uvicorn settings, async workers
- **Frappe**: Bench commands, site management
- **Generic Python**: Minimal setup with venv and dependencies

## 📋 Repository Categories

### Horilla Apps (2 repos)
Horilla HRM, Horilla CRM

### Django Frameworks (15 repos)
Saleor, Wagtail CMS, Open edX, Zulip, Mayan EDMS, PostHog, DefectDojo, NetBox, Taiga, Flagsmith, Sentry, Mezzanine, Django REST Framework, Django itself, Django-allauth

### FastAPI Frameworks (15 repos)
Full Stack FastAPI Template, FastAPI, Polar, SQLModel, Litestar, Strawberry GraphQL, Authlib, FastHTML, Robyn, Typer, FastAPI-Users, HTTPX, Pydantic, Uvicorn, Starlette

### Flask Frameworks (10 repos)
Flask, Flask-SQLAlchemy, Flask-RESTful, Flask-Login, Flask-JWT-Extended, Flask-Admin, Flask-CORS, Flask-Migrate, Eve, Connexion

### Data & ORM Libraries (9 repos)
SQLAlchemy, Alembic, Asyncpg, Motor, Redis-py, Tortoise ORM, Piccolo ORM, Celery, Dependency Injector

### Frappe & Specialized (6 repos)
ERPNext, Frappe Framework, Odoo, Graphene, Prefect, Airflow

### CMS & E-Commerce (3 repos)
Django Oscar, Django CMS, Wagtail Bakery

## 🧪 Testing

This project uses **Playwright** for end-to-end testing to ensure generated scripts are syntactically correct and functionally sound.

### Running Tests

```bash
# Set up test environment
python3 -m venv test_venv
source test_venv/bin/activate
pip install pytest pytest-playwright
playwright install chromium

# Run all tests
pytest tests/test_generator.py -v

# Run specific test
pytest tests/test_generator.py::test_carousel_navigation -v
```

### Test Coverage

Tests verify:
- Repository dropdown population with all categories
- Custom configuration checkbox behavior
- Carousel navigation and state transitions
- Script generation for each framework type
- Copy/download button functionality
- Configuration summary display

## 🛠️ Technical Stack

- **Zero Dependencies**: Pure HTML/JS/CSS - runs entirely in browser
- **Modern CSS**: Custom properties, grid layouts, smooth animations
- **Vanilla JavaScript**: No frameworks required
- **File System Access API**: For "Save Workspace" functionality (Chrome/Edge)
- **Clipboard API**: For one-click code copying

## 📖 Usage Examples

### Example 1: Django Project (Saleor)
1. Select "Saleor" from Django Frameworks
2. Review auto-filled settings (path: `~/saleor`, framework: Django, db: PostgreSQL)
3. Generate scripts
4. Save all scripts to your workspace folder
5. Run `chmod +x *.sh && ./setup.sh`

### Example 2: FastAPI with Custom Config
1. Select "Full Stack FastAPI Template"
2. Check "Enable Custom Configuration"
3. Modify database to SQLite, change admin credentials
4. Generate and download scripts
5. Use carousel to review each script before saving

### Example 3: Custom Repository
1. Select "Custom Repository URL..."
2. Enter your project's Git URL
3. Choose framework type manually
4. Configure all settings as needed
5. Generate scripts tailored to your project

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Code style and structure
- Running tests before PRs
- Safety considerations for destructive operations
- Cross-platform compatibility

## 📄 License

[MIT](LICENSE)

---

**Built for developers who value their time** ⚡
