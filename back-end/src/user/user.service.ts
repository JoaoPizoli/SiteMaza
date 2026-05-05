import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.bootstrapAdmin();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { username: username.trim() },
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  private async bootstrapAdmin() {
    const username = (
      this.configService.get<string>('ADMIN_USERNAME') ?? 'admin'
    ).trim();
    const password =
      this.configService.get<string>('ADMIN_PASSWORD') ?? 'admin';

    const existing = await this.userRepository.findOne({
      where: { isBootstrap: true },
    });

    const passwordHash = await bcrypt.hash(password, 10);

    if (!existing) {
      await this.userRepository.save(
        this.userRepository.create({
          username,
          passwordHash,
          isBootstrap: true,
        }),
      );
      this.logger.log(`Usuário admin bootstrap "${username}" criado`);
      return;
    }

    let changed = false;
    if (existing.username !== username) {
      existing.username = username;
      changed = true;
    }
    if (!(await bcrypt.compare(password, existing.passwordHash))) {
      existing.passwordHash = passwordHash;
      changed = true;
    }
    if (changed) {
      await this.userRepository.save(existing);
      this.logger.log(`Usuário admin bootstrap "${username}" atualizado`);
    }
  }
}
