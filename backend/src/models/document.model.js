module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('Document', {
        d_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        d_code: {
            type: DataTypes.STRING(512),
            allowNull: true
        },
        dr_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        d_document_name: {
            type: DataTypes.STRING(225),
            allowNull: false
        },
        d_document_path: {
            type: DataTypes.STRING(225),
            allowNull: false
        },
        d_document_hash: {
            type: DataTypes.STRING(512),
            allowNull: false
        }
        
    }, {
        tableName: 'documents',
        timestamps: false
    });
    
    
    return Document;
};