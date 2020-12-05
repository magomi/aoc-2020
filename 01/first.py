
class Finder:

    def strip(self, string):
        return string.strip()


    def load_numbers(self, file_name):
        file = open(file_name, 'r')
        numbers_str = list(map(self.strip, file.readlines()))
        file.close()
        return list(map(int, numbers_str))

    def find_pairs(self, numbers, target_sum):
        if len(numbers) == 2:
            return (numbers[0] + numbers[1]) == target_sum, numbers[0] * numbers[1]

        for number in numbers:
            rem_numbers = numbers.copy()
            rem_numbers.remove(number)
            
            for rem_number in rem_numbers:
                if number + rem_number == target_sum:
                    return True, number * rem_number
            found, result = self.find_pairs(rem_numbers, target_sum)
            if found:
                return found, result
        return False, 0


    # pair_cnt = 0

    # def find_pairs(self, numbers, target_sum):
    #     self.pair_cnt = self.pair_cnt + 1
    #     if len(numbers) == 2:
    #         if numbers[0] + numbers[1] == target_sum:
    #             return True, numbers[0] * numbers[1]
    #         else: 
    #             return False, 0

    #     for number in numbers:
    #         rest_numbers = numbers[1:]
    #         for rest_number in rest_numbers:
    #             if target_sum == (number + rest_number):
    #                 return True, number * rest_number
                
    #         found, result = self.find_pairs(rest_numbers, target_sum)
    #         if found:
    #             return found, result
    #     return False, 0

    trip_cnt = 0

    def find_triples(self, numbers, target_sum):

        rest_numbers = numbers[1:]
            
        for number in numbers:
            # print('trip_cnt = {}; rest_numbers = {}'.format(self.trip_cnt, rest_numbers))
            self.trip_cnt = self.trip_cnt + 1
            found, result = self.find_pairs(rest_numbers, target_sum - number)
            if found: 
                # print('number = {}; result = {}'.format(number, result))
                return True, number * result
        return False, 0

    def findNumber_Star2(self, input):
        for x in input:
            subList = input.copy()
            subList.pop(0)
            for y in subList:
                sublist2 = subList.copy()
                sublist2.pop(0)
                for z in sublist2:
                    sum = x + y + z
                    if(sum == 2020):
                        print(f"{x} + {y} = {x + y + z}")
                        return x * y * z

if __name__ == '__main__':
    finder = Finder()
    print(finder.find_pairs(finder.load_numbers('first_02.data'), 2020))
    # print(finder.find_triples(finder.load_numbers('first_02.data'), 2020))
    print(finder.findNumber_Star2(finder.load_numbers('first_02.data')))
