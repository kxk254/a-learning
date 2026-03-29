import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { CreatePostDto } from "../users/dto/create-post";
import { User } from "../users/user.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(dto: CreatePostDto) {
    const user = await this.usersRepository.findOneBy({ id: dto.userId });
    if (!user) throw new Error("User not found");

    const post = this.postsRepository.create({
      title: dto.title,
      content: dto.content,
      user,
    });
    return this.postsRepository.save(post);
  }
  findAll() {
    return this.postsRepository.find({ relations: ["user"] });
  }
}
