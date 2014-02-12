import httplib
import unittest


class VisualiseTest(unittest.TestCase):
    URL = "localhost:8080"

    def testConnect(self):
        conn = httplib.HTTPConnection(self.URL)
        conn.request("GET", "/visualise")
        req = conn.getresponse()
        self.assertEqual(httplib.OK, req.status)

if __name__ == "__main__":
    unittest.main()
