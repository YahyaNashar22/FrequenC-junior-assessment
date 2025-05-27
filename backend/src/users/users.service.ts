import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const existing = await this.userModel.findOne({
      username: registerDto.username,
    });
    if (existing) throw new ConflictException('username already exists!');

    const hash = await bcrypt.hash(registerDto.password, 10);
    const user = new this.userModel({
      username: registerDto.username,
      password: hash,
    });
    await user.save();

    return { message: 'user registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ username: loginDto.username });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid Credentials!');
    }

    const payload = { sub: user._id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password');
  }
}
