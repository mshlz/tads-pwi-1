import { PrimaryColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity } from "typeorm"

export class ActiveRecord extends BaseEntity {
    @PrimaryColumn({ generated: 'increment' })
    id: number

    @Column({ type: 'datetime' })
    createdAt: Date

    @Column({ type: 'datetime' })
    updatedAt: Date

    @BeforeInsert()
    beforeInsert() {
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date()
    }
}