import unittest
from seatcheck import Seat
from seatcheck import SeatCheck

class TestSeat(unittest.TestCase):
    def test_init(self):
        seat = Seat('FBFBBFFRLR')
        self.assertEqual(44, seat.get_row())
        self.assertEqual(5, seat.get_column())
        self.assertEqual(357, seat.get_id())

        seat = Seat('BFFFBBFRRR')
        self.assertEqual(70, seat.get_row())
        self.assertEqual(7, seat.get_column())
        self.assertEqual(567, seat.get_id())

class TestSeatCheck(unittest.TestCase):
    def test_get_max_id(self):
        seat_check = SeatCheck('seats_01.data')
        self.assertEqual(820, seat_check.get_max_id())

if __name__ == '__main__':
    unittest.main()