const REPO_LIST = [
    {
        category: "Django Frameworks",
        repos: [
            {
                name: "Saleor",
                url: "https://github.com/saleor/saleor.git",
                description: "Headless E-commerce platform - GraphQL API",
                framework: "django",
                complexity: "Advanced",
                stars: "20k+"
            },
            {
                name: "Wagtail CMS",
                url: "https://github.com/wagtail/wagtail.git",
                description: "Open source CMS built on Django",
                framework: "django",
                complexity: "Advanced",
                stars: "18k+",
                setupCommands: {
                    postInstall: "wagtail start myproject && cd myproject && pip install -r requirements.txt"
                }
            },
            {
                name: "Open edX",
                url: "https://github.com/openedx/edx-platform.git",
                description: "LMS and Enterprise Learning Platform",
                framework: "django",
                complexity: "Expert",
                stars: "7k+"
            },
            {
                name: "Zulip",
                url: "https://github.com/zulip/zulip.git",
                description: "Team chat application with threading",
                framework: "django",
                complexity: "Expert",
                stars: "21k+",
                setupCommands: {
                    runServer: "./tools/run-dev.py"
                }
            },
            {
                name: "Mayan EDMS",
                url: "https://gitlab.com/mayan-edms/mayan-edms.git",
                description: "Document management system",
                framework: "django",
                complexity: "Advanced",
                stars: "2k+"
            },
            {
                name: "PostHog",
                url: "https://github.com/PostHog/posthog.git",
                description: "Product analytics platform",
                framework: "django",
                complexity: "Expert",
                stars: "20k+"
            },
            {
                name: "DefectDojo",
                url: "https://github.com/DefectDojo/django-DefectDojo.git",
                description: "DevSecOps vulnerability management",
                framework: "django",
                complexity: "Advanced",
                stars: "3.6k+"
            },
            {
                name: "NetBox",
                url: "https://github.com/netbox-community/netbox.git",
                description: "Network source of truth / IPAM",
                framework: "django",
                complexity: "Advanced",
                stars: "16k+"
            },
            {
                name: "Taiga",
                url: "https://github.com/taigaio/taiga-back.git",
                description: "Agile project management platform",
                framework: "django",
                complexity: "Advanced",
                stars: "7k+"
            },
            {
                name: "Flagsmith",
                url: "https://github.com/Flagsmith/flagsmith.git",
                description: "Feature flag management",
                framework: "django",
                complexity: "Intermediate",
                stars: "4k+"
            },
            {
                name: "Sentry",
                url: "https://github.com/getsentry/sentry.git",
                description: "Error tracking and performance monitoring",
                framework: "django",
                complexity: "Expert",
                stars: "38k+",
                setupCommands: {
                    preInstall: "sentry init --dev",
                    adminCreate: "sentry createuser"
                }
            },
            {
                name: "Mezzanine",
                url: "https://github.com/stephenmcd/mezzanine.git",
                description: "Powerful content management platform",
                framework: "django",
                complexity: "Intermediate",
                stars: "4.7k+",
                setupCommands: {
                    postInstall: "mezzanine-project myproject && cd myproject"
                }
            },
            {
                name: "Django REST Framework",
                url: "https://github.com/encode/django-rest-framework.git",
                description: "Powerful and flexible toolkit for building Web APIs",
                framework: "django",
                complexity: "Intermediate",
                stars: "28k+"
            },
            {
                name: "Django itself",
                url: "https://github.com/django/django.git",
                description: "The Django web framework source code",
                framework: "django",
                complexity: "Advanced",
                stars: "79k+"
            },
            {
                name: "Django-allauth",
                url: "https://github.com/pennersr/django-allauth.git",
                description: "Integrated Django authentication",
                framework: "django",
                complexity: "Intermediate",
                stars: "9k+"
            }
        ]
    },
    {
        category: "FastAPI Frameworks",
        repos: [
            {
                name: "Full Stack FastAPI Template",
                url: "https://github.com/fastapi/full-stack-fastapi-template.git",
                description: "Official full-stack template by Sebastián Ramírez",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "26k+"
            },
            {
                name: "FastAPI itself",
                url: "https://github.com/tiangolo/fastapi.git",
                description: "Modern, fast web framework for building APIs",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "76k+"
            },
            {
                name: "Polar",
                url: "https://github.com/polarsource/polar.git",
                description: "Open source monetization platform",
                framework: "fastapi",
                complexity: "Advanced",
                stars: "3k+"
            },
            {
                name: "SQLModel",
                url: "https://github.com/tiangolo/sqlmodel.git",
                description: "SQL databases with Python type annotations",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "14k+"
            },
            {
                name: "Litestar",
                url: "https://github.com/litestar-org/litestar.git",
                description: "Production-ready, light ASGI framework",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "5k+"
            },
            {
                name: "Strawberry GraphQL",
                url: "https://github.com/strawberry-graphql/strawberry.git",
                description: "Python GraphQL library based on dataclasses",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "4k+"
            },
            {
                name: "Authlib",
                url: "https://github.com/authlib/authlib.git",
                description: "Ultimate Python library for OAuth and OpenID",
                framework: "generic",
                complexity: "Advanced",
                stars: "4.5k+"
            },
            {
                name: "FastHTML",
                url: "https://github.com/AnswerDotAI/fasthtml.git",
                description: "Modern HTML-first framework",
                framework: "fastapi",
                complexity: "Beginner",
                stars: "5k+"
            },
            {
                name: "Robyn",
                url: "https://github.com/sansyryli/robyn.git",
                description: "Fast async Python web framework with Rust runtime",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "4k+"
            },
            {
                name: "Typer",
                url: "https://github.com/tiangolo/typer.git",
                description: "Build great CLIs fast",
                framework: "generic",
                complexity: "Beginner",
                stars: "15k+"
            },
            {
                name: "FastAPI-Users",
                url: "https://github.com/frankie567/fastapi-users.git",
                description: "Ready-to-use authentication and user management",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "4k+"
            },
            {
                name: "HTTPX",
                url: "https://github.com/encode/httpx.git",
                description: "A next generation HTTP client for Python",
                framework: "generic",
                complexity: "Intermediate",
                stars: "13k+"
            },
            {
                name: "Pydantic",
                url: "https://github.com/pydantic/pydantic.git",
                description: "Data validation using Python type annotations",
                framework: "generic",
                complexity: "Intermediate",
                stars: "20k+"
            },
            {
                name: "Uvicorn",
                url: "https://github.com/encode/uvicorn.git",
                description: "Lightning-fast ASGI server",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "8k+",
                setupCommands: {
                    runServer: "uvicorn main:app --host 0.0.0.0 --port 8000 --reload"
                }
            },
            {
                name: "Starlette",
                url: "https://github.com/encode/starlette.git",
                description: "Lightweight ASGI framework/toolkit",
                framework: "fastapi",
                complexity: "Intermediate",
                stars: "10k+"
            }
        ]
    },
    {
        category: "Flask Frameworks",
        repos: [
            {
                name: "Flask itself",
                url: "https://github.com/pallets/flask.git",
                description: "The Flask web framework source code",
                framework: "flask",
                complexity: "Intermediate",
                stars: "67k+"
            },
            {
                name: "Flask-SQLAlchemy",
                url: "https://github.com/pallets-eco/flask-sqlalchemy.git",
                description: "Adds SQLAlchemy support to Flask",
                framework: "flask",
                complexity: "Intermediate",
                stars: "4k+"
            },
            {
                name: "Flask-RESTful",
                url: "https://github.com/flask-restful/flask-restful.git",
                description: "Simple framework for creating REST APIs",
                framework: "flask",
                complexity: "Intermediate",
                stars: "6.8k+"
            },
            {
                name: "Flask-Login",
                url: "https://github.com/maxcountryman/flask-login.git",
                description: "User session management for Flask",
                framework: "flask",
                complexity: "Beginner",
                stars: "3.5k+"
            },
            {
                name: "Flask-JWT-Extended",
                url: "https://github.com/vimalloc/flask-jwt-extended.git",
                description: "Extended JWT integration with Flask",
                framework: "flask",
                complexity: "Intermediate",
                stars: "1.5k+"
            },
            {
                name: "Flask-Admin",
                url: "https://github.com/flask-admin/flask-admin.git",
                description: "Simple and extensible admin interface framework",
                framework: "flask",
                complexity: "Intermediate",
                stars: "5.7k+"
            },
            {
                name: "Flask-CORS",
                url: "https://github.com/corydolphin/flask-cors.git",
                description: "Cross Origin Resource Sharing extension",
                framework: "flask",
                complexity: "Beginner",
                stars: "880+"
            },
            {
                name: "Flask-Migrate",
                url: "https://github.com/miguelgrinberg/flask-migrate.git",
                description: "SQLAlchemy database migrations",
                framework: "flask",
                complexity: "Intermediate",
                stars: "2.4k+"
            },
            {
                name: "Eve",
                url: "https://github.com/pyeve/eve.git",
                description: "REST API framework powered by Flask",
                framework: "flask",
                complexity: "Intermediate",
                stars: "6.7k+"
            },
            {
                name: "Connexion",
                url: "https://github.com/spec-first/connexion.git",
                description: "Swagger/OpenAPI First framework on top of Flask",
                framework: "flask",
                complexity: "Intermediate",
                stars: "4.5k+"
            }
        ]
    },
    {
        category: "Data & ORM Libraries",
        repos: [
            {
                name: "SQLAlchemy",
                url: "https://github.com/sqlalchemy/sqlalchemy.git",
                description: "Python SQL toolkit and ORM",
                framework: "generic",
                complexity: "Advanced",
                stars: "9k+"
            },
            {
                name: "Alembic",
                url: "https://github.com/sqlalchemy/alembic.git",
                description: "Database migration tool for SQLAlchemy",
                framework: "generic",
                complexity: "Intermediate",
                stars: "2.5k+"
            },
            {
                name: "Asyncpg",
                url: "https://github.com/MagicStack/asyncpg.git",
                description: "Fast PostgreSQL database client library",
                framework: "generic",
                complexity: "Intermediate",
                stars: "6.8k+"
            },
            {
                name: "Motor",
                url: "https://github.com/mongodb-labs/motor.git",
                description: "Async Python driver for MongoDB",
                framework: "generic",
                complexity: "Intermediate",
                stars: "2.4k+"
            },
            {
                name: "Redis-py",
                url: "https://github.com/redis/redis-py.git",
                description: "Python client for Redis",
                framework: "generic",
                complexity: "Beginner",
                stars: "12k+"
            },
            {
                name: "Tortoise ORM",
                url: "https://github.com/tortoise/tortoise-orm.git",
                description: "Easy async ORM for Python",
                framework: "generic",
                complexity: "Intermediate",
                stars: "4.5k+"
            },
            {
                name: "Piccolo ORM",
                url: "https://github.com/piccolo-orm/piccolo.git",
                description: "Fast, user friendly ORM and query builder",
                framework: "generic",
                complexity: "Intermediate",
                stars: "1.4k+"
            },
            {
                name: "Celery",
                url: "https://github.com/celery/celery.git",
                description: "Distributed task queue",
                framework: "generic",
                complexity: "Advanced",
                stars: "24k+"
            },
            {
                name: "Dependency Injector",
                url: "https://github.com/ets-labs/python-dependency-injector.git",
                description: "Dependency injection framework",
                framework: "generic",
                complexity: "Intermediate",
                stars: "3.8k+"
            }
        ]
    },
    {
        category: "Frappe & Specialized",
        repos: [
            {
                name: "ERPNext",
                url: "https://github.com/frappe/erpnext.git",
                description: "Complete ERP system built on Frappe",
                framework: "frappe",
                complexity: "Expert",
                stars: "20k+",
                setupCommands: {
                    preInstall: "bench init frappe-app && cd frappe-app",
                    postInstall: "bench get-app erpnext && bench new-site mysite.local && bench --site mysite.local install-app erpnext",
                    runServer: "bench start"
                }
            },
            {
                name: "Frappe Framework",
                url: "https://github.com/frappe/frappe.git",
                description: "Full-stack web framework",
                framework: "frappe",
                complexity: "Advanced",
                stars: "7k+",
                setupCommands: {
                    preInstall: "bench init frappe-app",
                    runServer: "bench start"
                }
            },
            {
                name: "Odoo",
                url: "https://github.com/odoo/odoo.git",
                description: "Business management suite",
                framework: "generic",
                complexity: "Expert",
                stars: "37k+",
                setupCommands: {
                    runServer: "python odoo-bin -d demo --addons-path=addons --xmlrpc-port=8069"
                }
            },
            {
                name: "Graphene",
                url: "https://github.com/graphql-python/graphene.git",
                description: "GraphQL framework for Python",
                framework: "generic",
                complexity: "Intermediate",
                stars: "8k+"
            },
            {
                name: "Prefect",
                url: "https://github.com/PrefectHQ/prefect.git",
                description: "Modern workflow orchestration",
                framework: "generic",
                complexity: "Advanced",
                stars: "16k+"
            },
            {
                name: "Airflow",
                url: "https://github.com/apache/airflow.git",
                description: "Platform to programmatically author workflows",
                framework: "generic",
                complexity: "Expert",
                stars: "36k+"
            }
        ]
    },
    {
        category: "CMS & E-Commerce",
        repos: [
            {
                name: "Django Oscar",
                url: "https://github.com/django-oscar/django-oscar.git",
                description: "Domain-driven e-commerce for Django",
                framework: "django",
                complexity: "Advanced",
                stars: "6k+"
            },
            {
                name: "Django CMS",
                url: "https://github.com/django-cms/django-cms.git",
                description: "Enterprise CMS built with Django",
                framework: "django",
                complexity: "Advanced",
                stars: "10k+"
            },
            {
                name: "Wagtail Bakery",
                url: "https://github.com/moorinteractive/wagtail-bakery.git",
                description: "Static site generator for Wagtail",
                framework: "django",
                complexity: "Intermediate",
                stars: "180+",
                setupCommands: {
                    postInstall: "wagtail start myproject && cd myproject && pip install wagtail-bakery"
                }
            }
        ]
    }
];
