import { prisma } from '../index';

export const importPromotions = async (req, res) => {
    let data = req.body.data;
    let managerId = req.body.managerId;

    if (!data) {
        res.status(400).json({ error: 'Request body is missing or malformed' });
        return;
    }

    try {
        data = JSON.parse(data);
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON format' });
        return;
    }

    const errors = [];
    for (let row of data) {
        try {
            await prisma.promotion.create({
                data: {
                    startSchoolYear: parseInt(row.startSchoolYear),
                    endSchoolYear: parseInt(row.endSchoolYear),
                    managerId: parseInt(managerId),
                },
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
