# Universal Python Workspace Generator

A lightweight, browser-based tool to generate automated setup, database reset, and development server scripts for any Python web project (Django, Flask, FastAPI).

## Purpose
Setting up local development environments often involves repetitive terminal work. This tool automates the "nitty-gritty" so you can get straight to coding:
- **Environment Initialization**: `git clone`, venv creation, dependency installation.
- **Minimalist Workflow**: Select a curated repo (Cookiecutter, Wagtail, FastAPI Starters) and it auto-fills the best defaults for Project Path, Venv, and Framework.
- **One-Command Resets**: Wipe and recreate databases/migrations reliably.
- **Danger Zone**: Integrated browser-based workspace cleanup using the File System Access API.

## Usage
1. Open [Live Preview](https://tshiamo-ctrl.github.io/Horilla-setup-generator-app/preview/) or `index.html` locally.
2. Select a **Source Repository** from the dropdown (or provide a Custom URL).
3. (Optional) Toggle **Advanced Configuration** to customize paths, venv names, or database settings.
4. Click **Continue to Scripts**.
5. Save the generated scripts to your project folder (using the **Save Workspace Folder** button for Chrome/Edge).
6. Run `./setup.sh` to initialize everything!

## Features
- **Smart Auto-Config**: Automatically sets sensible defaults based on the chosen repository.
- **Framework Support**: Optimized templates for Django, Flask, and FastAPI.
- **Zero Dependencies**: Pure HTML/JS/CSS. Runs entirely in the browser.
- **Playwright Verified**: Comprehensive test suite ensures generated scripts are syntactically correct and logical.

## License
[MIT](LICENSE)
