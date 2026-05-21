"""
HackerRank - Pregunta 2: FizzBuzz

Dado un número n, para cada entero i de 1 a n imprimir:
  - "FizzBuzz" si i es divisible por 3 y por 5
  - "Fizz" si i es divisible solo por 3
  - "Buzz" si i es divisible solo por 5
  - i en caso contrario

Un resultado por línea.

Lenguaje: Python 3
"""

import sys


def main() -> None:
    data = sys.stdin.read().strip().split()
    if not data:
        return
    n = int(data[0])

    out_lines = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out_lines.append("FizzBuzz")
        elif i % 3 == 0:
            out_lines.append("Fizz")
        elif i % 5 == 0:
            out_lines.append("Buzz")
        else:
            out_lines.append(str(i))

    sys.stdout.write("\n".join(out_lines) + "\n")


if __name__ == "__main__":
    main()
