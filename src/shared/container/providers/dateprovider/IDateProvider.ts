interface IDateProvider {
  compareDateInHours(start_date: Date, end_date: Date): number;
  convertDateToUtc(date: Date): string;
  dateNow(): Date;
  compareDateInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
