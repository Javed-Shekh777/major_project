const PDFDocument = require("pdfkit");
const fs = require('fs');
const path = require("path");
const Order = require("../../models/order.model");
const Product = require("../../models/productModel");
const invoicesDir = path.join(__dirname, `../../invoices`);


const invoiceDownload = async (req, res) => {

    try {

        const { _id } = req.query;
       
        if (!_id) {
            return res.status(400).json({
                message: "Order Id is required.",
                error: true,
                success: false
            });
        }


        const data = await Order.findById({ _id: _id }).populate({ path: "user", select: "-password" }).populate('orderItems.productId');

        if (!data) {
            return res.status(400).json({
                message: "Someting went wrong.",
                error: true,
                success: false
            });
        }
  


        let invoice = {
            id: data._id,
            billingAddress: data.billingAddress,
            shippingAddress: data.shippingAddress,
            totalPrice: data.totalPrice,
            transactionId: data.transactionId,
            paymentMethod: data.paymentMethod,
            items: data.orderItems,
            username: data.user?.name,
            email: data.user?.email,
            date:
                new Intl.DateTimeFormat({
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }).format(data.createdAt) || "2323/432/43",


        }

     



        if (!fs.existsSync(invoicesDir)) {
            fs.mkdirSync(invoicesDir);
        }

        const doc = new PDFDocument({ margin: 50 });
        const filename = `invoice-${_id}.pdf`;
        const filePath = path.join(invoicesDir, filename);

        let stream = doc.pipe(fs.createWriteStream(filePath));

        // Header
        doc
            .fillColor("#008000") // Green color
            .fontSize(20)
            .text("INVOICE", 50, 50)
            .moveDown();


            doc
            .fillColor("black")
            .fontSize(10)
            .text(`INVOICE NO: ${invoice.id.toString().slice(0,10)}`, 400, 50)
            .text(`Invoice Date: ${invoice.date}`, 400, 65)
            .text(`Due Date: ${new Date().getDate()}`, 400, 80);

        // Company and Client Info
        doc
            .fillColor("black")
            .fontSize(12)
            .text("Ecommerce Services", 50, 100)
            .text("Address: 14256 Street Name", 50, 115)
            .text("City, State Zip Code", 50, 130)
            .text("Phone: +12345678", 50, 145)
            .text("Email: ecom@gmail.com", 50, 160)
            .moveDown();

        doc
            .text("BILLED TO", 300, 100)
            .text(`${invoice.username}`, 300, 115)
            .text(`${invoice.billingAddress}`, 300, 130)
            .text(`Email : ${invoice.email}`, 300, 160)

        
        // Table Header
        const tableTop = 270;
        doc
            .fontSize(10)
            .text("ITEM NO.", 50, tableTop)
            // .text("PRODUCT/SERVICE", 150, tableTop)
            .text("QUANTITY", 150, tableTop)
            .text("UNIT PRICE", 300, tableTop)
            .text("TOTAL", 450, tableTop);

        // Add a separator line
        doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

        // Table Rows
        let position = tableTop + 30;
        invoice.items.forEach((item, i) => {
            let pri = item.quantity * item.productId?.price;
            doc
                .fontSize(10)
                .text(item.productId._id.toString().slice(0,10), 50, position)
                // .text(item.description, 150, position)
                .text(item.quantity, 150, position)
                .text(`Rs${item.productId.price.toFixed(2)}`, 300, position)
                .text(`Rs ${pri.toFixed(2)}`, 450, position);
                // doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();


            position += 20;
        });

        // Total Summary
        doc
            .fontSize(12)
            .text(`SUBTOTAL: Rs${invoice.totalPrice.toFixed(2)}`, 400, position + 20)
            .text(`DISCOUNT ${invoice.totalPrice.toFixed(2)}`, 400, position + 40)
            // .text(`DISCOUNT (${invoiceData.discount}%): $${invoiceData.discountValue.toFixed(2)}`, 400, position + 40)
            // .text(`TAX (${invoiceData.taxRate}%): $${invoiceData.taxValue.toFixed(2)}`, 400, position + 60)
            .text(`TAX (${0}%): Rs0.0`, 400, position + 60)
            .fillColor("#008000")
            .text(`AMOUNT DUE: Rs${invoice.totalPrice.toFixed(2)}`, 400, position + 80)

        // Footer
        doc
            .fillColor("black")
            .fontSize(10)
            .text("Make all checks payable to Ecommerce Services", 50, position + 160)
            .text("If you have any questions about this invoice,", 50, position + 175)
            .text("please contact us using the below details:", 50, position + 190)
            .text("Company Phone Number, Email", 50, position + 205);

        // Finalize PDF
        doc.end();



        stream.on("finish", () => {
            res.download(filePath, (err) => {
                if (err) {
                    console.error('Error downloading the file:', err);
                    res.status(500).send('Could not download the file.');
                }
            });
        });
    } catch (error) {
     
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message || error,
        });
    }

}


const invoiceDelete = async (req, res) => {
    const filePath = `${invoicesDir}/${req.params.filename}`;
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
            return res.status(500).send('Could not delete the file.');
        }
        res.status(204).send();
    });
}
module.exports = { invoiceDownload, invoiceDelete };

 