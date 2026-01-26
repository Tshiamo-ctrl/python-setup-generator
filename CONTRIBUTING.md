# Contributing to Local Setup Generator

Thank you for your interest in contributing! This project helps developers generate automated setup scripts for Python web projects (Django, Flask, FastAPI, etc.).

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Fork and Clone Workflow](#fork-and-clone-workflow)
3. [Development Guidelines](#development-guidelines)
4. [Code Documentation Standards](#code-documentation-standards)
5. [Commit Message Conventions](#commit-message-conventions)
6. [Testing Requirements](#testing-requirements)
7. [Pull Request Process](#pull-request-process)
8. [Code Style Guidelines](#code-style-guidelines)
9. [AI Usage Policy](#ai-usage-policy)
10. [Security Guidelines](#security-guidelines)

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome 86+, Edge 86+, or Opera 72+)
- Python 3.8+ (for testing)
- Git
- Basic knowledge of HTML, CSS, JavaScript

### Quick Start

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/python-setup-generator.git
cd python-setup-generator

# Open in browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

---

## Fork and Clone Workflow

### 1. Fork the Repository

1. Navigate to the main repository on GitHub
2. Click the **Fork** button in the top-right corner
3. Select your account as the destination

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/python-setup-generator.git
cd python-setup-generator
```

### 3. Configure Remotes

```bash
# Add upstream remote to track original repo
git remote add upstream https://github.com/ORIGINAL_OWNER/python-setup-generator.git

# Verify remotes
git remote -v
```

### 4. Keep Your Fork Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

### 5. Create a Feature Branch

```bash
# Always create a new branch for your work
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

---

## Development Guidelines

### Project Structure

```
python-setup-generator/
├── index.html              # Main application (HTML + CSS + JS)
├── style.css               # External stylesheet
├── repos.js                # Repository configurations
├── tests/
│   ├── test_generator.py   # Playwright tests
│   ├── test_new_repos.py   # New repository tests
│   └── conftest.py         # Pytest configuration
├── CONTRIBUTING.md         # This file
├── README.md               # Project documentation
└── LICENSE                 # MIT License
```

### Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6+)
- **Libraries**: fflate (for TAR.GZ creation via CDN)
- **Testing**: Python Playwright
- **Deployment**: GitHub Pages (static hosting)

---

## Code Documentation Standards

### JavaScript Functions

**All functions MUST include JSDoc comments:**

```javascript
/**
 * Brief description of what the function does
 * @param {Type} paramName - Description of parameter
 * @returns {Type} - Description of return value
 */
function functionName(paramName) {
    // Implementation
}
```

**Example:**

```javascript
/**
 * Recursively read directory contents and filter unwanted files
 * @param {FileSystemDirectoryHandle} dirHandle - Directory to read
 * @param {string} path - Current path relative to root
 * @returns {Promise<Array>} - Array of {name, data} objects
 */
async function readDirectoryRecursive(dirHandle, path) {
    // Implementation
}
```

### HTML Comments

**Use descriptive section comments:**

```html
<!-- =========================================
     Section Name: Brief Description
     ========================================= -->
<div class="section">
    <!-- Content -->
</div>
```

### CSS Comments

**Group related styles with comments:**

```css
/* ===================================
   Component Name
   =================================== */
.component {
    /* Property group description */
    property: value;
}
```

### Inline Comments

- Use inline comments for complex logic
- Explain **why**, not **what**
- Keep comments concise and relevant

```javascript
// Prevent multiple simultaneous executions (race condition)
if (isDeletionInProgress) return;
```

---

## Commit Message Conventions

We follow **Conventional Commits** specification for clear and automated changelog generation.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring (no feature change or bug fix)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build, etc.)
- `ci`: CI/CD configuration changes

### Examples

**Feature:**
```
feat(archive): add TAR.GZ archive creation functionality

- Implement handleArchiveCreation() function
- Add fflate library integration via CDN
- Include smart directory filtering (.git, node_modules, etc.)
- Add Archive Workspace button to Utilities section
```

**Bug Fix:**
```
fix(ui): prevent confirm dialog from flashing repeatedly

Added isDeletionInProgress flag to prevent multiple simultaneous
executions of handleDeletionAction function. Resolves race condition
that caused confirm dialog to flash.

Closes #42
```

**Documentation:**
```
docs(contributing): add comprehensive documentation standards

- Added commit message conventions
- Included fork/clone workflow guide
- Documented code documentation requirements
- Added testing guidelines
```

**Breaking Change:**
```
feat(api)!: change archive format from ZIP to TAR.GZ

BREAKING CHANGE: Archive creation now uses TAR.GZ format instead of ZIP.
Users upgrading should note the new file extension and extraction method.
```

### Rules

1. Use **imperative mood** in subject line ("add" not "added")
2. Keep subject line under 72 characters
3. Capitalize first letter of subject
4. No period at end of subject line
5. Separate subject from body with blank line
6. Wrap body at 72 characters
7. Use body to explain **what** and **why**, not **how**

---

## Testing Requirements

**Strict Policy: No Test Failures Accepted**

All PRs MUST pass existing tests before merge. If you modify functionality, you MUST update or add tests.

### Setup Test Environment

```bash
# Create virtual environment
python3 -m venv test_venv
source test_venv/bin/activate  # Linux/macOS
# test_venv\Scripts\activate  # Windows

# Install dependencies
pip install pytest pytest-playwright
playwright install chromium
```

### Run Tests

```bash
# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_generator.py -v

# Run specific test
pytest tests/test_generator.py::test_function_name -v
```

### Writing Tests

**Test file naming:** `test_*.py`

**Test function naming:** Descriptive and clear

```python
def test_archive_button_appears_in_utilities_section(page_on_index):
    """Test that Archive Workspace button is visible in Utilities section"""
    button = page_on_index.locator("button:has-text('Archive Workspace')")
    expect(button).to_be_visible()
```

**Update tests when you:**
- Add new UI elements
- Modify existing functionality
- Change generated script content
- Add new repository configurations

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All functions have JSDoc comments
- [ ] Commits follow conventional commit format
- [ ] All tests pass (`pytest tests/ -v`)
- [ ] No console errors in browser
- [ ] UI tested manually in Chrome/Edge
- [ ] Documentation updated (README, CONTRIBUTING, etc.)
- [ ] No sensitive data or credentials in code

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] All existing tests pass
- [ ] New tests added (if applicable)
- [ ] Manually tested in browser

## Screenshots (if applicable)
Add screenshots showing UI changes

## Checklist
- [ ] Code follows project guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. Automated tests run via GitHub Actions
2. Code review by maintainers
3. Requested changes addressed
4. Final approval and merge

---

## Code Style Guidelines

### HTML

- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Keep nesting minimal and logical
- Use meaningful IDs and classes

```html
<!-- Good -->
<button class="btn-primary" onclick="handleAction()" aria-label="Create archive">
    Archive Workspace
</button>

<!-- Bad -->
<div onclick="handleAction()">Click me</div>
```

### CSS

- Use CSS variables for theming
- Keep specificity low
- Group related properties
- Mobile-first responsive design

```css
/* Use variables */
background: var(--card);
color: var(--foreground);

/* Not hardcoded values */
background: #1a1a1a;
```

### JavaScript

- Use `const` and `let`, never `var`
- Prefer arrow functions for callbacks
- Use async/await over callbacks
- Handle errors gracefully

```javascript
// Good
const fetchData = async () => {
    try {
        const result = await apiCall();
        return result;
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};

// Bad
var fetchData = function() {
    apiCall(function(result) {
        return result;
    });
};
```

### Naming Conventions

- **Functions**: camelCase (`handleArchiveCreation`)
- **Variables**: camelCase (`currentTourStep`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **CSS Classes**: kebab-case (`btn-primary`)
- **IDs**: camelCase (`tourModal`)

---

## AI Usage Policy

Contributors may use AI assistants (GitHub Copilot, ChatGPT, Gemini, Claude, etc.) to aid development.

### Requirements

1. **Human Review**: You MUST review and understand all AI-generated code
2. **Code Quality**: Code must look human-written, not raw AI output
3. **No Hallucinations**: Verify all commands, libraries, and methods exist
4. **Attribution**: If AI significantly contributes, mention in commit message
5. **Responsibility**: You are responsible for all submitted code

### Acceptable Uses

✅ Autocomplete and suggestions  
✅ Bug identification and fixes  
✅ Boilerplate generation  
✅ Documentation writing  
✅ Test case generation  

### Unacceptable Uses

❌ Copy-pasting unreviewed AI output  
❌ Submitting code you don't understand  
❌ Using deprecated or non-existent APIs  
❌ Ignoring project style guidelines  

---

## Security Guidelines

### Destructive Operations

**Always require user confirmation:**

```javascript
// Good
const userConfirmed = confirm(`Are you sure you want to delete ${dirHandle.name}?`);
if (!userConfirmed) return;

// Bad
await dirHandle.removeEntry(entry.name, { recursive: true });  // No confirmation
```

### Input Validation

**Validate all user inputs:**

```javascript
// Good
if (!archiveName || archiveName.trim() === '') {
    alert('Archive name cannot be empty');
    return;
}

// Bad
const finalName = archiveName;  // No validation
```

### Browser API Safety

- Check browser support before using APIs
- Handle permission denials gracefully
- Provide clear error messages
- Never assume browser capabilities

```javascript
if (!('showDirectoryPicker' in window)) {
    alert('Browser not supported. Please use Chrome 86+');
    return;
}
```

---

## Specific Guidelines

### Repository Configurations

When adding new repositories to `repos.js`:

```javascript
{
    name: "Repository Name",
    url: "https://github.com/user/repo.git",
    framework: "django",  // or flask, fastapi, frappe, generic
    dbType: "postgresql",  // or sqlite
    postInstallCmd: "command to run",  // optional
    loadDemoCmd: "demo data command",  // optional
    adminCommand: "create admin command",  // optional
    knownIssues: "description of issues"  // optional
}
```

### Feature Additions

1. Consider impact on all script types (setup, fresh-db, dev-server)
2. Add corresponding UI controls
3. Update tour guide if user-facing
4. Add tests for new functionality
5. Update documentation

### Cross-Platform Compatibility

- Test in multiple browsers when possible
- Consider Windows, macOS, and Linux paths
- Use forward slashes (`/`) for paths in JavaScript
- Provide fallbacks for unsupported features

---

## Questions or Issues?

- **Bug Reports**: Open an issue with detailed reproduction steps
- **Feature Requests**: Open an issue describing the use case
- **Questions**: Use GitHub Discussions or open an issue

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Local Setup Generator!** 🎉
