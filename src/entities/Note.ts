import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn
} from "typeorm";
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

    @Column({unique: true})
    link!: string;

    @Column()
    user_id!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.notes)
    @JoinColumn({name: "user_id"})
    user!: User;
}