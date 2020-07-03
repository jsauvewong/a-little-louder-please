import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE_URL as string) // Example for postgres

export class Subscriber extends Model {
  public readonly id!: string // Note that the `null assertion` `!` is required in strict mode.
  public name!: string
  public smsNumber!: string // for nullable fields
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Subscriber.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    smsNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'subscriber',
    sequelize: sequelize // passing the `sequelize` instance is required
  }
)

export async function setUpDatabase() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
