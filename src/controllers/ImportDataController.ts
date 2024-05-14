import { prisma } from '../index'

export const importData = async (req, res) => {
    let data = req.body.data;
    let categoryId = req.body.categoryId;

    if (!data) {
        res.status(400).json({ error: 'Request body is missing or malformed' });
        return;
    }
    
    // Convertir la chaîne JSON en tableau
    try {
        data = JSON.parse(data);
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON format' });
        return;
    }

    // Importe les données dans la base de données
    for (let row of data) {
      if (req.path.includes('subjects')) {
        await prisma.subject.create({
          data: {
            name: row[0], 
            level: row[1], 
            categoryId: parseInt(categoryId)
          }
        });
      } else if (req.path.includes('promotions')) {
        await prisma.promotion.create({
          data: {
            startSchoolYear: parseInt(row.startSchoolYear),
            endSchoolYear: parseInt(row.endSchoolYear),
            managerId: parseInt(row.managerId)
          }
        })
      }
    }
  
    res.status(200).json({ message: 'Data imported successfully' })
}