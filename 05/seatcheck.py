
class Seat:

    def __init__(self, code):
        self.init_row(code[:7])
        self.init_column(code[7:])

    def init_row(self, code):
        row_range = [0, 127]
        range_size = 128
        for i in range(7):
            range_size = range_size / 2
            region = 0
            if code[i] == 'B':
                region = 1
            range_lower = row_range[0] + range_size * region
            range_upper = row_range[0] + (range_size * (region + 1)) - 1
            row_range = [range_lower, range_upper]
        self.row = row_range[0]

    def init_column(self, code):
        col_range = [0, 7]
        range_size = 8
        for i in range(3):
            range_size = range_size / 2
            region = 0
            if code[i] == 'R':
                region = 1
            range_lower = col_range[0] + range_size * region
            range_upper = col_range[0] + (range_size * (region + 1)) - 1
            col_range = [range_lower, range_upper]
        self.column = col_range[0]

    def get_row(self):
        return self.row

    def get_column(self):
        return self.column

    def get_id(self):
        return (8 * self.row) + self.column
    

class SeatCheck:
    def __init__(self, file_name):
        self.seats = []
        with open(file_name, 'r') as file:
            for line in file.readlines():
                self.seats.append(Seat(line.strip()))

    def get_max_id(self):
        max_id = 0
        for seat in self.seats:
            if seat.get_id() > max_id:
                max_id = seat.get_id()
        return max_id

    def find_empty_seat(self):
        ids = []
        for seat in self.seats:
            ids.append(seat.get_id())
        ids.sort()
        for seat_id in range(int(ids[0]), int(ids[-1])):
            if not seat_id in ids:
                return seat_id
        return None

if __name__ == '__main__':
    seat_check = SeatCheck('seats_02.data')
    print(seat_check.get_max_id())
    print(seat_check.find_empty_seat())
