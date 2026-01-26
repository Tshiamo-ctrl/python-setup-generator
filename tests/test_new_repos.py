import pytest
from playwright.sync_api import Page, expect

def test_new_repos_setup_commands(page_on_index: Page):
    """Test that new repositories (AI, Modern Frameworks, Tools) generate correct setup commands"""
    
    test_cases = [
        # AI & Agents
        ("Strands Agents SDK", "pip install strands-agents strands-agents-tools"),
        ("ScrapeGraph-AI", "pip install scrapegraphai && playwright install"),
        ("smolagents", 'pip install "smolagents[toolkit]"'),
        
        # Modern Web Frameworks
        ("LiteStar", "pip install 'litestar[standard]'"),
        ("FastRTC", 'pip install "fastrtc[vad, tts]"'),
        ("Falcon", "pip install uvicorn[standard] && pip install falcon"),
        
        # Tools & Utilities
        ("Click", "pip install click"),
        ("Gaphor", "pip install gaphor"),
        ("Pokete", "pip install pokete")
    ]

    # Wait for population
    page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")

    for repo_name, expected_cmd in test_cases:
        # Select by label (partial match works for "Strands Agents SDK (New)")
        # We need to find the option that contains the name
        repo_option = page_on_index.locator(f"#repoSelect option:has-text('{repo_name}')").first
        repo_value = repo_option.get_attribute("value")
        
        page_on_index.select_option("#repoSelect", value=repo_value)
        page_on_index.click("button:has-text('Continue to Scripts')")
        page_on_index.wait_for_timeout(300)
        
        setup_code = page_on_index.locator("#setupCode").inner_text()
        
        # Check if the post-install command is present
        # The generator adds "Running post-install commands..." then the command
        assert expected_cmd in setup_code, f"Expected '{expected_cmd}' for {repo_name}, got:\n{setup_code}"
        
        # Reset for next iteration (though select_option replaces selection, 
        # checking 'continue' might need reset if it toggles view, but here it just updates existing view)
        # However, to be safe and ensure clean state/event triggering:
        page_on_index.reload()
        page_on_index.wait_for_selector("#repoSelect option:nth-child(2)", state="attached")
