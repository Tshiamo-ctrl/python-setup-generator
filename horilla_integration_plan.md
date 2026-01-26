# Horilla Integration Plan

The user wants a perfect, failure-proof generator for Horilla HRM and CRM, ensuring "Initialize Database", "Load Demo Data", and "Create Admin User" all work exactly as expected following official instructions.

## 1. Modularize Generator Logic
Currently, `generateSetupScript` is a large function with many `if` statements. I will introduce a framework-specific tailoring mechanism to allow Horilla to have its own specialized logic without cluttering the "agnostic" base.

## 2. Refine Horilla Specific Logic
- **Initialization**: Respect the `initDb` checkbox.
- **Admin Users**: Ensure `admin123` or user-defined credentials are applied correctly using placeholders.
- **Horilla HRM**: Use `createhorillauser`.
- **Horilla CRM**: Use `createsuperuser` with `DJANGO_SUPERUSER_PASSWORD`.
- **Environment**: Ensure `DB_IN_PASSWORD` is included.
- **Official Docs Sync**: Default credentials to `admin`/`admin` when Horilla is selected to match demo data expectations.

## 3. UI Improvements
- Ensure the "Initialize Database" checkbox is clearly visible and functional.
- Add a "Platform Specific Note" section in the summary to explain what happened (e.g., "Detected Horilla platform, adding DB_IN_PASSWORD").

## 4. Robustness
- Add connectivity checks in the bash scripts.
- Ensure `compilemessages` is run for Horilla as it's a multi-lingual system.

## 5. Verification
- Add comprehensive E2E tests covering all Horilla permutations.
