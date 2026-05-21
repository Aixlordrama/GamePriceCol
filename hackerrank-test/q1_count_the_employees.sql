/*
 * HackerRank - Pregunta 1: Count the Employees
 *
 * Encontrar las compañías que tienen más de 10000 empleados.
 * Tabla COMPANY(ID INT PK, NAME VARCHAR, EMPLOYEES INT).
 * Imprimir los IDs ordenados ascendentemente por ID.
 *
 * Lenguaje: MySQL (también compatible con PostgreSQL).
 */

SELECT ID
FROM COMPANY
WHERE EMPLOYEES > 10000
ORDER BY ID;
