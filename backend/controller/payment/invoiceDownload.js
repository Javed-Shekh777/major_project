const PDFDocument = require("pdfkit");
const fs = require('fs');
const path  = require("path");

const invoicesDir = path.join(__dirname,`../../invoices`);
// if (!fs.existsSync(invoicesDir)) {
//   fs.mkdirSync(invoicesDir);
// }
const invoiceDownload =async (req,res)=>{

    try {

        const invoice = {
            _id : "12345",
            user : "Javed Shekh",
            items : [{
                name : "Apple",
                price : 100,
            },
        {
            name : "Banana",
            price : 35
        }],
        date : new Date(),
        total : 500
        }

        // const invoicesDir = path.join(__dirname,`../../invoices`);
 
        const invoicesDir = path.join(__dirname,`../../invoices`);
        if (!fs.existsSync(invoicesDir)) {
          fs.mkdirSync(invoicesDir);
        }


        const doc = new PDFDocument();
        const filename = `invoice.pdf`;
        const filePath = path.join(invoicesDir, filename);

        console.log("Path : ",filePath);


        doc.pipe(fs.createWriteStream(filePath));
        doc.text(`Invoice for ${invoice.user}`);
        doc.text(`Date : ${invoice.date}`);
        doc.text(`Total : ${invoice.total}`);
        doc.text('Items : ');
        invoice.items.forEach((item)=>{
            doc.text(`${item.name} : ${item.price}`);
        });

        doc.end();

        doc.on('finish',()=>{

             
            res.download(filePath,filename,(err)=>{
                if(err){
                    console.log(err);
                }
                fs.unlink(filePath,err=>{
                    if(err){
                        console.log(err);
                    }
                });
            });
        });


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error : true,
            success:false,
            message : error.message || error,
        });
    }

}

module.exports = invoiceDownload