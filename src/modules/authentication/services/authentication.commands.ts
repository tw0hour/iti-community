import { Injectable } from '@angular/core';
import { Bad, Ok, OkVal } from 'src/modules/common/Result';

export type LoginCommandData = {
    userId: string;
    accessToken: string;
    expiresAt: number;
};
export type LoginCommandResult =
    | OkVal<LoginCommandData>
    | Bad<"invalid_credentials">;

export type LogoutCommandResult =
    | Ok
    | Bad<"logout_failed">;
@Injectable()
export abstract class AuthenticationCommands {
    abstract login(username: string, password: string): Promise<LoginCommandResult>;
    abstract logout(userId: string): Promise<LogoutCommandResult>;
}