import { forwardRef, Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { ChatroomsModule } from 'src/chatrooms/chatrooms.module';

@Module({
  providers: [InvitationsService],
  controllers: [InvitationsController],
  exports: [InvitationsService],
  imports: [forwardRef(() => ChatroomsModule)],
})
export class InvitationsModule {}
