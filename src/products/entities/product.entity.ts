import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'Products',
})
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    price:number;


    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    category: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image_url:string;
}
