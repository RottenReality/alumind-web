import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Alumind Contact Form <onboarding@resend.dev>",
      to: [process.env.CONTACT_RECEIVER_EMAIL || ""], // Your Gmail address
      replyTo: email, // This allows you to reply directly to the sender
      subject: `[ALUMIND CONTACT] New inquiry from ${name}`,
      headers: {
        'X-Priority': '1',
        'X-Entity-Ref-ID': 'alumind-contact-form',
      },
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #085d92 0%, #044362 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>

            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #085d92; margin-top: 0; font-size: 18px; border-bottom: 2px solid #085d92; padding-bottom: 10px;">Contact Information</h2>
                <p style="margin: 10px 0;"><strong style="color: #044362;">Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong style="color: #044362;">Email:</strong> <a href="mailto:${email}" style="color: #085d92; text-decoration: none;">${email}</a></p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #085d92; margin-top: 0; font-size: 18px; border-bottom: 2px solid #085d92; padding-bottom: 10px;">Message</h2>
                <p style="white-space: pre-wrap; margin: 10px 0; line-height: 1.6;">${message}</p>
              </div>

              <div style="margin-top: 20px; padding: 15px; background: #e0f2fe; border-left: 4px solid #085d92; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #044362;">
                  <strong>💡 Tip:</strong> You can reply directly to this email to respond to ${name}
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 20px; padding: 15px; color: #6b7280; font-size: 12px;">
              <p style="margin: 5px 0;">This email was sent from your Alumind website contact form</p>
              <p style="margin: 5px 0;">Received on ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
