"""
HackerRank - Pregunta 1: Count the Employees (versión Python 3).

Si la prueba requiere resolver la pregunta con Python 3 en lugar de SQL,
esta es la versión equivalente. Lee la tabla COMPANY desde stdin con
el formato estándar de HackerRank y emite los IDs de compañías con
más de 10000 empleados, ordenados ascendentemente por ID.

Formato de entrada esperado (uno de los más comunes en HackerRank):

    N
    ID_1 NAME_1 EMPLOYEES_1
    ID_2 NAME_2 EMPLOYEES_2
    ...
    ID_N NAME_N EMPLOYEES_N

Donde N es la cantidad de filas. NAME puede contener espacios; por eso
se separa por tokens y el valor de EMPLOYEES siempre es el último,
y el ID siempre es el primero.
"""

import sys


def main() -> None:
    data = sys.stdin.read().strip().splitlines()
    if not data:
        return

    try:
        n = int(data[0].strip())
        rows = data[1 : 1 + n]
    except ValueError:
        rows = data

    result_ids = []
    for line in rows:
        parts = line.strip().split()
        if len(parts) < 3:
            continue
        company_id = int(parts[0])
        employees = int(parts[-1])
        if employees > 10000:
            result_ids.append(company_id)

    for company_id in sorted(result_ids):
        print(company_id)


if __name__ == "__main__":
    main()
