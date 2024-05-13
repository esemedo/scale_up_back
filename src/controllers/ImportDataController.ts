import Papa from 'papaparse'
import readXlsxFile from 'read-excel-file/node'
import { prisma } from '../index'

export const importData = async (req, res) => {
    let file = req.file
    let categoryId = req.body.categoryId 
    let data

    if (file.mimetype === 'text/csv') {
        data = await new Promise((resolve) => {
            Papa.parse(file.path, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data)
                }
            })
        })
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        data = await readXlsxFile(file.path)
    } else {
        return res.status(400).json({ error: 'Invalid file type. Only CSV and XLSX files are allowed.' })
    }

    // Importe les données dans la base de données
    for (let row of data) {
        if (req.path.includes('subjects')) {
            await prisma.subject.create({
                data: {
                    name: row.name,
                    level: row.level,
                    categoryId: parseInt(categoryId)
                }
            })
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