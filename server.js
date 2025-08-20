import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Data storage
const DATA_DIR = path.join(__dirname, 'data');
const SIGNATURES_FILE = path.join(DATA_DIR, 'signatures.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize signatures file if it doesn't exist
if (!fs.existsSync(SIGNATURES_FILE)) {
  fs.writeFileSync(SIGNATURES_FILE, JSON.stringify([], null, 2));
}

// Helper function to read signatures
function readSignatures() {
  try {
    const data = fs.readFileSync(SIGNATURES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading signatures:', error);
    return [];
  }
}

// Helper function to write signatures
function writeSignatures(signatures) {
  try {
    fs.writeFileSync(SIGNATURES_FILE, JSON.stringify(signatures, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing signatures:', error);
    return false;
  }
}

// Helper function to hash IP address
function hashIP(ip) {
  // Simple hash function for demo purposes
  // In production, use a proper cryptographic hash
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Get total signature count
app.get('/signatures/count', (req, res) => {
  try {
    const signatures = readSignatures();
    res.json({ count: signatures.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get signature count' });
  }
});

// Submit a signature
app.post('/signatures', (req, res) => {
  try {
    const { name, message } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;
    const hashedIP = hashIP(clientIP);
    const sessionId = req.headers['x-session-id'] || 'unknown';
    const timestamp = new Date().toISOString();

    // Validate input
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    if (name.length > 100 || message.length > 500) {
      return res.status(400).json({ error: 'Name or message too long' });
    }

    // Check for duplicates (IP + session + recent timestamp)
    const signatures = readSignatures();
    const recentSignatures = signatures.filter(sig => {
      const timeDiff = new Date() - new Date(sig.timestamp);
      return timeDiff < 24 * 60 * 60 * 1000; // 24 hours
    });

    const isDuplicate = recentSignatures.some(sig => 
      sig.hashedIP === hashedIP && sig.sessionId === sessionId
    );

    if (isDuplicate) {
      return res.status(409).json({ error: 'Duplicate signature detected' });
    }

    // Add new signature
    const newSignature = {
      id: `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      message: message.trim(),
      hashedIP,
      sessionId,
      timestamp,
      userAgent: req.headers['user-agent'] || 'unknown'
    };

    signatures.push(newSignature);
    
    if (writeSignatures(signatures)) {
      res.status(201).json({ 
        success: true, 
        message: 'Signature added successfully',
        totalSignatures: signatures.length
      });
    } else {
      res.status(500).json({ error: 'Failed to save signature' });
    }

  } catch (error) {
    console.error('Error submitting signature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent signatures (for display)
app.get('/signatures/recent', (req, res) => {
  try {
    const signatures = readSignatures();
    const recent = signatures
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)
      .map(sig => ({
        id: sig.id,
        name: sig.name,
        message: sig.message,
        timestamp: sig.timestamp
      }));
    
    res.json(recent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recent signatures' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`The Vible API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
