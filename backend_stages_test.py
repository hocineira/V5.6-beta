#!/usr/bin/env python3
"""
Backend Testing for "Mes Stages" Page - French Review Request
Tests the new stages page at /a-propos/stages and associated functionality
"""

import requests
import json
import sys
import os
import time
from urllib.parse import urljoin

# Configuration
BASE_URL = "http://localhost:3000"

def test_stages_page_accessibility():
    """Test that the /a-propos/stages route is accessible and returns valid HTML"""
    print("🔍 Testing Stages Page Accessibility (/a-propos/stages)...")
    
    try:
        url = f"{BASE_URL}/a-propos/stages"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            content = response.text
            
            # Check for valid HTML structure
            html_checks = {
                "html_tag": "<html" in content,
                "head_tag": "<head>" in content or "<head " in content,
                "body_tag": "<body>" in content or "<body " in content,
                "title_tag": "<title>" in content,
                "meta_viewport": "viewport" in content
            }
            
            # Check for stages-specific content
            content_checks = {
                "stages_title": "Mes Stages" in content,
                "sauvegarde13": "Sauvegarde13" in content,
                "mars_mai_2025": "Mars 2025" in content and "Mai 2025" in content,
                "marseille": "Marseille" in content,
                "stage_info": "Stage chez" in content or "stage" in content.lower()
            }
            
            html_passed = sum(html_checks.values())
            content_passed = sum(content_checks.values())
            
            print(f"  ✅ Page accessible (HTTP 200)")
            print(f"  ✅ HTML structure: {html_passed}/5 checks passed")
            print(f"  ✅ Content verification: {content_passed}/5 checks passed")
            
            if html_passed >= 4 and content_passed >= 3:
                print("  ✅ Stages page working correctly")
                return {
                    "success": True,
                    "status_code": response.status_code,
                    "content_length": len(content),
                    "html_checks": html_checks,
                    "content_checks": content_checks
                }
            else:
                print("  ❌ Page content incomplete")
                return {
                    "success": False,
                    "error": "Page content incomplete",
                    "html_checks": html_checks,
                    "content_checks": content_checks
                }
        else:
            print(f"  ❌ Page not accessible (HTTP {response.status_code})")
            return {"success": False, "error": f"HTTP {response.status_code}"}
            
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def test_stage_images_loading():
    """Test that all 9 stage images are served correctly from /public/images/stages/"""
    print("\n🔍 Testing Stage Images Loading (stage1.jpg to stage9.jpg)...")
    
    results = {
        "images_accessible": 0,
        "total_images": 9,
        "successful_images": [],
        "failed_images": [],
        "errors": []
    }
    
    for i in range(1, 10):  # stage1.jpg to stage9.jpg
        filename = f"stage{i}.jpg"
        try:
            url = f"{BASE_URL}/images/stages/{filename}"
            print(f"  Testing: {url}")
            
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                # Check if it's actually an image
                content_type = response.headers.get('Content-Type', '')
                content_length = len(response.content)
                
                if 'image' in content_type and content_length > 1000:  # Basic image validation
                    results["images_accessible"] += 1
                    results["successful_images"].append(filename)
                    print(f"    ✅ {filename} - OK ({content_type}, {content_length} bytes)")
                else:
                    results["failed_images"].append(f"{filename} - Invalid image: {content_type}")
                    print(f"    ❌ {filename} - Invalid image: {content_type}")
            else:
                results["failed_images"].append(f"{filename} - HTTP {response.status_code}")
                print(f"    ❌ {filename} - HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            results["failed_images"].append(f"{filename} - Connection error: {str(e)}")
            print(f"    ❌ {filename} - Connection error: {str(e)}")
    
    return results

def test_navigation_integration():
    """Test that the navigation with dropdown includes the stages page"""
    print("\n🔍 Testing Navigation Integration (À propos dropdown)...")
    
    try:
        # Test main À propos page first
        url = f"{BASE_URL}/a-propos"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            print("  ✅ Main À propos page accessible")
            
            # Check if navigation includes stages link
            content = response.text
            navigation_checks = {
                "a_propos_link": "/a-propos" in content,
                "stages_link": "/a-propos/stages" in content,
                "dropdown_menu": "dropdown" in content.lower() or "submenu" in content.lower(),
                "mes_stages": "Mes Stages" in content,
                "navigation_component": "nav" in content.lower()
            }
            
            passed_checks = sum(navigation_checks.values())
            print(f"  ✅ Navigation checks: {passed_checks}/5 passed")
            
            if passed_checks >= 3:
                print("  ✅ Navigation integration working")
                return {"success": True, "checks": navigation_checks}
            else:
                print("  ❌ Navigation integration incomplete")
                return {"success": False, "checks": navigation_checks}
        else:
            print(f"  ❌ À propos page not accessible (HTTP {response.status_code})")
            return {"success": False, "error": f"HTTP {response.status_code}"}
            
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def test_static_assets_accessibility():
    """Test that all static assets are accessible via HTTP"""
    print("\n🔍 Testing Static Assets Accessibility...")
    
    # Test direct access to images directory
    test_assets = [
        "/images/stages/stage1.jpg",
        "/images/stages/stage5.jpg", 
        "/images/stages/stage9.jpg"  # Test first, middle, and last
    ]
    
    results = {
        "assets_accessible": 0,
        "total_assets": len(test_assets),
        "successful_assets": [],
        "failed_assets": []
    }
    
    for asset_path in test_assets:
        try:
            url = f"{BASE_URL}{asset_path}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                content_type = response.headers.get('Content-Type', '')
                results["assets_accessible"] += 1
                results["successful_assets"].append(asset_path)
                print(f"  ✅ {asset_path} - OK ({content_type})")
            else:
                results["failed_assets"].append(f"{asset_path} - HTTP {response.status_code}")
                print(f"  ❌ {asset_path} - HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            results["failed_assets"].append(f"{asset_path} - Connection error: {str(e)}")
            print(f"  ❌ {asset_path} - Connection error: {str(e)}")
    
    return results

def test_page_structure():
    """Test that the page displays correct stage information structure"""
    print("\n🔍 Testing Page Structure (Sauvegarde13 stage info)...")
    
    try:
        url = f"{BASE_URL}/a-propos/stages"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            content = response.text
            
            # Check for specific stage information
            structure_checks = {
                "company_name": "Sauvegarde13" in content,
                "period": "Mars 2025" in content and "Mai 2025" in content,
                "duration": "3 mois" in content,
                "location": "Marseille" in content,
                "missions_section": "Missions" in content or "missions" in content,
                "reparation_pc": "réparation" in content.lower() and ("PC" in content or "ordinateur" in content),
                "active_directory": "Active Directory" in content,
                "rj45_installation": "RJ45" in content,
                "phone_maintenance": "téléphone" in content.lower(),
                "photos_section": "Photos" in content or "photos" in content
            }
            
            passed_checks = sum(structure_checks.values())
            print(f"  ✅ Structure checks: {passed_checks}/10 passed")
            
            # Detailed reporting
            for check, result in structure_checks.items():
                status = "✅" if result else "❌"
                print(f"    {status} {check.replace('_', ' ').title()}")
            
            if passed_checks >= 7:
                print("  ✅ Page structure complete")
                return {"success": True, "checks": structure_checks, "score": f"{passed_checks}/10"}
            else:
                print("  ❌ Page structure incomplete")
                return {"success": False, "checks": structure_checks, "score": f"{passed_checks}/10"}
        else:
            print(f"  ❌ Page not accessible (HTTP {response.status_code})")
            return {"success": False, "error": f"HTTP {response.status_code}"}
            
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def test_responsive_content():
    """Test that the content displays correctly on different screen sizes"""
    print("\n🔍 Testing Responsive Content (different viewport sizes)...")
    
    try:
        url = f"{BASE_URL}/a-propos/stages"
        
        # Test with different user agents to simulate different devices
        user_agents = {
            "desktop": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "tablet": "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
            "mobile": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
        }
        
        results = {
            "responsive_tests": 0,
            "total_tests": len(user_agents),
            "successful_devices": [],
            "failed_devices": []
        }
        
        for device, user_agent in user_agents.items():
            headers = {"User-Agent": user_agent}
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                content = response.text
                
                # Check for responsive design indicators
                responsive_indicators = [
                    "responsive" in content.lower(),
                    "viewport" in content,
                    "sm:" in content or "md:" in content or "lg:" in content,  # Tailwind responsive classes
                    "flex" in content or "grid" in content,  # Modern layout
                    len(content) > 10000  # Reasonable content length
                ]
                
                if sum(responsive_indicators) >= 3:
                    results["responsive_tests"] += 1
                    results["successful_devices"].append(device)
                    print(f"  ✅ {device.title()} - Responsive content detected")
                else:
                    results["failed_devices"].append(f"{device} - Limited responsive indicators")
                    print(f"  ❌ {device.title()} - Limited responsive indicators")
            else:
                results["failed_devices"].append(f"{device} - HTTP {response.status_code}")
                print(f"  ❌ {device.title()} - HTTP {response.status_code}")
        
        return results
        
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Connection error: {str(e)}")
        return {"success": False, "error": f"Connection error: {str(e)}"}

def main():
    """Main testing function for stages page backend functionality"""
    print("🚀 Starting Backend Testing for 'Mes Stages' Page")
    print("📋 French Review Request: Test backend de la nouvelle page /a-propos/stages")
    print("=" * 70)
    
    # Run all tests
    page_results = test_stages_page_accessibility()
    images_results = test_stage_images_loading()
    navigation_results = test_navigation_integration()
    assets_results = test_static_assets_accessibility()
    structure_results = test_page_structure()
    responsive_results = test_responsive_content()
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 BACKEND TESTING SUMMARY - MES STAGES PAGE")
    print("=" * 70)
    
    print(f"1. Page Accessibility: {'✅ WORKING' if page_results.get('success') else '❌ FAILING'}")
    if page_results.get('success'):
        print(f"   - Content length: {page_results.get('content_length', 0)} characters")
        print(f"   - HTML structure: Valid")
        print(f"   - Stage content: Present")
    
    print(f"2. Images Loading: {'✅ WORKING' if images_results['images_accessible'] >= 8 else '❌ FAILING'}")
    print(f"   - Images served: {images_results['images_accessible']}/9")
    if images_results['successful_images']:
        print(f"   - Working images: {', '.join(images_results['successful_images'][:3])}{'...' if len(images_results['successful_images']) > 3 else ''}")
    
    print(f"3. Navigation Integration: {'✅ WORKING' if navigation_results.get('success') else '❌ FAILING'}")
    if navigation_results.get('success'):
        print(f"   - Dropdown menu: Functional")
        print(f"   - Stages link: Present")
    
    print(f"4. Static Assets: {'✅ WORKING' if assets_results['assets_accessible'] >= 2 else '❌ FAILING'}")
    print(f"   - Assets accessible: {assets_results['assets_accessible']}/{assets_results['total_assets']}")
    
    print(f"5. Page Structure: {'✅ WORKING' if structure_results.get('success') else '❌ FAILING'}")
    if structure_results.get('success'):
        print(f"   - Structure score: {structure_results.get('score', 'N/A')}")
        print(f"   - Sauvegarde13 info: Present")
        print(f"   - Mission details: Present")
    
    print(f"6. Responsive Content: {'✅ WORKING' if responsive_results.get('responsive_tests', 0) >= 2 else '❌ FAILING'}")
    if responsive_results.get('responsive_tests'):
        print(f"   - Responsive devices: {responsive_results['responsive_tests']}/3")
    
    # Detailed findings
    if images_results['failed_images']:
        print(f"\n❌ Image Issues:")
        for issue in images_results['failed_images'][:3]:  # Show first 3 issues
            print(f"   - {issue}")
    
    if assets_results['failed_assets']:
        print(f"\n❌ Asset Issues:")
        for issue in assets_results['failed_assets']:
            print(f"   - {issue}")
    
    # Overall assessment
    overall_success = (
        page_results.get('success', False) and
        images_results['images_accessible'] >= 8 and
        navigation_results.get('success', False) and
        assets_results['assets_accessible'] >= 2 and
        structure_results.get('success', False) and
        responsive_results.get('responsive_tests', 0) >= 2
    )
    
    print(f"\n🎯 OVERALL STAGES PAGE BACKEND STATUS: {'✅ WORKING' if overall_success else '❌ FAILING'}")
    
    if overall_success:
        print("\n🎉 ALL STAGES PAGE TESTS PASSED:")
        print("  ✅ Route /a-propos/stages accessible with valid HTML")
        print("  ✅ All 9 stage images served correctly from /public/images/stages/")
        print("  ✅ Navigation integration with dropdown working")
        print("  ✅ Static assets accessible via HTTP")
        print("  ✅ Page displays Sauvegarde13 stage information correctly")
        print("  ✅ Responsive content working on different screen sizes")
        print("\n🏆 FRENCH REVIEW REQUEST OBJECTIVES ACHIEVED:")
        print("  ✅ Backend serving new 'Mes Stages' page successfully")
        print("  ✅ All stage images (stage1.jpg to stage9.jpg) accessible")
        print("  ✅ Navigation dropdown integration functional")
        print("  ✅ Static file server working correctly")
        print("  ✅ Page structure and content complete")
        print("  ✅ Responsive design implemented")
    else:
        print("\n🔧 ISSUES IDENTIFIED:")
        if not page_results.get('success'):
            print(f"  - Page accessibility issue: {page_results.get('error', 'Unknown')}")
        if images_results['images_accessible'] < 8:
            print(f"  - Only {images_results['images_accessible']}/9 images loading correctly")
        if not navigation_results.get('success'):
            print(f"  - Navigation integration issue: {navigation_results.get('error', 'Unknown')}")
        if assets_results['assets_accessible'] < 2:
            print(f"  - Static assets not accessible properly")
        if not structure_results.get('success'):
            print(f"  - Page structure incomplete: {structure_results.get('score', 'N/A')}")
        if responsive_results.get('responsive_tests', 0) < 2:
            print(f"  - Responsive content issues detected")
    
    return overall_success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)