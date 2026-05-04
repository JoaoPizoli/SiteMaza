import { Module } from "@nestjs/common";
import { GoogleGeocoderService } from "./maps.service";

@Module({
    providers: [GoogleGeocoderService],
    exports: [GoogleGeocoderService]
})
export class MapsModule {}