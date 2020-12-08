import re

class Rule:
    def __init__(self, description):
        m = re.search('^[a-z]+\s[a-z]+', description)
        self.color = m.group(0)

        self.inners = []
        for group in re.findall('[\d]+ [a-z]+\s[a-z]+', description):
            inner = {}
            inner['count'] = int(group.split()[0])
            inner['color'] = group.split()[1] + ' ' + group.split()[2]
            self.inners.append(inner)
    
    def __repr__(self): 
        return '{}: {}'.format(self.color, self.inners)

class RuleSet:
    def __init__(self, file_name):
        with open(file_name, 'r') as file:
            self.rules = []
            for line in file.readlines():
                self.rules.append(Rule(line))

    def count_possible_outer(self, color, already_checked = [], sub = False):
        count = 0
        for rule in self.rules:
            for inner in rule.inners:
                if inner['color'] == color and not rule.color in already_checked:
                    count = count + 1

                    if sub:
                        already_checked.append(rule.color)
                    count = count + self.count_possible_outer(rule.color, already_checked, True)
        return count      

    def sum_inner_bags(self, color, exclself=True):
        for rule in self.rules:
            if color == rule.color:
                cnt = 1
                for inner in rule.inners:
                    cnt = cnt + (inner['count'] * self.sum_inner_bags(inner['color'], False))
                if exclself:
                    return cnt - 1
                else:
                    return cnt


if __name__ == '__main__':
    ruleSet = RuleSet('rules_02.data')
    print(ruleSet.count_possible_outer('shiny gold'))
    print(ruleSet.sum_inner_bags('shiny gold'))


