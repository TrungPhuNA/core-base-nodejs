import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import db from './database/models/index.js'

const PORT = process.env.PORT || 5000

// Test database connection
const connectDatabase = async () => {
    try {
        await db.sequelize.authenticate()
        console.log('✅ Database connection established successfully')
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message)
        process.exit(1)
    }
}

// Start server
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase()

        // Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`)
            console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
            console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`)
            console.log(`🔗 API Base URL: http://localhost:${PORT}${process.env.API_PREFIX || '/api'}`)
        })
    } catch (error) {
        console.error('❌ Failed to start server:', error.message)
        process.exit(1)
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err)
    process.exit(1)
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err)
    process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('👋 SIGTERM received, shutting down gracefully...')
    await db.sequelize.close()
    process.exit(0)
})

process.on('SIGINT', async () => {
    console.log('👋 SIGINT received, shutting down gracefully...')
    await db.sequelize.close()
    process.exit(0)
})

// Start the server
startServer()

