import unittest
from handheldhalting import Instruction, CPU, InstrFixer

class TestInstruction(unittest.TestCase):
    def test_init(self):
        instruction = Instruction('nop +0')
        self.assertEqual('nop', instruction.operator)
        self.assertEqual(0, instruction.argument)
    
        instruction = Instruction('acc -3')
        self.assertEqual('acc', instruction.operator)
        self.assertEqual(-3, instruction.argument)

        instruction = Instruction('jmp +10')
        self.assertEqual('jmp', instruction.operator)
        self.assertEqual(10, instruction.argument)

class TestCPU(unittest.TestCase):
    def test_init(self):
        cpu = CPU('instr_01.data')
        self.assertEqual(9, len(cpu.instructions))
        self.assertEqual(0, cpu.accumulator)
        self.assertEqual(0, cpu.pointer)

    def test_run_forever_loop(self):
        cpu = CPU('instr_01.data')
        self.assertFalse(cpu.run())
        self.assertEqual(5, cpu.accumulator)
        
    def test_run(self):
        cpu = CPU('instr_03.data')
        self.assertTrue(cpu.run())
        self.assertEqual(8, cpu.accumulator)

class TestInstrFixer(unittest.TestCase):
    def test_init(self):
        instr_fixer = InstrFixer('instr_01.data')
        self.assertEqual(9, len(instr_fixer.instructions))
        fixed_instructions = instr_fixer.fix()
        self.assertEqual('nop', fixed_instructions[7].operator)

        cpu = CPU(instructions=fixed_instructions)
        cpu.run()
        self.assertEqual(8, cpu.accumulator)

if __name__ == '__main__':
    unittest.main()