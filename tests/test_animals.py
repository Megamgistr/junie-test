import os
import sys
import unittest

# Ensure the src/python directory is importable when running tests from repo root
CURRENT_DIR = os.path.dirname(__file__)
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, os.pardir))
SRC_PYTHON = os.path.join(PROJECT_ROOT, "src", "python")
if SRC_PYTHON not in sys.path:
    sys.path.insert(0, SRC_PYTHON)

from animals import Dog, Cat, get_animal_sounds  # type: ignore  # noqa: E402


class TestAnimals(unittest.TestCase):
    def test_dog_sound(self):
        self.assertEqual(Dog().sound(), "woof")

    def test_cat_sound(self):
        self.assertEqual(Cat().sound(), "meow")

    def test_get_animal_sounds(self):
        animals = [Dog(name="Rex"), Cat(name="Mimi"), Dog(name="Spot")]
        self.assertEqual(get_animal_sounds(animals), ["woof", "meow", "woof"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
