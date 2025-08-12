<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Donation Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4CAF50;">Thank You for Your Donation!</h2>
        <p>Dear <strong>{{ $data['name'] }}</strong>,</p>

        <p>We appreciate your generous contribution. Here are the details of your donation:</p>

        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Full Name:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $data['name'] }}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $data['address'] }}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone Number:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ $data['phonenumber'] }}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Amount Donated:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${{ number_format($data['amount'], 2) }}</td>
            </tr>
        </table>

        <p style="margin-top: 20px;">Your support means a lot to us and makes a difference.</p>

        <p>Thank you once again!</p>

        <p style="margin-top: 30px; font-size: 14px; color: #777;">If you have any questions, feel free to contact us.</p>
    </div>
</body>
</html>
