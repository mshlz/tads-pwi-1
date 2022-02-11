import { PrimaryColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity } from "typeorm"

export class ActiveRecord extends BaseEntity {
    @PrimaryColumn()
    id: number

    @Column({ type: 'timestamp' })
    createdAt: Date

    @Column({ type: 'timestamp' })
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