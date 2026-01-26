# Contributing to Horilla Setup Generator

Thank you for your interest in contributing! This project aims to make setting up Horilla HRMS development environments as painless as possible.

## Getting Started

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally.
3.  Open `index.html` in your browser to verify the current state.

## Development Workflow

This is a lightweight tool consisting primarily of a single HTML file with embedded JavaScript.

- **Logic**: All script generation logic resides in the `<script>` tag within `index.html`.
- **Styling**: internal CSS in the `<head>`.
- **Testing**: We use Python Playwright for end-to-end testing.

### Running Tests
(Strict Policy: **No Test Failures Accepted**)

Before submitting a PR, you **MUST** ensure all tests pass. We do not accept PRs with failing tests.

1.  Set up the test environment:
    ```bash
    python3 -m venv test_venv
    source test_venv/bin/activate
    pip install pytest pytest-playwright
    playwright install chromium
    ```

2.  Run the tests:
    ```bash
    pytest tests/test_generator.py
    ```

## Code Style

- Keep the HTML semantic and accessible.
- Use clear variable names in the JavaScript.
- Avoid external dependencies (CDN links are fine for fonts, but logic should be self-contained).

## AI Usage Policy

Contributors are welcome to use AI assistants (e.g., GitHub Copilot, ChatGPT, Gemini) to aid in development, such as for autocomplete, identifying bugs, or generating boilerplate.

**However, you must adhere to the following:**
- **Human Review**: All AI-generated code must be reviewed and understood by the contributor. You are responsible for the code you submit.
- **Code Quality**: The code must look and feel human-written. It should follow the project's style guidelines and not be a raw dump of AI output.
- **No Hallucinations**: Verify that any commands, libraries, or methods suggested by AI actually exist and work as expected.

## Specific Guidelines

- **Redundancy**: When adding new features (like new script options), ensure you consider the impact on "Fresh DB" vs "Initial Setup" scenarios.
- **Safety**: Cleanup actions are destructive. Always ensure they include strict user confirmation (e.g., `read -p` in shell scripts or `confirm()` in JavaScript/Browser API) before executing deletions like `rm -rf` or `removeEntry`.
- **Browser API**: For the "Danger Zone" browser-based deletion, always include a second check to verify the selected folder name matches the project path to prevent accidental data loss.
- **Cross-Platform**: While the scripts are Bash-focused (Linux/macOS), keeping them POSIX compliant is preferred.

## Pull Requests

1.  Ensure your code is linted and formatted.
2.  Update `tests/test_generator.py` if you modify the UI or logic.
3.  Describe your changes in detail in the PR description.

License: MIT
