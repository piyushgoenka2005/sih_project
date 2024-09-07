module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
            u_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            u_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
            u_email: {
                type: DataTypes.STRING,
                allowNull: false
            },

            u_role: {
                type: DataTypes.ENUM("VERIFYING", "ISSUEING", "INDIVIDUAL"),
                allowNull: false,
            },

            u_otp: {
                type: DataTypes.STRING,
                allowNull: true
            },

            u_token: {
                type: DataTypes.STRING,
                allowNull: true
            },
            
            u_token_expired_at: {
                type: DataTypes.DATE,
                allowNull: true
            },

            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: 1
            },

            u_created_on: {
                type: DataTypes.DATE, 
            },

        }, 
        {
            timestamps: true,
            createdAt: false,
            updatedAt: false
        }
    );

    return User;
};