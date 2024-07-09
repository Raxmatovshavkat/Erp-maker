
import { Column, Table,Model, AllowNull } from "sequelize-typescript";


@Table
export class RefreshToken extends Model{
    @Column({
        allowNull:false
    })
    userId: string

    @Column({
        allowNull:false,
        unique:true
    })
    token:string

    @Column({
        allowNull:false
    })
    expiryDate:Date
}

