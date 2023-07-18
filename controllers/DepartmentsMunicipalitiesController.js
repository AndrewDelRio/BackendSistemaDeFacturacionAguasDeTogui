const express = require('express');
const departmentsMunicipalitiesController = express();
const { JWTokenVerification } = require('../middleware/Authentication');
const municipalities = require('../files/Municipalities.json');
const departments = require('../files/Departments.json')

/**
 * Funcion para ordenar un archivo json de manera ascendente
 * @param {*} p_array_json --> Archivo json a ordenar
 * @param {*} p_key --> clave por la que ordena
 * @returns --> retorna el json ordenado ascendentemente
 */
function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
        return a[p_key] > b[p_key];
    });
    return p_array_json;
}

/**
 * Funcion para obtener la lista de departamentos del pais
 */
departmentsMunicipalitiesController.get('/getDepartments', [JWTokenVerification], (req, res) => {
    const idDepartment = Number(req.params.id_department);
    const municipalitiesByDpt = [];
    let counter = 0;
    for (let i = 0; i < municipalities.length; i++) {
        var element = municipalities[i];
        if (element.department_code === idDepartment) {
            municipalitiesByDpt[counter] = element.municipality_name;
            counter++;
        }

    }
    departments.cities = municipalitiesByDpt;
    return res.status(200).json({ ok: true, result: ordenarAsc(departments, 'department_name') });
});

/**
 * Funcion para obtener los municipios de un departamento
 */
departmentsMunicipalitiesController.get('/getMunicipalitiesByDpt/:id_department', [JWTokenVerification], (req, res) => {

    return res.status(200).json({ ok: true, result: municipalitiesByDpt });
})

module.exports = { departmentsMunicipalitiesController };