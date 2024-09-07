const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');
const authenticate = require('../middleware/authenticateToken'); // Authentication middleware

// Test API
router.get('/test', documentController.testApi);

// Individual requests a document                      //not done
router.post('/request', authenticate, documentController.requestDocument); 

// Individual views all their documents
router.get('/my-documents', authenticate, documentController.viewAllIndividualDocuments);




// Upload document (only accessible by VERIFYING and ISSUEING roles)
router.post('/upload', authenticate, documentController.uploadDocument);

// Download document by code                            
router.get('/download/:code', authenticate, documentController.downloadDocument);



// Issuing authority uploads the requested document       //not done
router.post('/upload-requested/:request_id', authenticate, documentController.uploadRequestedDocument);

// Individual views the issued document                    //not done
router.get('/view-issued/:request_id', authenticate, documentController.viewIssuedDocument);

// Issuing authority views all pending document requests       //not done
router.get('/pending-requests', authenticate, documentController.viewAllPendingRequests);



module.exports = router;
