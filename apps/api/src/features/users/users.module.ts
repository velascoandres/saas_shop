import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
	imports: [
        MikroOrmModule.forFeature([User])
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
