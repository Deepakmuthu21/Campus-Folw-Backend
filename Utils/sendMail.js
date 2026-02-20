import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMailer = async (name, email, phone, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
     tls: {
      rejectUnauthorized: false
    }
  });
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "Contact Form Submission",
    html: `
<div style="font-family: Arial, sans-serif; background-color:#f3f4f6; padding:40px 20px;">
  
  <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.08);">

    <h2 style="text-align:center; color:#4f46e5; margin-bottom:25px;">
      📩 New Enquiry Received
    </h2>

    <div style="background:#eef2ff; padding:15px 20px; border-radius:8px; margin-bottom:20px;">
      <p style="margin:0; font-size:14px; color:#4f46e5;">
        A new enquiry has been submitted on <b>Campu Flow</b>.
      </p>
    </div>

    <div style="margin-bottom:15px;">
      <p style="margin:0; font-size:14px; color:#888;">Name</p>
      <p style="margin:4px 0 0; font-size:16px; font-weight:bold; color:#111;">
        ${name}
      </p>
    </div>

    <div style="margin-bottom:15px;">
      <p style="margin:0; font-size:14px; color:#888;">Email</p>
      <p style="margin:4px 0 0; font-size:16px; font-weight:bold; color:#4f46e5;">
        ${email}
      </p>
    </div>

    <div style="margin-bottom:15px;">
      <p style="margin:0; font-size:14px; color:#888;">Phone</p>
      <p style="margin:4px 0 0; font-size:16px; font-weight:bold; color:#111;">
        ${phone}
      </p>
    </div>

    <div style="margin-bottom:20px;">
      <p style="margin:0; font-size:14px; color:#888;">Message</p>
      <div style="margin-top:6px; padding:15px; background:#f9fafb; border-radius:8px; font-size:15px; color:#333;">
        ${message}
      </div>
    </div>

    <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />

    <p style="text-align:center; font-size:13px; color:#9ca3af;">
      © 2026 Campu Flow. All rights reserved.
    </p>

  </div>

</div>
`,
  };
  await transporter.sendMail(mailOptions);
};

export const registerCourse = async (name, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to:email ,
    subject: "Contact Form Submission",
    html: `
<div style="font-family: Arial, sans-serif; background-color:#f4f6f9; padding:30px;">
  
  <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
    
    <h2 style="color:#4f46e5; text-align:center; margin-bottom:20px;">
      Registration Successful 🎉
    </h2>

    <p style="font-size:16px; color:#333;">
      Hi <b>${name}</b>,
    </p>

    <p style="font-size:15px; color:#555; line-height:1.6;">
      Thank you for registering with <b>Campus Flow</b>.
      Your registration has been successfully received.
    </p>

    <div style="background:#eef2ff; padding:15px; border-radius:8px; margin:20px 0;">
      <p style="margin:0; font-size:15px; color:#4f46e5;">
        📢 We will notify you once your registration is approved by the admin.
      </p>
    </div>

    <p style="font-size:14px; color:#666;">
      If you have any questions, feel free to contact us.
    </p>

    <hr style="margin:30px 0;" />

    <p style="text-align:center; font-size:13px; color:#999;">
      © 2026 Campus Flow. All rights reserved.
    </p>

  </div>

</div>
`,
  };
   await transporter.sendMail(mailOptions)
};


export const approvedUser = async (name, email,registerNo) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to:email ,
    subject: "Contact Form Submission",
    html: `
<div style="font-family: Arial, sans-serif; background-color:#f4f6f9; padding:30px;">
  
  <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
    <h2 style="color:#16a34a; text-align:center; margin-bottom:20px;">
      🎉 Registration Approved
    </h2>

    <p style="font-size:16px; color:#333;">
      Hi <b>${name}</b>,
    </p>

    <p style="font-size:15px; color:#555; line-height:1.6;">
      Welcome to <b>Campu Flow</b>!
      Your registration has been <b style="color:#16a34a;">approved</b> by the admin.
    </p>

    <div style="background:#ecfdf5; padding:15px; border-radius:8px; margin:20px 0; text-align:center;">
      <p style="margin:0; font-size:15px; color:#065f46;">
        <b>Your Register Number:</b>
      </p>
      <h3 style="margin:10px 0; color:#065f46; letter-spacing:1px;">
        ${registerNo}
      </h3>
    </div>

    <p style="font-size:15px; color:#555;">
      🔐 Please use your <b>Register Number</b> to login to your Campu Flow account.
    </p>

    <div style="text-align:center; margin:25px 0;">
      <a href="http://localhost:3000/login" 
         style="background:#4f46e5; color:white; padding:12px 25px; text-decoration:none; border-radius:6px; font-weight:bold;">
        Login to Campu Flow
      </a>
    </div>

    <hr style="margin:30px 0;" />

    <p style="text-align:center; font-size:13px; color:#999;">
      © 2026 Campu Flow. All rights reserved.
    </p>

  </div>

</div>
`,
  };
   await transporter.sendMail(mailOptions)
};

