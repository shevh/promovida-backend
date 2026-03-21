import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthResponseDto {
    @ApiProperty()
    accessToken!: string;

    @ApiProperty()
    refreshToken!: string;

    @ApiProperty()
    user!: UserResponseDto;

    @ApiProperty({ required: false })
    currentTenant?: {
        id: string;
        name: string;
    };

    @ApiProperty({ required: false, isArray: true })
    availableTenants?: Array<{ id: string; name: string }>;
}
