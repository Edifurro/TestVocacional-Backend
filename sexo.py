import json

# Mapeo de materia -> id_materia (FK)
materias_map = {
    "economica": 1,
    "humanistica": 2,
    "artistica": 3,
    "salud": 4,
    "ingenieria": 5,
    "defensa": 6,
    "exactas": 7
}

# Cargar el JSON
with open("preguntas.json", "r", encoding="utf-8") as f:
    data = json.load(f)

id_pregunta = 1
inserts = []

for materia, contenido in data["data"].items():
    id_materia = materias_map[materia]  # Buscar el id_materia desde el diccionario

    # Interés = tipo 1
    for item in contenido["interes"]:
        pregunta = item["text"].replace('"', '\\"')
        inserts.append(
            f'INSERT INTO preguntas (id_pregunta, pregunta, id_materia, tipo) '
            f'VALUES ({id_pregunta}, "{pregunta}", {id_materia}, 1);'
        )
        id_pregunta += 1

    # Aptitud = tipo 0
    for item in contenido["aptitud"]:
        pregunta = item["text"].replace('"', '\\"')
        inserts.append(
            f'INSERT INTO preguntas (id_pregunta, pregunta, id_materia, tipo) '
            f'VALUES ({id_pregunta}, "{pregunta}", {id_materia}, 0);'
        )
        id_pregunta += 1

# Guardar el archivo .sql
with open("inserts_preguntas.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(inserts))

print(f"Se generaron {len(inserts)} INSERTS en 'inserts_preguntas.sql'")
