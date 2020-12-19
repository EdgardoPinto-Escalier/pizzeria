const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Your order will be ready in 15 minutes, your are welcome to come and pick it up!</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}" />
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup!</p>
    <style>
          ul {
            list-style-type: none;
          }
    </style>
  </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

/* function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
} */

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (body.nypon) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Unable to send! code: 404404404404',
      }),
    };
  }
  // Validate data coming in
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! the ${field} field is missing...`,
        }),
      };
    }
  }

  // Check that the order is not empty§+
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `You need to add some pizzas before ordering...`,
      }),
    };
  }

  // Send email
  const info = await transporter.sendMail({
    from: 'Pizzeria <pizzeria@example.com',
    to: `${body.name} <${body.email}> orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
