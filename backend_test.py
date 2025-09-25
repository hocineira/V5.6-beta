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
        self.base_url = "http://localhost:3001"
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

    def test_corrected_rss_system(self):
        """Test the corrected RSS system with 6 sources and ~60 articles"""
        print("🔍 Testing Corrected RSS System (6 sources, ~60 articles)...")
        
        # Test current data count
        try:
            response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            if response.status_code == 200:
                stats_data = response.json()
                total_articles = stats_data.get("total", 0)
                categories = stats_data.get("by_category", {})
                
                # Check if we have ~60 articles (should be between 50-70)
                if 50 <= total_articles <= 70:
                    self.log_test("Article Count After Corrections", True, f"Total articles: {total_articles} (target: ~60)")
                else:
                    self.log_test("Article Count After Corrections", False, f"Expected ~60 articles, got {total_articles}")
                
                # Check category diversity
                category_count = len(categories)
                if category_count >= 4:  # Should have server, security, cloud, enterprise
                    self.log_test("Category Diversity", True, f"Found {category_count} categories: {list(categories.keys())}")
                else:
                    self.log_test("Category Diversity", False, f"Expected ≥4 categories, got {category_count}: {list(categories.keys())}")
                    
            else:
                self.log_test("RSS Stats Check", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("RSS Stats Check", False, f"Error: {str(e)}")

    def test_source_diversity(self):
        """Test that articles come from all 6 expected sources"""
        print("🔍 Testing Source Diversity (6 RSS sources)...")
        
        expected_sources = [
            "Windows Server Blog",
            "Microsoft Security Response Center", 
            "SQL Server Blog",
            "Azure Blog",
            "PowerShell Blog",
            ".NET Blog"
        ]
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=100", timeout=15)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                # Count articles by source
                source_counts = {}
                for update in updates:
                    source = update.get("source", "Unknown")
                    source_counts[source] = source_counts.get(source, 0) + 1
                
                found_sources = list(source_counts.keys())
                missing_sources = [src for src in expected_sources if src not in found_sources]
                
                if len(missing_sources) == 0:
                    self.log_test("All 6 RSS Sources Working", True, f"Sources: {found_sources}")
                    
                    # Check distribution
                    for source, count in source_counts.items():
                        if count > 0:
                            self.log_test(f"Source: {source}", True, f"{count} articles")
                        else:
                            self.log_test(f"Source: {source}", False, "No articles found")
                else:
                    self.log_test("All 6 RSS Sources Working", False, f"Missing sources: {missing_sources}")
                    self.log_test("Found Sources", True, f"Working sources: {found_sources}")
                    
            else:
                self.log_test("Source Diversity Check", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Source Diversity Check", False, f"Error: {str(e)}")

    def test_translation_quality(self):
        """Test translation quality - should have less French/English mixing"""
        print("🔍 Testing Translation Quality...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=20", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                mixed_language_count = 0
                total_translated = 0
                
                for update in updates:
                    title = update.get("title", "")
                    description = update.get("description", "")
                    
                    # Check for mixed language patterns
                    text = (title + " " + description).lower()
                    
                    # Look for problematic patterns like "vers", "avec", "dans" mixed with English
                    mixed_patterns = [
                        "vers " and " to ",
                        "avec " and " with ",
                        "dans " and " in ",
                        "pour " and " for ",
                        "de " and " from "
                    ]
                    
                    has_french = any(word in text for word in ["vers", "avec", "dans", "pour", "de", "et", "sur"])
                    has_english = any(word in text for word in ["the", "and", "with", "from", "to", "in", "for"])
                    
                    if has_french:
                        total_translated += 1
                        if has_french and has_english and len(text) > 50:
                            # Check if it's problematic mixing (not just proper nouns)
                            if "vers " in text or "avec " in text or "dans " in text:
                                mixed_language_count += 1
                
                if total_translated > 0:
                    mixing_percentage = (mixed_language_count / total_translated) * 100
                    if mixing_percentage < 30:  # Less than 30% should have mixing issues
                        self.log_test("Translation Quality", True, f"Mixed language in {mixing_percentage:.1f}% of translated content")
                    else:
                        self.log_test("Translation Quality", False, f"High mixing rate: {mixing_percentage:.1f}% of translated content has mixed languages")
                        
                    # Show examples of mixed content for debugging
                    if mixed_language_count > 0:
                        for update in updates[:3]:
                            title = update.get("title", "")
                            if "vers " in title.lower() or "avec " in title.lower():
                                self.log_test("Translation Example", False, f"Mixed: '{title[:100]}...'")
                else:
                    self.log_test("Translation Quality", True, "No translated content found to analyze")
                    
            else:
                self.log_test("Translation Quality Check", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Translation Quality Check", False, f"Error: {str(e)}")

    def test_category_filtering(self):
        """Test category filtering functionality"""
        print("🔍 Testing Category Filtering...")
        
        categories_to_test = ["security", "server", "cloud", "enterprise"]
        
        for category in categories_to_test:
            try:
                response = self.session.get(f"{self.api_base}/windows/updates?category={category}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    updates = data.get("updates", [])
                    
                    if updates:
                        # Check that all returned updates have the correct category
                        correct_category = all(update.get("category") == category for update in updates)
                        if correct_category:
                            self.log_test(f"Category Filter: {category}", True, f"Found {len(updates)} {category} updates")
                        else:
                            wrong_categories = [update.get("category") for update in updates if update.get("category") != category]
                            self.log_test(f"Category Filter: {category}", False, f"Found wrong categories: {set(wrong_categories)}")
                    else:
                        self.log_test(f"Category Filter: {category}", True, f"No {category} updates found (acceptable)")
                else:
                    self.log_test(f"Category Filter: {category}", False, f"HTTP {response.status_code}")
            except Exception as e:
                self.log_test(f"Category Filter: {category}", False, f"Error: {str(e)}")

    def test_data_cleanliness(self):
        """Test that data is clean (no XML residual tags)"""
        print("🔍 Testing Data Cleanliness (no XML residual tags)...")
        
        try:
            response = self.session.get(f"{self.api_base}/windows/updates?limit=20", timeout=10)
            if response.status_code == 200:
                data = response.json()
                updates = data.get("updates", [])
                
                xml_artifacts_found = 0
                total_checked = 0
                
                for update in updates:
                    title = update.get("title", "")
                    description = update.get("description", "")
                    
                    # Check for XML artifacts
                    xml_patterns = [
                        "]]>", "[CDATA[", "<?xml", "<![CDATA[",
                        "&lt;", "&gt;", "&amp;", "&#", "<item>", "</item>"
                    ]
                    
                    text_to_check = title + " " + description
                    total_checked += 1
                    
                    for pattern in xml_patterns:
                        if pattern in text_to_check:
                            xml_artifacts_found += 1
                            self.log_test("XML Artifact Found", False, f"Found '{pattern}' in: {title[:50]}...")
                            break
                
                if xml_artifacts_found == 0:
                    self.log_test("Data Cleanliness", True, f"No XML artifacts found in {total_checked} articles")
                else:
                    self.log_test("Data Cleanliness", False, f"Found XML artifacts in {xml_artifacts_found}/{total_checked} articles")
                    
            else:
                self.log_test("Data Cleanliness Check", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Data Cleanliness Check", False, f"Error: {str(e)}")

    def test_refresh_functionality(self):
        """Test RSS refresh increases article count"""
        print("🔍 Testing RSS Refresh Functionality...")
        
        try:
            # Get initial count
            initial_response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
            if initial_response.status_code == 200:
                initial_stats = initial_response.json()
                initial_count = initial_stats.get("total", 0)
                
                # Trigger refresh
                refresh_response = self.session.post(f"{self.api_base}/windows/updates/refresh", timeout=45)
                if refresh_response.status_code == 200:
                    refresh_data = refresh_response.json()
                    stored = refresh_data.get("stored", 0)
                    total_fetched = refresh_data.get("total", 0)
                    
                    self.log_test("RSS Refresh Execution", True, f"Stored {stored}/{total_fetched} articles")
                    
                    # Wait and check final count
                    time.sleep(2)
                    final_response = self.session.get(f"{self.api_base}/windows/updates/stats", timeout=10)
                    if final_response.status_code == 200:
                        final_stats = final_response.json()
                        final_count = final_stats.get("total", 0)
                        
                        if final_count >= initial_count:
                            self.log_test("RSS Refresh Data Update", True, f"Count: {initial_count} → {final_count}")
                        else:
                            self.log_test("RSS Refresh Data Update", False, f"Count decreased: {initial_count} → {final_count}")
                    else:
                        self.log_test("RSS Refresh Data Update", False, "Could not verify final count")
                else:
                    self.log_test("RSS Refresh Execution", False, f"HTTP {refresh_response.status_code}")
            else:
                self.log_test("RSS Refresh Initial Count", False, f"HTTP {initial_response.status_code}")
        except Exception as e:
            self.log_test("RSS Refresh Functionality", False, f"Error: {str(e)}")

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
        """Run all backend tests for corrected RSS system"""
        print("🚀 Testing Corrected Windows RSS System (6 sources, ~60 articles)")
        print("=" * 70)
        
        start_time = datetime.now()
        
        # Run all test suites - focus on corrected system validation
        self.test_health_endpoints()
        self.test_corrected_rss_system()
        self.test_source_diversity()
        self.test_translation_quality()
        self.test_category_filtering()
        self.test_data_cleanliness()
        self.test_windows_updates_endpoints()
        self.test_refresh_functionality()
        self.test_data_quality()
        self.test_error_handling()
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        # Generate summary
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print("=" * 70)
        print("🎯 CORRECTED RSS SYSTEM TEST SUMMARY")
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