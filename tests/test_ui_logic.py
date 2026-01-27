import pytest
from playwright.sync_api import Page, expect

def test_mutual_exclusivity_basic(page: Page):
    """
    Test basic mutual exclusivity: checks one unchecks the other.
    """
    page.goto("file:///home/tmo/Documents/Horilla_setup_generator_app/index.html")
    
    # Wait for hydration
    page.wait_for_selector("#initDb")
    
    # Default State: InitDB checked, LoadDemo unchecked
    expect(page.locator("#initDb")).to_be_checked()
    expect(page.locator("#loadDemo")).not_to_be_checked()
    
    # Check Load Demo -> Should uncheck InitDB
    page.check("#loadDemo")
    expect(page.locator("#loadDemo")).to_be_checked()
    expect(page.locator("#initDb")).not_to_be_checked()
    
    # Check Init DB -> Should uncheck Load Demo
    page.check("#initDb")
    expect(page.locator("#initDb")).to_be_checked()
    expect(page.locator("#loadDemo")).not_to_be_checked()

def test_create_admin_suppression(page: Page):
    """
    Test that Create Admin is unchecked when Load Demo is checked.
    """
    page.goto("file:///home/tmo/Documents/Horilla_setup_generator_app/index.html")
    page.wait_for_selector("#initDb")
    
    # Default: Create Admin checked (assuming standard flow)
    # Check default state logic in index.html, usually checked if hasDb
    expect(page.locator("#createSuper")).to_be_checked()
    
    # Check Load Demo
    page.check("#loadDemo")
    
    # Expect Create Admin to be unchecked
    expect(page.locator("#createSuper")).not_to_be_checked()
    
    # Uncheck Load Demo (Manual state) -> Create Admin should verify user intent?
    # Logic doesn't re-check it automatically (good UX usually), just unchecks on conflict.
    # User can re-check it if they want.
    page.uncheck("#loadDemo")
    expect(page.locator("#createSuper")).not_to_be_checked()
    
    # Manual Re-check
    page.check("#createSuper")
    expect(page.locator("#createSuper")).to_be_checked()

def test_run_server_suppression_manual_mode(page: Page):
    """
    Test that Run Server is unchecked if NEITHER InitDB nor LoadDemo is checked.
    """
    page.goto("file:///home/tmo/Documents/Horilla_setup_generator_app/index.html")
    page.wait_for_selector("#initDb")
    
    # Default: InitDB Checked -> Run Server Checked (default)
    expect(page.locator("#runServer")).to_be_checked()
    
    # Uncheck InitDB (enter Manual Mode)
    page.uncheck("#initDb")
    
    # Now both are unchecked. Expect Run Server to be unchecked.
    expect(page.locator("#loadDemo")).not_to_be_checked()
    expect(page.locator("#initDb")).not_to_be_checked()
    expect(page.locator("#runServer")).not_to_be_checked()
    
    # Re-check InitDB -> Run Server logic doesn't say to re-check, only to uncheck on manual
    # But let's verify it stays unchecked unless user checks it
    page.check("#initDb")
    # It might stay unchecked, which is fine.
    
    # What if we start clean and check Demo?
    # Demo checked -> Run server not forced unchecked (unless explicit logic added? Only checked manual mode logic)
    # Logic: if (!loadDemo && !initDb) -> uncheck runServer.
    # So if we have one checked, it shouldn't uncheck runServer.
