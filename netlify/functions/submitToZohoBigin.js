const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const formSubmission = JSON.parse(event.body).payload;

    // Get the form fields
    const formData = formSubmission.data;
    const zohoBiginAuthToken = process.env.ZOHO_BIGIN_AUTH_TOKEN; // From Netlify environment variables
    const zohoBiginEndpoint = 'https://www.zohoapis.com/bigin/v2/Contacts';

    const body = {
      data: [
        {
          fullName: formData.fullName,
          address: formData.address,
          phone: formData.phone
        }
      ]
    };

    // Send the data to Zoho Bigin
    const response = await fetch(zohoBiginEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoBiginAuthToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission successfully sent to Zoho Bigin' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
