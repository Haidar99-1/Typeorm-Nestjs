import { PrimaryGeneratedColumn , Column, Entity} from "typeorm";
import { User } from "./User";

@Entity({ name: 'user_porfiles'})
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    dob: string

}