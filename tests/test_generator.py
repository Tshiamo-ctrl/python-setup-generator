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
    expect(page_on_index).to_have_title("Local Setup Generator | Automate Your Python Workspace")
    # Initial static title matching the new H1
    expect(page_on_index.locator("h1#mainTitle")).to_contain_text("Local Setup Generator")
    # Check for the local disclaimer
    expect(page_on_index.locator("text=Local Generator Only")).to_be_visible()

def test_repo_dropdown_population(page_on_index: Page):
    # Verify the dropdown has options
    # We might need to wait for JS to run, but on load should be fast.
    dropdown = page_on_index.locator("#repoSelect")
    expect(dropdown).to_be_visible()
    
    # Check for a specific known entry (e.g. Cookiecutter)
    # The value is JSON, so we check the text content of options
    expect(dropdown.locator("option").filter(has_text="Cookiecutter Django")).to_have_count(1)
    expect(dropdown.locator("option").filter(has_text="Wagtail CMS")).to_have_count(1)

def test_custom_repo_selection(page_on_index: Page):
    # Select "Custom"
    page_on_index.select_option("#repoSelect", "custom")
    
    # Input should become visible
    custom_input = page_on_index.locator("#customRepoField")
    expect(custom_input).to_be_visible()
    
    # Fill URL
    page_on_index.fill("#customRepoUrl", "https://github.com/testuser/testproject.git")
    
    # Select Framework
    page_on_index.select_option("#frameworkSelect", "django")
    
    # Click Generate
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Check Setup content
    setup_code = page_on_index.locator("#setupCode").inner_text()
    assert "https://github.com/testuser/testproject.git" in setup_code
    assert "testproject" in setup_code # Extracted name
    assert "python3 manage.py migrate" in setup_code # Django default

def test_framework_switch_flask(page_on_index: Page):
    # Select Custom
    page_on_index.select_option("#repoSelect", "custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/flask/app.git")
    
    # Select Flask
    page_on_index.select_option("#frameworkSelect", "flask")
    
    # Click Generate
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Check Server Script
    server_code = page_on_index.locator("#serverCode").inner_text()
    assert "flask run" in server_code
    assert "manage.py runserver" not in server_code
    
    # Check Setup Script
    setup_code = page_on_index.locator("#setupCode").inner_text()
    assert "manage.py migrate" not in setup_code
    assert "Non-Django framework selected" in setup_code

def test_custom_commands(page_on_index: Page):
    # Select Custom
    page_on_index.select_option("#repoSelect", "custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/custom/cmd.git")
    
    # Fill Custom Commands
    page_on_index.fill("#cmdAdmin", "python3 manage.py create_special_admin")
    page_on_index.fill("#cmdPostInstall", "npm install && npm run build")
    
    # Click Generate
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Check Setup Script
    setup_code = page_on_index.locator("#setupCode").inner_text()
    
    # Check Post Install
    assert "npm install && npm run build" in setup_code
    # Check Admin Command (requires Create Admin checkbox, which is default)
    assert "python3 manage.py create_special_admin" in setup_code

def test_clear_workspace_danger_zone(page_on_index: Page):
    # Check if Danger Zone exists
    expect(page_on_index.locator("h3:has-text('Danger Zone')")).to_be_visible()
    
    # We verify the logic by invoking the generator functions directly
    # Check Clear Workspace Content by calling JS function
    clear_code = page_on_index.evaluate("""
        generateClearScript('/home/user/test', 'test_venv', 'postgresql', 'workspace')
    """)
    
    assert "rm -rf" in clear_code
    assert "Removing virtual environment..." in clear_code
