class OldPWEntry:

    def __init__(self, raw):
        self.data = raw.split(':')[1].strip()
        self.count_min = int(raw.split(':')[0].split(' ')[0].split('-')[0].strip())
        self.count_max = int(raw.split(':')[0].split(' ')[0].split('-')[1].strip())
        self.char = raw.split(':')[0].split(' ')[1].strip()

    def is_valid(self):
        char_count = self.data.count(self.char)
        return char_count >= self.count_min and char_count <= self.count_max

class NewPWEntry:

    def __init__(self, raw):
        self.data = raw.split(':')[1].strip()
        self.pos_01 = int(raw.split(':')[0].split(' ')[0].split('-')[0].strip())
        self.pos_02 = int(raw.split(':')[0].split(' ')[0].split('-')[1].strip())
        self.char = raw.split(':')[0].split(' ')[1].strip()

    def is_valid(self):
        is_p1 = bool(self.data[self.pos_01-1] == self.char)
        is_p2 = bool(self.data[self.pos_02-1] == self.char)
        return is_p1 ^ is_p2


class Checker:
    def __init__(self, pw_entry_type, file_name):
        self.pw_entries = []
        with open(file_name, 'r') as file:
            self.pw_entries = list(map(pw_entry_type, file.readlines()))


    def check(self):
        error_cnt = len(list(filter(lambda pw_entry: not pw_entry.is_valid(), self.pw_entries)))
        valid_cnt = len(list(filter(lambda pw_entry: pw_entry.is_valid(), self.pw_entries)))
        return valid_cnt, error_cnt


if __name__ == '__main__':
    print('old: valid = {}, error = {}'.format(* list(Checker(OldPWEntry, 'pw_sample.data').check())))
    print('new: valid = {}, error = {}'.format(* list(Checker(NewPWEntry, 'pw_sample.data').check())))