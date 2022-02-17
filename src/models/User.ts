import { Column, Entity } from "typeorm";
import { ActiveRecord } from "./ActiveRecord";

@Entity({ name: 'users' })
export class User extends ActiveRecord {
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string

}
