const db = require('../../data/db-config')

const getAll = async () => {
    const rows = await db('accounts')
    return rows;
}

const getById = (id) => {
    return db("accounts").where('id',id).first();
};

const create = async ({ name, budget }) => {
    const [id] = await db('accounts').insert({ name, budget })
    return getById(id)
  }

const updateById = async (id, account) => {
    await db('accounts')
        .where('id', id)
        .update(account)
        return  getById(id)
   
}


const deleteById = async (id) => {
    const deleted = await getById(id)
    await db("accounts").where("id", id).delete()
    return deleted
  }

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}