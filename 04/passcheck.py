import re

class PassData:
    def __init__(self, file_name, checker):
        self.checker = checker
        self.data_sets = []
        with open(file_name) as file:
            cur_data = {}
            for line in file.readlines():
                if not line.strip():
                    if (len(cur_data) > 0):
                        self.data_sets.append(cur_data)
                    cur_data = {}
                for entry in line.split():
                    entry = entry.strip()
                    if entry:
                        keyvalue = entry.split(':')
                        cur_data[keyvalue[0].strip()] = keyvalue[1].strip()
            if (len(cur_data) > 0):
                self.data_sets.append(cur_data)

    def count_invalid(self):
        cnt_invalid = 0
        for data_set in self.data_sets:
            if not self.checker.check(data_set):
                cnt_invalid = cnt_invalid + 1
        return cnt_invalid

    def count_valid(self):
        return len(self.data_sets) - self.count_invalid()


class CheckAll:
    def __init__(self):
        self.checkCompleteness = CheckCompleteness()
        self.checkSyntax = CheckSyntax()
    
    def check(self, pass_entry):
        return self.checkCompleteness.check(pass_entry) and self.checkSyntax.check(pass_entry)

class CheckCompleteness:
    mandatory_keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    def check(self, pass_entry):
        for key in self.mandatory_keys:
            if not key in pass_entry.keys():
                return False
        return True

class CheckSyntax:
    def check(self, pass_entry):
        for key in pass_entry.keys():
            if key == 'byr':
                value = int(pass_entry[key])
                if value < 1920 or value > 2002:
                    return False
            if key == 'iyr':
                value = int(pass_entry[key])
                if value < 2010 or value > 2020:
                    return False
            if key == 'eyr':
                value = int(pass_entry[key])
                if value < 2020 or value > 2030:
                    return False
            if key == 'hgt':
                value = pass_entry[key]
                unit = value[-2:]
                if not unit in ('cm', 'in'):
                    return False
                amount = int(value[:-2])
                if (unit == 'cm' and (amount < 150 or amount > 193)):
                    return False
                if (unit == 'in' and (amount < 59 or amount > 76)):
                    return False
            if key == 'hcl':
                value = pass_entry[key]
                if not re.search('^#[0-9a-f]{6}$', value):
                    return False
            if key == 'ecl':
                value = pass_entry[key]
                if value not in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']:
                    return False
            if key == 'pid':
                value = pass_entry[key]
                if not re.search('^[0-9]{9}$', value):
                    return False
        return True


if __name__ == '__main__':
    pass_data = PassData('../04/pass_02.data', CheckCompleteness())
    print('{} entries are valid'.format(pass_data.count_valid()))

    pass_data = PassData('../04/pass_02.data', CheckAll())
    print('{} entries are valid'.format(pass_data.count_valid()))