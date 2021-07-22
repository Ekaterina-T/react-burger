import translationsRU from "../vocabulary/ru";

export const MILLISECONDS_IN_HOUR = 60*60*1000;
export const MILLISECONDS_IN_DAY = 24*MILLISECONDS_IN_HOUR;

export class DateFormatter {

    static getDate = (dateValue) => {
        const date = new Date(dateValue);

        if(!date) {
            throw new Error(`Date couldn't be recognized: ${dateValue}`);
        }

        return date;
    }

    static getTime = date => {
        const minutes = date.getMinutes();
        return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    static getTZ = date => {
        const offsetInHours = date.getTimezoneOffset()/60;
        return `i-GMT${offsetInHours < 0 ? '+' : '-'}${Math.abs(offsetInHours)}`;
    }

    static getDaysDiff = (date) => {

        const now = new Date();

        const cleanDate = new Date(date);
        cleanDate.setHours(0,0,0,0);

        const cleanNow = new Date(now);        
        cleanNow.setHours(0,0,0,0);

        const diffInDays = (cleanNow - cleanDate)/MILLISECONDS_IN_DAY;

        if(diffInDays > 7) {
            return cleanDate.getDate()+' '+cleanDate.getMonth()+' '+cleanDate.getFullYear();
        }

        if(diffInDays === 0) {            
            return translationsRU['today'];
        }

        if(diffInDays === 1) {            
            return translationsRU['yesterday'];
        }

        if( diffInDays < 5  ) {
            return diffInDays+' '+translationsRU['lessThanFiveDaysAgo'];
        }

        return diffInDays+' '+translationsRU['daysAgo'];

    }
    
    static getRelativeFormat = (dateValue) => {
        const date = this.getDate(dateValue);
        return this.getDaysDiff(date)+', '+this.getTime(date)+' '+this.getTZ(date);
    }
}