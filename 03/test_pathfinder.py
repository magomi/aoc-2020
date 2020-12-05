import unittest
from pathfinder import Map
from pathfinder import Finder

class TestMap(unittest.TestCase):
    def test_init(self):
        map = Map('../03/map_01.data')
        self.assertEqual(11, map.width())
        self.assertEqual(11, map.height())
       
    def test_postions(self):
        map = Map('../03/map_01.data')
        self.assertEqual('.', map.element_at(0, 0))
        self.assertEqual('#', map.element_at(3, 0))
        self.assertEqual('#', map.element_at(0, 1))
        self.assertEqual('#', map.element_at(1, 2))
        self.assertEqual('.', map.element_at(11, 0))
        self.assertEqual('.', map.element_at(0, 11))
        self.assertEqual('.', map.element_at(11, 11))
        self.assertEqual('#', map.element_at(10, 10))
        self.assertEqual('#', map.element_at(21, 21))


class TestFinder(unittest.TestCase):
    def test_count_trees(self):
        finder = Finder('../03/map_01.data')
        self.assertEqual(2, finder.count_trees(1, 1))
        self.assertEqual(7, finder.count_trees(3, 1))
        self.assertEqual(3, finder.count_trees(5, 1))
        self.assertEqual(4, finder.count_trees(7, 1))
        self.assertEqual(2, finder.count_trees(1, 2))

    def test_calc_paths(self):
        finder = Finder('../03/map_01.data')
        rules = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
        self.assertEqual(336, finder.calc_paths(rules))

if __name__ == '__main__':
    unittest.main()