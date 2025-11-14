'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash('123456', salt)

        await queryInterface.bulkInsert('users', [
            {
                email: 'admin@example.com',
                password: hashedPassword,
                name: 'Admin User',
                role: 'admin',
                status: 'active',
                phone: '0123456789',
                gender: 'male',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'user@example.com',
                password: hashedPassword,
                name: 'Normal User',
                role: 'user',
                status: 'active',
                phone: '0987654321',
                gender: 'female',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: 'user2@example.com',
                password: hashedPassword,
                name: 'John Doe',
                role: 'user',
                status: 'active',
                phone: '0111222333',
                gender: 'male',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {})
    },
}

