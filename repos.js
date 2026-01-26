const REPO_LIST = [
    {
        category: "Featured & Popular",
        repos: [
            {
                name: "Cookiecutter Django",
                url: "https://github.com/cookiecutter/cookiecutter-django.git",
                description: "The #1 Django starter. Docker, CI/CD, and production-ready defaults.",
                framework: "django",
                stars: "21k+"
            },
            {
                name: "Full Stack FastAPI (Tiangolo)",
                url: "https://github.com/tiangolo/full-stack-fastapi-template.git",
                description: "Official full-stack template by the creator of FastAPI.",
                framework: "fastapi",
                stars: "14k+"
            },
            {
                name: "Flask RealWorld Example",
                url: "https://github.com/gothinkster/flask-realworld-example-app.git",
                description: "Standard Flask codebase containing real world examples (CRUD, auth, advanced patterns).",
                framework: "flask",
                stars: "5k+"
            },
            {
                name: "Wemake Django Template",
                url: "https://github.com/wemake-services/wemake-django-template.git",
                description: "Bleeding edge Django template focused on strict code quality and security.",
                framework: "django",
                stars: "3k+"
            }
        ]
    },
    {
        category: "Django Starter Kits",
        repos: [
            {
                name: "DjangoX",
                url: "https://github.com/wsvincent/djangox.git",
                description: "Batteries-included starter project for Django (User model, emails, etc).",
                framework: "django",
                stars: "2k+"
            },
            {
                name: "Django Enterprise Kit",
                url: "https://github.com/seedstars/django-react-boilerplate.git",
                description: "Django React Boilerplate with JWT auth, Docker, and deployment scripts.",
                framework: "django",
                stars: "1.5k+"
            },
            {
                name: "Django Hackathon Starter",
                url: "https://github.com/DrkSephy/django-hackathon-starter.git",
                description: "A boilerplate for Django web applications, designed to get you up and running quickly.",
                framework: "django",
                stars: "1.8k+"
            },
            {
                name: "Django Rest Framework Boilerplate",
                url: "https://github.com/tfranzel/drf-microservice.git",
                description: "A microservice template based on Django REST Framework.",
                framework: "django",
                stars: "1k+"
            },
            {
                name: "SaaS Pegasus (Demo)",
                url: "https://github.com/czue/django-pegasus-demo.git",
                description: "Demo version of the popular SaaS Pegasus boilerplate.",
                framework: "django",
                stars: "500+"
            }
        ]
    },
    {
        category: "FastAPI & Modern Python",
        repos: [
            {
                name: "FastAPI React PostgreSQL",
                url: "https://github.com/buuntu/fastapi-react.git",
                description: "A full-stack cookiecutter template for FastAPI, React, and PostgreSQL.",
                framework: "fastapi",
                stars: "2k+"
            },
            {
                name: "FastAPI Amis Admin",
                url: "https://github.com/amisadmin/fastapi_amis_admin.git",
                description: "High-performance, efficient, and lightweight admin system.",
                framework: "fastapi",
                stars: "1.2k+"
            },
            {
                name: "Python Project Template",
                url: "https://github.com/rochacbruno/python-project-template.git",
                description: "A solid foundation for generic Python projects with CI/CD, linting, and docs.",
                framework: "generic",
                stars: "4k+"
            },
            {
                name: "FastAPI MongoDB Container",
                url: "https://github.com/markqiu/fastapi-mongodb-realworld-example-app.git",
                description: "FastAPI with MongoDB implementation of the RealWorld app.",
                framework: "fastapi",
                stars: "800+"
            }
        ]
    },
    {
        category: "CMS & E-Commerce",
        repos: [
            {
                name: "Wagtail CMS",
                url: "https://github.com/wagtail/wagtail.git",
                description: "Open source content management system built on Django.",
                framework: "django",
                stars: "18k+",
                needsSetup: "pip install wagtail && wagtail start mySite"
            },
            {
                name: "Django CMS",
                url: "https://github.com/django-cms/django-cms.git",
                description: "Enterprise CMS built with Django.",
                framework: "django",
                stars: "10k+",
            },
            {
                name: "Saleor",
                url: "https://github.com/saleor/saleor.git",
                description: "Headless E-commerce platform suitable for high-volume shops.",
                framework: "django",
                stars: "20k+",
            },
            {
                name: "Oscar",
                url: "https://github.com/django-oscar/django-oscar.git",
                description: "Domain-driven e-commerce for Django.",
                framework: "django",
                stars: "6k+"
            },
            {
                name: "Mezzanine",
                url: "https://github.com/stephenmcd/mezzanine.git",
                description: "A powerful, consistent, and flexible content management platform.",
                framework: "django",
                stars: "4.5k+"
            }
        ]
    },
    {
        category: "Flask & Lightweight",
        repos: [
            {
                name: "Cookiecutter Flask",
                url: "https://github.com/cookiecutter-flask/cookiecutter-flask.git",
                description: "A Flask template with Bootstrap 4, asset bundling, user auth, and more.",
                framework: "flask",
                stars: "4.5k+"
            },
            {
                name: "Flask AppBuilder",
                url: "https://github.com/dpgaspar/Flask-AppBuilder.git",
                description: "Simple and rapid application development framework, built on top of Flask.",
                framework: "flask",
                stars: "4k+"
            },
            {
                name: "Flask RestPlus Boilerplate",
                url: "https://github.com/cosmic-byte/flask-restplus-boilerplate.git",
                description: "Complete starter code for Flask RESTPlus.",
                framework: "flask",
                stars: "500+"
            }
        ]
    }
];
