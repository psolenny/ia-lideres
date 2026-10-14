// Datos de equipos y resultados. Se actualizan a mano después de cada sesión.
// El repositorio es público: usar nombre del equipo y área, NO nombres de personas.
// horas_mes = (min antes − min con MVP) × veces por mes ÷ 60, con base en el registro de 2 semanas.
// Ejemplo de equipo:
// { equipo: 'Equipo 1', areas: 'Ventas · Logística', problema: '…', mvp: 'Asistente configurado',
//   enlace: '', horas_mes: null, estrategia: '' }
window.DATOS = {
  actualizado: '',
  sedes: [
    { sede: 'Santiago de los Caballeros', dia1: '21 de octubre', dia2: '4 de noviembre', equipos: [] },
    { sede: 'Santo Domingo', dia1: '22 de octubre', dia2: '5 de noviembre', equipos: [] }
  ]
};
