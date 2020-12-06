def calc_first(group_data):
    data = set()
    for line in group_data:
        for c in line:
            data.add(c)
    return data

def calc_second(group_data):
    data = set()
    for c in group_data[0]:
        data.add(c)
    for line in group_data[1:]:
        check_data = data.copy()
        for c in check_data:
            if not c in line:
                data.remove(c)
    return data

def check(file_name, calc_func):
    sum = 0
    with open(file_name, 'r') as file:
        group_data = []
        for line in file.readlines():
            if '' == line.strip():
                sum = sum + len(calc_func(group_data))
                group_data = [] 
            else:
                group_data.append(line.strip())
        if len(group_data) > 0:
            sum = sum + len(calc_func(group_data))
    print(sum)

check('data_01.data', calc_first)
check('data_01.data', calc_second)
check('data_02.data', calc_first)
check('data_02.data', calc_second)
