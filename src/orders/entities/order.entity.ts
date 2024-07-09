import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Customer } from 'src/customers/entities/customer.entity';
import { Order_product } from 'src/order_products/entities/order_product.entity';

@Table({
    tableName: 'Orders',
})
export class Order extends Model {
    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    customer_id: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    status: boolean;

    @BelongsTo(() => Customer)
    customer: Customer;

    @HasMany(() => Order_product)
    orderProducts: Order_product[];
}
