import { SchedulerConfig } from '@bryntum/scheduler';

export const schedulerConfig: Partial<SchedulerConfig> = {
    columns : [
        { text : 'Name', field : 'name', width : 100, }
    ],
    startDate : new Date(2024, 0, 1),
    endDate   : new Date(2024, 0, 10)
};