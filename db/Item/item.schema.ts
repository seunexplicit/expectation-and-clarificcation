const { DataTypes } = require("sequelize");

export const  ItemsModel = (sequelize:any)=>{
	return sequelize.define('items', {
		id:{
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name:{
			allowNull:false,
			type:DataTypes.STRING
		},
		validTill:{
			allowNull:false,
			type:DataTypes.STRING
		},
		validityDate:{
			allowNull:false,
			type:DataTypes.DATE
		}
	})
} 