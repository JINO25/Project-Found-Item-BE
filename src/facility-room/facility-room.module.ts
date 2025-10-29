import { Module } from '@nestjs/common';
import { FacilityRoomService } from './facility-room.service';
import { FacilityRoomController } from './facility-room.controller';

@Module({
  controllers: [FacilityRoomController],
  providers: [FacilityRoomService],
})
export class FacilityRoomModule {}
