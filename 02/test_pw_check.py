import unittest
from pw_check import PWEntry
from pw_check import NewPWEntry
from pw_check import Checker

class TestPWEntry(unittest.TestCase):
    def test_init(self):
        pw_entry = PWEntry('1-3 b: adfasfasd')
        self.assertEqual('b', pw_entry.char) 
        self.assertEqual(1, pw_entry.count_min) 
        self.assertEqual(3, pw_entry.count_max) 
        self.assertEqual('adfasfasd', pw_entry.data) 

    def test_check(self):
        pw_entry = PWEntry('1-3 b: adfasfasd')
        self.assertFalse(pw_entry.check())
        pw_entry = PWEntry('1-3 c: adfacfasd')
        self.assertTrue(pw_entry.check())

class TestNewPWEntry(unittest.TestCase):
    def test_init(self):
        new_pw_entry = NewPWEntry('1-5 x: xasedd')
        self.assertEqual('x', new_pw_entry.char)
        self.assertEqual('xasedd', new_pw_entry.data)
        self.assertEqual(1, new_pw_entry.pos_01)
        self.assertEqual(5, new_pw_entry.pos_02)

    def test_check(self):
        new_pw_entry = NewPWEntry('1-5 x: xasedd')
        self.assertTrue(new_pw_entry.check())
        new_pw_entry = NewPWEntry('1-5 x: nasexd')
        self.assertTrue(new_pw_entry.check())
        new_pw_entry = NewPWEntry('1-5 x: nasesd')
        self.assertFalse(new_pw_entry.check())
        new_pw_entry = NewPWEntry('1-5 x: xasexd')
        self.assertFalse(new_pw_entry.check())


class TestChecker(unittest.TestCase):
    def test_load(self):
        checker = Checker('pw_test.data')
        pw_entries = checker.load()
        self.assertEqual(3, len(pw_entries))
        self.assertEqual('a', pw_entries[0].char) 
        self.assertEqual(1, pw_entries[0].count_min) 
        self.assertEqual(3, pw_entries[0].count_max) 
        self.assertEqual('abcde', pw_entries[0].data) 

    def test_check(self):
        checker = Checker('pw_test.data')
        pw_entries = checker.load()
        valid_cnt, error_cnt = checker.check(pw_entries)
        self.assertEqual(1, error_cnt)         
        self.assertEqual(2, valid_cnt)

if __name__ == '__main__':
    unittest.main()