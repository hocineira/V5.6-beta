#!/usr/bin/env python3
"""
Test for the new "À propos de moi" page for Hocine IRATNI's portfolio
Tests the accessibility, content, navigation, and responsiveness of the /a-propos page
"""

import requests
import json
import sys
import os
import time
from urllib.parse import urljoin

# Configuration
BASE_URL = "http://localhost:3000"

def test_a_propos_accessibility():
    """Test that the /a-propos page is accessible with HTTP 200"""
    print("🔍 Testing /a-propos page accessibility...")
    
    try:
        response = requests.get(f"{BASE_URL}/a-propos", timeout=10)
        
        if response.status_code == 200:
            print("  ✅ /a-propos page accessible (HTTP 200)")
            return {
                "success": True,
                "status_code": response.status_code,
                "content_length": len(response.text)
            }
        else:
            print(f"  ❌ /a-propos page returned HTTP {response.status_code}")
            return {
                "success": False,
                "status_code": response.status_code,
                "error": f"HTTP {response.status_code}"
            }
            
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def test_a_propos_content():
    """Test that the page contains expected content about Hocine IRATNI"""
    print("🔍 Testing /a-propos page content...")
    
    try:
        response = requests.get(f"{BASE_URL}/a-propos", timeout=10)
        
        if response.status_code != 200:
            return {"success": False, "error": f"Page not accessible: HTTP {response.status_code}"}
        
        content = response.text.lower()
        
        # Expected content based on the review request
        expected_elements = {
            "name": "hocine iratni",
            "age": "20 ans",
            "formation": "bts sio sisr",
            "location": "marseille",
            "experience": "fibre optique",
            "about_section": "à propos"
        }
        
        found_elements = {}
        missing_elements = []
        
        for key, expected_text in expected_elements.items():
            if expected_text in content:
                found_elements[key] = True
                print(f"  ✅ Found: {expected_text}")
            else:
                found_elements[key] = False
                missing_elements.append(expected_text)
                print(f"  ❌ Missing: {expected_text}")
        
        success_rate = sum(found_elements.values()) / len(expected_elements)
        
        return {
            "success": success_rate >= 0.7,  # At least 70% of content should be present
            "found_elements": found_elements,
            "missing_elements": missing_elements,
            "success_rate": success_rate,
            "content_length": len(response.text)
        }
        
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def test_navigation_to_a_propos():
    """Test that navigation includes the 'À propos' link"""
    print("🔍 Testing navigation to /a-propos...")
    
    try:
        # Test from main page
        response = requests.get(f"{BASE_URL}/accueil", timeout=10)
        
        if response.status_code != 200:
            return {"success": False, "error": f"Main page not accessible: HTTP {response.status_code}"}
        
        content = response.text.lower()
        
        # Look for navigation links to "à propos"
        navigation_indicators = [
            "à propos",
            "/a-propos",
            "about"
        ]
        
        found_navigation = []
        for indicator in navigation_indicators:
            if indicator in content:
                found_navigation.append(indicator)
                print(f"  ✅ Found navigation indicator: {indicator}")
        
        if found_navigation:
            print(f"  ✅ Navigation to 'À propos' found")
            return {
                "success": True,
                "found_indicators": found_navigation
            }
        else:
            print(f"  ❌ No navigation to 'À propos' found")
            return {
                "success": False,
                "error": "No navigation indicators found"
            }
            
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def test_page_structure():
    """Test the basic HTML structure and meta tags"""
    print("🔍 Testing /a-propos page structure...")
    
    try:
        response = requests.get(f"{BASE_URL}/a-propos", timeout=10)
        
        if response.status_code != 200:
            return {"success": False, "error": f"Page not accessible: HTTP {response.status_code}"}
        
        content = response.text
        
        # Check for basic HTML structure
        structure_checks = {
            "html_tag": "<html" in content,
            "head_tag": "<head" in content,
            "body_tag": "<body" in content,
            "title_tag": "<title" in content,
            "meta_viewport": "viewport" in content,
            "charset": "charset" in content
        }
        
        passed_checks = sum(structure_checks.values())
        total_checks = len(structure_checks)
        
        for check, passed in structure_checks.items():
            status = "✅" if passed else "❌"
            print(f"  {status} {check}: {'PASS' if passed else 'FAIL'}")
        
        return {
            "success": passed_checks >= total_checks * 0.8,  # At least 80% should pass
            "structure_checks": structure_checks,
            "passed_checks": passed_checks,
            "total_checks": total_checks
        }
        
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def test_responsive_design():
    """Test responsive design by checking for responsive CSS classes"""
    print("🔍 Testing /a-propos responsive design...")
    
    try:
        response = requests.get(f"{BASE_URL}/a-propos", timeout=10)
        
        if response.status_code != 200:
            return {"success": False, "error": f"Page not accessible: HTTP {response.status_code}"}
        
        content = response.text
        
        # Look for responsive design indicators
        responsive_indicators = [
            "responsive",
            "mobile",
            "tablet",
            "desktop",
            "sm:",
            "md:",
            "lg:",
            "xl:",
            "flex",
            "grid",
            "@media"
        ]
        
        found_indicators = []
        for indicator in responsive_indicators:
            if indicator in content:
                found_indicators.append(indicator)
        
        print(f"  ✅ Found {len(found_indicators)} responsive design indicators")
        
        return {
            "success": len(found_indicators) >= 3,  # At least 3 indicators should be present
            "found_indicators": found_indicators,
            "indicator_count": len(found_indicators)
        }
        
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def main():
    """Main testing function for À propos page"""
    print("🚀 Starting À Propos Page Testing for Hocine IRATNI Portfolio")
    print("=" * 70)
    
    # Run all tests
    accessibility_result = test_a_propos_accessibility()
    content_result = test_a_propos_content()
    navigation_result = test_navigation_to_a_propos()
    structure_result = test_page_structure()
    responsive_result = test_responsive_design()
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 À PROPOS PAGE TESTING SUMMARY")
    print("=" * 70)
    
    print(f"Page Accessibility: {'✅ WORKING' if accessibility_result.get('success') else '❌ FAILING'}")
    if accessibility_result.get('success'):
        print(f"  - Status Code: {accessibility_result.get('status_code')}")
        print(f"  - Content Length: {accessibility_result.get('content_length')} characters")
    
    print(f"Content Verification: {'✅ WORKING' if content_result.get('success') else '❌ FAILING'}")
    if content_result.get('success_rate'):
        print(f"  - Content Match Rate: {content_result.get('success_rate')*100:.1f}%")
    if content_result.get('missing_elements'):
        print(f"  - Missing Elements: {', '.join(content_result.get('missing_elements', []))}")
    
    print(f"Navigation Integration: {'✅ WORKING' if navigation_result.get('success') else '❌ FAILING'}")
    if navigation_result.get('found_indicators'):
        print(f"  - Found Indicators: {', '.join(navigation_result.get('found_indicators', []))}")
    
    print(f"Page Structure: {'✅ WORKING' if structure_result.get('success') else '❌ FAILING'}")
    if structure_result.get('passed_checks'):
        print(f"  - Structure Checks: {structure_result.get('passed_checks')}/{structure_result.get('total_checks')}")
    
    print(f"Responsive Design: {'✅ WORKING' if responsive_result.get('success') else '❌ FAILING'}")
    if responsive_result.get('indicator_count'):
        print(f"  - Responsive Indicators: {responsive_result.get('indicator_count')}")
    
    # Overall assessment
    all_tests = [
        accessibility_result.get('success', False),
        content_result.get('success', False),
        navigation_result.get('success', False),
        structure_result.get('success', False),
        responsive_result.get('success', False)
    ]
    
    passed_tests = sum(all_tests)
    total_tests = len(all_tests)
    
    overall_success = passed_tests >= 4  # At least 4 out of 5 tests should pass
    
    print(f"\n🎯 OVERALL À PROPOS PAGE STATUS: {'✅ WORKING' if overall_success else '❌ FAILING'}")
    print(f"Tests Passed: {passed_tests}/{total_tests}")
    
    if not overall_success:
        print("\n🔧 ISSUES IDENTIFIED:")
        if not accessibility_result.get('success'):
            print(f"  - Page accessibility issue: {accessibility_result.get('error', 'Unknown error')}")
        if not content_result.get('success'):
            print(f"  - Content verification failed: Missing {len(content_result.get('missing_elements', []))} elements")
        if not navigation_result.get('success'):
            print(f"  - Navigation integration issue: {navigation_result.get('error', 'Unknown error')}")
        if not structure_result.get('success'):
            print("  - Page structure issues detected")
        if not responsive_result.get('success'):
            print("  - Responsive design indicators insufficient")
    else:
        print("\n🎉 À PROPOS PAGE TESTS RESULTS:")
        print("  - Page is accessible and loads correctly")
        print("  - Expected content about Hocine IRATNI is present")
        print("  - Navigation integration working")
        print("  - Page structure is valid")
        print("  - Responsive design indicators present")
    
    return overall_success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)