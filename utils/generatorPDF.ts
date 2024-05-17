import PDFDocument from "pdfkit";

interface ContractData {
  hourlyPrice: string;
  hoursVolume: string;
  startDate: string;
  endDate: string;
}

export const generatePDF = (data: ContractData): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        let pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // doc.image("./EsieeITLogo.png", 50, 50, { width: 50 });

      doc
        .rect(50, 110, 500, 100)
        .strokeColor("black")
        .stroke()
        .fillColor("black")
        .fontSize(12)
        .text(
          "Accord-cadre à bons de commande - Prestations de formation Année pédagogique : 2023/2024",
          60,
          75
        );

      doc
        .rect(50, 220, 500, 100)
        .strokeColor("black")
        .stroke()
        .fillColor("black")
        .fontSize(12)
        .text(
          "Accord-cadre passé selon la procédure adaptée en application des articles R2123-1, R2121-8, R2162- 13 et R2162-14 du Code de la Commande publique (CCP)",
          60,
          185
        );

      doc.fontSize(20).text("détails du contrat", 50, 300);
      doc
        .fontSize(12)
        .text(`hourly price: ${data.hourlyPrice}`, 50, 350)
        .text(`hours volume: ${data.hoursVolume}`, 50, 375)
        .text(`start date: ${data.startDate}`, 50, 400)
        .text(`end date: ${data.endDate}`, 50, 425);

      doc.end();
    } catch (error) {
      console.error("error generating PDF:", error);
      reject(error);
    }
  });
};
