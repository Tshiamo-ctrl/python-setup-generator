# Horilla Dev Setup Generator 

A lightweight, browser-based tool to generate automated setup, database reset, and development server scripts for [Horilla HRMS](https://github.com/horilla-opensource/horilla).

## Purpose
Developing with Horilla often involves making code changes that require frequent database resets. This tool generates a suite of shell scripts to automate:
- Full environment initialization (git clone, venv, deps, migration)
- One-command "Fresh Database" wipes (drops DB, cleans migrations, recreates everything)
- "Clear Workspace" utilities to nuking the environment or just the repo
- Quick-launch development server script
- Environment variable `.env` templates

## Usage
1. Open `index.html` in any modern browser.
2. Configure your project path (e.g., `~/projects/horilla`).
3. Select your Database type (SQLite or PostgreSQL).
4. Click **Generate Scripts**.
5. Copy the generated scripts into your Horilla project root.
6. Make them executable: `chmod +x *.sh`.
7. Run `./setup.sh` to get started!

## Features
- **Smart Checks**: Scripts check for `python3` and `git` before running.
- **Robustness**: Handles virtual environment activation and pip upgrades automatically.
- **Demo Data**: Options to automatically load Horilla's official demo dataset.
- **User Friendly**: Minimal inline comments to help you understand exactly what the scripts are doing.

## License
[MIT](LICENSE)
