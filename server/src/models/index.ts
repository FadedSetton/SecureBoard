import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: {
      ssl: {
        require: true,   // Enable SSL
        rejectUnauthorized: false, // Allow self-signed certificates (if needed)
      },
    }
  })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: process.env.DB_HOST||'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

    // Test the database connection
sequelize.authenticate()
.then(() => {
  console.log('Connection to the database has been established successfully.');
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { sequelize, User, Ticket };
