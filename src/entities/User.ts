import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany
} from "typeorm";
import { Note } from "./Note";

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    validatePassword(password: string): Promise<boolean>;
}

@Entity({ name: "user" })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column({unique: true})
    username!: string;

    @Column()
    password!: string;

    @Column({unique: true})
    email!: string;

    @Column({default: "USER_ROLE"})
    role!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(()=> Note, (note) => note.user)
    notes!: Note[];
}