import unittest
from handyhaversacks import Rule, RuleSet

class TestRule(unittest.TestCase):
    def test_init(self):
        rule = Rule('light red bags contain 1 bright white bag, 2 muted yellow bags.')
        self.assertEqual('light red', rule.color)
        self.assertEqual('bright white', rule.inners[0]['color'])
        self.assertEqual(1, rule.inners[0]['count'])
        self.assertEqual('muted yellow', rule.inners[1]['color'])
        self.assertEqual(2, rule.inners[1]['count'])
        self.assertEqual(2, len(rule.inners))

        rule = Rule('bright white bags contain 1 shiny gold bag.')
        self.assertEqual('bright white', rule.color)
        self.assertEqual('shiny gold', rule.inners[0]['color'])
        self.assertEqual(1, rule.inners[0]['count'])
        self.assertEqual(1, len(rule.inners))

class TestRuleSet(unittest.TestCase):
    def test_init(self):
        ruleSet = RuleSet("rules_01.data")
        self.assertEqual(9, len(ruleSet.rules))
        
        self.assertEqual('light red', ruleSet.rules[0].color)
        self.assertEqual('bright white', ruleSet.rules[0].inners[0]['color'])
        self.assertEqual(1, ruleSet.rules[0].inners[0]['count'])
        self.assertEqual('muted yellow', ruleSet.rules[0].inners[1]['color'])
        self.assertEqual(2, ruleSet.rules[0].inners[1]['count'])

        self.assertEqual('faded blue', ruleSet.rules[7].color)
        self.assertEqual(0, len(ruleSet.rules[7].inners))
    
    def test_count_possible_outer(self):
        ruleSet = RuleSet("rules_01.data")
        self.assertEqual(4, ruleSet.count_possible_outer('shiny gold'))

    def test_sum_inner_bags(self):
        ruleSet = RuleSet("rules_01.data")
        self.assertEqual(32, ruleSet.sum_inner_bags('shiny gold'))
        ruleSet = RuleSet("rules_03.data")
        self.assertEqual(126, ruleSet.sum_inner_bags('shiny gold'))

if __name__ == '__main__':
    unittest.main()