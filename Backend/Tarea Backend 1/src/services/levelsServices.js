let levels = [];

const careersServices = require("./careersServices");

const findAll = () => {
  return levels.filter((level) => level.accredited);
};

const create = (level) => {
  const career = careersServices.careers.find(
    (c) => c.id === Number(level.idCareer) && c.accredited
  );
  if (career) {
    const newLevel = {
      id: career.levels.length + 1,
      idCareer: level.idCareer,
      name: level.name,
      accredited: level.accredited !== undefined ? level.accredited : true,
    };
    career.levels.push(newLevel);
    levels.push(newLevel);
    return newLevel;
  }
  return null;
};

const findById = (id) => {
  return levels.find((level) => level.id == id && level.accredited);
};

const update = (id, updatedData) => {
  const index = levels.findIndex((level) => level.id == id);
  if (index !== -1) {
    levels[index] = { ...levels[index], ...updatedData };
    return levels[index];
    
  }
  return null;
};

const deleteById = (id) => {
  const level = levels.find((level) => level.id == id);
  if (level) {
    level.accredited = false;
  }
};

module.exports = {
  findAll,
  create,
  findById,
  update,
  deleteById,
};
