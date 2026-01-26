# Known Issues

This document tracks known issues and areas for improvement. Contributors are encouraged to pick up any of these items.

## 🐛 Bugs

### 1. Tab Indicator Out of Order (Minor)
**Location**: `index.html` - Carousel Tabs  
**Issue**: The "Clear Env" tab was added to the tab sections but no corresponding tab indicator button exists for it.  
**Impact**: Low - Script is still generated and accessible.

---

## ⚠️ Limitations

### 2. File System Access API Browser Compatibility
**Location**: `index.html` - `saveToFolder()` and `handleDeletionAction()`  
**Issue**: The `showDirectoryPicker()` API is only supported in Chromium-based browsers (Chrome, Edge, Opera). Firefox and Safari users cannot use the "Save Workspace" or browser-based deletion features.  
**Workaround**: Users can manually download individual scripts using the "Download" buttons.  
**Suggestion**: Add a clear browser compatibility warning in the UI when these features are unavailable.

### 3. Windows Path Support
**Location**: Generated shell scripts  
**Issue**: Generated scripts use Bash syntax and Unix paths (e.g., `~/project`). Windows users must use WSL or Git Bash.  
**Suggestion**: Consider adding PowerShell script generation option in the future.

---

## 🔧 Enhancements

### 4. Save Workspace Should Include Clear Scripts
**Location**: `index.html` - `saveToFolder()`  
**Issue**: The "Save Workspace" feature only saves 4 core scripts (`setup.sh`, `fresh-db.sh`, `dev-server.sh`, `.env.example`). It does not include the clear scripts (`clear_workspace.sh`, `clear_repo.sh`, `clear_env.sh`).  
**Suggestion**: Add checkboxes or include all scripts in the save operation.

### 5. Missing Test Coverage for Edge Cases
**Location**: `tests/test_generator.py`  
**Issue**: Tests do not cover:
  - Empty repository URL submission
  - Invalid Git URLs
  - Postgres connection failure scenarios in generated scripts
**Suggestion**: Add negative test cases.

### 6. Repo Verification Script is Node.js
**Location**: `tests/verify_repos.js`  
**Issue**: Main test suite uses Python/Playwright, but repo verification uses Node.js, requiring two different runtimes.  
**Suggestion**: Consider porting `verify_repos.js` to Python for consistency.
