import { Controller, Post, Get, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { CreatUserDto } from 'src/users/dtos/CreateUser.dto';
import { updateUserDto } from 'src/users/dtos/updateUser.dto';
import { createUserProfileDto } from 'src/users/dtos/CreateUserProfile';
import { createUserPostDto } from 'src/users/dtos/CreateUserPost';


//Controllers are responsible for handling incoming requests and returning responses to the client.
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.userService.findUsers()
    }

    @Post()
    createUser(@Body() createUserDto: CreatUserDto)  {
        return this.userService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: updateUserDto) {
        return await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseIntPipe) id: number) {
        return await this.userService.deleteUserById(id)
    }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id') id: number,
        @Body() createUserProfileDto: createUserProfileDto) 
        {
        return this.userService.createUserProfile(id, createUserProfileDto)
    }

    @Post(':id/posts')
    createUserPost(
        @Param('id') id: number,
        @Body() createUserPostDto: createUserPostDto) {
            return this.userService.createUserPost(id, createUserPostDto)
        }
    
}
