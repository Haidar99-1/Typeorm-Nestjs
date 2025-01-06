import { PrimaryGeneratedColumn , Column, Entity, ManyToMany, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity({ name : 'user_posts'})
export class Post {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}