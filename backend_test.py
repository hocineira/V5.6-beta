#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Windows & Starlink RSS Monitoring Systems
Tests all Next.js API endpoints, RSS fetching, JSON storage, and refresh functionality
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any

class DualRSSBackendTester:
    def __init__(self):
        self.base_url = "http://localhost:3000"
        self.api_base = f"{self.base_url}/api"
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    Details: {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    def test_health_endpoints(self):
        """Test basic health and test endpoints"""
        print("🔍 Testing Health Endpoints...")
        
        # Test API test endpoint
        try:
            response = self.session.get(f"{self.api_base}/test", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data and "services" in data:
                    self.log_test("API Test Endpoint", True, f"Status: {data.get('status')}, Services: {data.get('services')}")
                else:
                    self.log_test("API Test Endpoint", False, "Missing required fields in response", data)
            else:
                self.log_test("API Test Endpoint", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("API Test Endpoint", False, f"Connection error: {str(e)}")

    def test_windows_updates_endpoints(self):
        """Test all Windows updates API endpoints (improved filtering)"""
        print("🔍 Testing Windows Updates API Endpoints (Improved Filtering)...")
        
        # Test GET /api/windows/updates
        try:
            response = self.session.get(f"{self.api_base}/windows/updates", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data and "last_updated" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("Get Windows Updates", True, f"Retrieved {updates_count} updates")
                    
                    # Verify improved filtering - should focus on Windows/Windows Server only
                    updates = data.get("updates", [])
                    if updates:
                        sample_update = updates[0]
                        title = sample_update.get("title", "").lower()
                        description = sample_update.get("description", "").lower()
                        
                        # Check if content is Windows/Windows Server focused
                        windows_keywords = ["windows", "server", "azure", "powershell", ".net", "sql server"]
                        has_windows_focus = any(keyword in title or keyword in description for keyword in windows_keywords)
                        
                        if has_windows_focus:
                            self.log_test("Windows Filtering Improved", True, "Content focused on Windows/Windows Server ecosystem")
                        else:
                            self.log_test("Windows Filtering Improved", False, f"Sample content may not be Windows-focused: {title[:100]}")
                    
                    # Test with category filter
                    response_cat = self.session.get(f"{self.api_base}/windows/updates?category=security", timeout=10)
                    if response_cat.status_code == 200:
                        cat_data = response_cat.json()
                        self.log_test("Get Updates by Category", True, f"Security updates: {cat_data.get('total', 0)}")
                    else:
                        self.log_test("Get Updates by Category", False, f"HTTP {response_cat.status_code}")
                        
                    # Test with limit
                    response_limit = self.session.get(f"{self.api_base}/windows/updates?limit=5", timeout=10)
                    if response_limit.status_code == 200:
                        limit_data = response_limit.json()
                        actual_count = len(limit_data.get("updates", []))
                        self.log_test("Get Updates with Limit", True, f"Limited to {actual_count} updates")
                    else:
                        self.log_test("Get Updates with Limit", False, f"HTTP {response_limit.status_code}")
                        
                else:
                    self.log_test("Get Windows Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Windows Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Windows Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/latest
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/latest?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data and "timestamp" in data:
                    count = data.get("count", 0)
                    self.log_test("Get Latest Windows Updates", True, f"Retrieved {count} latest updates")
                else:
                    self.log_test("Get Latest Windows Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Latest Windows Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Latest Windows Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/stats
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "by_category" in data:
                    total = data.get("total", 0)
                    categories = data.get("by_category", {})
                    self.log_test("Get Windows Updates Stats", True, f"Total: {total}, Categories: {list(categories.keys())}")
                else:
                    self.log_test("Get Windows Updates Stats", False, "Missing required fields", data)
            else:
                self.log_test("Get Windows Updates Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Windows Updates Stats", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/categories
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/categories", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "categories" in data:
                    categories = data.get("categories", [])
                    self.log_test("Get Windows Categories", True, f"Categories: {categories}")
                else:
                    self.log_test("Get Windows Categories", False, "Missing categories field", data)
            else:
                self.log_test("Get Windows Categories", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Windows Categories", False, f"Connection error: {str(e)}")

        # Test POST /api/windows/updates/refresh
        try:
            response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("Windows RSS Refresh", True, f"Refresh response: {data.get('message')}")
                else:
                    self.log_test("Windows RSS Refresh", False, "Missing message field", data)
            else:
                self.log_test("Windows RSS Refresh", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Windows RSS Refresh", False, f"Connection error: {str(e)}")

    def test_starlink_updates_endpoints(self):
        """Test all NEW Starlink/SpaceX updates API endpoints"""
        print("🔍 Testing NEW Starlink/SpaceX Updates API Endpoints...")
        
        # Test GET /api/starlink/updates
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data and "lastUpdated" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("Get Starlink Updates", True, f"Retrieved {updates_count} updates")
                    
                    # Verify Starlink content
                    updates = data.get("updates", [])
                    if updates:
                        sample_update = updates[0]
                        title = sample_update.get("title", "").lower()
                        description = sample_update.get("description", "").lower()
                        
                        # Check if content is Starlink/SpaceX focused
                        spacex_keywords = ["starlink", "spacex", "falcon", "dragon", "mars", "satellite", "launch"]
                        has_spacex_focus = any(keyword in title or keyword in description for keyword in spacex_keywords)
                        
                        if has_spacex_focus:
                            self.log_test("Starlink Content Verification", True, "Content focused on Starlink/SpaceX")
                        else:
                            self.log_test("Starlink Content Verification", False, f"Sample content may not be SpaceX-focused: {title[:100]}")
                    
                    # Test with category filter
                    response_cat = self.session.get(f"{self.api_base}/starlink/updates?category=spacex", timeout=10)
                    if response_cat.status_code == 200:
                        cat_data = response_cat.json()
                        self.log_test("Get Starlink Updates by Category", True, f"SpaceX category updates: {cat_data.get('total', 0)}")
                    else:
                        self.log_test("Get Starlink Updates by Category", False, f"HTTP {response_cat.status_code}")
                        
                    # Test with limit
                    response_limit = self.session.get(f"{self.api_base}/starlink/updates?limit=10", timeout=10)
                    if response_limit.status_code == 200:
                        limit_data = response_limit.json()
                        actual_count = len(limit_data.get("updates", []))
                        self.log_test("Get Starlink Updates with Limit", True, f"Limited to {actual_count} updates")
                    else:
                        self.log_test("Get Starlink Updates with Limit", False, f"HTTP {response_limit.status_code}")
                        
                else:
                    self.log_test("Get Starlink Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Starlink Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Starlink Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/starlink/updates/latest?limit=5
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates/latest?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data and "timestamp" in data:
                    count = data.get("count", 0)
                    self.log_test("Get Latest Starlink Updates", True, f"Retrieved {count} latest updates")
                else:
                    self.log_test("Get Latest Starlink Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Latest Starlink Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Latest Starlink Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/starlink/updates/stats
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "by_category" in data:
                    total = data.get("total", 0)
                    categories = data.get("by_category", {})
                    self.log_test("Get Starlink Updates Stats", True, f"Total: {total}, Categories: {list(categories.keys())}")
                    
                    # Verify we have the expected 38 articles from starlink-cache.json
                    if total == 38:
                        self.log_test("Starlink Data Count Verification", True, f"Expected 38 articles, found {total}")
                    else:
                        self.log_test("Starlink Data Count Verification", False, f"Expected 38 articles, found {total}")
                        
                else:
                    self.log_test("Get Starlink Updates Stats", False, "Missing required fields", data)
            else:
                self.log_test("Get Starlink Updates Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Starlink Updates Stats", False, f"Connection error: {str(e)}")

        # Test GET /api/starlink/updates/categories
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates/categories", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "categories" in data:
                    categories = data.get("categories", [])
                    expected_categories = ["space", "spacex"]  # Based on starlink-cache.json
                    self.log_test("Get Starlink Categories", True, f"Categories: {categories}")
                    
                    # Verify expected categories are present
                    if any(cat in str(categories).lower() for cat in expected_categories):
                        self.log_test("Starlink Categories Verification", True, "Found expected SpaceX/space categories")
                    else:
                        self.log_test("Starlink Categories Verification", False, f"Expected space/spacex categories, got: {categories}")
                else:
                    self.log_test("Get Starlink Categories", False, "Missing categories field", data)
            else:
                self.log_test("Get Starlink Categories", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Starlink Categories", False, f"Connection error: {str(e)}")

        # Test POST /api/starlink/updates/refresh
        try:
            response = self.session.post(f"{self.api_base}/starlink/updates/refresh", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("Starlink RSS Refresh", True, f"Refresh response: {data.get('message')}")
                else:
                    self.log_test("Starlink RSS Refresh", False, "Missing message field", data)
            else:
                self.log_test("Starlink RSS Refresh", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Starlink RSS Refresh", False, f"Connection error: {str(e)}")

    def test_data_storage_verification(self):
        """Test that JSON data files are properly stored and accessible"""
        print("🔍 Testing JSON Data Storage Verification...")
        
        # Test Windows data storage (rss-cache.json)
        try:
            with open("/app/data/rss-cache.json", "r") as f:
                windows_data = json.load(f)
                if "updates" in windows_data and "total" in windows_data:
                    total_windows = windows_data.get("total", 0)
                    updates_count = len(windows_data.get("updates", []))
                    self.log_test("Windows JSON Storage", True, f"Found {updates_count} Windows updates in storage (total: {total_windows})")
                else:
                    self.log_test("Windows JSON Storage", False, "Invalid Windows data structure")
        except Exception as e:
            self.log_test("Windows JSON Storage", False, f"Error reading Windows data: {str(e)}")
        
        # Test Starlink data storage (starlink-cache.json)
        try:
            with open("/app/data/starlink-cache.json", "r") as f:
                starlink_data = json.load(f)
                if "updates" in starlink_data and "total" in starlink_data:
                    total_starlink = starlink_data.get("total", 0)
                    updates_count = len(starlink_data.get("updates", []))
                    self.log_test("Starlink JSON Storage", True, f"Found {updates_count} Starlink updates in storage (total: {total_starlink})")
                    
                    # Verify the expected 38 articles
                    if total_starlink == 38:
                        self.log_test("Starlink Storage Count", True, f"Confirmed 38 Starlink articles as expected")
                    else:
                        self.log_test("Starlink Storage Count", False, f"Expected 38 articles, found {total_starlink}")
                else:
                    self.log_test("Starlink JSON Storage", False, "Invalid Starlink data structure")
        except Exception as e:
            self.log_test("Starlink JSON Storage", False, f"Error reading Starlink data: {str(e)}")

    def test_data_quality_both_systems(self):
        """Test data quality for both Windows and Starlink systems"""
        print("🔍 Testing Data Quality for Both Systems...")
        
        # Test Windows data quality
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=3", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    first_update = updates[0]
                    required_fields = ["title", "description", "link", "published_date", "category", "source"]
                    missing_fields = [field for field in required_fields if field not in first_update]
                    
                    if not missing_fields:
                        self.log_test("Windows Data Structure", True, "All required fields present")
                    else:
                        self.log_test("Windows Data Structure", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Windows Data Structure", False, "No Windows updates returned")
            else:
                self.log_test("Windows Data Structure", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Windows Data Structure", False, f"Error: {str(e)}")
        
        # Test Starlink data quality
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates?limit=3", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    first_update = updates[0]
                    required_fields = ["title", "description", "link", "published_date", "category", "source"]
                    missing_fields = [field for field in required_fields if field not in first_update]
                    
                    if not missing_fields:
                        self.log_test("Starlink Data Structure", True, "All required fields present")
                        
                        # Check for Starlink-specific fields
                        starlink_fields = ["tags", "mission", "satellite_count"]
                        has_starlink_fields = any(field in first_update for field in starlink_fields)
                        if has_starlink_fields:
                            self.log_test("Starlink Specific Fields", True, "Found Starlink-specific metadata fields")
                        else:
                            self.log_test("Starlink Specific Fields", False, "Missing Starlink-specific fields")
                    else:
                        self.log_test("Starlink Data Structure", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Starlink Data Structure", False, "No Starlink updates returned")
            else:
                self.log_test("Starlink Data Structure", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Starlink Data Structure", False, f"Error: {str(e)}")

    def test_filtering_and_categories(self):
        """Test filtering and category functionality for both systems"""
        print("🔍 Testing Filtering and Categories for Both Systems...")
        
        # Test Windows category filtering
        windows_categories = ["security", "server", "cloud", "enterprise"]
        for category in windows_categories:
            try:
                response = self.session.get(f"{self.api_base}/windows/updates?category={category}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    updates = data.get("updates", [])
                    total = data.get("total", 0)
                    self.log_test(f"Windows Category Filter: {category}", True, f"Found {total} {category} updates")
                else:
                    self.log_test(f"Windows Category Filter: {category}", False, f"HTTP {response.status_code}")
            except Exception as e:
                self.log_test(f"Windows Category Filter: {category}", False, f"Error: {str(e)}")
        
        # Test Starlink category filtering
        starlink_categories = ["space", "spacex"]
        for category in starlink_categories:
            try:
                response = self.session.get(f"{self.api_base}/starlink/updates?category={category}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    updates = data.get("updates", [])
                    total = data.get("total", 0)
                    self.log_test(f"Starlink Category Filter: {category}", True, f"Found {total} {category} updates")
                else:
                    self.log_test(f"Starlink Category Filter: {category}", False, f"HTTP {response.status_code}")
            except Exception as e:
                self.log_test(f"Starlink Category Filter: {category}", False, f"Error: {str(e)}")

    def test_rss_real_data_verification(self):
        """Verify that both systems are retrieving real RSS data"""
        print("🔍 Testing Real RSS Data Verification...")
        
        # Test Windows RSS real data
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Check for real Microsoft sources
                    sources = [update.get("source", "") for update in updates]
                    microsoft_sources = ["Microsoft", "Windows", "Azure", "PowerShell", ".NET", "SQL Server"]
                    has_microsoft_sources = any(any(ms_source in source for ms_source in microsoft_sources) for source in sources)
                    
                    if has_microsoft_sources:
                        self.log_test("Windows Real RSS Data", True, f"Found real Microsoft sources: {set(sources)}")
                    else:
                        self.log_test("Windows Real RSS Data", False, f"No Microsoft sources found: {set(sources)}")
                else:
                    self.log_test("Windows Real RSS Data", False, "No Windows updates found")
            else:
                self.log_test("Windows Real RSS Data", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Windows Real RSS Data", False, f"Error: {str(e)}")
        
        # Test Starlink RSS real data
        try:
            response = self.session.get(f"{self.api_base}/starlink/updates?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Check for real SpaceX sources
                    sources = [update.get("source", "") for update in updates]
                    spacex_sources = ["Space.com", "SpaceNews", "Teslarati", "SpaceX"]
                    has_spacex_sources = any(any(sx_source in source for sx_source in spacex_sources) for source in sources)
                    
                    if has_spacex_sources:
                        self.log_test("Starlink Real RSS Data", True, f"Found real SpaceX sources: {set(sources)}")
                    else:
                        self.log_test("Starlink Real RSS Data", False, f"No SpaceX sources found: {set(sources)}")
                        
                    # Check for SpaceX-related content
                    titles = [update.get("title", "").lower() for update in updates]
                    spacex_keywords = ["starlink", "spacex", "falcon", "dragon", "mars", "satellite"]
                    has_spacex_content = any(any(keyword in title for keyword in spacex_keywords) for title in titles)
                    
                    if has_spacex_content:
                        self.log_test("Starlink Content Relevance", True, "Found SpaceX-related content")
                    else:
                        self.log_test("Starlink Content Relevance", False, "No SpaceX-related content found")
                else:
                    self.log_test("Starlink Real RSS Data", False, "No Starlink updates found")
            else:
                self.log_test("Starlink Real RSS Data", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Starlink Real RSS Data", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run comprehensive tests for both Windows and Starlink RSS systems"""
        print("🚀 Testing Windows & Starlink RSS Systems")
        print("=" * 70)
        
        start_time = datetime.now()
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_windows_updates_endpoints()
        self.test_starlink_updates_endpoints()
        self.test_data_storage_verification()
        self.test_data_quality_both_systems()
        self.test_filtering_and_categories()
        self.test_rss_real_data_verification()
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Generate summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("=" * 70)
        print("🎯 DUAL RSS SYSTEM TEST SUMMARY")
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        print(f"📊 Success Rate: {(passed_tests/total_tests*100):.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['details']}")
        
        # Save detailed results
        with open("/tmp/backend_test_results.json", "w") as f:
            json.dump(self.test_results, f, indent=2, default=str)
        
        print(f"\n📄 Detailed results saved to: /tmp/backend_test_results.json")
        
        return passed_tests, failed_tests, self.test_results

if __name__ == "__main__":
    tester = DualRSSBackendTester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)