import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Order } from 'src/orders/entities/order.entity';

@Table({
    tableName: 'Customers',
})
export class Customer extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    last_name: string;

    
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;


    @Column({
        type: DataType.ARRAY(DataType.STRING), 
        allowNull: false,
    })
    role: string[];

    @HasMany(()=>Order)
    order:Order
}
