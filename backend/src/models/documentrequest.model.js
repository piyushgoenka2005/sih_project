module.exports = (sequelize, DataTypes) => {
    const DocumentRequest = sequelize.define('DocumentRequest', {
        dr_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dr_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        dr_requester_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dr_request_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        dr_uploader_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dr_upload_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        dr_status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'PENDING'
        }
      }, {
            tableName: 'document_requests',
            timestamps: false
      });
      
    DocumentRequest.associate = models => {
        DocumentRequest.belongsTo(models.userModel, {
            foreignKey: 'dr_requester_id',
            as: 'requestor'
        });
      
        DocumentRequest.belongsTo(models.userModel, {
            foreignKey: 'dr_uploader_id',
            as: 'uploader'
        }); 

        DocumentRequest.hasMany(models.documentModel, {
            foreignKey: 'dr_id',
            as: 'document'
        });
    }; 
  
    return DocumentRequest;
};