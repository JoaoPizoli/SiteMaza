import { Module } from "@nestjs/common";
import { ErpConnectionService } from "./erp-connection.service";
import { ErpSyncWorker } from "./erp-sync.worker";
import { MapsModule } from "../maps/maps.module";


@Module({
    imports: [MapsModule],
    providers: [ErpConnectionService, ErpSyncWorker],
    exports: [ErpConnectionService]
})
export class ErpModule {}