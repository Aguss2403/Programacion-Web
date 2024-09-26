let careers = [];

const findAll = () => {
    console.log("Careers Services => findAll");
    return careers.filter(career => career.accredited);
};

const create = (career) => {
    const newCareer = {
        id: careers.length + 1,
        name: career.name,
        accredited: career.accredited !== undefined ? career.accredited : true, // Por defecto true
        levels: []
    };
    careers.push(newCareer);
    return newCareer;
};


const findById = (id) => {
    return careers.find(career => career.id == id && career.accredited);  
};

const update = (id, updatedData) => {
    const index = careers.findIndex(career => career.id == id);
    if (index !== -1) {
        careers[index] = { ...careers[index], ...updatedData };
        return careers[index];
    }
    return null;
};

const deleteById = (id) => {
    const career = careers.find(career => career.id == id);
    if (career) {
        career.accredited = false;
    }
};

module.exports = {
    findAll,
    create,
    findById,
    update,
    deleteById,
    careers
};
