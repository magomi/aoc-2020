import unittest
from first import Finder

class TestFinder(unittest.TestCase):

    def test_find_pairs(self):
        finder = Finder()
        numbers = finder.load_numbers('first_01.data')
        found, result = finder.find_pairs(numbers, 2020)
        self.assertEqual(514579, result)
        self.assertEqual(True, found)

    # def test_find_pairs(self):
    #     finder = Finder()
    #     numbers = [1, 2, 3, 4, 5, 6]
    #     found, result = finder.find_pairs(numbers, 9)
    #     self.assertEqual(18, result)
    #     self.assertEqual(True, found)



    def test_find_triples(self):
        finder = Finder()
        found, result = finder.find_triples(finder.load_numbers('first_01.data'), 2020)
        self.assertEqual(True, found)
        self.assertEqual(241861950, result)


if __name__ == '__main__':
    unittest.main()