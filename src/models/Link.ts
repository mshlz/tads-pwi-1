import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'links' })
export class Link extends BaseEntity {
    @PrimaryColumn()
    id: number

    @Column()
    original: string

    @Column()
    hash: string

    @Column()
    visits: number
}
