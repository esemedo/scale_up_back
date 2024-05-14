import { prisma } from '../index';

export const importSubject = async (req, res) => {
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
    const errors = [];
    for (let row of data) {
        try {
            await prisma.subject.create({
                data: {
                    name: row.name,
                    level: row.level,
                    categoryId: parseInt(categoryId)
                }
            });
        } catch (error) {
            errors.push({ row, error });
        }
    }

    if (errors.length > 0) {
        res.status(400).json({ message: 'Some rows failed to import', errors });
    } else {
        res.status(200).json({ message: 'Data imported successfully' });
    }
};
