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
    
    # Wait for repos to load
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Check for specific known entries from new catalog
    expect(dropdown.locator("option").filter(has_text="Saleor")).to_have_count(1)
    expect(dropdown.locator("option").filter(has_text="Wagtail CMS")).to_have_count(1)
    expect(dropdown.locator("option").filter(has_text="FastAPI itself")).to_have_count(1)

def test_minimalist_ui_toggling(page_on_index: Page):
    # By default, curated repo should be selected (populated from REPO_LIST)
    # or at least on load we check #advancedConfig visibility
    adv_config = page_on_index.locator("#advancedConfig")
    dropdown = page_on_index.locator("#repoSelect")
    
    # Wait for options to be populated (beyond the "Custom" one)
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Select a curated repo - use Saleor from new catalog
    page_on_index.select_option("#repoSelect", value="https://github.com/saleor/saleor.git")
    
    # Advanced config should be hidden by default
    expect(adv_config).to_be_hidden()
    
    # Check auto-filled defaults in the hidden fields
    # Enable custom config to see the values
    page_on_index.check("#enableCustomConfig")
    expect(adv_config).to_be_visible()
    
    # (even if hidden, values should be set)
    path_val = page_on_index.locator("#projectPath").input_value()
    assert "saleor" in path_val.lower()
    
    # Switch to Custom
    page_on_index.select_option("#repoSelect", value="custom")
    expect(adv_config).to_be_visible()

def test_custom_repo_selection(page_on_index: Page):
    # Select "Custom"
    page_on_index.select_option("#repoSelect", value="custom")
    
    # Advanced config and custom URL field should be visible
    expect(page_on_index.locator("#advancedConfig")).to_be_visible()
    expect(page_on_index.locator("#customRepoField")).to_be_visible()
    
    # Fill URL
    page_on_index.fill("#customRepoUrl", "https://github.com/testuser/testproject.git")
    
    # Select Framework
    page_on_index.select_option("#frameworkSelect", value="django")
    
    # Click Generate
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Wait for the carousel sections to become visible
    page_on_index.wait_for_timeout(500)
    expect(page_on_index.locator("#scriptsCarousel")).to_be_visible()
    
    # Check Setup content in carousel
    setup_code = page_on_index.locator("#setupCode").inner_text()
    assert "https://github.com/testuser/testproject.git" in setup_code
    assert "python3 manage.py migrate" in setup_code
 

def test_framework_switch_flask(page_on_index: Page):
    # Select Custom to expose framework dropdown
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/flask/app.git")
    
    # Select Flask
    page_on_index.select_option("#frameworkSelect", value="flask")
    
    # Click Generate
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Wait for carousel to appear
    page_on_index.wait_for_timeout(500)
    expect(page_on_index.locator("#scriptsCarousel")).to_be_visible()
    
    # Navigate to dev-server script using carousel
    # Click next button twice (setup -> fresh -> server)
    page_on_index.click(".carousel-nav.next")
    page_on_index.wait_for_timeout(300)
    page_on_index.click(".carousel-nav.next")
    page_on_index.wait_for_timeout(300)
    
    # Check Server Script
    server_code = page_on_index.locator("#serverCode").inner_text()
    assert "flask run" in server_code
    
    # Navigate back to setup using carousel prev button
    page_on_index.click(".carousel-nav.prev")
    page_on_index.wait_for_timeout(300)
    page_on_index.click(".carousel-nav.prev")
    page_on_index.wait_for_timeout(300)
    
    setup_code = page_on_index.locator("#setupCode").inner_text()
    assert "Non-Django framework selected" in setup_code

def test_custom_commands(page_on_index: Page):
    # Select Custom
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/custom/cmd.git")
    
    # Fill Custom Commands
    page_on_index.fill("#cmdAdmin", "python3 manage.py create_special_admin")
    page_on_index.fill("#cmdPostInstall", "npm install && npm run build")
    
    # Click Generate
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Wait for scripts carousel
    page_on_index.wait_for_timeout(500)
    expect(page_on_index.locator("#scriptsCarousel")).to_be_visible()
    
    # Check Setup Script
    setup_code = page_on_index.locator("#setupCode").inner_text()
    
    # Check Post Install
    assert "npm install && npm run build" in setup_code
    # Check Admin Command 
    assert "python3 manage.py create_special_admin" in setup_code

def test_clear_workspace_danger_zone(page_on_index: Page):
    # Check if Danger Zone exists
    expect(page_on_index.locator("h3:has-text('Danger Zone')")).to_be_visible()
    
    # Check Clear Workspace Content by calling JS function
    clear_code = page_on_index.evaluate("""
        generateClearScript('my-project', '/home/user/test', 'test_venv', 'sqlite', 'workspace')
    """)
    
    assert "rm -rf" in clear_code
    assert "Removing virtual environment..." in clear_code

def test_repository_categories(page_on_index: Page):
    """Test that all 6 repository categories are present in dropdown"""
    dropdown = page_on_index.locator("#repoSelect")
    
    # Wait for repos to load
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Check for category headers (optgroups) - they exist but aren't "visible" so use count
    expect(dropdown.locator("optgroup[label='Django Frameworks']")).to_have_count(1)
    expect(dropdown.locator("optgroup[label='FastAPI Frameworks']")).to_have_count(1)
    expect(dropdown.locator("optgroup[label='Flask Frameworks']")).to_have_count(1)
    expect(dropdown.locator("optgroup[label='Data & ORM Libraries']")).to_have_count(1)
    expect(dropdown.locator("optgroup[label='Frappe & Specialized']")).to_have_count(1)
    expect(dropdown.locator("optgroup[label='CMS & E-Commerce']")).to_have_count(1)

def test_new_repository_selection(page_on_index: Page):
    """Test selecting new repositories from the Python frameworks catalog"""
    dropdown = page_on_index.locator("#repoSelect")
    
    # Wait for population
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Test Django repo - Saleor
    expect(dropdown.locator("option").filter(has_text="Saleor")).to_have_count(1)
    
    # Test FastAPI repo
    expect(dropdown.locator("option").filter(has_text="FastAPI itself")).to_have_count(1)
    
    # Test Flask repo
    expect(dropdown.locator("option").filter(has_text="Flask itself")).to_have_count(1)
    
    # Test Frappe repo
    expect(dropdown.locator("option").filter(has_text="ERPNext")).to_have_count(1)

def test_custom_config_checkbox_visibility(page_on_index: Page):
    """Test custom configuration checkbox appears for pre-configured repos"""
    dropdown = page_on_index.locator("#repoSelect")
    custom_checkbox_div = page_on_index.locator("#customConfigCheckbox")
    custom_checkbox = page_on_index.locator("#enableCustomConfig")
    
    # Wait for repos
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Initially hidden
    expect(custom_checkbox_div).to_be_hidden()
    
    # Select a pre-configured repo - should show checkbox
    page_on_index.select_option("#repoSelect", value="https://github.com/saleor/saleor.git")
    expect(custom_checkbox_div).to_be_visible()
    expect(custom_checkbox).not_to_be_disabled()
    
    # Select custom URL - checkbox should hide, advanced config should show
    page_on_index.select_option("#repoSelect", value="custom")
    expect(custom_checkbox_div).to_be_hidden()
    expect(page_on_index.locator("#advancedConfig")).to_be_visible()

def test_custom_config_checkbox_functionality(page_on_index: Page):
    """Test that custom config checkbox toggles advanced config visibility"""
    # Wait for repos
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Select pre-configured repo
    page_on_index.select_option("#repoSelect", value="https://github.com/saleor/saleor.git")
    
    # Advanced config should be hidden initially
    expect(page_on_index.locator("#advancedConfig")).to_be_hidden()
    
    # Check the custom config checkbox
    page_on_index.check("#enableCustomConfig")
    
    # Advanced config should now be visible
    expect(page_on_index.locator("#advancedConfig")).to_be_visible()
    
    # Uncheck
    page_on_index.uncheck("#enableCustomConfig")
    
    # Advanced config should hide again
    expect(page_on_index.locator("#advancedConfig")).to_be_hidden()

def test_framework_auto_detection(page_on_index: Page):
    """Test that framework is auto-detected from repository selection"""
    # Wait for repos
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Select Django repo
    page_on_index.select_option("#repoSelect", value="https://github.com/saleor/saleor.git")
    
    # Enable custom config to see framework value
    page_on_index.check("#enableCustomConfig")
    
    # Framework should be set to django
    framework_value = page_on_index.locator("#frameworkSelect").input_value()
    assert framework_value == "django"
    
    # Select FastAPI repo
    page_on_index.select_option("#repoSelect", value="https://github.com/tiangolo/fastapi.git")
    framework_value = page_on_index.locator("#frameworkSelect").input_value()
    assert framework_value == "fastapi"

def test_frappe_framework_support(page_on_index: Page):
    """Test that Frappe framework option exists and generates appropriate scripts"""
    # Select custom to access framework selector
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/frappe/erpnext.git")
    
    # Select Frappe framework
    page_on_index.select_option("#frameworkSelect", value="frappe")
    
    # Generate scripts
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Wait for scripts to generate
    page_on_index.wait_for_timeout(500)
    
    # Check that bench command appears in admin command
    # We need to check the value was set correctly
    admin_cmd = page_on_index.locator("#cmdAdmin").input_value()
    assert "bench" in admin_cmd

def test_carousel_structure(page_on_index: Page):
    """Test that carousel HTML structure exists after script generation"""
    # Generate scripts with any repo
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/test/repo.git")
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    # Wait a bit for generation
    page_on_index.wait_for_timeout(500)
    
    # Check carousel elements exist
    expect(page_on_index.locator("#configSummary")).to_be_visible()
    expect(page_on_index.locator("#quickActions")).to_be_visible()
    expect(page_on_index.locator("#scriptsCarousel")).to_be_visible()
    
    # Check carousel structure
    expect(page_on_index.locator(".carousel-container")).to_be_visible()
    expect(page_on_index.locator(".carousel-track")).to_be_visible()
    expect(page_on_index.locator(".carousel-slide")).to_have_count(4)
    expect(page_on_index.locator(".carousel-nav.prev")).to_be_visible()
    expect(page_on_index.locator(".carousel-nav.next")).to_be_visible()
    expect(page_on_index.locator(".indicator")).to_have_count(4)

def test_carousel_navigation(page_on_index: Page):
    """Test carousel navigation buttons work"""
    # Generate scripts
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/test/repo.git")
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    page_on_index.wait_for_timeout(500)
    
    # First slide should be active
    first_slide = page_on_index.locator(".carousel-slide[data-script='setup']")
    expect(first_slide).to_have_class("carousel-slide active")
    
    # Click next button
    page_on_index.click(".carousel-nav.next")
    page_on_index.wait_for_timeout(300)
    
    # Second slide should now be active
    second_slide = page_on_index.locator(".carousel-slide[data-script='fresh']")
    expect(second_slide).to_have_class("carousel-slide active")
    
    # Click prev button
    page_on_index.click(".carousel-nav.prev")
    page_on_index.wait_for_timeout(300)
    
    # First slide should be active again
    expect(first_slide).to_have_class("carousel-slide active")

def test_carousel_indicator_navigation(page_on_index: Page):
    """Test clicking carousel indicators jumps to correct slide"""
    # Generate scripts
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/test/repo.git")
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    page_on_index.wait_for_timeout(500)
    
    # Click third indicator (index 2)
    indicators = page_on_index.locator(".indicator")
    indicators.nth(2).click()
    page_on_index.wait_for_timeout(300)
    
    # Third slide should be active
    third_slide = page_on_index.locator(".carousel-slide[data-script='server']")
    expect(third_slide).to_have_class("carousel-slide active")
    
    # Third indicator should be active
    expect(indicators.nth(2)).to_have_class("indicator active")

def test_configuration_summary_display(page_on_index: Page):
    """Test that configuration summary displays correctly"""
    # Select a repo and generate
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    page_on_index.select_option("#repoSelect", value="https://github.com/saleor/saleor.git")
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    page_on_index.wait_for_timeout(500)
    
    # Config summary should be visible
    expect(page_on_index.locator("#configSummary")).to_be_visible()
    
    # Check summary fields are populated
    repo_text = page_on_index.locator("#summaryRepo").inner_text()
    assert "saleor" in repo_text.lower()
    
    framework_text = page_on_index.locator("#summaryFramework").inner_text()
    assert "DJANGO" in framework_text
    
    # Path should contain saleor
    path_text = page_on_index.locator("#summaryPath").inner_text()
    assert "saleor" in path_text.lower()

def test_quick_actions_panel(page_on_index: Page):
    """Test Quick Actions panel appears and has correct buttons"""
    # Generate scripts
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/test/repo.git")
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    page_on_index.wait_for_timeout(500)
    
    # Quick actions should be visible
    expect(page_on_index.locator("#quickActions")).to_be_visible()
    
    # Check all 4 action buttons exist
    expect(page_on_index.locator("button:has-text('Save All Scripts')")).to_be_visible()
    expect(page_on_index.locator("button:has-text('Copy Command')").first).to_be_visible()
    expect(page_on_index.locator("button:has-text('Copy ./setup.sh')")).to_be_visible()
    expect(page_on_index.locator("button:has-text('Copy Server Command')")).to_be_visible()

def test_copy_button_functionality(page_on_index: Page):
    """Test that copy buttons work and show feedback"""
    # Generate scripts
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/test/repo.git")
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    page_on_index.wait_for_timeout(500)
    
    # Click copy button on first carousel slide
    copy_button = page_on_index.locator("#scriptsCarousel .carousel-slide.active button:has-text('Copy')")
    copy_button.click()
    
    # Wait for copy feedback to appear
    page_on_index.wait_for_timeout(200)
    
    # Copy feedback should be visible
    feedback = page_on_index.locator("#copyFeedback")
    expect(feedback).to_be_visible()

def test_script_generation_for_all_frameworks(page_on_index: Page):
    """Test that scripts generate correctly for Django, Flask, FastAPI, Frappe"""
    frameworks = [
        ("django", "python3 manage.py migrate"),
        ("flask", "flask run"),
        ("fastapi", "uvicorn"),
        ("frappe", "bench")
    ]
    
    for framework, expected_text in frameworks:
        # Reset page
        page_on_index.reload()
        page_on_index.wait_for_timeout(300)
        
        # Configure and generate
        page_on_index.select_option("#repoSelect", value="custom")
        page_on_index.fill("#customRepoUrl", f"https://github.com/test/{framework}-app.git")
        page_on_index.select_option("#frameworkSelect", value=framework)
        page_on_index.click("button:has-text('Continue to Scripts')")
        
        page_on_index.wait_for_timeout(500)
        
        # Check setup script contains framework-specific content
        setup_code = page_on_index.locator("#setupCode").inner_text()
        assert expected_text in setup_code.lower(), f"Expected '{expected_text}' in {framework} setup script"

def test_auto_configuration_from_repo(page_on_index: Page):
    """Test that selecting a repo auto-configures project path and venv name"""
    # Wait for repos
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
    
    # Select Saleor
    page_on_index.select_option("#repoSelect", value="https://github.com/saleor/saleor.git")
    
    # Enable custom config to see values
    page_on_index.check("#enableCustomConfig")
    
    # Check auto-filled values
    project_path = page_on_index.locator("#projectPath").input_value()
    assert "saleor" in project_path.lower()
    
    venv_name = page_on_index.locator("#venvName").input_value()
    assert "saleor" in venv_name.lower()
    
    db_name = page_on_index.locator("#dbName").input_value()
    assert "saleor" in db_name.lower()

def test_greyed_out_carousel_slides(page_on_index: Page):
    """Test that non-active carousel slides have reduced opacity"""
    # Generate scripts
    page_on_index.select_option("#repoSelect", value="custom")
    page_on_index.fill("#customRepoUrl", "https://github.com/test/repo.git")
    page_on_index.click("button:has-text('Continue to Scripts')")
    
    page_on_index.wait_for_timeout(500)
    
    # First slide is active, should have full opacity
    first_slide = page_on_index.locator(".carousel-slide[data-script='setup']")
    assert "active" in first_slide.get_attribute("class")
    
    # Other slides should not have active class (opacity controlled by CSS)
    second_slide = page_on_index.locator(".carousel-slide[data-script='fresh']")
    assert "active" not in second_slide.get_attribute("class")
