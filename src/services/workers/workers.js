import models from '../../lib/models'
export async function getAll() {
    return await models.Worker.findAll({order: [['id', 'DESC']]})  
}