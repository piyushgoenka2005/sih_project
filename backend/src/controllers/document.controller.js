const db = require('../models');
const { Op } = require('sequelize');
const helper = require('../helpers/helper');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadFile = require('../middleware/upload');
const Document = db.documentModel;

// Uncomment and implement the AI model check when ready
// const checkForgeryWithAI = require('../ai/checkForgery'); // Adjust path as necessary
const { sequelize, sequelizeLib, userModel, docuentRequestModel, documentModel } = db;

/* const DocumentRequest = db.docuentRequestModel;
const Document = db.documentModel;
const User = db.userModel; */

exports.testApi = (req, res) => {
    res.status(200).json({ error: false, message: "Working...." });
};

// Individual requests a document from the issuing authority
exports.requestDocument = async (req, res) => {
    const { user_id, document_name } = req.body; // Individual's user ID and document they want to request
    const user_role = req.headers['user-role'];

    if (user_role !== 'INDIVIDUAL') {
        return res.status(403).json({ error: true, message: "Access denied. Only individual can request documents." });
    }

    try {
        const existingDocument = await docuentRequestModel.findOne({ 
            where: { 
                dr_name: document_name,
                dr_requester_id: user_id
            } 
        });
        
        if (existingDocument) {
            return res.status(400).json({ error: true, message: "Request is already made for the same document." });
        }

        const newRequest = await docuentRequestModel.create({
            dr_name: document_name,
            dr_requester_id: user_id,
            dr_request_date: new Date(),
            dr_status: 'PENDING'
        });

        return res.status(200).json({
            error: false,
            message: "Document request submitted successfully.",
            data: newRequest
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error processing document request: " + error.message
        });
    }
};

// Individual views all their documents (fulfilled or pending)
exports.viewAllIndividualDocuments = async (req, res) => {
    const { user_id } = req.body;  // The individual's user ID
    const user_role = req.headers['user-role'];

    if (user_role !== 'INDIVIDUAL') {
        return res.status(403).json({ error: true, message: "Access denied. Only individuals can view their documents." });
    }

    try {
        /* const sql = `
        SELECT dr.dr_id AS doc_req_id, dr.dr_name AS doc_req_name, dr.dr_request_date AS doc_req_date, dr.dr_upload_date AS doc_upload_date, dr.dr_status AS status, 
               doc.d_code AS doc_code, doc.d_document_name AS doc_name, doc.d_document_path AS doc_path, 
               ru.u_name AS requestor_name, ru.u_email AS requestor_email, ru.u_role AS requestor_role,
               uu.u_name AS uploader_name, uu.u_email AS uploader_email, uu.u_role AS uploader_role
        FROM document_requests AS dr
        LEFT JOIN documents AS doc ON doc.dr_id = dr.dr_id 
        LEFT JOIN users AS ru ON ru.u_id = dr.dr_requester_id
        LEFT JOIN users AS uu ON uu.u_id = dr.dr_uploader_id
        WHERE dr.dr_requester_id = :requesterId
        `;
      
        const requesterId = user_id;

        const [documentRequests] = await sequelize.query(sql, {
            replacements: { requesterId },
            type: sequelizeLib.QueryTypes.SELECT,
        }); */

        const documentRequests = await docuentRequestModel.findAll({
            where: {
                dr_requester_id: user_id
            },
            include: [
                {
                    model: db.userModel,
                    as: 'requestor', 
                    attributes: [
                        ['u_name', 'fullname'], 
                        ['u_email', 'email'], 
                        ['u_role', 'role']
                    ]
                },
                {
                    model: db.userModel,
                    as: 'uploader', 
                    attributes: [
                        ['u_name', 'fullname'], 
                        ['u_email', 'email'], 
                        ['u_role', 'role']
                    ]
                },
                {
                    model: db.documentModel,
                    as: 'document', 
                    attributes: [
                        ['d_code', 'code'], 
                        ['d_document_name', 'document_name'], 
                        ['d_document_path', 'document_path']
                    ]
                }
            ],
            order: [['dr_request_date', 'DESC']]
        });

        if (!documentRequests) {
            return res.status(404).json({ error: true, message: "No document request found for this individual." });
        }

        return res.status(200).json({
            error: false,
            message: "Document requests retrieved successfully.",
            data: documentRequests,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error retrieving documents: " + error.message,
        });
    }
};




// Upload document only image file
exports.uploadDocument = async (req, res) => {
    const user_email = req.headers['user-email'];
    const user_role = req.headers['user-role'];

    console.log(`User Email: ${user_email}`);
    console.log(`User Role: ${user_role}`)

    const exemptRoles = ["VERIFYING", "ISSUEING"];

    if(!exemptRoles.includes(user_role)){
        return res.status(403).json({ error: true, message: "Access denied"})
    }

    try {
        await uploadFile.single('upload_file')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(200).json({ error: true, message: err.message });
            } else if (err) {
                return res.status(200).json({ error: true, message: err.message });
            }

            if (req.file) {
                const fileName = req.file.filename;
                const filePath = req.file.path;
                const fileContent = fs.readFileSync(filePath); // No need to specify 'utf-8' for binary files
                const fileContentHash = helper.getHashValue(fileContent);
                const directoryPath = path.dirname(filePath);

                // Save to database
                try {
                    const new_document = await Document.create({
                        d_code: helper.getHashValue(helper.generateToken()),
                        d_document_name: fileName,
                        d_document_path: directoryPath,
                        d_document_hash: fileContentHash,
                    });

                    /*
                    // Step 1: Verify document with AI model
                    try {
                        const aiResponse = await axios.post('https://your-ai-model-url/verify', {
                            fileHash: fileContentHash,
                            fileContent: fileContent.toString('base64') // Convert binary to base64 if needed
                        });

                        if (aiResponse.data.isAuthentic) {
                            // Step 2: Store document in blockchain
                            try {
                                await contract.methods.storeDocument(fileContentHash).send({
                                    from: 'your-blockchain-address', // Replace with the address you're sending from
                                    gas: 2000000
                                });

                                res.status(200).json({ error: false, message: "File uploaded and verified successfully", data: newDocument });
                            } catch (blockchainError) {
                                res.status(500).json({
                                    error: true,
                                    message: `Failed to store document in blockchain: ${blockchainError.message}`
                                });
                            }
                        } else {
                            res.status(400).json({ error: true, message: "Document is forged" });
                        }
                    } catch (aiError) {
                        res.status(500).json({
                            error: true,
                            message: `AI verification failed: ${aiError.message}`
                        });
                    }
                    */

                    res.status(200).json({ error: false, message: "File uploaded successfully", data: new_document });
                } catch (dbError) {
                    res.status(200).send({
                        error: true,
                        message: dbError.message || "Some error occurred while saving the information"
                    });
                }
            } else {
                res.status(400).json({ error: true, message: "No file uploaded" });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Unable to upload the file: ${req.file ? req.file.filename : 'Unknown'}. ${error.message}`
        });
    }
};

// Download document 
exports.downloadDocument = async (req, res) => {
    try {
        const code = req.params.code;
        console.log('code', code);
        
        const document = await Document.findOne({
            where: {
                d_code: code
            },
        });

        if (!document) {
            return res.status(404).json({ error: true, message: 'Document not found' });
        }

        // Verify the d_document_hash and d_document_block
        const { d_document_name, d_document_hash, d_document_block, d_document_path } = document;
        const doc_full_path = d_document_path + '/' + d_document_name;
        const fileContent = fs.readFileSync(doc_full_path, 'utf-8');
        
        let fileUrl = (doc_full_path);
        fileUrl = fileUrl.replaceAll("\\", "/");

        const url = ("http://localhost:3333/" + fileUrl);

        // Download the file from the specified URL
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream', // Specify that the response should be treated as a stream
        });

        // Set the response headers to indicate a file download
        res.setHeader('Content-Disposition', `attachment; filename="${d_document_name}"`);

        // Pipe the file stream to the response object
        response.data.pipe(res);

    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error accessing the document: ' + error.message,
        });
    }
};



// Issuing authority uploads the requested document
exports.uploadRequestedDocument = async (req, res) => {
    const { request_id } = req.params;  // Request ID
    const user_role = req.headers['user-role'];

    if (user_role !== 'ISSUEING') {
        return res.status(403).json({ error: true, message: "Access denied. Only the issuing authority can upload documents." });
    }

    try {
        const request = await db.document_requests.findOne({
            where: { dr_id: request_id, dr_status: 'PENDING' }
        });

        if (!request) {
            return res.status(404).json({ error: true, message: "Document request not found or already fulfilled." });
        }

        await uploadFile.single('upload_file')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: true, message: err.message });
            } else if (err) {
                return res.status(400).json({ error: true, message: err.message });
            }

            if (req.file) {
                const fileName = req.file.filename;
                const filePath = req.file.path;
                const fileContent = fs.readFileSync(filePath);
                const fileContentHash = helper.getHashValue(fileContent);
                const directoryPath = path.dirname(filePath);

                const newDocument = await Document.create({
                    d_code: helper.getHashValue(helper.generateToken()),
                    d_document_name: fileName,
                    d_document_path: directoryPath,
                    d_document_hash: fileContentHash
                });

                request.dr_status = 'FULFILLED';
                request.dr_doc_id = newDocument.d_id;
                await request.save();

                return res.status(200).json({
                    error: false,
                    message: "Document uploaded and request fulfilled successfully.",
                    data: newDocument
                });
            } else {
                return res.status(400).json({ error: true, message: "No file uploaded" });
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error uploading document: " + error.message
        });
    }
};

// Individual views the issued document
exports.viewIssuedDocument = async (req, res) => {
    const { request_id } = req.params;
    const user_role = req.headers['user-role'];

    if (user_role !== 'INDIVIDUAL') {
        return res.status(403).json({ error: true, message: "Access denied. Only individuals can view documents." });
    }

    try {
        const request = await db.document_requests.findOne({
            where: { dr_id: request_id, dr_status: 'FULFILLED' },
            include: [
                {
                    model: db.documents,
                    as: 'document'
                }
            ]
        });

        if (!request) {
            return res.status(404).json({ error: true, message: "Document request not fulfilled yet." });
        }

        return res.status(200).json({
            error: false,
            message: "Document found.",
            data: request.document
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error retrieving document: " + error.message
        });
    }
};

// Issuing authority views all pending document requests
exports.viewAllPendingRequests = async (req, res) => {
    const user_role = req.headers['user-role'];

    if (user_role !== 'ISSUEING') {
        return res.status(403).json({ error: true, message: "Access denied. Only issuing authority can view pending requests." });
    }

    try {
        const pendingRequests = await db.document_requests.findAll({
            where: { dr_status: 'PENDING' },
            include: [
                {
                    model: User, // Assuming you have a User model linked to document_requests
                    as: 'requester', // Alias for user who requested the document
                    attributes: ['id', 'email'], // Select relevant fields
                },
            ],
        });

        if (pendingRequests.length === 0) {
            return res.status(404).json({ error: true, message: "No pending document requests found." });
        }

        return res.status(200).json({
            error: false,
            message: "Pending document requests retrieved successfully.",
            data: pendingRequests,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Error retrieving pending document requests: " + error.message,
        });
    }
};


