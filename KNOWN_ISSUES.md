# Known Issues

This document tracks known issues and areas for improvement. Contributors are encouraged to pick up any of these items.

## 🐛 Bugs

### 1. Tab Indicator Out of Order (Minor)
**Location**: `index.html` - Carousel Tabs  
**Issue**: The "Clear Env" tab was added to the tab sections but no corresponding tab indicator button exists for it.  
**Impact**: Low - Script is still generated and accessible.

---

## ⚠️ Limitations


### 3. Windows Path Support
**Location**: Generated shell scripts  
**Issue**: Generated scripts use Bash syntax and Unix paths (e.g., `~/project`). Windows users must use WSL or Git Bash.  
**Suggestion**: Consider adding PowerShell script generation option in the future.

### 4. Native Archive Support on Windows
**Location**: `main.js` - `archive-workspace` handler
**Issue**: The native `tar` command used for archiving is optimized for Linux/macOS. Windows support is currently limited or reliant on basic node.js implementation which may be slower.
**Suggestion**: Implement a specific Windows fallback using a compatible library or checking for system 7zip/tar availability.


---

## 🔧 Enhancements


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

---

## 🟢 Resolved / Closed

### File System Access API Browser Compatibility
**Status**: Fixed. Added browser check warning banner.

### Save Workspace Includes Clear Scripts
**Status**: Fixed. Added clear scripts to file list in `saveToFolder`.

### 5. Demo Data Loading Optimization
**Status**: Fixed. Helper functions now include robust data loading with the correct password `d3f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d`.
