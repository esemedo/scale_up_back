const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
async function main() {
    try {
    //   Insérer des données dans la table User
      await prisma.user.createMany({
        data: [
          { id: 1, uuid: 'user_1_uuid' },
          { id: 2, uuid: 'user_2_uuid' }
        ]
      });
  
    //   Insérer des données dans la table Absence
      await prisma.absence.createMany({
        data: [
          { id: 1, startDate: new Date('2024-02-01'), endDate: new Date('2024-02-03'), reason: 'Vacation', userId: 1 },
          { id: 2, startDate: new Date('2024-01-15'), endDate: new Date('2024-01-17'), reason: 'Sick leave', userId: 2 }
        ]
      });
    //   Insérer des données dans la table Company
      await prisma.company.createMany({
        data: [
          { id: 1, userId: 1, name: 'Company A', phone: '123-456-7890', mail: 'companya@example.com' },
          { id: 2, userId: 2, name: 'Company B', phone: '987-654-3210', mail: 'companyb@example.com' }
        ]
      });
  
      // Insérer des données dans la table Contributor
      await prisma.contributor.createMany({
        data: [
          { id: 1, companyId: 1, firstName: 'John', lastName: 'Doe', phone: '111-222-3333', mail: 'john.doe@example.com', status: 1 },
          { id: 2, companyId: 2, firstName: 'Jane', lastName: 'Smith', phone: '444-555-6666', mail: 'jane.smith@example.com', status: 1 }
        ]
      });
   // Insérer des données dans la table Contract
   await prisma.contract.createMany({
    data: [
      { id: 1, signatoryId: 1, hourlyPrice: 30.0, hoursVolume: 100, total: 3000.0, status: 1, isVerified: true, startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31') },
      { id: 2, signatoryId: 2, hourlyPrice: 35.0, hoursVolume: 120, total: 4200.0, status: 0, isVerified: false, startDate: new Date('2024-02-01'), endDate: new Date('2024-12-31') }
    ]
  });

   // Insérer des données dans la table Category
   await prisma.category.createMany({
    data: [
      { id: 1, name: 'Science' },
      { id: 2, name: 'Arts' }
    ]
  });
  await prisma.subject.createMany({
    data: [
      { id: 1, name: 'Mathematics', level: 'Advanced', categoryId: 1 },
      { id: 2, name: 'Physics', level: 'Intermediate', categoryId: 2 }
    ]
  });
  await prisma.promotion.createMany({
    data: [
      { id: 1, schoolYear: 2023, name: 'Promotion 2023', managerId: 1 },
      { id: 2, schoolYear: 2024, name: 'Promotion 2024', managerId: 2 }
    ]
  });
 // Insérer des données dans la table Need
 await prisma.need.createMany({
    data: [
      { id: 1, idSubject: 1, idPromotion: 1, status: 1, idContributor: 1, hoursVolume: 50 },
      { id: 2, idSubject: 2, idPromotion: 2, status: 0, idContributor: 2, hoursVolume: 60 }
    ]
  });
   // Insérer des données dans la table Offer
   await prisma.offer.createMany({
    data: [
      { id: 1, authorId: 1, contributorId: 1, needId: 1, ptf: 'PTF001', status: 1, hourlyPrice: 25.0 },
      { id: 2, authorId: 2, contributorId: 2, needId: 2, ptf: 'PTF002', status: 0, hourlyPrice: 30.0 }
    ]
  });
// // Insérer des données dans la table Quotation
await prisma.quotation.createMany({
data: [
  { id: 1, price: 500.0, status: true, offerId: 1, contributorId: 1, date: new Date('2024-01-01') },
  { id: 2, price: 600.0, status: false, offerId: 2, contributorId: 2, date: new Date('2024-01-15') }
]
});

  // Insérer des données dans la table Bill
  await prisma.bill.createMany({
    data: [
      { id: 1, contractId: 1, quotationId: 1, total: 500.0, status: 1, validity: true },
      { id: 2, contractId: 2, quotationId: 2, total: 600.0, status: 0, validity: false }
    ]
  });

      // Insérer des données dans la table Dei
      await prisma.dei.createMany({
        data: [
          { id: 1, idNeed: 1, idBill: 1, hourlyPrice: 25.5, totalPrice: 102.0, status: true, sashaStatus: 1 },
          { id: 2, idNeed: 2, idBill: 2, hourlyPrice: 30.0, totalPrice: 150.0, status: false, sashaStatus: 0 }
        ]
      });
   
  
      // Insérer des données dans la table Promotion
    
  
      
      await prisma.syllabus.createMany({
        data: [
          { id: 1, subjectId: 1, authorId: 1, offerId: 1, file: 'math_syllabus.pdf' },
          { id: 2, subjectId: 2, authorId: 2, offerId: 2, file: 'physics_syllabus.pdf' }
        ]
      });
   
      // Insérer des données dans la table School
      await prisma.school.createMany({
        data: [
          { id: 1, name: 'School A', yearlyBudget: 1000000.00 },
          { id: 2, name: 'School B', yearlyBudget: 1500000.00 }
        ]
      });
 
      // Insérer des données dans la table LegalFile
      await prisma.legalFile.createMany({
        data: [
          { id: 1, contributorId: 1, uploaderId: 1, name: 'Contract Agreement', file: 'contract_agreement.pdf', type: 1, isVerified: true },
          { id: 2, contributorId: 2, uploaderId: 2, name: 'Insurance Policy', file: 'insurance_policy.pdf', type: 2, isVerified: true }
        ]
      });
      await prisma.notificationSettings.createMany({
        data: [
          { id: 1, userId: 1, frequency: 1, status: 1 },
          { id: 2, userId: 2, frequency: 2, status: 0 }
        ]
      });
  
      // Insérer des données dans la table HourlyRate
      await prisma.hourlyRate.createMany({
        data: [
          { id: 1, level: 'Intermediate', subjectId: 1, rate: 25.0 },
          { id: 2, level: 'Advanced', subjectId: 2, rate: 30.0 }
        ]
      });
  
      // Insérer des données dans la table Dispensation
      await prisma.dispensation.createMany({
        data: [
          { id: 1, contributorId: 1, oldPrice: 25.0, newPrice: 20.0, status: true, date: new Date('2024-01-01') },
          { id: 2, contributorId: 2, oldPrice: 30.0, newPrice: 25.0, status: false, date: new Date('2024-01-15') }
        ]
      });
  
      // Insérer des données dans la table PurchaseOrder
      await prisma.purchaseOrder.createMany({
        data: [
          { id: 1, deiId: 1, quotationId: 1, description: 'Purchase order for contract 1' },
          { id: 2, deiId: 2, quotationId: 2, description: 'Purchase order for contract 2' }
        ]
      });
  
      // Insérer des données dans la table Notification
    //   await prisma.notification.createMany({
    //     data: [
    //       { id: 1, userId: 1, title: 'New message', text: 'You have a new message from the administrator', category: 1, status: 1, dueDate: new Date('2024-01-01'), createdAt: new Date('2024-01-01') },
    //       { id: 2, userId: 2, title: 'Reminder', text: 'Don\'t forget to submit your report by the end of the week', category: 2, status: 0, dueDate: new Date('2024-01-15'), createdAt: new Date('2024-01-15') }
    //     ]
    //   });
  
      console.log('Données insérées avec succès.');
  
    } catch (error) {
      console.error('Erreur lors de l\'insertion des données :', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  export {main}