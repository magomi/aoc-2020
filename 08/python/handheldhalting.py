
class Instruction:
    def __init__(self, raw):
        self.operator = raw.split()[0].strip()
        self.argument = int(raw.split()[1].strip())
        
    def __repr__(self):
        return 'operator: {}, argument: {}'.format(self.operator, self.argument)


class CPU:
    def __init__(self, file=None, instructions=None):
        self.accumulator = 0
        self.pointer = 0
        self.completed_pointers = []
        if instructions:
            self.instructions = instructions
        else: 
            self.instructions = []
            with open(file, 'r') as file:
                for line in file.readlines():
                    self.instructions.append(Instruction(line))


    def run(self):
        while not self.pointer in self.completed_pointers and self.pointer < len(self.instructions):
            instruction = self.instructions[self.pointer]
            self.completed_pointers.append(self.pointer)
            if instruction.operator == 'nop':
                self.pointer = self.pointer + 1
            if instruction.operator == 'jmp':
                self.pointer = self.pointer + instruction.argument
            if instruction.operator == 'acc':
                self.pointer = self.pointer + 1
                self.accumulator = self.accumulator + instruction.argument
        if self.pointer == len(self.instructions):
            return True
        else: 
            return False

class InstrFixer:
    def __init__(self, file):
        with open(file, 'r') as file:
            self.instructions = []
            for line in file.readlines():
                self.instructions.append(Instruction(line))

    def fix(self):
        for i in range(1, len(self.instructions) - 1):
            fixed_instructions = []
            for instruction in self.instructions:
                fixed_instructions.append(Instruction('{} {}'.format(instruction.operator, instruction.argument)))
            if fixed_instructions[i].operator == 'nop':
                fixed_instructions[i].operator = 'jmp'
            elif fixed_instructions[i].operator == 'jmp':
                fixed_instructions[i].operator = 'nop'        
            cpu = CPU(instructions=fixed_instructions)
            if cpu.run() == True:
                return fixed_instructions
        return self.instructions


if __name__ == '__main__':
    cpu = CPU('instr_02.data')
    cpu.run()
    print(cpu.accumulator)

    instr_fixer = InstrFixer('instr_02.data')
    cpu = CPU(instructions=instr_fixer.fix())
    cpu.run()
    print(cpu.accumulator)