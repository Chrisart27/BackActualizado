const nodemailer = require('nodemailer');

function sendEmail (req, res)  {
    const { name, email, message } = req.body;
    
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'proyect.gruapp@gmail.com', 
        pass: 'elmh lhjq xarq chlo', 
    },
    });

    
    const mailOptions = {
    from: email, 
    to: 'proyect.gruapp@gmail.com', 
    subject: 'Has recibido un nuevo mensaje',
    text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`,
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).send('Error al enviar el correo electrónico');
    } else {
        console.log('Correo electrónico enviado:', info.response);
        res.status(200).send('Correo electrónico enviado correctamente');
    }
    });
}


module.exports = {
 sendEmail
}