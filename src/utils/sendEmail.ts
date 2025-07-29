import nodemailer from "nodemailer";
import { envConfig } from "../config";

export const sendEmail = async ({ to, link }: { to: string; link: string }) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: envConfig.emailUtils.email,
			pass: envConfig.emailUtils.password,
		},
	});

	const info = await transporter.sendMail({
		from: envConfig.emailUtils.email, // sender address
		to, // list of receivers
		subject: "Reset Tasko Password", // Subject line
		html: `
			<div>
				<p style='margin-bottom: "20px"'>
					<b>Reset your password within 10 minutes</b>
				</p>
				<a href=${link} >Click here to reset your password</a>
			</div>
		`,
	});
	console.log(info);
	return info?.messageId;
};
