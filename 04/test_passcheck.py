import unittest
from passcheck import PassData
from passcheck import CheckCompleteness
from passcheck import CheckSyntax


class TestPassData(unittest.TestCase):

    def test_init(self):
        pass_data = PassData('../04/pass_01.data', CheckCompleteness())
        self.assertEqual(4, len(pass_data.data_sets))
    
    def test_count_invalid_completeness(self):
        pass_data = PassData('../04/pass_01.data', CheckCompleteness())
        self.assertEqual(2, pass_data.count_valid())

    def test_count_invalid_syntax(self):
        pass_data = PassData('../04/pass_03.data', CheckSyntax())
        self.assertEqual(4, pass_data.count_valid())


if __name__ == '__main__':
    unittest.main()
