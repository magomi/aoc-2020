
class Map:
    def __init__(self, filename):
        self.shard = self.load(filename)
    
    def load(self, filename):
        shard = []
        with open(filename, 'r') as file:
            for line in file.readlines():
                shard.append(line.strip())
            return shard
    
    def element_at(self, x, y):
        if y > (len(self.shard) - 1):
            y = y % len(self.shard)
        line = self.shard[y]
        if x >= (len(line) - 1):
            x = x % len(line)
        return line[x]

    def width(self):
        return len(self.shard[0])

    def height(self):
        return len(self.shard)

class Finder:
    def __init__(self, filename):
        self.map = Map(filename)


    def count_trees(self, steps_x, steps_y):
        x = 0
        y = 0
        trees = 0
        while (y < self.map.height()):
            x = x + steps_x
            y = y + steps_y
            if (self.map.element_at(x, y) == '#'):
                trees = trees + 1
        return trees

    def calc_paths(self, rules):
        full_count = 1
        for rule in rules:
            full_count = full_count * self.count_trees(rule[0], rule[1])
        return full_count

if __name__ == '__main__':
    finder = Finder('map_02.data')
    print('moving steps [{}, {}]: {} trees'.format(1, 1, finder.count_trees(1, 1)))
    print('moving steps [{}, {}]: {} trees'.format(3, 1, finder.count_trees(3, 1)))
    print('moving steps [{}, {}]: {} trees'.format(5, 1, finder.count_trees(5, 1)))
    print('moving steps [{}, {}]: {} trees'.format(7, 1, finder.count_trees(7, 1)))
    print('moving steps [{}, {}]: {} trees'.format(1, 2, finder.count_trees(1, 2)))

    rules = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    print('all together (factor): {}'.format(finder.calc_paths(rules)))
