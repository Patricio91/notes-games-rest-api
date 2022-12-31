import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne
} from "typeorm";
import { NotEmittedStatement } from "typescript";
import { User } from "./User";


@Entity({ name: "note" })
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    game_name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column()
    console!: string;

    @Column()
    year!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.notes)
    user!: User;
}