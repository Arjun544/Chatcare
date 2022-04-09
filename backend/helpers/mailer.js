require("dotenv").config();
const sgMail = require("@sendgrid/mail");

async function sendEmail(email, code, isForgetPassword = false) {
  try {
    const senderAddress = "Chatcare <chatcare1@gmail.com>";

    sgMail.setApiKey(process.env.SG_APIKEY);

    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: email,
      templateId: isForgetPassword
        ? "d-8c472d332a7241c98bb455a7ec0e14a0"
        : "d-b47ea8d309a24e309796afd285099062",
      dynamic_template_data: {
        code: code,
      },
    };

    await sgMail.send(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      success: false,
      message: "Cannot send email",
    };
  }
}

// async function sendOrderEmail(email, code) {
//   try {
//     const senderAddress = "Chatcare <chatcare1@gmail.com>";

//     sgMail.setApiKey(process.env.SG_APIKEY);

//     // Specify the fields in the email.
//     let mailOptions = {
//       from: senderAddress,
//       to: email,
//       templateId: "d-6a49bcf540e54ec7b243be13c3ffbe03",
//       dynamic_template_data: {
//         code,
//       },
//     };

//     await sgMail.send(mailOptions);
//     return { error: false };
//   } catch (error) {
//     console.error("send-email-error", error);
//     return {
//       success: false,
//       message: "Cannot send email",
//     };
//   }
// }

module.exports = { sendEmail };
