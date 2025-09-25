#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Windows RSS Monitoring System
Tests all FastAPI endpoints, RSS fetching, database operations, and scheduler functionality
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any

class WindowsRSSBackendTester:
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
        """Test basic health and root endpoints"""
        print("🔍 Testing Health Endpoints...")
        
        # Test root endpoint
        try:
            response = self.session.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test("Root Endpoint", True, f"Status: {data.get('status')}")
                else:
                    self.log_test("Root Endpoint", False, "Missing required fields in response", data)
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")

        # Test health endpoint
        try:
            response = self.session.get(f"{self.api_base}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "status" in data and data["status"] == "healthy":
                    self.log_test("Health Endpoint", True, "Service is healthy")
                else:
                    self.log_test("Health Endpoint", False, "Unhealthy status", data)
            else:
                self.log_test("Health Endpoint", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Health Endpoint", False, f"Connection error: {str(e)}")

    def test_windows_updates_endpoints(self):
        """Test all Windows updates API endpoints"""
        print("🔍 Testing Windows Updates API Endpoints...")
        
        # Test GET /api/windows/updates
        try:
            response = self.session.get(f"{self.api_base}/windows/updates", timeout=15)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "updates" in data and "last_updated" in data:
                    updates_count = data.get("total", 0)
                    self.log_test("Get Windows Updates", True, f"Retrieved {updates_count} updates")
                    
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
            response = self.session.get(f"{self.api_base}/windows/updates/latest", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "updates" in data and "count" in data and "timestamp" in data:
                    count = data.get("count", 0)
                    self.log_test("Get Latest Updates", True, f"Retrieved {count} latest updates")
                else:
                    self.log_test("Get Latest Updates", False, "Missing required fields", data)
            else:
                self.log_test("Get Latest Updates", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Latest Updates", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/stats
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "total" in data and "by_category" in data:
                    total = data.get("total", 0)
                    categories = data.get("by_category", {})
                    self.log_test("Get Updates Stats", True, f"Total: {total}, Categories: {list(categories.keys())}")
                else:
                    self.log_test("Get Updates Stats", False, "Missing required fields", data)
            else:
                self.log_test("Get Updates Stats", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Updates Stats", False, f"Connection error: {str(e)}")

        # Test GET /api/windows/updates/categories
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/categories", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "categories" in data:
                    categories = data.get("categories", [])
                    category_keys = [cat.get("key") for cat in categories if isinstance(cat, dict)]
                    expected_categories = ["security", "feature", "server", "general"]
                    has_all_categories = all(cat in category_keys for cat in expected_categories)
                    self.log_test("Get Categories", has_all_categories, f"Categories: {category_keys}")
                else:
                    self.log_test("Get Categories", False, "Missing categories field", data)
            else:
                self.log_test("Get Categories", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Categories", False, f"Connection error: {str(e)}")

    def test_refresh_endpoint(self):
        """Test the RSS refresh endpoint"""
        print("🔍 Testing RSS Refresh Endpoint...")
        
        try:
            response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=30)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "timestamp" in data:
                    self.log_test("RSS Refresh", True, "Refresh initiated successfully")
                    
                    # Wait a bit and check if new data is available
                    time.sleep(5)
                    stats_response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
                    if stats_response.status_code == 200:
                        stats_data = stats_response.json()
                        total_after = stats_data.get("total", 0)
                        self.log_test("RSS Refresh Data Check", True, f"Total updates after refresh: {total_after}")
                    else:
                        self.log_test("RSS Refresh Data Check", False, "Could not verify refresh results")
                else:
                    self.log_test("RSS Refresh", False, "Missing required fields", data)
            else:
                self.log_test("RSS Refresh", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_test("RSS Refresh", False, f"Connection error: {str(e)}")

    def test_data_quality(self):
        """Test the quality and structure of returned data"""
        print("🔍 Testing Data Quality...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=5", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                if updates:
                    # Test first update structure
                    first_update = updates[0]
                    required_fields = ["title", "description", "link", "published_date", "category", "source"]
                    
                    missing_fields = [field for field in required_fields if field not in first_update]
                    if not missing_fields:
                        self.log_test("Update Data Structure", True, "All required fields present")
                        
                        # Test data types and values
                        valid_categories = ["security", "feature", "server", "general"]
                        category_valid = first_update.get("category") in valid_categories
                        
                        has_title = bool(first_update.get("title", "").strip())
                        has_link = bool(first_update.get("link", "").strip())
                        
                        if category_valid and has_title and has_link:
                            self.log_test("Update Data Validation", True, f"Category: {first_update.get('category')}")
                        else:
                            issues = []
                            if not category_valid:
                                issues.append(f"Invalid category: {first_update.get('category')}")
                            if not has_title:
                                issues.append("Empty title")
                            if not has_link:
                                issues.append("Empty link")
                            self.log_test("Update Data Validation", False, "; ".join(issues))
                    else:
                        self.log_test("Update Data Structure", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_test("Update Data Structure", False, "No updates returned")
            else:
                self.log_test("Update Data Structure", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Update Data Structure", False, f"Error: {str(e)}")

    def test_rss_sources(self):
        """Test if RSS sources are accessible and returning data"""
        print("🔍 Testing RSS Sources Accessibility...")
        
        # Test Microsoft Security Response Center
        try:
            msrc_response = requests.get("https://msrc.microsoft.com/blog/rss", timeout=15)
            if msrc_response.status_code == 200 and "xml" in msrc_response.headers.get("content-type", "").lower():
                self.log_test("MSRC RSS Feed", True, "Feed accessible and valid XML")
            else:
                self.log_test("MSRC RSS Feed", False, f"HTTP {msrc_response.status_code} or invalid content type")
        except Exception as e:
            self.log_test("MSRC RSS Feed", False, f"Connection error: {str(e)}")

        # Test Windows Blog
        try:
            windows_response = requests.get("https://blogs.windows.com/feed/", timeout=15)
            if windows_response.status_code == 200 and "xml" in windows_response.headers.get("content-type", "").lower():
                self.log_test("Windows Blog RSS Feed", True, "Feed accessible and valid XML")
            else:
                self.log_test("Windows Blog RSS Feed", False, f"HTTP {windows_response.status_code} or invalid content type")
        except Exception as e:
            self.log_test("Windows Blog RSS Feed", False, f"Connection error: {str(e)}")

        # Test Windows Server Blog
        try:
            server_response = requests.get("https://cloudblogs.microsoft.com/windowsserver/feed/", timeout=15)
            if server_response.status_code == 200 and "xml" in server_response.headers.get("content-type", "").lower():
                self.log_test("Windows Server RSS Feed", True, "Feed accessible and valid XML")
            else:
                self.log_test("Windows Server RSS Feed", False, f"HTTP {server_response.status_code} or invalid content type")
        except Exception as e:
            self.log_test("Windows Server RSS Feed", False, f"Connection error: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("🔍 Testing Error Handling...")
        
        # Test invalid category
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?category=invalid_category", timeout=10)
            if response.status_code == 200:
                data = response.json()
                # Should return empty results, not error
                self.log_test("Invalid Category Handling", True, f"Returned {data.get('total', 0)} results")
            else:
                self.log_test("Invalid Category Handling", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Category Handling", False, f"Error: {str(e)}")

        # Test invalid limit
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=-1", timeout=10)
            # Should handle gracefully
            if response.status_code in [200, 422]:  # 422 for validation error is acceptable
                self.log_test("Invalid Limit Handling", True, f"HTTP {response.status_code}")
            else:
                self.log_test("Invalid Limit Handling", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Limit Handling", False, f"Error: {str(e)}")

        # Test non-existent endpoint
        try:
            response = self.session.get(f"{self.api_base}/windows/nonexistent", timeout=10)
            if response.status_code == 404:
                self.log_test("Non-existent Endpoint", True, "Correctly returned 404")
            else:
                self.log_test("Non-existent Endpoint", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("Non-existent Endpoint", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive Backend Testing for Windows RSS System")
        print("=" * 70)
        
        start_time = datetime.now()
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_windows_updates_endpoints()
        self.test_refresh_endpoint()
        self.test_data_quality()
        self.test_rss_sources()
        self.test_error_handling()
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Generate summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("=" * 70)
        print("🎯 TEST SUMMARY")
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
    tester = WindowsRSSBackendTester()
    passed, failed, results = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if failed == 0 else 1)