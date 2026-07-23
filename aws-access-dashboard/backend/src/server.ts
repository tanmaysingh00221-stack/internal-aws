// Load environment variables first
import 'dotenv/config';

// Type augmentation
import './types.js';

// Third-party packages
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Routes
import { authRouter } from './routes/auth.routes.js';
import { awsRouter } from './routes/aws.routes.js';
import { adminRouter } from './routes/admin.routes.js';

// Middleware
import { errorHandler } from './middleware/error.js';


// --------------------------------------------------
// Validate Environment Variables
// --------------------------------------------------

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}


// --------------------------------------------------
// Create Express App
// --------------------------------------------------

const app = express();


// --------------------------------------------------
// Global Middleware
// --------------------------------------------------

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  })
);

app.use(
  express.json({
    limit: '1mb',
  })
);

app.use(morgan('dev'));


// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    mockMode: process.env.AWS_MOCK_MODE !== 'false',
  });
});


// --------------------------------------------------
// API Routes
// --------------------------------------------------

app.use('/api/auth', authRouter);
app.use('/api/aws', awsRouter);
app.use('/api/admin', adminRouter);


// --------------------------------------------------
// Error Handler (Always Last)
// --------------------------------------------------

app.use(errorHandler);


// --------------------------------------------------
// Start Server
// --------------------------------------------------

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});