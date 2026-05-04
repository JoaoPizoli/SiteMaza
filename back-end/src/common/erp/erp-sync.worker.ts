import { Injectable, Logger } from "@nestjs/common";
import { ErpConnectionService } from "./erp-connection.service";
import { Interval } from "@nestjs/schedule";


@Injectable()
export class ErpSyncWorker { 
    private readonly logger = new Logger(ErpSyncWorker.name);
    private isRunning = false;

    constructor( 
        private readonly erpConnectionService: ErpConnectionService 
    ){}

    @Interval(60_000)
    async handleSync() {
        if(this.isRunning){
            this.logger.warn('Sincronização anterior ainda está rodando. Ignorando execução.')
            return;
        }

        this.isRunning = true

        try {
            this.logger.log('Iniciando sincronização com ERP...')
            
        } catch (error) {
            this.logger.error('Erro ao sincronizar dados do ERP', error);
        } finally {
            this.isRunning = false;
        }
    }
}