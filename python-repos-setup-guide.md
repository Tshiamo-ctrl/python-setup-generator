# 100 Python Web Framework Repositories - Complete Setup Guide
**Pure Python Installation Instructions (No Docker)**
**Updated**: January 26, 2026

---

## TABLE OF CONTENTS
1. [Django Frameworks (35)](#django-frameworks)
2. [FastAPI Frameworks (30)](#fastapi-frameworks)
3. [Flask Frameworks (20)](#flask-frameworks)
4. [Other Async Frameworks (15)](#other-async-frameworks)
5. [Frappe & Specialized Frameworks (10)](#frappe--specialized-frameworks)
6. [Data & Utilities (10)](#data--utilities)

---

## DJANGO FRAMEWORKS

### 1. Open edX
**URL**: https://github.com/openedx/edx-platform
**Type**: LMS, Enterprise Application
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/openedx/edx-platform.git
cd edx-platform

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    python3-dev \
    libmysqlclient-dev \
    default-libmysqlclient-dev \
    libssl-dev \
    libffi-dev

# Install Python dependencies
pip install --upgrade pip setuptools wheel
pip install -r requirements/pip.txt
pip install -r requirements/edx/base.txt
pip install -r requirements/edx/development.txt

# Create database (SQLite for development)
python manage.py migrate --settings=lms.envs.devstack

# Create superuser
python manage.py createsuperuser --settings=lms.envs.devstack

# Collect static files
python manage.py collectstatic --noinput --settings=lms.envs.devstack

# Run development server
python manage.py runserver 0.0.0.0:8000 --settings=lms.envs.devstack

# Run tests
pytest lms/djangoapps/course_api/
```

**Dependencies**:
- Django 4.x
- celery
- redis
- MySQL/PostgreSQL
- elasticsearch

---

### 2. Saleor
**URL**: https://github.com/saleor/saleor
**Type**: E-commerce Platform
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/saleor/saleor.git
cd saleor

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Copy environment configuration
cp .env.example .env

# Edit .env if needed (set DEBUG=True for development)

# Create database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Create sample data
python manage.py create_demo_data

# Collect static files
python manage.py collectstatic --noinput

# Run development server
python manage.py runserver

# Run tests
pytest -v

# Run specific test module
pytest tests/api/
```

**Dependencies**:
- Django 4.2+
- GraphQL-core
- Graphene-Django
- PostgreSQL (recommended)
- Redis
- Celery

**Initial Setup Notes**:
- Database defaults to SQLite but PostgreSQL recommended
- Development mode enabled via .env
- Includes sample fixture data

---

### 3. Zulip
**URL**: https://github.com/zulip/zulip
**Type**: Team Chat Application
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/zulip/zulip.git
cd zulip

# Run installation script for local development
./tools/setup/install

# This script will:
# - Create virtual environment
# - Install system dependencies
# - Install Python dependencies
# - Initialize database (SQLite for dev)
# - Create default superuser (admin@example.com / password)

# If script fails, manual setup:
python -m venv zulip-venv
source zulip-venv/bin/activate

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements/dev.txt

# Create database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Initialize Zulip-specific setup
python manage.py initialize_database

# Run development server
./tools/run-dev.py

# Run tests
pytest zerver/tests/

# Run API tests specifically
pytest zerver/tests/test_rest_api.py
```

**Dependencies**:
- Django 4.x
- tornado (for WebSocket)
- PostgreSQL (recommended)
- Redis
- node-gyp (for Node.js packages)

**Important**:
- ./run-dev.py is preferred over manage.py runserver (handles async)
- Default admin: admin@example.com / password (generated)

---

### 4. Mayan EDMS
**URL**: https://gitlab.com/mayan-edms/mayan-edms.git
**Type**: Document Management System
**Complexity**: Advanced

```bash
# Clone repository
git clone https://gitlab.com/mayan-edms/mayan-edms.git
cd mayan-edms

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Create default document types and permissions
python manage.py shell
# In shell: from mayan.apps.documents.models import DocumentType; DocumentType.objects.get_or_create(label='Default')

# Run development server
python manage.py runserver

# Run tests (may require elasticsearch running)
pytest --no-header -rN

# Run specific test module
pytest mayan/apps/documents/tests/
```

**Dependencies**:
- Django 3.2+
- celery
- redis
- pillow (image processing)
- elasticsearch (optional, for search)
- poppler-utils (PDF processing)

**Setup Notes**:
- Elasticsearch recommended for full-text search
- Document type creation can be done via web UI after first run
- Default admin credentials set during createsuperuser

---

### 5. Wagtail CMS
**URL**: https://github.com/wagtail/wagtail
**Type**: Django CMS
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/wagtail/wagtail.git
cd wagtail

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/development.txt

# Run tests to verify setup
python runtests.py

# Create a test project
wagtail start myproject

cd myproject

# Create virtual environment for project
python -m venv venv
source venv/bin/activate

# Install project dependencies
pip install -r requirements.txt

# Create database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load initial data
python manage.py loaddata wagtail.core

# Collect static files
python manage.py collectstatic --noinput

# Run development server
python manage.py runserver

# Run project tests
pytest

# Run core Wagtail tests
cd /path/to/wagtail
python runtests.py
```

**Dependencies**:
- Django 4.2+
- Pillow (image handling)
- django-modelcluster
- django-taggit
- djangorestframework (optional)
- elasticsearch (optional)

**Setup Notes**:
- Main repo is core framework, not a runnable project
- Use `wagtail start` to create new Wagtail projects
- Development requires running tests from repo root

---

### 6. PostHog
**URL**: https://github.com/PostHog/posthog
**Type**: Product Analytics Platform
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/PostHog/posthog.git
cd posthog

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env to set:
# DEBUG=True
# SECRET_KEY=your-secret-key
# DATABASE_URL=sqlite:///db.sqlite3

# Create database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Build frontend (requires Node.js 16+)
npm install
npm run build

# Run development server
python manage.py runserver

# In separate terminal, run Celery worker
celery -A posthog worker -l info

# Run tests
pytest posthog/

# Run specific test
pytest posthog/api/test_api.py
```

**Dependencies**:
- Django 4.x
- PostgreSQL (highly recommended for dev)
- Redis
- celery
- Node.js 16+ (for frontend build)
- ClickHouse (optional, for analytics)

**Setup Notes**:
- Frontend build required for full functionality
- Celery worker optional for development (background tasks)
- SQLite supported but PostgreSQL recommended

---

### 7. DefectDojo
**URL**: https://github.com/DefectDojo/django-DefectDojo
**Type**: DevSecOps Vulnerability Management
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/DefectDojo/django-DefectDojo.git
cd django-DefectDojo

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    python3-dev \
    libmysqlclient-dev \
    libssl-dev

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DEBUG=True
SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
DATABASE_URL=sqlite:///db.sqlite3
EOF

# Run database migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Create some initial data (optional)
python manage.py seed_data

# Run development server
python manage.py runserver 0.0.0.0:8000

# Run tests
pytest tests/

# Run specific test module
pytest tests/test_models.py
```

**Dependencies**:
- Django 4.2+
- Django REST Framework
- celery
- redis
- MySQL/PostgreSQL recommended

**Setup Notes**:
- SQLite suitable for development only
- Security tools integration optional
- API available at /api/v2/

---

### 8. NetBox
**URL**: https://github.com/netbox-community/netbox
**Type**: Network Source of Truth / IPAM
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/netbox-community/netbox.git
cd netbox

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create configuration directory
mkdir -p netbox/netbox/configuration

# Create configuration.py
cat > netbox/netbox/configuration/configuration.py << EOF
ALLOWED_HOSTS = ['*']
DATABASE = {
    'NAME': 'netbox',
    'USER': 'netbox',
    'PASSWORD': 'netbox',
    'HOST': 'localhost',
    'PORT': '',
    'ENGINE': 'django.db.backends.sqlite3',
}
REDIS = {
    'tasks': {
        'HOST': 'localhost',
        'PORT': 6379,
        'DATABASE': 0,
    }
}
SECRET_KEY = 'your-secret-key-here-' + 'x' * 50
EOF

# Navigate to Django app directory
cd netbox

# Create database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Load initial data (optional)
python manage.py loaddata initial_data

# Run development server
python manage.py runserver 0.0.0.0:8000

# Run tests
pytest tests/

# Run specific test
pytest tests/test_models.py::IPAddressTest
```

**Dependencies**:
- Django 4.2+
- PostgreSQL (recommended over SQLite)
- Redis (for caching and tasks)
- celery (optional)

**Setup Notes**:
- SQLite works for development/testing
- Configuration.py required before database setup
- Built-in API available at /api/

---

### 9. Taiga
**URL**: https://github.com/taigaio/taiga-back
**Type**: Agile Project Management
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/taigaio/taiga-back.git
cd taiga-back

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create local configuration
cp settings/local.py.example settings/local.py

# Edit settings/local.py and set:
# DEBUG = True
# ALLOWED_HOSTS = ['*']
# DATABASES['default']['ENGINE'] = 'django.db.backends.sqlite3'
# DATABASES['default']['NAME'] = 'db.sqlite3'

# Initialize database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Create initial test data (optional)
python manage.py sample_data

# Run development server
python manage.py runserver 0.0.0.0:8000

# Run tests
pytest tests/

# Run specific test
pytest tests/unit/projects/
```

**Dependencies**:
- Django 3.2+
- Django REST Framework
- celery (optional)
- PostgreSQL recommended

**Setup Notes**:
- Default admin: admin/123123
- API documentation at /api/v1/docs
- Requires separate frontend (taiga-front) for full UI

---

### 10. ERPNext (Frappe Framework)
**URL**: https://github.com/frappe/erpnext
**Type**: Complete ERP System
**Complexity**: Expert

```bash
# Note: ERPNext uses Frappe framework, different from pure Django

# Clone repository
git clone https://github.com/frappe/erpnext.git
cd erpnext

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install bench (Frappe's development tool)
pip install frappe-bench

# Create new bench directory
cd ..
mkdir erpnext-dev
cd erpnext-dev

# Initialize bench
bench init --frappe-branch version-15 frappe-app

# Navigate to bench directory
cd frappe-app

# Clone ERPNext into apps
bench get-app erpnext /path/to/erpnext

# Create new site
bench new-site mysite.local

# Install ERPNext app on site
bench --site mysite.local install-app erpnext

# Create user (admin)
bench --site mysite.local set-admin-password admin

# Generate demo data
bench --site mysite.local execute frappe.desk.page.setup_wizard.setup_wizard.setup_complete

# Start development server (port 8000)
bench start

# Run tests
bench --site mysite.local run-tests --module erpnext.buying

# Useful bench commands
bench --site mysite.local console  # Python shell
bench shell  # Terminal with context
```

**Dependencies**:
- Frappe Framework
- MariaDB/PostgreSQL
- Node.js 14+
- redis-server
- python-dev

**Setup Notes**:
- Bench is essential for ERPNext development
- Separate site concept (not Django projects)
- Extensive built-in modules (Accounting, HR, Inventory, etc.)
- Default admin setup via set-admin-password

---

### 11. Flagsmith
**URL**: https://github.com/Flagsmith/flagsmith
**Type**: Feature Flag Management
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/Flagsmith/flagsmith.git
cd flagsmith/api

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
EOF

# Run database migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Run development server
python manage.py runserver 0.0.0.0:8000

# Run tests
pytest

# Run specific test
pytest tests/unit/api/test_views.py
```

**Dependencies**:
- Django 4.0+
- Django REST Framework
- PostgreSQL recommended
- celery (optional)

**Setup Notes**:
- API-first design
- Feature flags stored in database
- Built-in authentication/permissions

---

### 12. Sentry
**URL**: https://github.com/getsentry/sentry
**Type**: Error Tracking & Performance Monitoring
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/getsentry/sentry.git
cd sentry

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install development dependencies
pip install --upgrade pip setuptools wheel
pip install -e .
pip install -r requirements-dev.txt

# Initialize Sentry development environment
sentry init --dev

# This creates:
# - ~/.sentry/config.yml
# - ~/.sentry/sentry.conf.py
# - Development database

# Create superuser
sentry createuser

# Run development server
sentry devserver

# In another terminal, run Celery worker:
celery -A sentry.celery worker -l info

# Run tests
pytest tests/

# Run specific test
pytest tests/sentry/api/endpoints/test_projects.py

# Useful commands:
sentry shell  # Django shell
```

**Dependencies**:
- Django 4.x
- PostgreSQL (recommended)
- Redis
- celery
- Node.js 14+ (for frontend assets)
- ClickHouse (optional, for analytics)

**Setup Notes**:
- Development setup via `sentry init --dev` is recommended
- Requires Node.js for building frontend assets
- Celery worker essential for background tasks
- Access at http://localhost:8000

---

### 13. Mezzanine
**URL**: https://github.com/stephenmcd/mezzanine
**Type**: Django CMS
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/stephenmcd/mezzanine.git
cd mezzanine

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create new Mezzanine project
mezzanine-project myproject
cd myproject

# Create project-specific venv
python -m venv venv
source venv/bin/activate

# Install project dependencies
pip install -r requirements.txt

# Create database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Create initial pages (optional)
python manage.py shell
# In shell:
# from mezzanine.pages.models import Page
# page = Page.objects.create(title="Home")

# Run development server
python manage.py runserver

# Run tests
pytest -v

# Test specific module
pytest tests/test_models.py
```

**Dependencies**:
- Django 3.2+
- django-grappelli
- django-filebrowser
- filebrowser-alchemy
- PIL/Pillow

**Setup Notes**:
- `mezzanine-project` creates project boilerplate
- Includes admin interface with grappelli
- Built-in blog, gallery, pages apps

---

### 14. Odoo
**URL**: https://github.com/odoo/odoo
**Type**: Business Management System
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/odoo/odoo.git
cd odoo

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install system dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    python3-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libsasl2-dev \
    libldap2-dev \
    libssl-dev \
    libffi-dev \
    libjpeg-dev \
    libtiff5-dev \
    libjasper-dev \
    libopenjp2-7-dev \
    libblas-dev \
    liblapack-dev \
    libharfbuzz0b \
    libwebp-dev \
    liblcms2-dev

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create PostgreSQL database and user
# psql -U postgres -c "CREATE DATABASE odoo;"
# psql -U postgres -c "CREATE USER odoo WITH PASSWORD 'odoo';"
# psql -U postgres -c "ALTER ROLE odoo WITH CREATEDB;"

# For development, use SQLite instead:
export DATABASE_URL=sqlite:///odoo.db

# Run Odoo (creates database on first run)
python odoo-bin -d demo --addons-path=addons --xmlrpc-port=8069

# Or with specific database
python odoo-bin -d development -u base --addons-path=addons

# Run tests for a module
python odoo-bin -d test --test-enable --stop-after-init -u account

# Common useful flags
# -d DATABASE          Database name
# -u MODULES           Modules to upgrade
# --addons-path PATH   Path to addons
# --xmlrpc-port PORT   RPC port
# --test-enable        Enable testing
# --logfile LOG        Log file location
```

**Dependencies**:
- Python 3.8+
- PostgreSQL (recommended)
- Node.js 14+ (for assets)
- libssl-dev and other system libs

**Setup Notes**:
- Uses PostgreSQL in production
- SQLite possible for development
- Access at http://localhost:8069
- Default admin: admin/admin

---

### 15. Graphene (GraphQL for Django)
**URL**: https://github.com/graphql-python/graphene
**Type**: GraphQL Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/graphql-python/graphene.git
cd graphene

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Run specific test
pytest tests/types/test_objecttype.py

# Create test Django project
mkdir django_test_app
cd django_test_app

# Create Django project
django-admin startproject graphene_project .

# Create Django app
python manage.py startapp api

# In settings.py, add to INSTALLED_APPS:
# 'graphene_django',

# Create schema.py in api app:
cat > api/schema.py << EOF
import graphene
from graphene_django import DjangoObjectType

class Query(graphene.ObjectType):
    hello = graphene.String()
    
    def resolve_hello(self, info):
        return "Hello, Graphene!"

schema = graphene.Schema(query=Query)
EOF

# Update urls.py:
cat > graphene_project/urls.py << EOF
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.urls import path
from api.schema import schema

urlpatterns = [
    path('graphql/', csrf_exempt(GraphQLView.as_view(schema=schema))),
]
EOF

# Run development server
python manage.py runserver

# Test at http://localhost:8000/graphql/

# Run core tests
cd /path/to/graphene
pytest
```

**Dependencies**:
- graphene-core
- graphene-django
- Django 4.x
- graphql-core 3.x

**Setup Notes**:
- Can be used with Django, SQLAlchemy, or standalone
- GraphQL endpoint usually at /graphql/
- Interactive GraphQL playground available

---

### 16. Wagtail Bakery
**URL**: https://github.com/moorinteractive/wagtail-bakery
**Type**: Static Site Generator for Wagtail
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/moorinteractive/wagtail-bakery.git
cd wagtail-bakery

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create test Wagtail project with bakery
wagtail start myproject
cd myproject

# Install wagtail-bakery
pip install wagtail-bakery

# Update settings.py - add to INSTALLED_APPS:
# 'wagtail_bakery',

# Build static site
python manage.py build

# Static files output to 'build/' directory

# Test development server
python manage.py runserver

# Run project tests
pytest
```

**Dependencies**:
- wagtail
- Django 4.x
- jinja2

**Setup Notes**:
- Generates static HTML from Wagtail pages
- Output directory configurable in settings
- Useful for deployment on static hosting

---

### 17. Django REST Framework
**URL**: https://github.com/encode/django-rest-framework
**Type**: Django API Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/encode/django-rest-framework.git
cd django-rest-framework

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements.txt

# Run tests
pytest -v

# Run specific test module
pytest tests/test_views.py

# Create example Django project
mkdir example_project
cd example_project

# Create Django project
django-admin startproject config .

# Create app
python manage.py startapp api

# Create simple model in api/models.py:
cat > api/models.py << EOF
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
EOF

# Create serializer (api/serializers.py):
cat > api/serializers.py << EOF
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'created_at']
EOF

# Create viewset (api/views.py):
cat > api/views.py << EOF
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
EOF

# Configure URLs (config/urls.py):
cat > config/urls.py << EOF
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
EOF

# Add to INSTALLED_APPS in config/settings.py:
# 'rest_framework',
# 'api',

# Run migrations
python manage.py migrate

# Create data
python manage.py shell
# >>> from api.models import User
# >>> User.objects.create(name='John', email='john@example.com')

# Run server
python manage.py runserver

# Test API at http://localhost:8000/api/users/

# Run tests
pytest tests/
```

**Dependencies**:
- Django 4.x
- djangorestframework
- django-filter
- Markdown (for browsable API)

**Setup Notes**:
- Provides browsable API at /api/ endpoints
- Authentication, permissions, and filtering built-in
- Automatic API documentation generation

---

### 18. Django Celery
**URL**: https://github.com/celery/celery
**Type**: Distributed Task Queue
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/celery/celery.git
cd celery

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/dev.txt

# Run tests
pytest -v

# Run specific test
pytest t/unit/app/test_app.py

# Create Django project with Celery
mkdir django_celery_example
cd django_celery_example

# Create Django project
django-admin startproject config .

# Create app
python manage.py startapp tasks

# Install celery
pip install celery redis

# Create celery.py in config/:
cat > config/celery.py << EOF
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
EOF

# Update config/__init__.py:
echo "from .celery import app as celery_app" > config/__init__.py

# Create tasks in tasks/tasks.py:
cat > tasks/tasks.py << EOF
from celery import shared_task
import time

@shared_task
def add(x, y):
    time.sleep(2)
    return x + y

@shared_task
def multiply(x, y):
    return x * y
EOF

# Add to settings.py:
cat >> config/settings.py << EOF

CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
EOF

# Add tasks to INSTALLED_APPS:
# 'tasks',

# Start Redis (if available):
# redis-server

# OR use in-memory broker for testing:
# CELERY_BROKER_URL = 'memory://'

# Run Celery worker:
celery -A config worker -l info

# In another terminal, test:
python manage.py shell
# >>> from tasks.tasks import add
# >>> result = add.delay(4, 6)
# >>> result.get()  # Wait for result

# Run tests
pytest
```

**Dependencies**:
- celery
- django
- redis (or other broker)
- kombu

**Setup Notes**:
- Redis most common broker
- Can use in-memory broker for development
- Worker runs in separate process
- Results backend optional but recommended

---

### 19. Django-allauth (User Sessions Manager)
**URL**: https://github.com/pennersr/django-allauth
**Type**: Authentication Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pennersr/django-allauth.git
cd django-allauth

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/requirements.txt

# Run tests
pytest -v

# Create example Django project
mkdir example_project
cd example_project

# Create Django project
django-admin startproject config .

# Install django-allauth
pip install django-allauth

# Update settings.py:
cat >> config/settings.py << EOF

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

INSTALLED_APPS = [
    # ... other apps
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
]

SITE_ID = 1

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'username_email'
EOF

# Update urls.py:
cat > config/urls.py << EOF
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
]
EOF

# Add to INSTALLED_APPS:
# 'allauth',
# 'allauth.account',
# 'allauth.socialaccount',

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Access at http://localhost:8000/accounts/

# Run tests
pytest tests/
```

**Dependencies**:
- Django 4.x
- django-allauth
- python-openid (for OpenID)
- requests-oauthlib (for OAuth)

**Setup Notes**:
- Supports email and username authentication
- Social account integrations (Google, Facebook, GitHub, etc.)
- Email confirmation, password reset built-in

---

### 20. Django itself
**URL**: https://github.com/django/django
**Type**: Web Framework
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/django/django.git
cd django

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/py3.txt

# Run test suite (this takes time)
python -m pytest tests/ -x

# Run specific test
python -m pytest tests/test_admin.py::AdminViewListEditable -v

# Create example Django project
cd ..
mkdir django_example
cd django_example

# Create Django project
django-admin startproject myproject .

# Create app
python manage.py startapp myapp

# Create model in myapp/models.py:
cat > myapp/models.py << EOF
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
EOF

# Create migration
python manage.py makemigrations

# Run migration
python manage.py migrate

# Create admin.py:
cat > myapp/admin.py << EOF
from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at']
EOF

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Access admin at http://localhost:8000/admin/

# Run tests
python manage.py test myapp

# Run specific test
python manage.py test myapp.tests.ArticleTestCase
```

**Dependencies**:
- asgiref
- sqlparse
- tzdata

**Setup Notes**:
- Official Django repository
- Extensive test suite, takes 15-30 minutes to run fully
- Documentation is comprehensive

---

## FASTAPI FRAMEWORKS

### 21. Full Stack FastAPI Template
**URL**: https://github.com/fastapi/full-stack-fastapi-template
**Type**: Complete Application Template
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/fastapi/full-stack-fastapi-template.git
cd full-stack-fastapi-template

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install backend dependencies
pip install --upgrade pip
pip install -r ./backend/requirements.txt

# Create .env file
cat > .env << EOF
SECRET_KEY=your-secret-key-here
SQLALCHEMY_DATABASE_URL=sqlite:///./test.db
FIRST_SUPERUSER=admin@example.com
FIRST_SUPERUSER_PASSWORD=admin
EOF

# Create database and run migrations (alembic)
cd backend
alembic upgrade head

# Create initial data
python -m app.initial_data

# Run backend development server
fastapi dev app/main.py --host 0.0.0.0 --port 8000

# In another terminal, set up frontend
cd frontend
node --version  # Ensure Node.js installed

# Install Node dependencies
npm install

# Run frontend development server
npm run dev

# Run backend tests
cd ../backend
pytest tests/

# Run specific test
pytest tests/test_api.py
```

**Dependencies**:
- FastAPI
- SQLAlchemy
- Pydantic
- uvicorn
- Node.js 16+ (for frontend)

**Setup Notes**:
- Frontend requires Node.js and npm
- Backend uses SQLAlchemy ORM
- Includes JWT authentication
- API documentation at /docs

---

### 22. FastAPI itself
**URL**: https://github.com/tiangolo/fastapi
**Type**: Web Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/tiangolo/fastapi.git
cd fastapi

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Run specific test
pytest tests/test_fastapi.py

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/items/")
def create_item(item: Item):
    return item
EOF

# Install FastAPI and uvicorn
pip install fastapi uvicorn

# Run development server
fastapi dev main.py

# Access API at http://localhost:8000/
# Interactive docs at http://localhost:8000/docs
# Alternative docs at http://localhost:8000/redoc

# Run tests
pytest tests/
```

**Dependencies**:
- starlette
- pydantic
- uvicorn
- fastapi

**Setup Notes**:
- Auto-generates OpenAPI documentation
- Type hints for request/response validation
- Async/await support built-in

---

### 23. Polar (FastAPI Backend)
**URL**: https://github.com/polarsource/polar
**Type**: Creator Monetization Platform
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/polarsource/polar.git
cd polar/server

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
STRIPE_SECRET_KEY=your-stripe-key  # Optional for payment features
EOF

# Create database
alembic upgrade head

# Run development server
fastapi dev polar/main.py

# Run tests
pytest tests/

# Run specific test module
pytest tests/api/
```

**Dependencies**:
- FastAPI
- SQLAlchemy
- PostgreSQL (recommended)
- stripe (optional)
- redis (optional)

**Setup Notes**:
- API-first architecture
- Payment integration with Stripe
- User authentication with JWT

---

### 24. Tiangolo's sqlmodel
**URL**: https://github.com/tiangolo/sqlmodel
**Type**: SQL ORM Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/tiangolo/sqlmodel.git
cd sqlmodel

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from typing import Optional
from sqlmodel import SQLModel, create_engine, Session, select
from fastapi import FastAPI

class Hero(SQLModel, table=True):
    id: Optional[int] = None
    name: str
    secret_name: str
    age: Optional[int] = None

DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/heroes/", response_model=Hero)
def create_hero(hero: Hero):
    with Session(engine) as session:
        session.add(hero)
        session.commit()
        session.refresh(hero)
        return hero

@app.get("/heroes/", response_model=list[Hero])
def read_heroes():
    with Session(engine) as session:
        heroes = session.exec(select(Hero)).all()
        return heroes
EOF

# Install dependencies
pip install fastapi uvicorn sqlmodel

# Run development server
fastapi dev main.py

# Run core tests
cd /path/to/sqlmodel
pytest tests/
```

**Dependencies**:
- SQLModel
- SQLAlchemy
- FastAPI
- Pydantic

**Setup Notes**:
- Combines SQLAlchemy ORM and Pydantic models
- Reduces code duplication
- Full type hinting support

---

### 25. Litestar Framework
**URL**: https://github.com/litestar-org/litestar
**Type**: ASGI Web Framework
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/litestar-org/litestar.git
cd litestar

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from litestar import Litestar, get

@get("/")
def hello() -> dict[str, str]:
    return {"message": "Hello, Litestar!"}

@get("/items/{item_id:int}")
def get_item(item_id: int) -> dict[str, int]:
    return {"item_id": item_id}

app = Litestar([hello, get_item])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Install Litestar and uvicorn
pip install litestar uvicorn

# Run development server
python main.py
# Or: litestar run

# Run tests
cd /path/to/litestar
pytest tests/
```

**Dependencies**:
- litestar
- uvicorn
- starlette
- pydantic

**Setup Notes**:
- Type hints first design
- Dependency injection included
- ORM agnostic (SQLAlchemy, Tortoise, etc.)

---

### 26. Strawberry GraphQL
**URL**: https://github.com/strawberry-graphql/strawberry
**Type**: GraphQL Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/strawberry-graphql/strawberry.git
cd strawberry

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import strawberry
from fastapi import FastAPI
from strawberry.asgi import GraphQL

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Hello, Strawberry!"
    
    @strawberry.field
    def user(self, id: int) -> str:
        return f"User {id}"

schema = strawberry.Schema(query=Query)

app = FastAPI()
graphql_app = GraphQL(schema)

app.add_route("/graphql", graphql_app)
app.add_websocket_route("/graphql", graphql_app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Install Strawberry and FastAPI
pip install strawberry-graphql fastapi uvicorn

# Run development server
python main.py

# Access GraphQL at http://localhost:8000/graphql

# Run tests
cd /path/to/strawberry
pytest tests/
```

**Dependencies**:
- strawberry-graphql
- graphql-core
- FastAPI (for ASGI)

**Setup Notes**:
- Python type hints for GraphQL schema
- Works with FastAPI, Django, Starlette
- Built-in GraphQL playground

---

### 27. Authlib
**URL**: https://github.com/authlib/authlib
**Type**: Authentication Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/authlib/authlib.git
cd authlib

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example FastAPI application with Authlib
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from authlib.integrations.httpx_client import OAuth2Session
import secrets

app = FastAPI()

SECRET_KEY = secrets.token_urlsafe(32)

# Example: OAuth2 Password Flow
from authlib.oauth2.rfc6749 import grant_types, tokens
from authlib.oauth2.rfc7231 import RevocationEndpoint

@app.post("/token")
async def get_token(username: str, password: str):
    # Verify credentials
    if username == "user" and password == "password":
        token = {
            "access_token": "token_value",
            "token_type": "Bearer"
        }
        return token
    return JSONResponse(status_code=401, content={"error": "Invalid credentials"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Install Authlib and FastAPI
pip install authlib fastapi uvicorn

# Run development server
python main.py

# Run tests
cd /path/to/authlib
pytest tests/
```

**Dependencies**:
- authlib
- cryptography
- httpx (for client)

**Setup Notes**:
- Supports OAuth 1, OAuth 2, OpenID Connect
- Works with FastAPI, Flask, Django
- JWT support included

---

### 28. FastHTML
**URL**: https://github.com/AnswerDotAI/fasthtml
**Type**: HTML Over HTTP Framework
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/AnswerDotAI/fasthtml.git
cd fasthtml

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests (if available)
pytest

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from fasthtml.common import *

app, rt = fast_app()

@rt("/")
def get():
    return Titled("FastHTML Example",
        H1("Welcome to FastHTML"),
        P("This is a simple HTML over HTTP example"),
        Form(
            Input(name="name", placeholder="Enter your name"),
            Button("Submit"),
            hx_post="/submit"
        )
    )

@rt("/submit", methods=["post"])
def submit(name: str):
    return P(f"Hello, {name}!")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Install FastHTML
pip install fasthtml

# Run development server
python main.py

# Access at http://localhost:8000/

# Run tests
cd /path/to/fasthtml
pytest
```

**Dependencies**:
- fasthtml
- starlette
- pydantic

**Setup Notes**:
- HTML-first approach (not JSON API)
- HTMX integration for dynamic updates
- Minimal JavaScript required

---

### 29. Robyn
**URL**: https://github.com/sansyryli/robyn
**Type**: Async Web Framework with Rust Runtime
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/sansyryli/robyn.git
cd robyn

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install Robyn
pip install robyn

# Or install from source (requires Rust)
# pip install -e .

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from robyn import Robyn, Request, Response

app = Robyn(__file__)

@app.get("/")
async def index(request: Request) -> Response:
    return Response(body="Hello, Robyn!")

@app.get("/users/{user_id}")
async def get_user(request: Request, user_id: int) -> Response:
    return Response(body=f"User: {user_id}")

@app.post("/submit")
async def submit(request: Request) -> Response:
    data = request.body
    return Response(body=f"Received: {data}")

if __name__ == "__main__":
    app.start(port=8000)
EOF

# Run development server
python main.py

# Access at http://localhost:8000/

# Run tests (if available)
pytest
```

**Dependencies**:
- robyn
- Rust toolchain (for building from source)

**Setup Notes**:
- Async Python with Rust runtime
- High performance HTTP server
- Pre-built binaries available

---

### 30. Typer
**URL**: https://github.com/tiangolo/typer
**Type**: CLI Framework
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/tiangolo/typer.git
cd typer

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example CLI application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import typer

app = typer.Typer()

@app.command()
def hello(name: str = typer.Argument(..., help="Name to greet")):
    """
    Say hello to someone.
    """
    typer.echo(f"Hello {name}!")

@app.command()
def goodbye(name: str = typer.Option("World", help="Name to say goodbye")):
    """
    Say goodbye.
    """
    typer.echo(f"Goodbye {name}!")

@app.command()
def add(a: int, b: int) -> None:
    """
    Add two numbers.
    """
    result = a + b
    typer.echo(f"{a} + {b} = {result}")

if __name__ == "__main__":
    app()
EOF

# Install Typer
pip install typer

# Run CLI
python main.py hello "World"
python main.py goodbye --name "World"
python main.py add 5 3

# Show help
python main.py --help

# Run tests
cd /path/to/typer
pytest tests/
```

**Dependencies**:
- typer
- click
- pydantic

**Setup Notes**:
- Type hints used for CLI argument parsing
- Automatic help generation
- Supports subcommands

---

### 31. FastAPI-Users
**URL**: https://github.com/frankie567/fastapi-users
**Type**: Authentication Library for FastAPI
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/frankie567/fastapi-users.git
cd fastapi-users

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from fastapi import FastAPI
from fastapi_users import FastAPIUsers
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from fastapi_users.db import SQLAlchemyUserDatabase

Base = declarative_base()

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String(length=255), unique=True)
    hashed_password = Column(String(length=255))
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

DATABASE_URL = "sqlite+aiosqlite:///./test.db"

app = FastAPI()

# Setup would include database engine and session creation
# This is a simplified example
EOF

# Install dependencies
pip install fastapi-users fastapi sqlalchemy aiosqlite

# Run development server
# (Full setup requires async database setup)

# Run tests
cd /path/to/fastapi-users
pytest tests/
```

**Dependencies**:
- fastapi-users
- fastapi
- sqlalchemy
- passlib
- python-multipart

**Setup Notes**:
- Ready-to-use user registration/login endpoints
- JWT authentication
- Email verification support (optional)

---

### 32. Starlite (now Litestar)
**URL**: https://github.com/litestar-org/starlite
**Type**: ASGI Framework
**Complexity**: Advanced

```bash
# Note: Starlite renamed to Litestar, visit Litestar section for current info
# Clone old repository for reference
git clone https://github.com/litestar-org/starlite.git
cd starlite

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest

# See Litestar section (repo #25) for current development version
```

**Note**: Project renamed to Litestar. Refer to repository #25 for active development.

---

### 33. HTTPX
**URL**: https://github.com/encode/httpx
**Type**: HTTP Client Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/encode/httpx.git
cd httpx

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import httpx
import asyncio

# Synchronous example
def sync_example():
    with httpx.Client() as client:
        response = client.get('https://httpbin.org/get')
        print(response.json())

# Asynchronous example
async def async_example():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://httpbin.org/get')
        print(response.json())

if __name__ == "__main__":
    # Sync
    sync_example()
    
    # Async
    asyncio.run(async_example())
EOF

# Install httpx
pip install httpx

# Run example
python main.py

# Run tests
cd /path/to/httpx
pytest tests/
```

**Dependencies**:
- httpx
- httpcore
- anyio

**Setup Notes**:
- Supports both sync and async
- HTTP/1.1 and HTTP/2
- Used by FastAPI test client

---

### 34. Pydantic
**URL**: https://github.com/pydantic/pydantic
**Type**: Data Validation Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pydantic/pydantic.git
cd pydantic

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional

class User(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    age: Optional[int] = None
    
    @validator('age')
    def age_must_be_positive(cls, v):
        if v is not None and v < 0:
            raise ValueError('Age must be positive')
        return v

# Usage
user_data = {
    "id": 1,
    "name": "John",
    "email": "john@example.com",
    "age": 30
}

user = User(**user_data)
print(user)
print(user.model_dump())
print(user.model_dump_json())

# Validation error example
try:
    invalid_user = User(id=1, name="", email="invalid", age=-5)
except Exception as e:
    print(f"Validation error: {e}")
EOF

# Install pydantic
pip install pydantic

# Run example
python main.py

# Run tests
cd /path/to/pydantic
pytest tests/
```

**Dependencies**:
- pydantic
- pydantic-core (v2)
- typing-extensions

**Setup Notes**:
- Data validation using Python types
- BaseModel for ORM compatibility
- JSON schema generation

---

### 35. Python-jose
**URL**: https://github.com/mpdavis/python-jose
**Type**: JWT/JWS Library
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/mpdavis/python-jose.git
cd python-jose

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from jose import jwt, JWTError
from datetime import datetime, timedelta
import secrets

SECRET_KEY = secrets.token_urlsafe(32)
ALGORITHM = "HS256"

# Create token
def create_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Verify token
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# Usage
token = create_token({"sub": "user123"})
print(f"Token: {token}")

payload = verify_token(token)
print(f"Payload: {payload}")
EOF

# Install python-jose
pip install python-jose[cryptography]

# Run example
python main.py

# Run tests
cd /path/to/python-jose
pytest tests/
```

**Dependencies**:
- python-jose
- cryptography
- pycryptodome

**Setup Notes**:
- JWT token creation and verification
- Supports HS256, RS256, ES256
- Used with FastAPI for security

---

### 36. Uvicorn
**URL**: https://github.com/encode/uvicorn
**Type**: ASGI Server
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/encode/uvicorn.git
cd uvicorn

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements.txt

# Run tests
pytest -v

# Create example ASGI application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
async def app(scope, receive, send):
    assert scope['type'] == 'http'
    
    await send({
        'type': 'http.response.start',
        'status': 200,
        'headers': [[b'content-type', b'text/plain']],
    })
    
    await send({
        'type': 'http.response.body',
        'body': b'Hello, ASGI!',
    })
EOF

# Install uvicorn
pip install uvicorn

# Run development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run tests
cd /path/to/uvicorn
pytest tests/
```

**Dependencies**:
- uvicorn
- asgiref
- httptools
- uvloop (optional, for performance)

**Setup Notes**:
- Pure ASGI server
- Can serve any ASGI application
- Hot reload support

---

### 37. Starlette
**URL**: https://github.com/encode/starlette
**Type**: ASGI Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/encode/starlette.git
cd starlette

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

async def homepage(request):
    return JSONResponse({'hello': 'world'})

async def user_page(request):
    username = request.path_params['username']
    return JSONResponse({'username': username})

routes = [
    Route('/', homepage),
    Route('/user/{username}', user_page),
]

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'])
]

app = Starlette(routes=routes, middleware=middleware)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Install Starlette
pip install starlette uvicorn

# Run development server
python main.py

# Run tests
cd /path/to/starlette
pytest tests/
```

**Dependencies**:
- starlette
- uvicorn (for running)
- jinja2 (for templating)

**Setup Notes**:
- Lightweight ASGI framework
- Foundation of FastAPI
- WebSocket support

---

### 38. Dependency Injector
**URL**: https://github.com/ets-labs/python-dependency-injector
**Type**: Dependency Injection Container
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/ets-labs/python-dependency-injector.git
cd python-dependency-injector

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example with FastAPI
mkdir example_app
cd example_app

# Create containers.py:
cat > containers.py << EOF
from dependency_injector import containers, providers

class Container(containers.DeclarativeContainer):
    config = providers.Configuration()
    
    database_url = providers.Singleton(
        str,
        "sqlite:///./test.db"
    )
    
    service = providers.Factory(str, "example_service")
EOF

# Create main.py:
cat > main.py << EOF
from fastapi import FastAPI, Depends
from containers import Container

app = FastAPI()
container = Container()

def get_service():
    return container.service()

@app.get("/")
async def root(service: str = Depends(get_service)):
    return {"message": service}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Install dependencies
pip install fastapi uvicorn dependency-injector

# Run development server
python main.py

# Run tests
cd /path/to/python-dependency-injector
pytest tests/
```

**Dependencies**:
- dependency-injector
- FastAPI (optional)

**Setup Notes**:
- IoC container for dependency management
- Works with FastAPI, Flask, Django
- Configuration management

---

### 39. SQLAlchemy ORM
**URL**: https://github.com/sqlalchemy/sqlalchemy
**Type**: SQL Toolkit and ORM
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/sqlalchemy/sqlalchemy.git
cd sqlalchemy

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/dev.txt

# Run tests (takes time)
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Create user
session = SessionLocal()
user = User(name="John", email="john@example.com")
session.add(user)
session.commit()

# Query
users = session.query(User).all()
print(users)

session.close()
EOF

# Install SQLAlchemy
pip install sqlalchemy

# Run example
python main.py

# Run tests
cd /path/to/sqlalchemy
pytest tests/
```

**Dependencies**:
- sqlalchemy
- greenlet (optional, for async)

**Setup Notes**:
- Supports multiple databases (PostgreSQL, MySQL, SQLite)
- ORM and Core APIs
- Migration support with Alembic

---

### 40. Alembic
**URL**: https://github.com/sqlalchemy/alembic
**Type**: Database Migrations
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/sqlalchemy/alembic.git
cd alembic

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install sqlalchemy

# Run tests
pytest -v

# Create example project
mkdir example_app
cd example_app

# Initialize Alembic
alembic init migrations

# Edit alembic.ini - set:
# sqlalchemy.url = sqlite:///./test.db

# Edit migrations/env.py to set up auto-migration

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Run migration
alembic upgrade head

# Create another migration
alembic revision --autogenerate -m "Add new column"

# Downgrade
alembic downgrade -1

# View history
alembic history

# Run tests
cd /path/to/alembic
pytest tests/
```

**Dependencies**:
- alembic
- sqlalchemy
- mako (templating)

**Setup Notes**:
- Version control for database schemas
- Auto-generate migrations from models
- Upgrade/downgrade capabilities

---

### 41. Asyncpg
**URL**: https://github.com/MagicStack/asyncpg
**Type**: Async PostgreSQL Client
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/MagicStack/asyncpg.git
cd asyncpg

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests (requires PostgreSQL)
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import asyncio
import asyncpg

async def main():
    # Connect to PostgreSQL
    conn = await asyncpg.connect(
        user='postgres',
        password='password',
        database='testdb',
        host='localhost'
    )
    
    # Create table
    await conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT,
            email TEXT
        )
    ''')
    
    # Insert
    await conn.execute('INSERT INTO users (name, email) VALUES ($1, $2)',
                      'John', 'john@example.com')
    
    # Query
    rows = await conn.fetch('SELECT * FROM users')
    print(rows)
    
    await conn.close()

if __name__ == "__main__":
    asyncio.run(main())
EOF

# Install asyncpg
pip install asyncpg

# Note: Requires PostgreSQL running locally

# Run tests
cd /path/to/asyncpg
pytest tests/
```

**Dependencies**:
- asyncpg
- PostgreSQL server

**Setup Notes**:
- High-performance async PostgreSQL driver
- Connection pooling
- Prepared statements

---

### 42. Motor
**URL**: https://github.com/mongodb-labs/motor
**Type**: Async MongoDB Driver
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/mongodb-labs/motor.git
cd motor

# Create virtual environment
python -m venv venv
source venv/bind/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests (requires MongoDB)
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import asyncio
import motor.motor_asyncio

async def main():
    # Connect to MongoDB
    client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
    db = client['testdb']
    collection = db['users']
    
    # Insert document
    result = await collection.insert_one({"name": "John", "email": "john@example.com"})
    print(f"Inserted: {result.inserted_id}")
    
    # Find document
    user = await collection.find_one({"name": "John"})
    print(user)
    
    # Find all
    async for doc in collection.find({}):
        print(doc)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
EOF

# Install motor
pip install motor

# Note: Requires MongoDB running locally

# Run tests
cd /path/to/motor
pytest tests/
```

**Dependencies**:
- motor
- pymongo
- MongoDB server

**Setup Notes**:
- Async MongoDB driver
- Works with FastAPI
- Connection pooling built-in

---

### 43. Redis-py
**URL**: https://github.com/redis/redis-py
**Type**: Redis Client
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/redis/redis-py.git
cd redis-py

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests (requires Redis)
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import redis
import asyncio
import aioredis

# Synchronous example
def sync_example():
    r = redis.Redis(host='localhost', port=6379, db=0)
    
    # Set value
    r.set('mykey', 'myvalue')
    
    # Get value
    value = r.get('mykey')
    print(f"Sync: {value}")

# Asynchronous example
async def async_example():
    r = aioredis.from_url("redis://localhost")
    
    # Set value
    await r.set('mykey', 'myvalue')
    
    # Get value
    value = await r.get('mykey')
    print(f"Async: {value}")
    
    await r.close()

if __name__ == "__main__":
    sync_example()
    asyncio.run(async_example())
EOF

# Install redis-py
pip install redis

# Note: Requires Redis running locally

# Run tests
cd /path/to/redis-py
pytest tests/
```

**Dependencies**:
- redis
- Redis server

**Setup Notes**:
- Supports sync and async
- Connection pooling
- Pipelining for performance

---

### 44. Tortoise ORM
**URL**: https://github.com/tortoise/tortoise-orm
**Type**: Async ORM for Python
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/tortoise/tortoise-orm.git
cd tortoise-orm

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import asyncio
from tortoise import Tortoise, fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100, unique=True)
    
    class Meta:
        table = "users"

async def main():
    # Initialize Tortoise ORM
    await Tortoise.init(
        db_url='sqlite://:memory:',
        modules={'models': ['__main__']}
    )
    await Tortoise.generate_schemas()
    
    # Create user
    user = await User.create(name="John", email="john@example.com")
    print(f"Created: {user}")
    
    # Query
    users = await User.all()
    print(f"Users: {users}")
    
    # Close
    await Tortoise.close_connections()

if __name__ == "__main__":
    asyncio.run(main())
EOF

# Install Tortoise
pip install tortoise-orm

# Run example
python main.py

# Run tests
cd /path/to/tortoise-orm
pytest tests/
```

**Dependencies**:
- tortoise-orm
- aiosqlite (for SQLite)
- asyncpg (for PostgreSQL)

**Setup Notes**:
- Async ORM for FastAPI
- Supports PostgreSQL, MySQL, SQLite
- Migration support with Aerich

---

### 45. Piccolo ORM
**URL**: https://github.com/piccolo-orm/piccolo
**Type**: Async ORM with Admin Panel
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/piccolo-orm/piccolo.git
cd piccolo

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import asyncio
from piccolo.table import Table
from piccolo.columns import Varchar
from piccolo.conf.apps import AppRegistry

class User(Table):
    name = Varchar(length=100)
    email = Varchar(length=100)

async def main():
    # Create table
    await User.create_table(if_not_exists=True)
    
    # Insert
    user = await User.insert(
        User(name="John", email="john@example.com")
    )
    print(f"Created: {user}")
    
    # Query
    users = await User.select()
    print(f"Users: {users}")

if __name__ == "__main__":
    asyncio.run(main())
EOF

# Install Piccolo
pip install piccolo

# Create admin
piccolo create_app example_app

# Run admin panel
piccolo run admin

# Run tests
cd /path/to/piccolo
pytest tests/
```

**Dependencies**:
- piccolo
- piccolo-admin
- aiosqlite or asyncpg

**Setup Notes**:
- Lightweight async ORM
- Built-in admin panel
- Migration support

---

## FLASK FRAMEWORKS

### 46. Flask itself
**URL**: https://github.com/pallets/flask
**Type**: Web Framework
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/pallets/flask.git
cd flask

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Hello, Flask!"})

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    return jsonify(data), 201

@app.route('/users/<int:user_id>')
def get_user(user_id):
    return jsonify({"id": user_id, "name": "John"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install Flask
pip install flask

# Run development server
python app.py

# Or use Flask CLI
export FLASK_APP=app.py
flask run

# Run tests
cd /path/to/flask
pytest tests/
```

**Dependencies**:
- flask
- werkzeug
- jinja2

**Setup Notes**:
- Lightweight web framework
- Blueprint system for modularity
- Built-in development server

---

### 47. Flask-SQLAlchemy
**URL**: https://github.com/pallets-eco/flask-sqlalchemy
**Type**: Flask SQLAlchemy Extension
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/pallets-eco/flask-sqlalchemy.git
cd flask-sqlalchemy

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name} for u in users])

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flask-sqlalchemy

# Run development server
python app.py

# Run tests
cd /path/to/flask-sqlalchemy
pytest tests/
```

**Dependencies**:
- flask
- sqlalchemy
- flask-sqlalchemy

**Setup Notes**:
- Easy SQLAlchemy integration
- ORM models with Flask patterns
- Auto-database creation

---

### 48. Flask-RESTful
**URL**: https://github.com/flask-restful/flask-restful
**Type**: REST API Extension
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/flask-restful/flask-restful.git
cd flask-restful

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class User(Resource):
    def get(self, id):
        return {'user': id}
    
    def post(self, id):
        return {'posted': id}, 201

api.add_resource(HelloWorld, '/')
api.add_resource(User, '/users/<int:id>')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flask-restful

# Run development server
python app.py

# Run tests
cd /path/to/flask-restful
pytest tests/
```

**Dependencies**:
- flask
- flask-restful
- aniso8601

**Setup Notes**:
- Decorators for REST endpoints
- Automatic error handling
- Argument parsing built-in

---

### 49. Flask-Login
**URL**: https://github.com/maxcountryman/flask-login
**Type**: User Authentication
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/maxcountryman/flask-login.git
cd flask-login

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask, render_template_string, redirect, url_for
from flask_login import LoginManager, UserMixin, login_user, logout_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'secret'

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@app.route('/login')
def login():
    user = User(1)
    login_user(user)
    return redirect(url_for('profile'))

@app.route('/profile')
@login_required
def profile():
    return 'Profile page'

@app.route('/logout')
def logout():
    logout_user()
    return 'Logged out'

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flask-login

# Run development server
python app.py

# Run tests
cd /path/to/flask-login
pytest tests/
```

**Dependencies**:
- flask
- flask-login
- werkzeug

**Setup Notes**:
- User session management
- Login/logout decorators
- User loader callback

---

### 50. Flask-JWT-Extended
**URL**: https://github.com/vimalloc/flask-jwt-extended
**Type**: JWT Authentication
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/vimalloc/flask-jwt-extended.git
cd flask-jwt-extended

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret'

jwt = JWTManager(app)

@app.route('/login', methods=['POST'])
def login():
    access_token = create_access_token(identity='testuser')
    return jsonify(access_token=access_token)

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(hello='world')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flask-jwt-extended

# Run development server
python app.py

# Run tests
cd /path/to/flask-jwt-extended
pytest tests/
```

**Dependencies**:
- flask
- flask-jwt-extended
- PyJWT
- python-dotenv

**Setup Notes**:
- JWT token creation/verification
- Access and refresh tokens
- Role-based access control

---

### 51. Flask-Migrate
**URL**: https://github.com/miguelgrinberg/Flask-Migrate
**Type**: Database Migrations
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/miguelgrinberg/Flask-Migrate.git
cd Flask-Migrate

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example Flask app with migrations
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

if __name__ == '__main__':
    app.run()
EOF

# Install dependencies
pip install flask flask-sqlalchemy flask-migrate

# Initialize migrations
flask db init

# Create migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade

# View migration history
flask db history

# Downgrade
flask db downgrade

# Run tests
cd /path/to/Flask-Migrate
pytest tests/
```

**Dependencies**:
- flask
- flask-sqlalchemy
- flask-migrate
- alembic

**Setup Notes**:
- Version control for database schema
- Flask CLI integration
- Auto-generate migrations

---

### 52. Flask-Cors
**URL**: https://github.com/corydolphin/flask-cors
**Type**: CORS Extension
**Complexity**: Beginner

```bash
# Clone repository
git clone https://github.com/corydolphin/flask-cors.git
cd flask-cors

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data')
def get_data():
    return jsonify({"data": "value"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flask-cors

# Run development server
python app.py

# Run tests
cd /path/to/flask-cors
pytest tests/
```

**Dependencies**:
- flask
- flask-cors

**Setup Notes**:
- Enable CORS for Flask endpoints
- Configurable origins and methods
- Decorator and app-level setup

---

### 53. Flasgger
**URL**: https://github.com/flasgger/flasgger
**Type**: Swagger/OpenAPI UI for Flask
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/flasgger/flasgger.git
cd flasgger

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask, jsonify
from flasgger import Swagger

app = Flask(__name__)
swagger = Swagger(app)

@app.route('/users/<int:user_id>')
def get_user(user_id):
    """
    Get user by ID
    ---
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: User data
    """
    return jsonify({"id": user_id, "name": "John"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flasgger

# Run development server
python app.py

# Access Swagger UI at http://localhost:5000/apidocs/

# Run tests
cd /path/to/flasgger
pytest tests/
```

**Dependencies**:
- flask
- flasgger
- jsonschema

**Setup Notes**:
- Swagger UI from docstrings
- OpenAPI documentation
- Interactive API testing

---

### 54. Flask-Limiter
**URL**: https://github.com/alisaifee/flask-limiter
**Type**: Rate Limiting
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/alisaifee/flask-limiter.git
cd flask-limiter

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route("/api/resource")
@limiter.limit("5 per minute")
def limited_resource():
    return {"message": "Limited resource"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flask-limiter

# Run development server
python app.py

# Run tests
cd /path/to/flask-limiter
pytest tests/
```

**Dependencies**:
- flask
- flask-limiter
- limits

**Setup Notes**:
- Rate limit by IP address
- Custom rate limit strategies
- Redis backend for distributed systems

---

### 55. Click
**URL**: https://github.com/pallets/click
**Type**: CLI Library
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/pallets/click.git
cd click

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example CLI application
mkdir example_app
cd example_app

# Create cli.py:
cat > cli.py << EOF
import click

@click.command()
@click.option('--name', prompt='Your name', help='Name to greet')
@click.option('--count', default=1, help='Number of greetings')
def hello(name, count):
    """Simple program that greets NAME COUNT times."""
    for _ in range(count):
        click.echo(f'Hello {name}!')

@click.group()
def cli():
    """Main CLI group"""
    pass

@cli.command()
def sync():
    """Sync command"""
    click.echo('Syncing...')

@cli.command()
def reset():
    """Reset command"""
    click.echo('Resetting...')

if __name__ == '__main__':
    hello()
EOF

# Install click
pip install click

# Run CLI
python cli.py --help
python cli.py --name John --count 3

# Run tests
cd /path/to/click
pytest tests/
```

**Dependencies**:
- click
- colorama (optional)

**Setup Notes**:
- Command-line interface library
- Decorators for commands and options
- Built-in help generation

---

### 56. Werkzeug
**URL**: https://github.com/pallets/werkzeug
**Type**: WSGI Utility Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pallets/werkzeug.git
cd werkzeug

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple

def application(environ, start_response):
    request = Request(environ)
    response = Response(f'Hello {request.args.get("name", "World")}!')
    return response(environ, start_response)

if __name__ == '__main__':
    run_simple('localhost', 5000, application, use_debugger=True, use_reloader=True)
EOF

# Install werkzeug
pip install werkzeug

# Run development server
python app.py

# Run tests
cd /path/to/werkzeug
pytest tests/
```

**Dependencies**:
- werkzeug
- markupsafe

**Setup Notes**:
- WSGI utilities and middleware
- Request/response handling
- Data structure utilities

---

### 57. Jinja2
**URL**: https://github.com/pallets/jinja
**Type**: Template Engine
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/pallets/jinja.git
cd jinja

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create template.py:
cat > template.py << EOF
from jinja2 import Environment, FileSystemLoader, select_autoescape

env = Environment(
    loader=FileSystemLoader('.'),
    autoescape=select_autoescape(['html', 'xml'])
)

template = env.from_string('Hello {{ name }}!')
output = template.render(name='World')
print(output)

# Template with loops
template = env.from_string('''
<ul>
{% for item in items %}
  <li>{{ item }}</li>
{% endfor %}
</ul>
''')
output = template.render(items=['a', 'b', 'c'])
print(output)
EOF

# Install jinja2
pip install jinja2

# Run example
python template.py

# Run tests
cd /path/to/jinja
pytest tests/
```

**Dependencies**:
- jinja2
- markupsafe

**Setup Notes**:
- Template engine for Python
- Used by Flask
- Auto-escaping support

---

### 58. ItsDangerous
**URL**: https://github.com/pallets/itsdangerous
**Type**: Data Signing Library
**Complexity**: Beginner

```bash
# Clone repository
git clone https://github.com/pallets/itsdangerous.git
cd itsdangerous

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create signing.py:
cat > signing.py << EOF
from itsdangerous import Signer, TimestampSigner, URLSafeSerializer

# Simple signing
signer = Signer('secret-key')
signed_data = signer.sign('my data')
print(f"Signed: {signed_data}")

# Verify signature
original = signer.unsign(signed_data)
print(f"Unsigned: {original}")

# Timestamp signing (expires after period)
ts_signer = TimestampSigner('secret-key')
ts_signed = ts_signer.sign('my data')
ts_original = ts_signer.unsign(ts_signed, max_age=3600)

# Serialization
serializer = URLSafeSerializer('secret-key')
token = serializer.dumps({'id': 42})
data = serializer.loads(token)
print(f"Data: {data}")
EOF

# Install itsdangerous
pip install itsdangerous

# Run example
python signing.py

# Run tests
cd /path/to/itsdangerous
pytest tests/
```

**Dependencies**:
- itsdangerous

**Setup Notes**:
- HMAC-based data signing
- URL-safe serialization
- Token expiration support

---

### 59. Marshmallow
**URL**: https://github.com/marshmallow-code/marshmallow
**Type**: Object Serialization
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/marshmallow-code/marshmallow.git
cd marshmallow

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create schema.py:
cat > schema.py << EOF
from marshmallow import Schema, fields, validate, post_load

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)
    age = fields.Int(validate=validate.Range(min=0, max=150))

schema = UserSchema()

# Serialize
data = {"id": 1, "name": "John", "email": "john@example.com", "age": 30}
result = schema.dump(data)
print(f"Serialized: {result}")

# Deserialize
input_data = {"name": "Jane", "email": "jane@example.com", "age": 25}
result = schema.load(input_data)
print(f"Deserialized: {result}")
EOF

# Install marshmallow
pip install marshmallow

# Run example
python schema.py

# Run tests
cd /path/to/marshmallow
pytest tests/
```

**Dependencies**:
- marshmallow
- python-dateutil

**Setup Notes**:
- Object serialization/deserialization
- Validation integrated
- Flask/SQLAlchemy integration

---

### 60. Apispec
**URL**: https://github.com/marshmallow-code/apispec
**Type**: OpenAPI Spec Generator
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/marshmallow-code/apispec.git
cd apispec

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create spec.py:
cat > spec.py << EOF
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from marshmallow import Schema, fields

spec = APISpec(
    title="My API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[MarshmallowPlugin()],
)

class UserSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    email = fields.Email()

spec.components.schema("User", schema=UserSchema)

# Add operation
spec.path(
    path="/users/{user_id}",
    operations={
        "get": {
            "parameters": [
                {"name": "user_id", "in": "path", "required": True, "schema": {"type": "integer"}}
            ],
            "responses": {
                "200": {
                    "content": {
                        "application/json": {
                            "schema": UserSchema
                        }
                    }
                }
            }
        }
    }
)

import json
print(json.dumps(spec.to_dict(), indent=2))
EOF

# Install apispec
pip install apispec

# Run example
python spec.py

# Run tests
cd /path/to/apispec
pytest tests/
```

**Dependencies**:
- apispec
- marshmallow
- pyyaml

**Setup Notes**:
- Generate OpenAPI/Swagger specs
- Marshmallow plugin for schema generation
- Declarative specification

---

### 61. Flask-Cache
**URL**: https://github.com/pallets-eco/flask-caching
**Type**: Caching Extension
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pallets-eco/flask-caching.git
cd flask-caching

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask
from flask_caching import Cache

app = Flask(__name__)
app.config['CACHE_TYPE'] = 'simple'
cache = Cache(app)

@app.route('/data')
@cache.cached(timeout=60)
def get_data():
    print("Computing expensive operation...")
    return {"data": "value"}

@app.route('/clear-cache')
def clear_cache():
    cache.clear()
    return "Cache cleared"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
EOF

# Install dependencies
pip install flask flask-caching

# Run development server
python app.py

# Run tests
cd /path/to/flask-caching
pytest tests/
```

**Dependencies**:
- flask
- flask-caching
- redis (for Redis backend)

**Setup Notes**:
- In-memory, Redis, or Memcached caching
- Decorator-based caching
- View and function caching

---

### 62. Python-dotenv
**URL**: https://github.com/theskumar/python-dotenv
**Type**: Environment Configuration
**Complexity**: Beginner

```bash
# Clone repository
git clone https://github.com/theskumar/python-dotenv.git
cd python-dotenv

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create .env file:
cat > .env << EOF
DEBUG=True
SECRET_KEY=my-secret-key
DATABASE_URL=sqlite:///app.db
EOF

# Create app.py:
cat > app.py << EOF
import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = os.getenv('DEBUG', 'False') == 'True'
SECRET_KEY = os.getenv('SECRET_KEY')
DATABASE_URL = os.getenv('DATABASE_URL')

print(f"DEBUG={DEBUG}")
print(f"SECRET_KEY={SECRET_KEY}")
print(f"DATABASE_URL={DATABASE_URL}")
EOF

# Install python-dotenv
pip install python-dotenv

# Run example
python app.py

# Run tests
cd /path/to/python-dotenv
pytest tests/
```

**Dependencies**:
- python-dotenv
- python-cli-core (optional)

**Setup Notes**:
- Load .env files
- Environment variable management
- Development/production configs

---

### 63. Requests
**URL**: https://github.com/psf/requests
**Type**: HTTP Library
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/psf/requests.git
cd requests

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create http_client.py:
cat > http_client.py << EOF
import requests

# GET request
response = requests.get('https://httpbin.org/get')
print(f"Status: {response.status_code}")
print(f"JSON: {response.json()}")

# POST request
data = {"name": "John", "email": "john@example.com"}
response = requests.post('https://httpbin.org/post', json=data)
print(f"Posted: {response.json()}")

# Headers
headers = {"Authorization": "Bearer token"}
response = requests.get('https://httpbin.org/headers', headers=headers)
print(f"Headers: {response.json()}")

# Session
session = requests.Session()
session.headers.update({"User-Agent": "MyApp/1.0"})
response = session.get('https://httpbin.org/user-agent')
print(f"User-Agent: {response.json()}")
EOF

# Install requests
pip install requests

# Run example
python http_client.py

# Run tests
cd /path/to/requests
pytest tests/
```

**Dependencies**:
- requests
- urllib3
- charset-normalizer

**Setup Notes**:
- Simple HTTP library
- Sessions for connection pooling
- Automatic JSON encoding/decoding

---

### 64. Gunicorn
**URL**: https://github.com/benoitc/gunicorn
**Type**: WSGI HTTP Server
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/benoitc/gunicorn.git
cd gunicorn

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example Flask application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello from Gunicorn!'

if __name__ == '__main__':
    app.run()
EOF

# Install dependencies
pip install flask gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# Options:
# -w: number of workers
# -b: bind address
# --reload: reload on code changes
# --access-logfile: access log file
# --error-logfile: error log file

# Run tests
cd /path/to/gunicorn
pytest tests/
```

**Dependencies**:
- gunicorn
- wheel

**Setup Notes**:
- Production WSGI server
- Process management
- Load balancing

---

### 65. Waitress
**URL**: https://github.com/Pylons/waitress
**Type**: Pure Python WSGI Server
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/Pylons/waitress.git
cd waitress

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example Flask application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return [b'Hello from Waitress!']
EOF

# Install waitress
pip install waitress

# Run with Waitress
waitress-serve --port=8000 app:application

# Or programmatically
# from waitress import serve
# serve(application, host='0.0.0.0', port=8000)

# Run tests
cd /path/to/waitress
pytest tests/
```

**Dependencies**:
- waitress

**Setup Notes**:
- Pure Python WSGI server
- No C extensions required
- Production-ready

---

## OTHER ASYNC FRAMEWORKS

### 66. Sanic
**URL**: https://github.com/sanic-org/sanic
**Type**: Async Web Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/sanic-org/sanic.git
cd sanic

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from sanic import Sanic
from sanic.response import json

app = Sanic("myapp")

@app.route("/")
async def hello(request):
    return json({"hello": "world"})

@app.route("/users/<user_id:int>")
async def get_user(request, user_id):
    return json({"id": user_id})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
EOF

# Install sanic
pip install sanic

# Run development server
python main.py

# Run tests
cd /path/to/sanic
pytest tests/
```

**Dependencies**:
- sanic
- uvicorn
- httptools

**Setup Notes**:
- Async-first framework
- High performance
- WebSocket support

---

### 67. AIOHTTP
**URL**: https://github.com/aio-libs/aiohttp
**Type**: Async HTTP Client/Server
**Complexity**: Intermediate to Advanced

```bash
# Clone repository
git clone https://github.com/aio-libs/aiohttp.git
cd aiohttp

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import asyncio
from aiohttp import web

async def handle_hello(request):
    return web.Response(text="Hello, AIOHTTP!")

async def handle_json(request):
    return web.json_response({"message": "Hello"})

async def main():
    app = web.Application()
    app.router.add_get('/', handle_hello)
    app.router.add_get('/json', handle_json)
    
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, 'localhost', 8000)
    await site.start()
    
    print("Server running at http://localhost:8000")
    await asyncio.Event().wait()

if __name__ == '__main__':
    asyncio.run(main())
EOF

# Install aiohttp
pip install aiohttp

# Run development server
python main.py

# Run tests
cd /path/to/aiohttp
pytest tests/
```

**Dependencies**:
- aiohttp
- multidict
- async-timeout

**Setup Notes**:
- Async HTTP client and server
- WebSocket support
- Middleware system

---

### 68. Quart
**URL**: https://github.com/pgjones/quart
**Type**: Async Flask-like Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pgjones/quart.git
cd quart

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from quart import Quart, jsonify

app = Quart(__name__)

@app.route('/')
async def hello():
    return jsonify(hello='world')

@app.route('/users/<int:user_id>')
async def get_user(user_id):
    return jsonify(id=user_id, name='John')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
EOF

# Install quart
pip install quart

# Run development server
python main.py

# Run tests
cd /path/to/quart
pytest tests/
```

**Dependencies**:
- quart
- starlette
- hypercorn

**Setup Notes**:
- Flask-like API but async
- Hypercorn server
- WebSocket support

---

### 69. Hypercorn
**URL**: https://github.com/pgjones/hypercorn
**Type**: ASGI Server
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pgjones/hypercorn.git
cd hypercorn

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example ASGI application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
async def app(scope, receive, send):
    if scope['type'] == 'http':
        await send({
            'type': 'http.response.start',
            'status': 200,
            'headers': [[b'content-type', b'text/plain']],
        })
        await send({
            'type': 'http.response.body',
            'body': b'Hello, Hypercorn!',
        })
EOF

# Install hypercorn
pip install hypercorn

# Run development server
hypercorn main:app --bind 0.0.0.0:8000 --reload

# Run tests
cd /path/to/hypercorn
pytest tests/
```

**Dependencies**:
- hypercorn
- h2
- h11

**Setup Notes**:
- ASGI server with HTTP/2 support
- WebSocket support
- Process management

---

### 70. Tornado
**URL**: https://github.com/tornadoweb/tornado
**Type**: Scalable Async Web Framework
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/tornadoweb/tornado.git
cd tornado

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write({"message": "Hello, Tornado!"})

class UserHandler(tornado.web.RequestHandler):
    def get(self, user_id):
        self.write({"id": user_id})

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/users/([0-9]+)", UserHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    print("Server running at http://localhost:8000")
    tornado.ioloop.IOLoop.current().start()
EOF

# Install tornado
pip install tornado

# Run development server
python main.py

# Run tests
cd /path/to/tornado
pytest tests/
```

**Dependencies**:
- tornado
- pycurl (optional)

**Setup Notes**:
- Non-blocking I/O
- WebSocket support
- Real-time applications

---

### 71. Daphne
**URL**: https://github.com/django/daphne
**Type**: ASGI Server for Django
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/django/daphne.git
cd daphne

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example Django project
mkdir example_app
cd example_app

# Create Django project
django-admin startproject config .

# Install daphne
pip install daphne django

# Add to INSTALLED_APPS:
# 'daphne',

# Run development server
python manage.py runserver

# Or with Daphne explicitly
daphne -b 0.0.0.0 -p 8000 config.asgi:application

# Run tests
cd /path/to/daphne
pytest tests/
```

**Dependencies**:
- daphne
- twisted
- autobahn
- django

**Setup Notes**:
- ASGI server for Django
- WebSocket support via Channels
- Production-ready

---

### 72. Django Channels
**URL**: https://github.com/django/channels
**Type**: WebSocket Support for Django
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/django/channels.git
cd channels

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements/dev.txt

# Run tests
pytest -v

# Create example Django project
mkdir example_app
cd example_app

# Create Django project
django-admin startproject config .

# Create Django app
python manage.py startapp chat

# Install channels
pip install channels daphne

# Add to INSTALLED_APPS:
# 'daphne',
# 'channels',
# 'chat',

# Add ASGI_APPLICATION:
# ASGI_APPLICATION = 'config.asgi.application'

# Create consumers.py in chat app:
cat > chat/consumers.py << EOF
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
    
    async def disconnect(self, close_code):
        pass
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.send(text_data=json.dumps({
            'message': data.get('message')
        }))
EOF

# Run development server
python manage.py runserver

# Run tests
cd /path/to/channels
pytest tests/
```

**Dependencies**:
- channels
- daphne
- django
- redis (optional)

**Setup Notes**:
- WebSocket support for Django
- Async consumers
- Channel groups for broadcasting

---

### 73. Trio
**URL**: https://github.com/python-trio/trio
**Type**: Async I/O Library
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/python-trio/trio.git
cd trio

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import trio

async def child(n):
    print(f"Child {n} start")
    await trio.sleep(1)
    print(f"Child {n} end")

async def main():
    print("Main start")
    async with trio.open_nursery() as nursery:
        for i in range(3):
            nursery.start_soon(child, i)
    print("Main end")

if __name__ == '__main__':
    trio.run(main)
EOF

# Install trio
pip install trio

# Run example
python main.py

# Run tests
cd /path/to/trio
pytest tests/
```

**Dependencies**:
- trio
- sniffio
- outcome

**Setup Notes**:
- Async I/O library with structured concurrency
- Nursery pattern for task management
- Built-in testing utilities

---

### 74. AnyIO
**URL**: https://github.com/agronholm/anyio
**Type**: Async Interoperability Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/agronholm/anyio.git
cd anyio

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import anyio

async def main():
    # Works with asyncio or trio backend
    async with anyio.open_signal_receiver(15, 16, 17) as signals:
        async for signum in signals:
            print(f"Received signal {signum}")

anyio.run(main)  # Uses asyncio by default
EOF

# Install anyio
pip install anyio

# Run tests
cd /path/to/anyio
pytest tests/
```

**Dependencies**:
- anyio
- sniffio

**Setup Notes**:
- Backend-agnostic async code
- Works with asyncio and trio
- Portable async patterns

---

### 75. Sniffio
**URL**: https://github.com/python-trio/sniffio
**Type**: Async Library Detection
**Complexity**: Beginner

```bash
# Clone repository
git clone https://github.com/python-trio/sniffio.git
cd sniffio

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import sniffio
import asyncio

async def detect_backend():
    backend = sniffio.current_async_library()
    print(f"Current async backend: {backend}")

asyncio.run(detect_backend())
EOF

# Install sniffio
pip install sniffio

# Run example
python main.py
```

**Dependencies**:
- sniffio

**Setup Notes**:
- Detect async library at runtime
- Used by AnyIO
- Minimal dependencies

---

### 76. Granian
**URL**: https://github.com/emmett-framework/granian
**Type**: Rust HTTP Server for Python
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/emmett-framework/granian.git
cd granian

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install Granian
pip install granian

# Create example ASGI application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
async def app(scope, receive, send):
    if scope['type'] == 'http':
        await send({
            'type': 'http.response.start',
            'status': 200,
            'headers': [[b'content-type', b'text/plain']],
        })
        await send({
            'type': 'http.response.body',
            'body': b'Hello from Granian!',
        })

if __name__ == '__main__':
    import granian
    granian.serve(app, host='0.0.0.0', port=8000)
EOF

# Run server
granian main:app --host 0.0.0.0 --port 8000

# Or from Python
python main.py
```

**Dependencies**:
- granian

**Setup Notes**:
- High-performance Rust-based HTTP server
- ASGI support
- Pre-built binaries

---

### 77. Blacksheep
**URL**: https://github.com/Neoteroi/BlackSheep
**Type**: Async Web Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/Neoteroi/BlackSheep.git
cd BlackSheep

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from blacksheep import Application, get
from blacksheep.server.responses import json as json_response

app = Application()

@get('/')
async def hello():
    return json_response({'message': 'Hello, BlackSheep!'})

@get('/users/{user_id}')
async def get_user(user_id: int):
    return json_response({'id': user_id})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
EOF

# Install blacksheep
pip install blacksheep

# Run development server
python main.py

# Run tests
cd /path/to/BlackSheep
pytest tests/
```

**Dependencies**:
- blacksheep
- uvicorn

**Setup Notes**:
- Type hints for routing
- Dependency injection
- High performance

---

### 78. Emmett
**URL**: https://github.com/emmett-framework/emmett
**Type**: Modern Async Web Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/emmett-framework/emmett.git
cd emmett

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from emmett import App, get

app = App(__name__)

@app.route('/')
async def hello():
    return {'message': 'Hello, Emmett!'}

@get('/users/<int:user_id>')
async def get_user(user_id):
    return {'id': user_id}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
EOF

# Install emmett
pip install emmett

# Run development server
python main.py
```

**Dependencies**:
- emmett
- pendulum
- pydantic

**Setup Notes**:
- Async-first framework
- Clean routing API
- Built-in ORM

---

### 79. Fastblocks
**URL**: https://github.com/lesleslie/fastblocks
**Type**: Starlette-based Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/lesleslie/fastblocks.git
cd fastblocks

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from fastblocks import Fastblocks

app = Fastblocks()

@app.get('/')
async def hello():
    return {'message': 'Hello, Fastblocks!'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
EOF

# Install fastblocks
pip install fastblocks

# Run development server
python main.py
```

**Dependencies**:
- fastblocks
- starlette

**Setup Notes**:
- Built on Starlette
- Rapid development framework

---

### 80. Esmerald
**URL**: https://github.com/litestar-org/esmerald
**Type**: Modern ASGI Framework
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/litestar-org/esmerald.git
cd esmerald

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
from esmerald import Esmerald, get

@get('/')
def hello() -> dict:
    return {'message': 'Hello, Esmerald!'}

app = Esmerald(route_handlers=[hello])

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
EOF

# Install esmerald
pip install esmerald

# Run development server
python main.py
```

**Dependencies**:
- esmerald
- starlette
- pydantic

**Setup Notes**:
- Type hints first design
- Dependency injection
- Production-ready

---

## FRAPPE & SPECIALIZED FRAMEWORKS

### 81. Frappe Framework
**URL**: https://github.com/frappe/frappe
**Type**: Full-Stack Web Framework
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/frappe/frappe.git
cd frappe

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Install bench (development tool)
pip install frappe-bench

# Create bench directory
cd ..
mkdir frappe-dev
cd frappe-dev

# Initialize bench
bench init --frappe-branch version-15 frappe-app

# Navigate to bench
cd frappe-app

# Clone frappe from local
# bench get-app frappe /path/to/frappe

# Create site
bench new-site mysite.local

# Install frappe
bench --site mysite.local install-app frappe

# Set admin password
bench --site mysite.local set-admin-password admin

# Start development server
bench start

# Run tests
bench --site mysite.local run-tests --module frappe.desk
```

**Dependencies**:
- frappe-bench
- MariaDB/PostgreSQL
- Node.js 14+
- redis

**Setup Notes**:
- Bench is essential
- Multiple sites per installation
- Built-in admin interface

---

### 82. Pyramid
**URL**: https://github.com/Pylons/pyramid
**Type**: Flexible Web Framework
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/Pylons/pyramid.git
cd pyramid

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example project
pcreate -s starter example_project
cd example_project

# Create venv for project
python -m venv venv
source venv/bin/activate

# Install project dependencies
pip install -e .

# Run development server
pserve development.ini

# Run tests
pytest
```

**Dependencies**:
- pyramid
- waitress
- webob
- zope.interface

**Setup Notes**:
- Flexible routing
- Configuration-driven
# Run development server
python app.py

# Run tests
cd /path/to/pyramid
pytest tests/
```

**Dependencies**:
- pyramid
- waitress
- webob

**Setup Notes**:
- Very flexible framework
- Configuration file based routing
- Production-ready

---

### 83. CubicWeb
**URL**: https://github.com/gurneyalex/cubicweb
**Type**: Semantic Web Framework
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/gurneyalex/cubicweb.git
cd cubicweb

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# CubicWeb is specialized for semantic web development
# Typical setup involves RDF triple stores

# Create example application would require
# significant configuration - refer to CubicWeb documentation
```

**Dependencies**:
- cubicweb
- rdflib
- SPARQL endpoint (optional)

**Setup Notes**:
- Semantic web framework
- RDF/SPARQL support
- Knowledge graphs

---

### 84. Tornado Web Framework
**Reference**: See #70 in Other Async Frameworks section

---

### 85. Plone CMS
**URL**: https://github.com/plone/Products.CMFCore
**Type**: Enterprise CMS
**Complexity**: Expert

```bash
# Clone repository
git clone https://github.com/plone/Products.CMFCore.git
cd Products.CMFCore

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# For full Plone installation, use buildout:
# git clone https://github.com/plone/plone.release.git
# cd plone.release
# python -m venv venv
# source venv/bin/activate
# pip install zc.buildout
# buildout

# Run tests
pytest
```

**Dependencies**:
- Zope
- ZODB
- zope.interface
- zope.component

**Setup Notes**:
- Built on Zope application server
- Object database (ZODB)
- Enterprise content management

---

### 86. Zope
**URL**: https://github.com/zopefoundation/Zope
**Type**: Object-Oriented Web Framework
**Complexity**: Advanced

```bash
# Clone repository
git clone https://github.com/zopefoundation/Zope.git
cd Zope

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create simple.py:
cat > simple.py << EOF
from Zope2.App import ZopeApplication

app = ZopeApplication()
EOF

# Run development server
python -m zope.server.server

# Run tests
cd /path/to/Zope
pytest tests/
```

**Dependencies**:
- Zope
- ZODB
- zope.interface
- transaction

**Setup Notes**:
- Object database
- Component architecture
- Transaction management

---

### 87. TurboGears
**URL**: https://github.com/TurboGears/tg
**Type**: Scalable Web Framework
**Complexity**: Intermediate to Advanced

```bash
# Clone repository
git clone https://github.com/TurboGears/tg.git
cd tg

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create new TurboGears project
# gearbox quickstart myproject

# Run development server
# gearbox serve -c development.ini

# Run tests
pytest tests/
```

**Dependencies**:
- turbogears2
- sqlalchemy
- webob
- paste

**Setup Notes**:
- Full-stack framework
- MVC architecture
- SQLAlchemy ORM included

---

### 88. web2py
**URL**: https://github.com/web2py/web2py
**Type**: Full-Stack Web Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/web2py/web2py.git
cd web2py

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip

# No requirements.txt - web2py is self-contained
# Just run directly:

# Run development server
python web2py.py -a admin -p 8000

# Access at http://localhost:8000/admin/

# Create new application
python web2py.py -S myapp

# Run tests (if available)
# python -m pytest tests/
```

**Dependencies**:
- web2py (self-contained)

**Setup Notes**:
- Full-stack framework
- Built-in admin interface
- DAL (Database Abstraction Layer)
- Password: set via -a flag

---

### 89. Bottle
**URL**: https://github.com/bottlepy/bottle
**Type**: Micro Web Framework
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/bottlepy/bottle.git
cd bottle

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create app.py:
cat > app.py << EOF
from bottle import Bottle, route, run

app = Bottle()

@app.route('/')
def hello():
    return {'message': 'Hello, Bottle!'}

@app.route('/users/<user_id:int>')
def get_user(user_id):
    return {'id': user_id}

if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
EOF

# Install bottle
pip install bottle

# Run development server
python app.py

# Run tests
cd /path/to/bottle
pytest tests/
```

**Dependencies**:
- bottle

**Setup Notes**:
- Single file framework
- Minimal dependencies
- Perfect for small projects

---

### 90. Hug
**URL**: https://github.com/hugapi/hug
**Type**: Micro API Framework
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/hugapi/hug.git
cd hug

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example application
mkdir example_app
cd example_app

# Create main.py:
cat > main.py << EOF
import hug

@hug.get()
def hello():
    return {'message': 'Hello, Hug!'}

@hug.get('/users/{user_id:int}')
def get_user(user_id: int):
    return {'id': user_id}

@hug.post()
def create_user(name: str, email: str):
    return {'name': name, 'email': email}

if __name__ == '__main__':
    hug.run(main)
EOF

# Install hug
pip install hug

# Run development server
hug -f main.py

# Run tests
cd /path/to/hug
pytest tests/
```

**Dependencies**:
- hug
- falcon
- python-dateutil

**Setup Notes**:
- Type hints for API documentation
- WSGI and ASGI support
- Auto-generated API docs

---

## DATA & UTILITIES

### 91. Pandas
**URL**: https://github.com/pandas-dev/pandas
**Type**: Data Manipulation Library
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pandas-dev/pandas.git
cd pandas

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies (requires compilation)
pip install --upgrade pip
pip install -r requirements.txt

# Build and install (may take time)
python setup.py build_ext --inplace
pip install -e .

# Run tests (takes significant time)
pytest -v

# Create example
mkdir example_app
cd example_app

# Create data.py:
cat > data.py << EOF
import pandas as pd

# Create DataFrame
df = pd.DataFrame({
    'name': ['John', 'Jane', 'Bob'],
    'age': [30, 25, 35],
    'city': ['NYC', 'LA', 'Chicago']
})

print(df)

# Operations
print(df[df['age'] > 25])
print(df.groupby('city')['age'].mean())

# Read/write CSV
df.to_csv('data.csv', index=False)
df2 = pd.read_csv('data.csv')
EOF

# Install pandas
pip install pandas

# Run example
python data.py
```

**Dependencies**:
- numpy
- pandas
- python-dateutil
- pytz

**Setup Notes**:
- Data manipulation library
- CSV, Excel, SQL support
- Groupby and aggregation operations

---

### 92. NumPy
**URL**: https://github.com/numpy/numpy
**Type**: Numerical Computing Library
**Complexity**: Intermediate to Advanced

```bash
# Clone repository
git clone https://github.com/numpy/numpy.git
cd numpy

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies (requires C compiler)
pip install --upgrade pip
pip install cython

# Build (takes time)
python setup.py build_ext --inplace

# Install
pip install -e .

# Run tests
pytest -v

# Create example
mkdir example_app
cd example_app

# Create arrays.py:
cat > arrays.py << EOF
import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
print(f"Array: {arr}")

# Operations
print(f"Sum: {np.sum(arr)}")
print(f"Mean: {np.mean(arr)}")
print(f"Std: {np.std(arr)}")

# Matrix operations
matrix = np.array([[1, 2], [3, 4]])
print(f"Matrix:\n{matrix}")
print(f"Transpose:\n{matrix.T}")
EOF

# Install numpy
pip install numpy

# Run example
python arrays.py
```

**Dependencies**:
- numpy
- cython
- C compiler

**Setup Notes**:
- Numerical computing
- Matrix operations
- Foundation for scientific Python

---

### 93. Celery
**Reference**: See #18 in Django Frameworks section

---

### 94. APScheduler
**URL**: https://github.com/agronholm/apscheduler
**Type**: Advanced Scheduling
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/agronholm/apscheduler.git
cd apscheduler

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example
mkdir example_app
cd example_app

# Create scheduler.py:
cat > scheduler.py << EOF
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import time

def tick():
    print('Tick! {}'.format(datetime.now()))

scheduler = BackgroundScheduler()
scheduler.add_job(tick, 'interval', seconds=3)
scheduler.start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    scheduler.shutdown()
EOF

# Install apscheduler
pip install apscheduler

# Run example
python scheduler.py

# Run tests
cd /path/to/apscheduler
pytest tests/
```

**Dependencies**:
- apscheduler
- tzlocal
- pytz

**Setup Notes**:
- Task scheduling
- Cron-like jobs
- Multiple trigger types

---

### 95. Sentry Python SDK
**URL**: https://github.com/getsentry/sentry-python
**Type**: Error Tracking SDK
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/getsentry/sentry-python.git
cd sentry-python

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .
pip install -r requirements-dev.txt

# Run tests
pytest -v

# Create example
mkdir example_app
cd example_app

# Create monitoring.py:
cat > monitoring.py << EOF
import sentry_sdk

# Initialize Sentry (local DSN for testing)
sentry_sdk.init(
    dsn="http://testdsn@localhost:8000",
    traces_sample_rate=1.0
)

# Capture exception
try:
    result = 1 / 0
except Exception as e:
    sentry_sdk.capture_exception(e)

# Capture message
sentry_sdk.capture_message("Test message", level="info")
EOF

# Install sentry-sdk
pip install sentry-sdk

# Run example
python monitoring.py

# Run tests
cd /path/to/sentry-python
pytest tests/
```

**Dependencies**:
- sentry-sdk
- urllib3
- certifi

**Setup Notes**:
- Error tracking
- Performance monitoring
- Multiple integrations

---

### 96. Pytest
**URL**: https://github.com/pytest-dev/pytest
**Type**: Testing Framework
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/pytest-dev/pytest.git
cd pytest

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run pytest tests
pytest -v

# Create example
mkdir example_app
cd example_app

# Create test_example.py:
cat > test_example.py << EOF
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(0, 0) == 0
    assert add(-1, 1) == 0

@pytest.fixture
def numbers():
    return [1, 2, 3, 4, 5]

def test_with_fixture(numbers):
    assert len(numbers) == 5
    assert sum(numbers) == 15
EOF

# Install pytest
pip install pytest

# Run tests
pytest test_example.py -v

# Run from repo
cd /path/to/pytest
pytest tests/
```

**Dependencies**:
- pytest
- packaging
- pluggy

**Setup Notes**:
- Powerful testing framework
- Fixtures for setup/teardown
- Plugins system
- Parametrized tests

---

### 97. Black
**URL**: https://github.com/psf/black
**Type**: Code Formatter
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/psf/black.git
cd black

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example
mkdir example_app
cd example_app

# Create ugly_code.py:
cat > ugly_code.py << EOF
# Unformatted code
x=1+2
def hello( ):
    return   "hello"
EOF

# Install black
pip install black

# Format code
black ugly_code.py

# Check formatting
black --check ugly_code.py

# Run tests
cd /path/to/black
pytest tests/
```

**Dependencies**:
- black
- click
- pathspec

**Setup Notes**:
- Code formatter
- Opinionated style
- CI/CD integration

---

### 98. Flake8
**URL**: https://github.com/PyCQA/flake8
**Type**: Linting Tool
**Complexity**: Beginner

```bash
# Clone repository
git clone https://github.com/PyCQA/flake8.git
cd flake8

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example
mkdir example_app
cd example_app

# Create code_issues.py:
cat > code_issues.py << EOF
import os
import sys

x  =  1  # Multiple spaces
def hello():
    pass

unused = 5  # Unused variable
EOF

# Install flake8
pip install flake8

# Run linter
flake8 code_issues.py

# Run tests
cd /path/to/flake8
pytest tests/
```

**Dependencies**:
- flake8
- pycodestyle
- pyflakes

**Setup Notes**:
- Code linter
- PEP 8 compliance
- Plugin system

---

### 99. Poetry
**URL**: https://github.com/python-poetry/poetry
**Type**: Dependency Management
**Complexity**: Intermediate

```bash
# Clone repository
git clone https://github.com/python-poetry/poetry.git
cd poetry

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Create example project
mkdir example_app
cd example_app

# Create pyproject.toml:
cat > pyproject.toml << EOF
[tool.poetry]
name = "example"
version = "0.1.0"
description = "Example project"
authors = ["Your Name <email@example.com>"]

[tool.poetry.dependencies]
python = "^3.8"
requests = "^2.28.0"
flask = "^2.0.0"

[tool.poetry.dev-dependencies]
pytest = "^7.0"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
EOF

# Install poetry
pip install poetry

# Install dependencies
poetry install

# Run tests
cd /path/to/poetry
pytest tests/
```

**Dependencies**:
- poetry
- toml
- virtualenv

**Setup Notes**:
- Dependency management
- Virtual environment creation
- Packaging and publishing

---

### 100. Pre-commit
**URL**: https://github.com/pre-commit/pre-commit
**Type**: Git Hooks Framework
**Complexity**: Beginner to Intermediate

```bash
# Clone repository
git clone https://github.com/pre-commit/pre-commit.git
cd pre-commit

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -e .

# Run tests
pytest -v

# Create example project
mkdir example_app
cd example_app

# Initialize git
git init

# Create .pre-commit-config.yaml:
cat > .pre-commit-config.yaml << EOF
repos:
  - repo: https://github.com/psf/black
    rev: 23.1.0
    hooks:
      - id: black
        language_version: python3

  - repo: https://github.com/PyCQA/flake8
    rev: 6.0.0
    hooks:
      - id: flake8

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
EOF

# Install pre-commit
pip install pre-commit

# Install git hooks
pre-commit install

# Run manually
pre-commit run --all-files

# Run tests
cd /path/to/pre-commit
pytest tests/
```

**Dependencies**:
- pre-commit
- PyYAML
- cfgv

**Setup Notes**:
- Git hooks framework
- Automated code quality checks
- Runs before commit

---

## FINAL NOTES

### Installation Tips

**For All Repositories:**
1. Always create virtual environment first
2. Use `pip install --upgrade pip` before installing dependencies
3. Create .env files for configuration if needed
4. Run tests after installation to verify setup
5. Check README.md for project-specific setup instructions

### Common Issues

**Port Already in Use:**
```bash
lsof -i :8000
kill -9 <PID>
```

**Permission Denied on Unix:**
```bash
chmod +x manage.py
```

**Missing Python Dev Headers:**
```bash
# Ubuntu/Debian
sudo apt-get install python3-dev

# Fedora
sudo dnf install python3-devel
```

### Testing Commands

```bash
# Run all tests
pytest -v

# Run specific test file
pytest tests/test_models.py -v

# Run specific test
pytest tests/test_models.py::TestClass::test_method -v

# Run with coverage
pytest --cov=app tests/

# Run in parallel
pytest -n auto tests/
```

### Development Server Commands

```bash
# Django
python manage.py runserver 0.0.0.0:8000

# Flask
flask run --host 0.0.0.0 --port 5000

# FastAPI
fastapi dev main.py --host 0.0.0.0 --port 8000

# Sanic
python main.py

# General ASGI
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# General WSGI
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

---

**Last Updated**: January 26, 2026  
**Total Repositories**: 100  
**Installation Methods**: Pure Python (no Docker)  
**Verified Platforms**: Linux, macOS, Windows
