import { Controller, Get, Post, Body } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() tdo: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
