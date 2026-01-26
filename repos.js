const REPO_LIST = [
    {
        category: "Popular Starters",
        repos: [
            {
                name: "Cookiecutter Django",
                url: "https://github.com/cookiecutter/cookiecutter-django.git",
                description: "Production-ready Django project template with Docker, CI, and more.",
                framework: "django",
                stars: "11k+",
                adminCommand: "python3 manage.py createsuperuser"
            },
            {
                name: "Wemake Django Template",
                url: "https://github.com/wemake-services/wemake-django-template.git",
                description: "Bleeding edge django template focused on code quality and security.",
                framework: "django",
                stars: "3k+",
            },
            {
                name: "DjangoX",
                url: "https://github.com/wsvincent/djangox.git",
                description: "Batteries-included starter project for Django.",
                framework: "django",
                stars: "2k+",
            }
        ]
    },
    {
        category: "CMS & Platforms",
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
            }
        ]
    },
    {
        category: "Full Stack / Demos",
        repos: [
            {
                name: "RealWorld App (Django)",
                url: "https://github.com/gothinkster/django-realworld-example-app.git",
                description: "The mother of all demo apps - Django implementation.",
                framework: "django",
                stars: "8k+",
            }
        ]
    }
];
