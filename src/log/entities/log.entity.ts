import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Log extends Model {
    @Column
    method: string;

    @Column
    url: string;

    @Column
    headers: string;

    @Column
    body: string;

    @Column
    responseTime: number;
}
