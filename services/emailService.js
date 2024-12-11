import nodemailer from "nodemailer";

export const emailService = {
    sendEmail: async ({ to, subject, text, html }) => {
        try {
            // Configure the transporter
            const transporter = nodemailer.createTransport({
                service: "Gmail", // Or any other email provider
                auth: {
                    user: "your-email@gmail.com",
                    pass: "your-email-password",
                },
            });

            // Email options
            const mailOptions = {
                from: "your-email@gmail.com",
                to,
                subject,
                text,
                html,
            };

            // Send the email
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending email:", error.message);
            throw new Error("Failed to send email");
        }
    },
};
