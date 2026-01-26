import pytest
from playwright.sync_api import Page, expect
import os

# Helper to load the local index.html
@pytest.fixture
def page_on_index(page: Page):
    cwd = os.getcwd()
    file_path = os.path.join(cwd, "index.html")
    page.goto(f"file://{file_path}")
    return page

def test_title_and_rendering(page_on_index: Page):
    expect(page_on_index).to_have_title("Horilla Dev Setup Generator | Automate Your HRMS Workspace")
    # Initial static title
    expect(page_on_index.locator("h1")).to_contain_text("Horilla Setup")

def test_platform_toggle(page_on_index: Page):
    # Initial state is generic "Horilla Setup"
    expect(page_on_index.locator("#mainTitle")).to_contain_text("Horilla Setup")
    
    # Switch to CRM
    page_on_index.click("#platform-crm")
    expect(page_on_index.locator("#mainTitle")).to_contain_text("Horilla CRM Setup")
    
    # Switch back to HRMS
    page_on_index.click("#platform-hrms")
    expect(page_on_index.locator("#mainTitle")).to_contain_text("Horilla HRMS Setup")

def test_generate_scripts_standard(page_on_index: Page):
    # Select Postgres to make db fields visible
    page_on_index.select_option("#dbType", "postgresql")
    
    # Set some values
    page_on_index.fill("#dbName", "my_custom_db")

    page_on_index.fill("#serverPort", "9000")
    
    # Click Generate
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Check output visibility
    expect(page_on_index.locator("#outputSection")).to_be_visible()
    
    # Check Setup content
    setup_code = page_on_index.locator("#setupCode").inner_text()
    # Note: .env content verification might need to look at specific lines or parsing
    env_code = page_on_index.locator("#envCode").inner_text()
    server_code = page_on_index.locator("#serverCode").inner_text()
    
    assert "DB_NAME=my_custom_db" in env_code
    assert "START_PORT=9000" in server_code

def test_redundancy_check_logic(page_on_index: Page):
    # Ensure Load Demo and Create Admin are checked (default)
    # We click the label/parent div because the input onclick prop might interfere if we just click the input directly?
    # Actually the code says: <div class="checkbox-item" onclick="document.getElementById('loadDemo').click()">
    # So clicking the div is the user behavior.
    
    # Check state first. Default is Checked.
    if not page_on_index.locator("#loadDemo").is_checked():
        page_on_index.click("div.checkbox-item:has-text('Load Demo Data')")
    if not page_on_index.locator("#createSuper").is_checked():
        page_on_index.click("div.checkbox-item:has-text('Create Admin User')")
        
    page_on_index.fill("#adminUser", "admin_tester")
    
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    setup_code = page_on_index.locator("#setupCode").inner_text()
    fresh_code = page_on_index.locator("#freshCode").inner_text()
    
    # Verify the python shell check is present
    expected_snippet = "if python3 manage.py shell -c"
    assert expected_snippet in setup_code, "Setup script missing redundancy check"
    assert "admin_tester" in setup_code
    
    assert expected_snippet in fresh_code, "Fresh DB script missing redundancy check"

def test_no_redux_check_when_demo_disabled(page_on_index: Page):
    # Uncheck Load Demo
    # If it is checked, click to uncheck
    if page_on_index.locator("#loadDemo").is_checked():
        page_on_index.click("div.checkbox-item:has-text('Load Demo Data')")
    
    # Create Admin should be checked
    if not page_on_index.locator("#createSuper").is_checked():
        page_on_index.click("div.checkbox-item:has-text('Create Admin User')")
        
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    setup_code = page_on_index.locator("#setupCode").inner_text()
    
    # Should NOT have the python shell check, just the straightforward creation
    assert "if python3 manage.py shell -c" not in setup_code
    assert "python3 manage.py createhorillauser" in setup_code
