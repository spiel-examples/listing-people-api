export const addPerson = {
    body: {name: "camion", superPower: true, rich: false, genius: false},
    json: true,
    method: "POST",
    uri: "http://localhost:8000/people",
};

export const delPerson = {
    method: "DELETE",
    resolveWithFullResponse: true,
    uri: "http://localhost:8000/people",
};

export const getPerson = {
    method: "GET",
    resolveWithFullResponse: true,
    uri: "http://localhost:8000/people",
};
