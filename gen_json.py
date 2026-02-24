#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

# Parsear data.txt
data_txt = []
with open('data.txt', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = [p.strip() for p in line.split(',')]
        if len(parts) >= 2:
            nickname = parts[0]
            tipo = parts[1] if len(parts) > 1 else 'seguidor'
            ganador = False
            if len(parts) > 2:
                g = parts[2].lower()
                ganador = g in ('true', '1', 'si', 'sí')
            data_txt.append({"nickname": nickname, "tipo": tipo, "ganador": ganador})

# Resumen
print("Total de participantes:", len(data_txt))

tipos = {}
for p in data_txt:
    t = p['tipo'].lower()
    tipos[t] = tipos.get(t, 0) + 1
print("Desglose por tipo:", tipos)

ganadores = [p for p in data_txt if p.get('ganador')]
print("Ganadores preestablecidos:", len(ganadores), "->", [p['nickname'] for p in ganadores])

# Generar archivo JavaScript embebido como json_defaultParticipants.js
with open('json_defaultParticipants.js', 'w', encoding='utf-8') as f:
    f.write("// Datos parseados de data.txt - " + str(len(data_txt)) + " participantes\n")
    f.write("const defaultParticipants = " + json.dumps({"participantes": data_txt}, indent=2, ensure_ascii=False) + ";\n")

print("\nArchivo generado: json_defaultParticipants.js")
print("Puedes copiar el contenido de defaultParticipants desde ese archivo a script.js")
