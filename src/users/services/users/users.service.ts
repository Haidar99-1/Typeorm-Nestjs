import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParms, UpdateUserParms, userProfileParms, userUserPostParms } from 'src/utils/type';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';




//This service will be responsible for data storage and retrieval, and is designed to be used by the usersController
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post> ) { }


    findUsers() {
        return this.userRepository.find({relations : ['profile'] })
    }

    createUser(userDetails: CreateUserParms) {
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date()
        })
        return this.userRepository.save(newUser)
    }

    async updateUser(id: number, updateUserDetails: UpdateUserParms) {
        return await this.userRepository.update({ id }, { ...updateUserDetails })
    }

    deleteUserById(id: number) {
        this.userRepository.delete({ id })
    }


    async createUserProfile(id: number, userProfileDetails: userProfileParms) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST)
        const newProfile = this.profileRepository.create({
            ...userProfileDetails
        })
        const saveProfile = await this.profileRepository.save(newProfile)
        user.profile = saveProfile

        return this.userRepository.save(user)
    }

    async createUserPost(id: number, createUserPostDetails: userUserPostParms) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException('User not found. Cannot create Profile', HttpStatus.BAD_REQUEST)


        const newPost = this.postRepository.create({...createUserPostDetails, user})
        return await this.postRepository.save(newPost)

      
    }
}
