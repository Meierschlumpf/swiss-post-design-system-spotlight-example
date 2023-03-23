/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/restrict-template-expressions */
import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DatePipe, TranslationWidth} from '@angular/common';
import {NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    en: {
        weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December']
    },
    fr: {
        weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
        months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
        monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    it: {
        weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        monthsFull: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio',
            'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    },
    de: {
        weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        monthsFull: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August',
            'September', 'Oktober', 'November', 'Dezember']
    }
};

@Injectable()
export class SwissPostDatepickerI18n extends NgbDatepickerI18n {

    constructor(@Inject(LOCALE_ID) private locale: string, private datePipe: DatePipe) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getWeekdayLabel(weekday: number, width?: TranslationWidth): string {
        return I18N_VALUES[this.locale].weekdays[weekday - 1];
    }

    getMonthShortName(month: number): string {
        return I18N_VALUES[this.locale].months[month - 1];
    }

    getMonthFullName(month: number): string {
        return I18N_VALUES[this.locale].monthsFull[month - 1];
    }


    getDayAriaLabel(date: NgbDateStruct): string {
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return this.datePipe.transform(jsDate, 'fullDate', null, this.locale);
    }
}

@Injectable()
export class SwissPostDateParserFormatter extends NgbDateParserFormatter {
    private static formatValue(value: string): NgbDateStruct {
        const dateParts = value.trim().split('.');
        if (dateParts.length === 1 && isNumber(dateParts[0])) {
            return {year: null, month: null, day: toInteger(dateParts[0])};
        } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
            return {year: null, month: toInteger(dateParts[0]), day: toInteger(dateParts[1])};
        } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
            return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
        }
        return null;
    }

    parse(value: string): NgbDateStruct {
        if (value) {
            return SwissPostDateParserFormatter.formatValue(value);
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        return date ?
            `${isNumber(date.day) ? padNumber(date.day) : ''}.${isNumber(date.month) ? padNumber(date.month) : ''}.${date.year}` :
            '';
    }
}

function toInteger(value: unknown): number {
    return parseInt(`${value}`, 10);
}

function isNumber(value: unknown): value is number {
    return !isNaN(toInteger(value));
}

function padNumber(value: number): string {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
}
