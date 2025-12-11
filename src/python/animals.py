"""
Animal classes used for simple demonstrations and tests.

Two concrete animals are implemented:
- Dog: says "woof"
- Cat: says "meow"

The module also provides a helper function `get_animal_sounds` that
collects sounds from any iterable of animals implementing a `sound()` method.
"""
from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Protocol, List


class Sounding(Protocol):
    def sound(self) -> str:  # pragma: no cover - protocol definition only
        ...


@dataclass(frozen=True)
class Dog:
    """A simple dog that can make a sound."""

    name: str = "Fido"

    def sound(self) -> str:
        return "woof"


@dataclass(frozen=True)
class Cat:
    """A simple cat that can make a sound."""

    name: str = "Whiskers"

    def sound(self) -> str:
        return "meow"


def get_animal_sounds(animals: Iterable[Sounding]) -> List[str]:
    """Return a list of sounds from the provided animals.

    Args:
        animals: Any iterable producing objects that implement `sound()`.

    Returns:
        List of sound strings in the same order as provided animals.
    """
    return [a.sound() for a in animals]
