import { Column, Entity } from "typeorm";
import { ActiveRecord } from "./ActiveRecord";

@Entity({ name: 'links' })
export class Link extends ActiveRecord {
    @Column()
    original: string

    @Column()
    hash: string

    @Column({ default: 0 })
    visits: number
}
